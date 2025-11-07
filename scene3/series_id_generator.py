"""
TASK 2 – SERIES ID GENERATOR
Original Author: Yasaswini (Scene 3)
Updated by: Anissa Rmedi - Sequential ID generation for user sessions

Description:
Creates sequential IDs like H-20250001 using local counter.
Each mosaic gets a unique Series ID for later lookup.
"""

import json
import os
from datetime import datetime


def generate_series_id(counter_file="output/id_counter.json"):
    """
    Generate a unique Series ID in format H-2025XXXX.
    Uses local JSON file to track counter.
    
    Args:
        counter_file: Path to counter file
    
    Returns:
        str: Series ID like "H-20250001"
    """
    current_year = datetime.now().year
    
    # Load or initialize counter
    if os.path.exists(counter_file):
        with open(counter_file) as f:
            data = json.load(f)
            count = data.get("counter", 0)
            saved_year = data.get("year", current_year)
            
            # Reset counter if year changed
            if saved_year != current_year:
                count = 0
    else:
        count = 0
        os.makedirs(os.path.dirname(counter_file) or ".", exist_ok=True)
    
    # Increment counter
    count += 1
    
    # Save updated counter
    with open(counter_file, "w") as f:
        json.dump({"counter": count, "year": current_year}, f)
    
    # Generate Series ID
    series_id = f"H-{current_year}{count:04d}"
    print(f"✅ Generated Series ID → {series_id}")
    return series_id


if __name__ == "__main__":
    # Test Series ID generation
    print("\n--- Testing Series ID Generation ---")
    for i in range(5):
        sid = generate_series_id()
        print(f"Test {i+1}: {sid}")