import pytest
from fastapi import status
from tests.conftest import get_auth_headers


def create_user(client, sample_user_data):
    """Create a user instance for tests"""

    headers = get_auth_headers(client)
    response = client.post("/users/", json=sample_user_data, headers=headers)
    data = response.json()
    return {"headers": headers, "user_id": data["data"]["id"], "data": data["data"]}


def delete_user(client, user_id):
    """Delete a user instance after tests."""

    headers = get_auth_headers(client)
    client.delete(f"/users/{user_id}", headers=headers)


class TestUserRoutes:
    """Test user routes - all require authentication"""

    def test_create_user_success(self, client):
        """Test creating a user (authenticated endpoint)"""

        headers = get_auth_headers(client)

        new_user_data = {
            "email": "newuser@example.com",
            "name": "New User",
            "password": "newpass123",
        }

        response = client.post("/users/", json=new_user_data, headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["message"] == "User created successfully"
        assert data["data"]["email"] == new_user_data["email"]
        assert data["data"]["name"] == new_user_data["name"]

        delete_user(client, user_id=data["data"]["id"])

    def test_create_user_unauthorized(self, client, sample_user_data):
        """Test creating user without authentication"""

        response = client.post("/users/", json=sample_user_data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_get_current_user_success(self, client, admin_user_data):
        """Test getting current user info"""

        headers = get_auth_headers(client)
        response = client.get("/users/me", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["data"]["email"] == admin_user_data["email"]
        assert data["data"]["name"] == admin_user_data["name"]
        assert "id" in data["data"]

    def test_delete_user_success(self, client, sample_user_data):
        """Test deleting a user"""

        # Create auth user and get ID
        headers = get_auth_headers(client)
        created_user = create_user(client, sample_user_data)
        created_user_id = created_user["user_id"]

        response = client.delete(f"/users/{created_user_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK

        data = response.json()
        assert data["success"] is True
        assert "deleted successfully" in data["message"]

    def test_delete_user_not_found(self, client):
        """Test deleting non-existent user"""

        headers = get_auth_headers(client)

        response = client.delete("/users/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_update_user_success(self, client, admin_user_data):
        """Test updating a user"""
        headers = get_auth_headers(client)
        user = client.get("/users/me", headers=headers).json()
        user_id = user["data"]["id"]

        update_data = {
            "name": "Updated Name",
            "email": "updated@example.com",
            "password": "newpassword123",
        }
        response = client.put(f"/users/{user_id}", json=update_data, headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["data"]["name"] == update_data["name"]
        assert data["data"]["email"] == update_data["email"]

        client.put(f"/users/{user_id}", json=admin_user_data, headers=headers)

    def test_update_different_user(self, client):
        """Test updating non-existent user"""
        headers = get_auth_headers(client)

        update_data = {
            "name": "Updated Name",
            "email": "updated@example.com",
            "password": "newpassword123",
        }
        response = client.put("/users/99999", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_403_FORBIDDEN
