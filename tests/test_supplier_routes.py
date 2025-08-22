import pytest
from fastapi import status
from tests.conftest import get_auth_headers


def create_supplier(client, sample_supplier_data):
    """Create a supplier instance for tests"""

    headers = get_auth_headers(client)
    response = client.post("/suppliers/", json=sample_supplier_data, headers=headers)
    data = response.json()
    return {"headers": headers, "supplier_id": data["data"]["id"], "data": data["data"]}


def delete_supplier(client, supplier_id):
    """Delete a supplier instance after tests."""

    headers = get_auth_headers(client)
    client.delete(f"/suppliers/{supplier_id}", headers=headers)


class TestSupplierRoutes:
    """Test supplier routes - all require authentication"""

    def test_create_supplier_success(
        self, client, sample_user_data, sample_supplier_data
    ):
        """Test creating a supplier"""

        headers = get_auth_headers(client)
        response = client.post(
            "/suppliers/", json=sample_supplier_data, headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["message"] == "Supplier created successfully"
        assert "id" in data["data"]
        assert data["data"]["name"] == sample_supplier_data["name"]
        assert data["data"]["email"] == sample_supplier_data["email"]

        delete_supplier(client, data["data"]["id"])

    def test_create_supplier_unauthorized(self, client, sample_supplier_data):
        """Test creating supplier without authentication"""

        response = client.post("/suppliers/", json=sample_supplier_data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_supplier_duplicate_email(self, client, sample_supplier_data):
        """Test creating supplier with duplicate email"""

        headers = get_auth_headers(client)
        successful = client.post(
            "/suppliers/", json=sample_supplier_data, headers=headers
        )
        response = client.post(
            "/suppliers/", json=sample_supplier_data, headers=headers
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        delete_supplier(client, successful.json()["data"]["id"])

    def test_get_supplier_success(self, client, sample_supplier_data):
        """Test getting supplier by ID"""

        headers = get_auth_headers(client)
        create_response = create_supplier(client, sample_supplier_data)
        supplier_id = create_response["supplier_id"]

        response = client.get(f"/suppliers/{supplier_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["id"] == supplier_id
        assert data["data"]["name"] == sample_supplier_data["name"]

        delete_supplier(client, supplier_id)

    def test_get_supplier_not_found(self, client, sample_user_data):
        """Test getting non-existent supplier"""

        headers = get_auth_headers(client)
        response = client.get("/suppliers/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_update_supplier_success(
        self, client, sample_user_data, sample_supplier_data
    ):
        """Test updating a supplier"""

        headers = get_auth_headers(client)
        create_response = create_supplier(client, sample_supplier_data)
        supplier_id = create_response["supplier_id"]

        update_data = {
            "name": "Updated Supplier Name",
            "phone": "09876543210",
            "email": "updated@example.com",
        }
        response = client.put(
            f"/suppliers/{supplier_id}", json=update_data, headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["name"] == update_data["name"]
        assert data["data"]["phone"] == update_data["phone"]
        assert data["data"]["email"] == update_data["email"]

        delete_supplier(client, supplier_id)

    def test_update_supplier_not_found(self, client, sample_user_data):
        """Test updating non-existent supplier"""

        headers = get_auth_headers(client)

        update_data = {
            "name": "Updated Supplier Name",
            "phone": "09876543210",
            "email": "updated@example.com",
        }
        response = client.put("/suppliers/99999", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_toggle_supplier_status_success(
        self, client, sample_user_data, sample_supplier_data
    ):
        """Test toggling supplier status"""

        headers = get_auth_headers(client)
        full_data = create_supplier(client, sample_supplier_data)
        supplier_id = full_data["supplier_id"]
        original_status = full_data["data"]["status"]

        response = client.patch(
            f"/suppliers/{supplier_id}/toggle-status", headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["data"]["status"] != original_status
        
        delete_supplier(client, supplier_id)

    def test_toggle_supplier_status_not_found(self, client, sample_user_data):
        """Test toggling status of non-existent supplier"""

        headers = get_auth_headers(client)

        response = client.patch("/suppliers/99999/toggle-status", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete_supplier_success(
        self, client, sample_user_data, sample_supplier_data
    ):
        """Test deleting a supplier"""

        headers = get_auth_headers(client)

        full_data = create_supplier(client, sample_supplier_data)
        supplier_id = full_data["supplier_id"]

        response = client.delete(f"/suppliers/{supplier_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert "deleted successfully" in data["message"]

    def test_delete_supplier_not_found(self, client, sample_user_data):
        """Test deleting non-existent supplier"""

        headers = get_auth_headers(client)

        response = client.delete("/suppliers/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND
