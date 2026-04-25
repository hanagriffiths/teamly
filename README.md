# Teamly — AI Team Insights Assistant

Teamly is an AI-powered HR analytics assistant that helps teams understand productivity, wellbeing, and burnout risk using structured activity logs.

It combines **RAG (Retrieval-Augmented Generation)**, **vector embeddings**, and **LLM reasoning (Claude)** to turn raw employee data into clear, actionable insights.

---

## Overview

Teams generate large amounts of activity data — hours worked, tasks completed, meetings attended, and mood signals — but this data is rarely interpreted in a meaningful way.

Teamly solves this by allowing users to ask natural language questions such as:

- “Who is most at risk of burnout?”
- “What changed this week?”
- “Who is the most productive?”

…and receive structured, data-driven insights in real time.

---

## Features

### AI-Powered Insights
- Natural language querying over employee activity logs
- Structured AI responses:
  - Summary
  - Key insights
  - Risk level (low / medium / high)

### Retrieval-Augmented Generation (RAG)
- Employee logs are converted into embeddings using OpenAI
- Vector similarity search retrieves relevant context
- Claude generates grounded responses based on retrieved data

### Context-Aware Conversations
- Maintains conversational context within a session
- Supports follow-up queries (e.g. “What about this week?”)
- Backend memory enables continuity across interactions

### Data Visualisation
- Interactive charts built with Recharts:
  - Mood trends
  - Activity trends
- Filters dynamically update visual analytics

### Smart Filtering System
- Filter by:
  - Employee(s)
  - Time range (powered by DayJS)
- Filters are used to update the insights only

---

## Tech Stack

### Backend
- Node.js
- Express
- TypeScript
- LangChain
- Claude (LLM for reasoning & response generation)
- OpenAI (embedding model)
- Zod (schema validation)
- DayJS (date handling & filtering)
- In-memory vector store (custom implementation)

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- Recharts (data visualisation)

---

## AI Architecture

Teamly uses a lightweight RAG pipeline:
