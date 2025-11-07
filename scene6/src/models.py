from sqlalchemy import Column, Integer, String, DateTime, func
from .database import Base

class Contributor(Base):
    __tablename__ = "contributors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    series_id = Column(String, index=True)
    mosaic_url = Column(String)
    screenshot_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
