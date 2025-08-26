import pytest
from fastapi import status
from tests.conftest import get_auth_headers


def create_client(client, sample_client_data):
    """Create the client instance for tests"""

    headers = get_auth_headers(client)
    response = client.post("/clients/", json=sample_client_data, headers=headers)
    data = response.json()

    return {
        "headers": headers,
        "client_id": data["data"]["id"],
        "client_data": data["data"],
    }


def delete_client(client, client_id):
    """Delete the client instance after tests."""

    headers = get_auth_headers(client)
    client.delete(
        f"/clients/{client_id}",
        headers=headers,
    )


class TestClientRoutes:
    """Test client routes - all require authentication"""

    def test_create_client_success(self, client, sample_user_data, sample_client_data):
        """Test creating a client"""

        headers = get_auth_headers(client)

        response = client.post("/clients/", json=sample_client_data, headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["message"] == "Client created successfully"
        assert "id" in data["data"]
        assert data["data"]["name"] == sample_client_data["name"]
        assert data["data"]["email"] == sample_client_data["email"]
        assert data["data"]["address"] == sample_client_data["address"]

        delete_client(client, data["data"]["id"])

    def test_unauthorized_access(self, client, sample_client_data):
        """Test creating client without authentication"""

        response = client.post("/clients/", json=sample_client_data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_client_duplicate_email(
        self, client, sample_user_data, sample_client_data
    ):
        """Test creating client with duplicate email"""
        client_id = create_client(
            client=client,
            sample_client_data=sample_client_data,
        )["client_id"]

        headers = get_auth_headers(client)
        response = client.post("/clients/", json=sample_client_data, headers=headers)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

        delete_client(client, client_id=client_id)

    def test_get_all_clients_success(
        self, client, sample_user_data, sample_client_data
    ):
        """Test getting all clients"""

        client_id = create_client(
            client=client,
            sample_client_data=sample_client_data,
        )["client_id"]

        headers = get_auth_headers(client)
        response = client.get("/clients/", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert isinstance(data["data"], list)
        assert len(data["data"]) >= 1

        delete_client(client, client_id)

    def test_get_client_by_id_success(
        self, client, sample_user_data, sample_client_data
    ):
        """Test getting client by ID"""

        client_id = create_client(
            client=client,
            sample_client_data=sample_client_data,
        )["client_id"]

        headers = get_auth_headers(client)
        response = client.get(f"/clients/{client_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["id"] == client_id
        assert data["data"]["name"] == sample_client_data["name"]

        delete_client(client, client_id)

    def test_get_client_by_id_not_found(self, client, sample_user_data):
        """Test getting non-existent client"""

        headers = get_auth_headers(client)

        response = client.get("/clients/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_update_client_success(self, client, sample_user_data, sample_client_data):
        """Test updating a client"""

        headers = get_auth_headers(client)
        client_id = create_client(
            client=client,
            sample_client_data=sample_client_data,
        )["client_id"]

        update_data = {
            "email": "updated@example.com",
            "name": "Updated Client Name",
            "address": "456 Updated Street",
            "phone": "09876543210",
        }
        response = client.put(
            f"/clients/{client_id}", json=update_data, headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["name"] == update_data["name"]
        assert data["data"]["address"] == update_data["address"]
        assert data["data"]["phone"] == update_data["phone"]

        delete_client(client, client_id)

    def test_update_client_not_found(self, client):
        """Test updating non-existent client"""
        headers = get_auth_headers(client)

        update_data = {
            "email": "updated@example.com",
            "name": "Updated Client Name",
            "address": "456 Updated Street",
            "phone": "09876543210",
        }

        response = client.put("/clients/99999", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_toggle_client_status_success(
        self, client, sample_user_data, sample_client_data
    ):
        """Test toggling client status"""

        headers = get_auth_headers(client)
        full_data = create_client(
            client=client,
            sample_client_data=sample_client_data,
        )
        client_id = full_data["client_id"]
        original_status = full_data["client_data"]["status"]

        response = client.patch(f"/clients/{client_id}/toggle-status", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["data"]["status"] != original_status

        delete_client(client, client_id)

    def test_toggle_client_status_not_found(self, client, sample_user_data):
        """Test toggling status of non-existent client"""

        headers = get_auth_headers(client)

        response = client.patch("/clients/99999/toggle-status", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete_client_success(self, client, sample_user_data, sample_client_data):
        """Test deleting a client"""

        headers = get_auth_headers(client)
        full_data = create_client(
            client=client,
            sample_client_data=sample_client_data,
        )
        client_id = full_data["client_id"]

        response = client.delete(f"/clients/{client_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert "deleted successfully" in data["message"]

    def test_delete_client_not_found(self, client, sample_user_data):
        """Test deleting non-existent client"""

        headers = get_auth_headers(client)

        response = client.delete("/clients/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND
