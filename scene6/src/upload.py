import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.exceptions

load_dotenv()

# Prefer CLOUDINARY_URL if present; otherwise require explicit vars
if os.getenv("CLOUDINARY_URL"):
    # SDK reads CLOUDINARY_URL automatically; just enforce https
    cloudinary.config(secure=True)
else:
    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
    api_key = os.getenv("CLOUDINARY_API_KEY")
    api_secret = os.getenv("CLOUDINARY_API_SECRET")
    if not (cloud_name and api_key and api_secret):
        raise RuntimeError(
            "Cloudinary not configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET in your environment."
        )
    cloudinary.config(
        cloud_name=cloud_name,
        api_key=api_key,
        api_secret=api_secret,
        secure=True,
    )

def upload_image(file, folder: str = "mozdest"):
    """Upload a FastAPI UploadFile → Cloudinary, return secure_url & public_id"""
    try:
        result = cloudinary.uploader.upload(
            file.file,
            folder=folder,
            resource_type="image",
            overwrite=True,
            transformation=[{"width": 800, "crop": "limit"}],
        )
        return result.get("secure_url"), result.get("public_id")
    except cloudinary.exceptions.Error as e:
        # Surface a concise, actionable error up the stack
        raise RuntimeError(f"Cloudinary upload error: {e}")
