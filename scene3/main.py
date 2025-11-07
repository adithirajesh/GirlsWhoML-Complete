#place in websitetrack/app/main.py

from fastapi import FastAPI 
from app.api.integration import router as integration_router

app = FastAPI()
app.include_router(integration_router)
