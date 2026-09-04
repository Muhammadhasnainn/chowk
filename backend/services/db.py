import psycopg

from config import get_settings

SCHEMA = """
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGSERIAL PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS chat_messages_session_idx
    ON chat_messages (session_id, created_at);
"""


def connect():
    return psycopg.connect(get_settings().database_url)


def init_schema() -> None:
    try:
        with connect() as conn:
            conn.execute(SCHEMA)
    except Exception as exc:
        print(f"Schema setup skipped: {exc}")


def save_turn(session_id: str, role: str, content: str) -> None:
    try:
        with connect() as conn:
            conn.execute(
                "INSERT INTO chat_messages (session_id, role, content) VALUES (%s, %s, %s)",
                (session_id, role, content),
            )
    except Exception as exc:
        print(f"Could not save message: {exc}")


def history(session_id: str, limit: int = 20) -> list[dict]:
    with connect() as conn:
        rows = conn.execute(
            "SELECT role, content FROM chat_messages WHERE session_id = %s "
            "ORDER BY created_at DESC LIMIT %s",
            (session_id, limit),
        ).fetchall()

    return [{"role": r[0], "content": r[1]} for r in reversed(rows)]
