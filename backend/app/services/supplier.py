from app.db.models import User, Service, Client, Supplier, Contract
from app.db.session import SessionLocal
from app.core.auth import hash_password, verify_password


def create_supplier(name: str, email: str, phone: str, status: bool = True) -> Supplier:
    with SessionLocal() as db:
        supplier = Supplier(name=name, email=email, phone=phone, status=status)
        db.add(supplier)
        db.commit()
        db.refresh(supplier)
        return supplier


def get_supplier_by_id(supplier_id: int) -> Supplier | None:
    with SessionLocal() as db:
        return db.query(Supplier).filter(Supplier.id == supplier_id).first()


def get_supplier_by_name(name: str) -> list[Supplier] | None:
    with SessionLocal() as db:
        return db.query(Supplier).filter(Supplier.name == name).all()


def update_supplier(supplier_id: int, **kwargs) -> Supplier | None:
    with SessionLocal() as db:
        supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
        if not supplier:
            return None

        for key, value in kwargs.items():
            setattr(supplier, key, value)

        db.commit()
        db.refresh(supplier)
        return supplier


def delete_supplier(supplier_id: int) -> bool:
    with SessionLocal() as db:
        supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
        if not supplier:
            return False

        db.delete(supplier)
        db.commit()
        return True

def toggle_status(supplier_id: int) -> Supplier | None:
    with SessionLocal() as db:
        supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()
        if not supplier:
            return None

        supplier.status = not supplier.status
        db.commit()
        db.refresh(supplier)
        return supplier