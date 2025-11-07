"""
TASK 4 – FULL WORKFLOW (Tasks 1–3)
Original Author: Yasaswini (Scene 3)
Updated by: Anissa Rmedi - Complete Scene 3 workflow with backend integration

Description:
Creates mosaic → generates Series ID → produces QR → sends to backend for storage.
"""

from mosaic_export import create_mosaic
from series_id_generator import generate_series_id
from qr_generator import create_qr
import os
import requests
import cloudinary
import cloudinary.uploader
from mosaic_export import create_mosaic
from series_id_generator import generate_series_id
from qr_generator import create_qr
import os
import requests
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

cloudinary.config(
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME", "do7xjnowr"),
    api_key = os.getenv("CLOUDINARY_API_KEY", "467177913583695"),
    api_secret = os.getenv("CLOUDINARY_API_SECRET", "eo8m8hIzutGBx-77X3Epwv1LiAE")
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter(prefix="/api/scene3", tags=["save-collection"])

class SouvenirRequest(BaseModel):
    imageUrls: list[str]  # Cloudinary URLs from Scene 2
    name: str
    country: str
    screenshot_url: str | None = None
    cloudinary_url: str | None = None

class ScreenshotData(BaseModel):
    screenshot_url: str
    timestamp: str
    totalUsers: int

from fastapi.staticfiles import StaticFiles

# Serve all files in /output via /output path
app.mount("/output", StaticFiles(directory="output"), name="output")
@app.get("/latest_series_id")
def latest_series_id():
    folder = "output"
    png_files = [f for f in os.listdir(folder) if f.endswith("_mosaic.png")]
    if not png_files:
        return {"series_id": None}
    latest = max(png_files, key=lambda f: os.path.getmtime(os.path.join(folder, f)))
    series_id = latest.split("_mosaic.png")[0]
    return {"series_id": series_id, "mosaic": f"/output/{latest}"}

latest_screenshot = None

@router.post("/save-screenshot")
def save_screenshot(data: ScreenshotData):
    """Save screenshot URL from Scene 1"""
    global latest_screenshot
    latest_screenshot = data.screenshot_url
    print(f"📸 Screenshot saved: {data.screenshot_url}")
    print(f"   Timestamp: {data.timestamp}")
    print(f"   Total Users: {data.totalUsers}")
    return {
        "success": True, 
        "screenshot_url": data.screenshot_url,
        "message": "Screenshot saved successfully"
    }

@router.get("/get-screenshot")
def get_screenshot():
    """Retrieve latest screenshot URL for Scene 2"""
    if latest_screenshot:
        print(f"📤 Sending screenshot URL to Scene 2: {latest_screenshot}")
        return {"screenshot_url": latest_screenshot}
    else:
        print("⚠️ No screenshot available")
        return {"screenshot_url": None}

# @router.delete("/clear-screenshot")
# def clear_screenshot():
#     """Clear screenshot after use (optional)"""
#     global latest_screenshot
#     latest_screenshot = None
#     print("🗑️ Screenshot cleared")
#     return {"success": True, "message": "Screenshot cleared"}

def create_complete_souvenir(image_urls, name, country, screenshot_url=None, backend_url=None, base_url=None):
    """
    Complete Scene 3 workflow.
    
    Args:
        image_urls: List of 4 image URLs from Scene 2
        name: Contributor name
        country: Contributor country
        screenshot_url: Water tank screenshot URL (from Scene 1, optional)
        backend_url: Backend API URL (optional, from environment)
        base_url: Base URL for QR codes (optional, from environment)
    
    Returns:
        dict: Complete result with all paths, URLs, and IDs
    """
    print("\n" + "="*60)
    print("SCENE 3: CREATING DIGITAL SOUVENIR")
    print("="*60)
    
    # Get URLs from environment if not provided
    if not backend_url:
        backend_url = os.getenv("BACKEND_URL", "http://localhost:8001")
    if not base_url:
        base_url = os.getenv("BASE_URL", "https://placeholder.site/series/")
    
    # Step 1: Generate Series ID
    print("\n[Step 1/5] Generating Series ID...")
    try:
        series_id = generate_series_id()

    except Exception as e:
        print(f"❌ Failed to generate Series ID: {e}")
        raise
    
    # Step 2: Create Mosaic
    print("\n[Step 2/5] Creating 2×2 mosaic...")
    try:
        mosaic_path = create_mosaic(
            image_paths=image_urls,
            series_id=series_id
        )
    except Exception as e:
        print(f"❌ Failed to create mosaic: {e}")
        raise
    
    # Step 3: Generate QR Code
    print("\n[Step 3/5] Generating QR code...")
    try:
        qr_result = create_qr(series_id, base_url=base_url)
    except Exception as e:
        print(f"❌ Failed to generate QR code: {e}")
        raise
    
    # Step 4: Upload to Backend
    print("\n[Step 4/5] Uploading to backend...")
    backend_response = None
    try:
        with open(mosaic_path, 'rb') as mosaic_file:
            # Prepare files
            files = {
                'mosaic': (f'{series_id}_mosaic.png', mosaic_file, 'image/png'),
            }
            
            # Prepare form data - INCLUDE SERIES_ID as Christine requested
            data = {
                'name': name,
                'country': country,
                'series_id': series_id,  # ✅ Christine confirmed this should be included
            }
            
            # If screenshot URL is provided (from Scene 1), download and include it
            if screenshot_url:
                try:
                    print(f"   Downloading screenshot from: {screenshot_url}")
                    screenshot_response = requests.get(screenshot_url, timeout=10)
                    if screenshot_response.status_code == 200:
                        files['screenshot'] = (
                            'screenshot.png',
                            screenshot_response.content,
                            'image/png'
                        )
                        print(f"   ✅ Screenshot included")
                    else:
                        print(f"   ⚠️ Could not download screenshot (status {screenshot_response.status_code})")
                except Exception as e:
                    print(f"   ⚠️ Error downloading screenshot: {e}")
            else:
                print(f"   ℹ️ No screenshot provided (Scene 1 should provide this)")
            
            # Send to Christine's backend
            print(f"   Sending to: {backend_url}/contributors/")
            response = requests.post(
                f"{backend_url}/contributors/",
                files=files,
                data=data,
                timeout=30
            )
            
            if response.status_code == 200:
                backend_response = response.json()
                print(f"✅ Successfully uploaded to backend!")
                print(f"   Backend Contributor ID: {backend_response.get('id')}")
                print(f"   Backend Mosaic URL: {backend_response.get('mosaic_url', 'N/A')}")
            else:
                print(f"⚠️ Backend upload failed: {response.status_code}")
                print(f"   Response: {response.text}")
                print(f"   Continuing with local files...")
                
    except Exception as e:
        print(f"⚠️ Backend unavailable: {e}")
        print(f"   Continuing with local files...")
    # Step 4: Upload mosaic to Cloudinary
    print("\n[Step 4/5] Uploading mosaic to Cloudinary...")
    cloudinary_url = None
    try:
        response = cloudinary.uploader.upload(
            mosaic_path,
            folder="mosaics",
            public_id=series_id,   # optional: name the file with series ID
            overwrite=True
        )
        cloudinary_url = response['secure_url']
        print(f"✅ Mosaic uploaded to Cloudinary: {cloudinary_url}")

    except Exception as e:
        print(f"⚠️ Cloudinary upload failed: {e}")
        print("   Continuing with local files...")
    
    # Step 5: Prepare Result
    print("\n[Step 5/5] Preparing result...")
    result = {
        "series_id": series_id,
        "mosaic": {
            "local_path": mosaic_path,
            "backend_url": backend_response.get('mosaic_url') if backend_response else None,
            "cloudinary_url": cloudinary_url
        },
        "qr_code": {
            "local_path": qr_result['local_path'],
            "lookup_url": qr_result['lookup_url']
        },
        "backend_saved": backend_response is not None,
        "backend_id": backend_response.get('id') if backend_response else None,
        "share_url": f"{backend_url}/contributors/{backend_response['id']}/share" if backend_response else None
    }

    # Print Summary
    print("\n" + "="*60)
    print("✅ WORKFLOW COMPLETE!")
    print("="*60)
    print(f"Series ID:        {series_id}")
    print(f"Mosaic (local):   {mosaic_path}")
    print(f'Mosaic cloudinary: {cloudinary_url if cloudinary_url else "N/A"}')
    print(f'screenshot_url:  {screenshot_url if screenshot_url else "N/A"}')
    print(f"QR Code (local):  {qr_result['local_path']}")
    print(f"Lookup URL:       {qr_result['lookup_url']}")
    if backend_response:
        print(f"Backend ID:       {backend_response.get('id')}")
        
        print(f"Backend URL:      {backend_response.get('mosaic_url', 'N/A')}")
        print(f"Share Page:       {result['share_url']}")
        print(f"Status:           ✅ Saved to backend")
    else:
        print(f"Status:           ⚠️ Local only (backend unavailable)")
    print("="*60 + "\n")
    
    return result


@router.post("/create-souvenir")
def create_souvenir(req: SouvenirRequest):
    try:
        result = create_complete_souvenir(
            image_urls=req.imageUrls,  # ← uses the Cloudinary URLs
            name=req.name,
            country=req.country,
            screenshot_url=req.screenshot_url
                            )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.include_router(router)

def main(image_urls=None, name="Test User", country="Testland", screenshot_url=None):
    if not image_urls:
        # fallback to local test images
        image_urls = [
            
        ]
    
    result = create_complete_souvenir(
        image_urls=image_urls,  # use the argument passed to main
        name=name,
        country=country,
        screenshot_url=screenshot_url
    )
    
    return result


if __name__ == "__main__":
    import uvicorn

    print("🚀 Starting FastAPI server at http://127.0.0.1:8000 ...")
    uvicorn.run("main_script:app", host="127.0.0.1", port=8000, reload=True)
    cloudinary_urls = os.getenv("CLOUDINARY_URLS", "").split(",")
    print("Using Cloudinary URLs:", cloudinary_urls)
    main(
        image_urls= ['https://res.cloudinary.com/do7xjnowr/image/upload/v1762313932/wghbp3rr75lvojxgd5xo.png', 'https://res.cloudinary.com/do7xjnowr/image/upload/v1762313932/i84ibadbxfonkxmj53fy.png', 'https://res.cloudinary.com/do7xjnowr/image/upload/v1762313932/us6zxiezqmvlkca00tjp.png', 'https://res.cloudinary.com/do7xjnowr/image/upload/v1762313932/as7qsjeaqrrhp8np1kph.png'],
        name="Adithi",
        country="UK"
    )