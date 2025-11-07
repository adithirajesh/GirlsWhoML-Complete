"""
TASK 3 – QR CODE GENERATOR
Original Author: Yasaswini (Scene 3)
Updated by: Anissa Rmedi - QR code generation for Series ID lookup

Description:
Generates 300×300 plain QR code linking to Series ID lookup page.
Users can scan this QR to view their mosaic later.
"""

import qrcode
import os


def create_qr(series_id, base_url=None, output_dir="output/qr_codes/", size=300):
    """
    Generate a QR code for a Series ID.
    
    Args:
        series_id: Series ID (e.g., "H-20250001")
        base_url: Base URL for lookup page (from environment or default)
        output_dir: Directory to save QR code
        size: QR code size in pixels (default: 300)
    
    Returns:
        dict: Contains local_path and lookup_url
    """
    # Get base URL
    if not base_url:
        base_url = os.getenv("BASE_URL", "https://placeholder.site/series/")
    
    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Construct lookup URL
    lookup_url = f"{base_url}{series_id}"
    
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # High error correction
        box_size=10,
        border=4
    )
    qr.add_data(lookup_url)
    qr.make(fit=True)
    
    # Generate image
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Resize to specified size
    img = img.resize((size, size), resample=1)
    
    # Save locally
    file_path = os.path.join(output_dir, f"{series_id}_qr.png")
    img.save(file_path)
    print(f"✅ QR code created → {file_path}")
    
    return {
        "local_path": file_path,
        "lookup_url": lookup_url
    }


if __name__ == "__main__":
    # Test QR code generation
    result = create_qr("H-20250001", size=300)
    
    print(f"\nQR Code Result:")
    print(f"  Local: {result['local_path']}")
    print(f"  Lookup URL: {result['lookup_url']}")