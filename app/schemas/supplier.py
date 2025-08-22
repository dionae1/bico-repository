from pydantic import BaseModel

from app.models.supplier import Supplier


class ResponseSupplier(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    status: bool

    @classmethod
    def from_model(cls, supplier: Supplier) -> "ResponseSupplier":
        return cls(
            id=supplier.id,
            name=supplier.name,
            email=supplier.email,
            phone=supplier.phone,
            status=supplier.status,
        )

class CreateSupplierRequest(BaseModel):
    name: str
    email: str
    phone: str