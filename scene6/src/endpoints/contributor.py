from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from .. import models, schemas, database, upload, utils
import os
 
router = APIRouter(prefix="/contributors", tags=["contributors"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.ContributorOut)
def create_contributor(
    name: str = Form(...),
    country: str = Form(...),
    series_id: str = Form(None),
    mosaic: UploadFile = File(...),
    screenshot: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # 1. Upload images
    try:
        mosaic_url, _ = upload.upload_image(mosaic, folder="mosaics")
        screenshot_url, _ = upload.upload_image(screenshot, folder="screenshots")
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

    # 2. Persist
    db_contrib = models.Contributor(
        name=name,
        country=country,
        series_id=series_id,
        mosaic_url=mosaic_url,
        screenshot_url=screenshot_url,
    )
    db.add(db_contrib)
    db.commit()
    db.refresh(db_contrib)

    return db_contrib

@router.get("/{contrib_id}", response_model=schemas.ContributorOut)
def get_contributor(contrib_id: int, db: Session = Depends(get_db)):
    contrib = db.get(models.Contributor, contrib_id)
    if not contrib:
        raise HTTPException(404, "Contributor not found")
    return contrib

@router.patch("/{contrib_id}", response_model=schemas.ContributorOut)
def update_contributor(
    contrib_id: int,
    name: str = Form(None),
    country: str = Form(None),
    db: Session = Depends(get_db),
):
    contrib = db.get(models.Contributor, contrib_id)
    if not contrib:
        raise HTTPException(status_code=404, detail="Contributor not found")
    
    if name:
        contrib.name = name
    if country:
        contrib.country = country
    
    db.commit()
    db.refresh(contrib)
    return contrib

@router.get("/{contrib_id}/share")
def share_page(contrib_id: int, db: Session = Depends(get_db)):
    """HTML page with mosaic, screenshot, social buttons & QR"""
    contrib = db.get(models.Contributor, contrib_id)
    if not contrib:
        raise HTTPException(404, "Contributor not found")

    frontend = os.getenv("FRONTEND_URL", "http://localhost:3000")
    share_url = f"{frontend}/share/{contrib_id}"
    qr_datauri = utils.generate_qr(share_url)

    # Very small HTML template for sharing
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Thanks, {contrib.name}!</title>
        <meta property="og:title" content="My Digital Souvenir">
        <meta property="og:image" content="{contrib.mosaic_url}">
        <meta property="og:description" content="Check out my water-tank moment!">
        <meta property="og:url" content="{share_url}">
        <style>
            body {{font-family: sans-serif; text-align:center; padding:2rem;}}
            img {{max-width:100%; height:auto; margin:1rem 0;}}
            .btn {{display:inline-block; margin:0.5rem; padding:0.8rem 1.2rem;
                  background:#1DA1F2; color:white; text-decoration:none; border-radius:5px;}}
            .qr {{margin-top:2rem;}}
        </style>
    </head>
    <body>
        <h1>Hi {contrib.name} ({contrib.country})!</h1>

        <h2>Your 2×2 Mosaic</h2>
        <img src="{contrib.mosaic_url}" alt="mosaic">

        <h2>Your Water-Tank Screenshot</h2>
        <img src="{contrib.screenshot_url}" alt="screenshot">

        <div>
            <a class="btn" href="https://www.instagram.com/?url={share_url}" target="_blank">Share on Instagram</a>
            <a class="btn" href="https://twitter.com/intent/tweet?url={share_url}&text=Check my souvenir!" target="_blank">Share on X</a>
        </div>

        <div class="qr">
            <p>Scan to see all contributors →</p>
            <img src="{qr_datauri}" alt="QR code">
        </div>

        <p><a href="{frontend}/contributors">View the global gallery</a></p>
    </body>
    </html>
    """
    return HTMLResponse(html)
