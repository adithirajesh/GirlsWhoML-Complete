from flask_login import UserMixin
from sqlalchemy.sql import func
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
DB_NAME = 'database.db16'

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    # email = db.Column(db.String(150), unique=True, nullable=False)
    # first_name = db.Column(db.String(150), nullable=False)
   
