from functools import lru_cache

from openai import OpenAI

from config import get_settings

SYSTEM_PROMPT = """You are the kitchen assistant for Chowk, a restaurant on \
Khayaban-e-Bukhari in Phase VI, DHA Karachi.

Answer only from the context below. If the context does not cover the question, say so \
and point the guest to the phone number +92 21 3584 9002. Never invent dishes, prices, \
or opening hours.

Keep answers under sixty words. Speak plainly, the way a floor manager would. Prices are \
in Pakistani rupees."""


@lru_cache
def client() -> OpenAI:
    return OpenAI(api_key=get_settings().openai_api_key)


def embed(text: str) -> list[float]:
    response = client().embeddings.create(
        model=get_settings().openai_embed_model,
        input=text,
    )
    return response.data[0].embedding


def answer(query: str, context: list[dict], history: list[dict]) -> str:
    joined = "\n\n".join(f"[{c['title']}]\n{c['text']}" for c in context)

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += history[-6:]
    messages.append(
        {"role": "user", "content": f"Context:\n{joined}\n\nQuestion: {query}"}
    )

    completion = client().chat.completions.create(
        model=get_settings().openai_chat_model,
        messages=messages,
        temperature=0.3,
        max_tokens=250,
    )
    return completion.choices[0].message.content.strip()
