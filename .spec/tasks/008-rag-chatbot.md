# Task 008: RAG Chatbot

## Status
Completed

## Priority
High

## Description
Build the FastAPI backend that retrieves from Qdrant, generates with OpenAI and stores
history in Neon Postgres, plus the chat widget and the Next.js proxy route.

## Acceptance Criteria
- [x] `POST /chat` embeds the query, retrieves four passages and returns a grounded answer
- [x] Answers outside the knowledge base return the phone-number fallback
- [x] Every user and assistant turn is written to `chat_messages` in Neon
- [x] `GET /chat/{session_id}` returns the transcript
- [x] CORS restricted to the configured origins
- [x] Widget shows a typing indicator, quick questions, reset and a readable error state
- [x] The OpenAI and Qdrant keys are never exposed to the browser

## Time Estimation
8 hours
