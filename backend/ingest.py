"""Embed the knowledge base and load it into Qdrant. Run once, then after edits."""

import json
import uuid
from pathlib import Path

from qdrant_client.models import PointStruct

from services import llm, vectorstore

DATA = Path(__file__).parent / "data" / "knowledge.json"
NAMESPACE = uuid.UUID("5f2b0f8e-9c1a-4a1d-b7c2-3f5f2a9d1c40")


def main() -> None:
    documents = json.loads(DATA.read_text(encoding="utf-8"))
    vectorstore.ensure_collection()

    points = []
    for doc in documents:
        text = f"{doc['title']}. {doc['text']}"
        points.append(
            PointStruct(
                id=str(uuid.uuid5(NAMESPACE, doc["title"])),
                vector=llm.embed(text),
                payload={"title": doc["title"], "text": doc["text"]},
            )
        )
        print(f"embedded: {doc['title']}")

    vectorstore.upsert(points)
    print(f"\nLoaded {len(points)} documents into Qdrant.")


if __name__ == "__main__":
    main()
