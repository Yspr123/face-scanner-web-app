from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from face_scanner.config import settings


engine = create_engine(settings.DATABASE_URL, echo=False, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)


class Base(DeclarativeBase):
pass


def init_db():
from face_scanner import models # noqa: F401 ensure models are imported
Base.metadata.create_all(bind=engine)