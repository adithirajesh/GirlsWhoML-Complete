"""
TASK 1 – MOSAIC EXPORT
Original Author: Yasaswini (Scene 3)
Updated by: Anissa Rmedi - Simplified for backend integration

Description:
Combines four selected tiles into a 2×2 mosaic (1034×1034 px) and saves PNG locally.
Upload to Cloudinary is handled by Christine's backend.
"""

from PIL import Image
import os
from series_id_generator import generate_series_id
from qr_generator import create_qr
import os
import requests
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageDraw


def create_mosaic(image_paths, output_path="output/mosaic.png", series_id=None,
                 tile_size=517,
                 spacing=20,
                 bg_color=(15, 15, 25),
                 corner_radius=15,
                 add_borders=True,
                 border_color=(255, 255, 255),
                 border_width=3):
    """
    Creates a beautiful 2×2 mosaic from 4 images with modern styling.
    
    Args:
        image_paths: List of 4 image file paths or URLs
        output_path: Where to save the mosaic locally
        series_id: Optional Series ID for filename (e.g., "H-20250001")
        tile_size: Size of each tile (default 517 for ~1034 total)
        spacing: Gap between tiles in pixels (default 20)
        bg_color: Background color RGB tuple (default dark blue-gray)
        corner_radius: Rounded corner radius (default 15, set 0 for square)
        add_borders: Whether to add white borders around tiles
        border_color: Border color RGB tuple
        border_width: Border thickness in pixels
    
    Returns:
        str: Path to the saved mosaic file
    """
    # Validate input
    if len(image_paths) != 4:
        raise ValueError("Exactly 4 images required for mosaic")
    
    print(f"📸 Creating enhanced mosaic...")
    
    # Load and process images
    imgs = []
    for i, img_path in enumerate(image_paths):
        try:
            print(f"   Processing image {i+1}/4...")
            
            # Handle both local paths and URLs
            if img_path.startswith(('http://', 'https://')):
                from io import BytesIO
                import requests
                response = requests.get(img_path)
                img = Image.open(BytesIO(response.content))
            else:
                img = Image.open(img_path)
            
            # Convert to RGB if needed
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Resize to tile size
            img = img.resize((tile_size, tile_size), Image.Resampling.LANCZOS)
            
            # Add border if enabled
            if add_borders:
                bordered = Image.new('RGB', 
                                   (tile_size + border_width*2, tile_size + border_width*2),
                                   border_color)
                bordered.paste(img, (border_width, border_width))
                img = bordered
                actual_tile_size = tile_size + border_width*2
            else:
                actual_tile_size = tile_size
            
            # Add rounded corners if radius > 0
            if corner_radius > 0:
                # Create mask for rounded corners
                mask = Image.new('L', img.size, 0)
                draw = ImageDraw.Draw(mask)
                draw.rounded_rectangle([(0, 0), img.size], corner_radius, fill=255)
                
                # Convert to RGBA and apply mask
                img = img.convert('RGBA')
                img.putalpha(mask)
            
            imgs.append(img)
            
        except Exception as e:
            print(f"⚠️ Error loading image {img_path}: {e}")
            raise
    
    # Calculate canvas size with spacing
    canvas_width = (actual_tile_size * 2) + (spacing * 3)   # left + middle + right spacing
    canvas_height = (actual_tile_size * 2) + (spacing * 3)  # top + middle + bottom spacing
    
    # Create canvas with background color
    mosaic = Image.new('RGB', (canvas_width, canvas_height), bg_color)
    
    # Calculate positions with spacing
    positions = [
        (spacing, spacing),                                          # Top-left
        (actual_tile_size + spacing * 2, spacing),                  # Top-right
        (spacing, actual_tile_size + spacing * 2),                  # Bottom-left
        (actual_tile_size + spacing * 2, actual_tile_size + spacing * 2)  # Bottom-right
    ]
    
    # Paste images onto canvas
    for img, pos in zip(imgs, positions):
        if img.mode == 'RGBA':
            # Use alpha channel as mask for rounded corners
            mosaic.paste(img, pos, img)
        else:
            mosaic.paste(img, pos)
    
    # Update output path to include Series ID if provided
    if series_id:
        output_dir = os.path.dirname(output_path) or "output"
        output_path = os.path.join(output_dir, f"{series_id}_mosaic.png")
    
    # Ensure output directory exists
    os.makedirs(os.path.dirname(output_path) or "output", exist_ok=True)
    
    # Save with high quality
    mosaic.save(output_path, quality=95, optimize=True)
    print(f"✅ Enhanced mosaic created → {output_path}")
    print(f"   Final size: {canvas_width}×{canvas_height}px")
    
    return output_path

# def create_mosaic(image_paths, output_path="output/mosaic.png", series_id=None):
#     """
#     Creates a 2×2 mosaic from 4 images.
    
#     Args:
#         image_paths: List of 4 image file paths or URLs
#         output_path: Where to save the mosaic locally
#         series_id: Optional Series ID for filename (e.g., "H-20250001")
    
#     Returns:
#         str: Path to the saved mosaic file
#     """
#     # Validate input
#     if len(image_paths) != 4:
#         raise ValueError("Exactly 4 images required for mosaic")
    
#     # Load and resize images to 517×517 (to make 1034×1034 total)
#     imgs = []
#     for img_path in image_paths:
#         try:
#             # Handle both local paths and URLs
#             if img_path.startswith(('http://', 'https://')):
#                 from io import BytesIO
#                 import requests
#                 response = requests.get(img_path)
#                 img = Image.open(BytesIO(response.content))
#             else:
#                 img = Image.open(img_path)
            
#             img = img.resize((517, 517), Image.Resampling.LANCZOS)
#             imgs.append(img)
#         except Exception as e:
#             print(f"⚠️ Error loading image {img_path}: {e}")
#             raise
    
#     # Create 2×2 mosaic
#     mosaic = Image.new("RGB", (1034, 1034))
#     mosaic.paste(imgs[0], (0, 0))      # Top-left
#     mosaic.paste(imgs[1], (517, 0))    # Top-right
#     mosaic.paste(imgs[2], (0, 517))    # Bottom-left
#     mosaic.paste(imgs[3], (517, 517))  # Bottom-right
    
#     # Update output path to include Series ID if provided
#     if series_id:
#         output_dir = os.path.dirname(output_path) or "output"
#         output_path = os.path.join(output_dir, f"{series_id}_mosaic.png")
    
#     # Ensure output directory exists
#     os.makedirs(os.path.dirname(output_path) or "output", exist_ok=True)
    
#     # Save locally
#     mosaic.save(output_path, optimize=True)
#     print(f"✅ Mosaic created → {output_path}")
    
#     return output_path


if __name__ == "__main__":
    # Test with sample images
    sample = ["static/cards/card1.jpg", "static/cards/card2.jpg", "static/cards/card3.jpg", "static/cards/card4.jpg"]
    result = create_mosaic(sample, series_id="H-20250001")
    print(f"\nMosaic saved at: {result}")