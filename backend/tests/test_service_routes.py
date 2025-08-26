import pytest
from fastapi import status
from tests.conftest import get_auth_headers, URL_PREFIX
from tests.test_supplier_routes import create_supplier, delete_supplier


def create_service(client, sample_service_data):
    """Create a service instance for tests"""

    headers = get_auth_headers(client)
    response = client.post(
        f"{URL_PREFIX}/services/", json=sample_service_data, headers=headers
    )
    data = response.json()
    return {"headers": headers, "service_id": data["data"]["id"], "data": data["data"]}


def delete_service(client, service_id):
    """Delete a service instance after tests."""

    headers = get_auth_headers(client)
    client.delete(f"{URL_PREFIX}/services/{service_id}", headers=headers)


class TestServiceRoutes:
    """Test service routes - all require authentication"""

    def test_create_service_success(
        self, client, sample_service_data, sample_supplier_data
    ):
        """Test creating a service"""

        headers = get_auth_headers(client)
        supplier_id = create_supplier(client, sample_supplier_data)["supplier_id"]
        service_data = {**sample_service_data, "supplier_id": supplier_id}
        response = client.post(
            f"{URL_PREFIX}/services/", json=service_data, headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["message"] == "Service created successfully"
        assert data["data"]["name"] == sample_service_data["name"]
        assert data["data"]["description"] == sample_service_data["description"]
        assert data["data"]["price"] == sample_service_data["price"]
        assert data["data"]["cost"] == sample_service_data["cost"]
        assert data["data"]["periodicity"] == sample_service_data["periodicity"]
        assert data["data"]["supplier_id"] == supplier_id
        assert "id" in data["data"]

        delete_service(client=client, service_id=data["data"]["id"])
        delete_supplier(client=client, supplier_id=supplier_id)

    def test_create_service_without_supplier(self, client, sample_service_data):
        """Test creating a service"""

        headers = get_auth_headers(client)
        response = client.post(
            f"{URL_PREFIX}/services/", json=sample_service_data, headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["message"] == "Service created successfully"
        assert data["data"]["name"] == sample_service_data["name"]
        assert data["data"]["description"] == sample_service_data["description"]
        assert data["data"]["price"] == sample_service_data["price"]
        assert data["data"]["cost"] == sample_service_data["cost"]
        assert data["data"]["periodicity"] == sample_service_data["periodicity"]
        assert data["data"]["supplier_id"] == None
        assert "id" in data["data"]

        delete_service(client, data["data"]["id"])

    def test_create_service_unauthorized(self, client, sample_service_data):
        """Test creating service without authentication"""

        response = client.post(f"{URL_PREFIX}/services/", json=sample_service_data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_get_all_services_success(
        self, client, sample_user_data, sample_service_data
    ):
        """Test getting all services"""

        headers = get_auth_headers(client)
        full_data = create_service(client, sample_service_data)
        service_id = full_data["service_id"]
        response = client.get(f"{URL_PREFIX}/services/", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert isinstance(data["data"], list)
        assert len(data["data"]) >= 1

        delete_service(client=client, service_id=service_id)

    def test_get_service_by_id_success(
        self, client, sample_user_data, sample_service_data
    ):
        """Test getting service by ID"""

        headers = get_auth_headers(client)
        full_data = create_service(client, sample_service_data)
        service_id = full_data["service_id"]
        response = client.get(f"{URL_PREFIX}/services/{service_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["id"] == service_id
        assert data["data"]["name"] == sample_service_data["name"]
        assert data["data"]["description"] == sample_service_data["description"]
        assert data["data"]["price"] == sample_service_data["price"]
        assert data["data"]["cost"] == sample_service_data["cost"]
        assert data["data"]["periodicity"] == sample_service_data["periodicity"]
        assert data["data"]["supplier_id"] == None

        delete_service(client=client, service_id=service_id)

    def test_get_service_by_id_not_found(self, client, sample_user_data):
        """Test getting non-existent service"""

        headers = get_auth_headers(client)
        response = client.get(f"{URL_PREFIX}/services/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_update_service_success(self, client, sample_service_data):
        """Test updating a service"""

        headers = get_auth_headers(client)
        full_data = create_service(client, sample_service_data)
        service_id = full_data["service_id"]
        update_data = {
            "name": "Updated Service Name",
            "description": "Updated description",
            "price": 200.0,
            "cost": 100.0,
            "periodicity": "annual",
        }
        response = client.put(
            f"{URL_PREFIX}/services/{service_id}", json=update_data, headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["name"] == update_data["name"]
        assert data["data"]["description"] == update_data["description"]
        assert data["data"]["price"] == update_data["price"]
        assert data["data"]["cost"] == update_data["cost"]
        assert data["data"]["periodicity"] == update_data["periodicity"]

        delete_service(client=client, service_id=service_id)

    def test_update_service_not_found(self, client):
        """Test updating non-existent service"""

        headers = get_auth_headers(client)
        update_data = {
            "name": "Updated Service Name",
            "description": "Updated description",
            "price": 200.0,
            "cost": 100.0,
            "periodicity": "annual",
        }
        response = client.put(
            f"{URL_PREFIX}/services/99999", json=update_data, headers=headers
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_toggle_service_status_success(
        self, client, sample_user_data, sample_service_data
    ):
        """Test toggling service status"""

        headers = get_auth_headers(client)
        full_data = create_service(client, sample_service_data)
        service_id = full_data["service_id"]
        original_status = full_data["data"]["status"]
        response = client.patch(
            f"{URL_PREFIX}/services/{service_id}/toggle-status", headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["status"] != original_status

        delete_service(client=client, service_id=service_id)

    def test_toggle_service_status_not_found(self, client, sample_user_data):
        """Test toggling status of non-existent service"""

        headers = get_auth_headers(client)
        response = client.patch(
            f"{URL_PREFIX}/services/99999/toggle-status", headers=headers
        )
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete_service_success(
        self, client, sample_user_data, sample_service_data
    ):
        """Test deleting a service"""

        headers = get_auth_headers(client)
        full_data = create_service(client, sample_service_data)
        service_id = full_data["service_id"]
        response = client.delete(f"{URL_PREFIX}/services/{service_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert "deleted successfully" in data["message"]

    def test_delete_service_not_found(self, client, sample_user_data):
        """Test deleting non-existent service"""

        headers = get_auth_headers(client)
        response = client.delete(f"{URL_PREFIX}/services/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND
