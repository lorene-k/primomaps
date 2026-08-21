from fastapi.testclient import TestClient
from app.main import app


def test_read_main():
    with TestClient(app) as client:
        res = client.get("/")
        assert res.status_code == 200


def test_health():
    with TestClient(app) as client:
        res = client.get("/health")
        assert res.status_code == 200
        assert res.json() == {"status": "ok"}


def test_communes():
    with TestClient(app) as client:
        res = client.get("/communes")
        assert res.status_code == 200
        assert isinstance(res.json(), list)
