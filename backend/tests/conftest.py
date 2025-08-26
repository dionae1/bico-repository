import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture(scope="function")
def client():
    return TestClient(app)


@pytest.fixture
def sample_user_data():
    return {
        "email": "test@example.com",
        "name": "Test User",
        "password": "testpassword123",
    }


@pytest.fixture
def sample_supplier_data():
    return {
        "name": "Test Supplier",
        "email": "supplier@example.com",
        "phone": "1234567890",
    }


@pytest.fixture
def sample_service_data(client, admin_user_data):
    headers = get_auth_headers(client)
    user = client.get(f"/users/me", headers=headers)
    return {
        "user_id": user.json()["data"]["id"],
        "name": "Test Service",
        "description": "A test service for testing purposes",
        "price": 100.00,
        "cost": 80.00,
        "periodicity": "monthly",
    }


@pytest.fixture
def sample_client_data():
    return {
        "name": "Test Client",
        "email": "client@example.com",
        "phone": "1234567890",
        "address": "123 Client Street",
    }


@pytest.fixture
def sample_contract_data():
    return {
        "created_at": "2025-08-19T01:18:20.910Z",
        "end_at": "2025-10-19T01:18:20.910Z",
        "value": 99.90,
    }


@pytest.fixture
def admin_user_data():
    return {
        "email": "root@mail.com",
        "name": "root",
        "password": "1234",
    }


def get_auth_headers(client):

    admin_user_data = {
        "email": "root@mail.com",
        "password": "1234",
    }

    login_data = {
        "email": admin_user_data["email"],
        "password": admin_user_data["password"],
    }
    response = client.post("/auth/login", json=login_data)
    token = response.json()["access_token"]

    return {"Authorization": f"Bearer {token}"}
