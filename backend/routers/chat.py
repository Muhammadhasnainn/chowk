from fastapi import APIRouter, HTTPException

from models import ChatRequest, ChatResponse
from services import db, llm, vectorstore

router = APIRouter(tags=["chat"])

FALLBACK = (
    "I could not find that in our notes. Call the restaurant on +92 21 3584 9002 "
    "and someone on the floor will answer."
)


@router.post("/chat", response_model=ChatResponse)
def chat(payload: ChatRequest) -> ChatResponse:
    query = payload.query.strip()

    try:
        vector = llm.embed(query)
        context = vectorstore.search(vector, limit=4)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Retrieval failed: {exc}") from exc

    if not context:
        db.save_turn(payload.session_id, "user", query)
        db.save_turn(payload.session_id, "assistant", FALLBACK)
        return ChatResponse(answer=FALLBACK)

    history = [turn.model_dump() for turn in payload.history]

    try:
        reply = llm.answer(query, context, history)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Generation failed: {exc}") from exc

    db.save_turn(payload.session_id, "user", query)
    db.save_turn(payload.session_id, "assistant", reply)

    return ChatResponse(answer=reply, sources=[c["title"] for c in context])


@router.get("/chat/{session_id}")
def transcript(session_id: str):
    return {"session_id": session_id, "messages": db.history(session_id)}
