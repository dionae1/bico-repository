from datetime import datetime
from app.db.models import User, Service, Client, Supplier, Contract
from app.db.session import SessionLocal
from app.core.auth import hash_password, verify_password


def create_contract(
    user_id: int,
    service_id: int,
    client_id: int,
    created_at: datetime,
    end_at: datetime,
    value: float,
) -> Contract:
    with SessionLocal() as db:
        contract = Contract(
            user_id=user_id,
            service_id=service_id,
            client_id=client_id,
            created_at=created_at,
            end_at=end_at,
            value=value,
        )
        db.add(contract)
        db.commit()
        db.refresh(contract)
        return contract


def get_contract_by_id(contract_id: int) -> Contract | None:
    with SessionLocal() as db:
        return db.query(Contract).filter(Contract.id == contract_id).first()


def get_contracts_by_client(client_id: int) -> list[Contract]:
    with SessionLocal() as db:
        return db.query(Contract).filter(Contract.client_id == client_id).all()


def get_contracts_by_service(service_id: int) -> list[Contract]:
    with SessionLocal() as db:
        return db.query(Contract).filter(Contract.service_id == service_id).all()


def get_contracts_by_user(user_id: int) -> list[Contract]:
    with SessionLocal() as db:
        return db.query(Contract).filter(Contract.user_id == user_id).all()


def update_contract(contract_id: int, **kwargs) -> Contract | None:
    with SessionLocal() as db:
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if contract:
            for key, value in kwargs.items():
                setattr(contract, key, value)

            db.commit()
            db.refresh(contract)
            return contract
        return None


def delete_contract(contract_id: int) -> bool:
    with SessionLocal() as db:
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if contract:
            db.delete(contract)
            db.commit()
            return True
        return False


def toggle_contract_status(contract_id: int) -> Contract | None:
    with SessionLocal() as db:
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if contract:
            contract.status = not contract.status
            db.commit()
            db.refresh(contract)
            return contract
        return None
