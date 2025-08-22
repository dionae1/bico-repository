from app.db.base import Base
from app.models.user import User
from app.models.client import Client
from app.models.supplier import Supplier
from app.models.service import Service
from app.models.contract import Contract

metadata = Base.metadata
__all__ = ['Base', 'User', 'Client', 'Supplier', 'Service', 'Contract', 'metadata']
