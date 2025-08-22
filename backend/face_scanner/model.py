from sqlalchemy import Integer, String, LargeBinary
from sqlalchemy.orm import Mapped, mapped_column
from face_scanner.db import Base

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    encoding: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
