import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture(scope="session")
def client():
    with TestClient(app) as c:
        yield c


def test_read_main(client):
    res = client.get("/")
    assert res.status_code == 200


def test_health(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


def test_communes(client):
    res = client.get("/communes")
    assert res.status_code == 200
    assert isinstance(res.json(), list)
