from os import getenv
from requests import session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(
  getenv('DB_URL'), echo=True, pool_size=20, max_overflow=0
)
Session = sessionmaker(bind=engine)
Base = declarative_base()
