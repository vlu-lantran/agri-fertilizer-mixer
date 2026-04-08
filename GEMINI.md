# Gemini Instructions for Agricultural Fertilizer Mixing Calculator

This file provides context and instructions for the Gemini CLI agent working on this project.

## Project Overview

This project is a localized MVP (Vietnam - VND, kg/liters) for an Agricultural Fertilizer Mixing Calculator. The platform is designed to serve farmers directly, requiring a highly visual, touch-friendly interface for mobile usage. The system calculates the true N-P-K (Nitrogen, Phosphorus, Potassium) ratio using weighted averages, projects total costs, and persists custom fertilizer formulas.

**Architecture:**
- **Backend:** Python with FastAPI, PostgreSQL, SQLAlchemy ORM, Alembic for migrations.
- **Frontend:** React (Vite) with Tailwind CSS, Zustand for state management, React Query for data fetching.
- **Infrastructure:** Fully Dockerized using Docker Compose orchestrating the database, backend, and frontend.

## Directory Structure & Key Files

- `DESIGN.md`: The comprehensive design document and implementation plan. It acts as the source of truth for the project's requirements, database schema, core logic, and UI/UX design.
- `venv/`: A Python virtual environment used for local backend development.
- The project is currently in Phase 1, with scaffolding for the `frontend` and `backend` directories remaining to be fully executed.

## Building and Running

Based on `DESIGN.md`, the primary method for running the application is via Docker Compose:

```bash
docker-compose up --build
```

- **Backend API Docs:** Expected at `http://localhost:8000/docs`
- **Frontend:** Expected at `http://localhost:80`

## Development Conventions

- **Code Style:** Strictly follow the plan outlined in `DESIGN.md`. Output clean, modular, and maintainable code with a strict focus on containerization and scalability.
- **UI/UX:** Design with a mobile-first, touch-friendly mindset. Use large stepper buttons and draggable sliders instead of text inputs. Implement specific visual feedback (e.g., Nitrogen = Green, Phosphorus = Yellow/Orange, Potassium = Red/Purple).
- **Backend Logic:** Calculate the true N-P-K ratio using a weighted average formula: `Final % = Sum(Weight_i * Nutrient_i%) / Sum(Weight_i)`. Cost is calculated as `Sum(Weight_i * Current_Price_i)`.
- **Infrastructure:** Rely on multi-stage Dockerfiles and `docker-compose.yml` for orchestration. Maintain a highly normalized PostgreSQL schema.
- **Database Schema:** Use the schema provided in `DESIGN.md` using SQLAlchemy models and Alembic migrations.

When making modifications, ensure alignment with the established tech stack and the phased implementation plan detailed in `DESIGN.md`.