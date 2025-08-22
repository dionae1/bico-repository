# This module imports all models so Alembic can discover them
# Import this module in alembic/env.py instead of importing base.py

from app.db.base import Base
from app.models.user import User
from app.models.client import Client
from app.models.supplier import Supplier
from app.models.service import Service
from app.models.contract import Contract

# Export the metadata for Alembic
metadata = Base.metadata

# Export all models for easy importing
__all__ = ['Base', 'User', 'Client', 'Supplier', 'Service', 'Contract', 'metadata']
