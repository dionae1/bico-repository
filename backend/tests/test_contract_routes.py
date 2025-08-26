import pytest
from fastapi import status
from tests.conftest import get_auth_headers
from tests.test_client_routes import create_client, delete_client
from tests.test_service_routes import create_service, delete_service


def create_contract(client, sample_contract_data):
    """Create a contract instance for tests"""

    headers = get_auth_headers(client)
    response = client.post("/contracts/", json=sample_contract_data, headers=headers)
    data = response.json()
    return {"headers": headers, "contract_id": data["data"]["id"], "data": data["data"]}


def delete_contract(client, contract_id):
    """Delete a contract instance after tests."""

    headers = get_auth_headers(client)
    client.delete(f"/contracts/{contract_id}", headers=headers)


class TestContractRoutes:
    """Test contract routes - all require authentication"""

    def test_create_contract_success(
        self, client, sample_client_data, sample_contract_data, sample_service_data
    ):
        """Test creating a contract with proper client and service relationships"""

        headers = get_auth_headers(client)
        client_data = create_client(client, sample_client_data=sample_client_data)
        client_id = client_data["client_id"]
        service_data = create_service(client, sample_service_data)
        service_id = service_data["service_id"]
        contract_data = {
            **sample_contract_data,
            "client_id": client_id,
            "service_id": service_id,
        }
        response = client.post("/contracts/", json=contract_data, headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["message"] == "Contract created successfully"
        assert data["data"]["client_id"] == client_id
        assert data["data"]["service_id"] == service_id
        assert data["data"]["value"] == contract_data["value"]
        assert "id" in data["data"]

        delete_contract(client=client, contract_id=data["data"]["id"])
        delete_client(client=client, client_id=client_id)
        delete_service(client=client, service_id=service_id)

    def test_create_contract_unauthorized(self, client, sample_contract_data):
        """Test creating contract without authentication"""

        response = client.post("/contracts/", json=sample_contract_data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_create_contract_invalid_client_and_service(
        self, client, sample_contract_data
    ):
        """Test creating contract with invalid client_id and service_id"""

        headers = get_auth_headers(client)
        contract_data = {
            **sample_contract_data,
            "client_id": 99999,
            "service_id": 99999,
        }
        response = client.post("/contracts/", json=contract_data, headers=headers)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    # def test_get_contracts_by_client(
    #     self, client, sample_contract_data, sample_client_data, sample_service_data
    # ):
    #     """Test getting all contracts"""

    #     headers = get_auth_headers(client)
    #     client_data = create_client(
    #         client=client, sample_client_data=sample_client_data
    #     )
    #     client_id = client_data["client_id"]
    #     service_data = create_service(
    #         client=client, sample_service_data=sample_service_data
    #     )
    #     service_id = service_data["service_id"]
    #     contract_data = create_contract(
    #         client=client,
    #         sample_contract_data={
    #             **sample_contract_data,
    #             "client_id": client_id,
    #             "service_id": service_id,
    #         },
    #     )

    #     response = client.get(f"/contracts/{client_id}", headers=headers)

    #     assert response.status_code == status.HTTP_200_OK
    #     data = response.json()

    #     assert data["success"] is True
    #     assert isinstance(data["data"], list)
    #     assert len(data["data"]) >= 1

    #     delete_contract(client=client, contract_id=contract_data["contract_id"])
    #     delete_client(client=client, client_id=client_id)
    #     delete_service(client=client, service_id=service_id)

    def test_get_contract_by_id_success(
        self, client, sample_contract_data, sample_client_data, sample_service_data
    ):
        """Test getting contract by ID"""

        headers = get_auth_headers(client)
        client_data = create_client(client, sample_client_data=sample_client_data)
        client_id = client_data["client_id"]
        service_data = create_service(client, sample_service_data=sample_service_data)
        service_id = service_data["service_id"]
        contract_data = create_contract(
            client,
            sample_contract_data={
                **sample_contract_data,
                "client_id": client_id,
                "service_id": service_id,
            },
        )
        contract_id = contract_data["contract_id"]
        response = client.get(f"/contracts/{contract_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["id"] == contract_id
        assert data["data"]["client_id"] == client_id
        assert data["data"]["service_id"] == service_id

        delete_contract(client=client, contract_id=contract_id)
        delete_client(client=client, client_id=client_id)
        delete_service(client=client, service_id=service_id)

    def test_get_contract_by_id_not_found(self, client, sample_user_data):
        """Test getting non-existent contract"""

        headers = get_auth_headers(client)
        response = client.get("/contracts/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_update_contract_success(
        self, client, sample_contract_data, sample_client_data, sample_service_data
    ):
        """Test updating a contract"""

        headers = get_auth_headers(client)
        client_data = create_client(client, sample_client_data=sample_client_data)
        client_id = client_data["client_id"]
        service_data = create_service(client, sample_service_data=sample_service_data)
        service_id = service_data["service_id"]
        contract_data = create_contract(
            client,
            sample_contract_data={
                **sample_contract_data,
                "client_id": client_id,
                "service_id": service_id,
            },
        )
        contract_id = contract_data["contract_id"]
        update_data = {
            "end_at": "2023-10-19T01:18:20.910Z",
            "value": 299.90,
        }
        response = client.put(
            f"/contracts/{contract_id}", json=update_data, headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["success"] is True
        assert data["data"]["value"] == update_data["value"]

        delete_contract(client=client, contract_id=contract_id)
        delete_client(client=client, client_id=client_id)
        delete_service(client=client, service_id=service_id)

    def test_update_contract_not_found(self, client, sample_user_data):
        """Test updating non-existent contract"""

        headers = get_auth_headers(client)
        update_data = {
            "end_at": "2023-10-19T01:18:20.910Z",
            "value": 299.90,
        }

        response = client.put("/contracts/99999", json=update_data, headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_toggle_contract_status_success(
        self,
        client,
        sample_contract_data,
        sample_client_data,
        sample_service_data,
    ):
        """Test toggling contract status"""

        headers = get_auth_headers(client)
        client_data = create_client(client, sample_client_data=sample_client_data)
        client_id = client_data["client_id"]
        service_data = create_service(client, sample_service_data=sample_service_data)
        service_id = service_data["service_id"]
        contract_data = create_contract(
            client,
            sample_contract_data={
                **sample_contract_data,
                "client_id": client_id,
                "service_id": service_id,
            },
        )
        contract_id = contract_data["contract_id"]
        original_status = contract_data["data"]["status"]
        response = client.patch(
            f"/contracts/{contract_id}/toggle-status", headers=headers
        )

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert data["data"]["status"] != original_status

        delete_contract(client, contract_id)
        delete_client(client, client_id)
        delete_service(client, service_id)

    def test_toggle_contract_status_not_found(self, client, sample_user_data):
        """Test toggling status of non-existent contract"""

        headers = get_auth_headers(client)
        response = client.patch("/contracts/99999/toggle-status", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND

    def test_delete_contract_success(
        self,
        client,
        sample_user_data,
        sample_contract_data,
        sample_client_data,
        sample_service_data,
    ):
        """Test deleting a contract"""

        headers = get_auth_headers(client)
        client_data = create_client(client, sample_client_data=sample_client_data)
        client_id = client_data["client_id"]
        service_data = create_service(client, sample_service_data=sample_service_data)
        service_id = service_data["service_id"]
        contract_data = create_contract(
            client,
            sample_contract_data={
                **sample_contract_data,
                "client_id": client_id,
                "service_id": service_id,
            },
        )
        contract_id = contract_data["contract_id"]
        response = client.delete(f"/contracts/{contract_id}", headers=headers)

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert data["success"] is True
        assert "deleted successfully" in data["message"]

        delete_client(client, client_id)
        delete_service(client, service_id)

    def test_delete_contract_not_found(self, client, sample_user_data):
        """Test deleting non-existent contract"""
        headers = get_auth_headers(client)

        response = client.delete("/contracts/99999", headers=headers)
        assert response.status_code == status.HTTP_404_NOT_FOUND
