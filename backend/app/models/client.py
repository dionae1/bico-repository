from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Client(Base):
    __tablename__ = "clients"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), index=True, server_default="0", nullable=False
    )
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(50), unique=True)
    phone: Mapped[str] = mapped_column(String(11), unique=True)
    address: Mapped[str] = mapped_column(String(200))
    status: Mapped[bool] = mapped_column(default=True)

    # Relationships
    contracts: Mapped[list["Contract"]] = relationship(
        "Contract", back_populates="client"
    )