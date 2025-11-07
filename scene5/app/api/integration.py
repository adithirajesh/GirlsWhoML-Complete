from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests

#import Scene 3 pipeline(scene3 must be a package at repo root or inside websitetrack)
from main_script import create_complete_souvenir

router = APIRouter()

#input payload expected from frontend
class SouvenirRequest(BaseModel):
    image_urls: list[str]
    name: str
    country: str
    screenshot_url: str

def upload_to_backend(mosaic_path: str, name: str, country: str, series_id: str, screenshot_url: str | None):
    backend_url = os.getenv("BACKEND_URL", "http://localhost:8000")
    files = {}

    #attach mosaic file
    with open(mosaic_path, "rb") as mf:
        files["mosaic"] = (f"{series_id}_mosaic.png", mf, "image/png")
        #prepare form fields
        data = {
            "name": name,
            "country": country,
            "series_id": series_id,
        }

        #optional screenshot: fetch and attach if available
        if screenshot_url:
            try:
                r = requests.get(screenshot_url, timeout=10)
                if r.ok:
                    files["screenshot"] = ("screenshot.png", r.content, "image/png")
            except Exception:
                pass #continue w/o screenshot file

        resp = requests.post(f"{backend_url}/contributors/", files=files, data=data, timeout=30)
        resp.raise_for_status()
        return resp.json()

@router.post("/integration")
async def integration(req: SouvenirRequest):
    try:
        BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
        BASE_URL = os.getenv("BASE_URL", "https://yourwebsite.com/series/")
        FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

        # 1)run scene 3 end-to-end processing (mosaic, series id, QR, local outputs)
        result = create_complete_souvenir(
            image_urls=req.image_urls,
            name=req.name,
            country=req.country,
            screenshot_url=req.screenshot_url,
            backend_url=BACKEND_URL,
            base_url=BASE_URL
        )
        #OUTPUT ; result["series_id"], result["mosaic"]["local_path"]

        # 2)upload to backendTask /contributors/ (mosaic + optional screenshot)
        contributor = upload_to_backend(
            mosaic_path=result["mosaic"]["local_path"],
            name=req.name,
            country=req.country,
            series_id=result["series_id"],
            screenshot_url=req.screenshot_url
        )
        #OUTPUT ; contributor["id"], contributor["mosaic_url"], etc.

        # 3)return final share URL for frontend scene 4/Next.js to display
        share_url = f"{FRONTEND_URL}/contributors/{contributor['id']}/share"
        return {
            "series_id": result["series_id"],
            "contributor_id": contributor["id"],
            "mosaic_url": contributor.get("mosaic_url"),
            "screenshot_url": contributor.get("screenshot_url"),
            "share_url": share_url
        }

    except requests.HTTPError as http_err:
        raise HTTPException(status_code=502, detail=f"Backend upload failed: {str(http_err)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
