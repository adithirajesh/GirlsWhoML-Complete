from pydantic import BaseModel, HttpUrl, Field
from typing import Optional
from datetime import datetime

class ContributorCreate(BaseModel):
    name: str = Field(..., min_length=1)
    country: str = Field(..., min_length=1)
    series_id: Optional[str] = None

class ContributorOut(BaseModel):
    id: int
    name: str
    country: str
    series_id: Optional[str]
    mosaic_url: Optional[HttpUrl]
    screenshot_url: Optional[HttpUrl]
    created_at: datetime

    class Config:
        from_attributes = True
