from functools import lru_cache

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, PointStruct, VectorParams

from config import get_settings

VECTOR_SIZE = 1536


@lru_cache
def client() -> QdrantClient:
    settings = get_settings()
    return QdrantClient(url=settings.qdrant_url, api_key=settings.qdrant_api_key)


def ensure_collection() -> None:
    settings = get_settings()
    name = settings.qdrant_collection
    if not client().collection_exists(name):
        client().create_collection(
            collection_name=name,
            vectors_config=VectorParams(size=VECTOR_SIZE, distance=Distance.COSINE),
        )


def upsert(points: list[PointStruct]) -> None:
    client().upsert(collection_name=get_settings().qdrant_collection, points=points)


def search(vector: list[float], limit: int = 4) -> list[dict]:
    hits = client().query_points(
        collection_name=get_settings().qdrant_collection,
        query=vector,
        limit=limit,
        with_payload=True,
    ).points

    return [
        {
            "title": hit.payload.get("title", ""),
            "text": hit.payload.get("text", ""),
            "score": hit.score,
        }
        for hit in hits
    ]
