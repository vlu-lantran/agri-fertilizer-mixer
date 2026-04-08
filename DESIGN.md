# Agricultural Fertilizer Mixing Calculator - Implementation Plan

## Background & Motivation
The goal is to build a localized MVP (Vietnam - VND, kg/liters) for an Agricultural Fertilizer Mixing Calculator. The platform will serve farmers directly, requiring a highly visual, touch-friendly interface for mobile usage. The system must reliably calculate the true N-P-K (Nitrogen, Phosphorus, Potassium) ratio using weighted averages, project total costs, and persist custom fertilizer formulas.

## Scope & Impact
- **Backend:** FastAPI (Python), PostgreSQL, SQLAlchemy ORM, Alembic for migrations.
- **Frontend:** React (Vite), Tailwind CSS, Zustand (state management), React Query (data fetching).
- **Infrastructure:** Docker and Docker Compose orchestrating Postgres, FastAPI, and Nginx (serving React).
- **Users:** Farmers needing real-time fertilizer mix calculations with accurate cost estimates (VND).
- **Impact:** Delivers a reliable, containerized MVP ready for production deployment.

## Proposed Solution

### 1. Tech Stack & Infrastructure
- **Monorepo Structure:** Separate `backend` and `frontend` directories within the project root.
- **Dockerization:**
  - `docker-compose.yml` for local dev and MVP deployment.
  - Multi-stage Dockerfile for the frontend (Node build -> Nginx alpine).
  - Dockerfile for the backend (Python 3.11+, Uvicorn, FastAPI).

### 2. Database Schema (PostgreSQL via SQLAlchemy)
- `users`: `id` (UUID), `email`, `password_hash`, `created_at`.
- `fertilizers`: `id` (UUID), `name`, `type`, `n_percent` (Decimal), `p_percent` (Decimal), `k_percent` (Decimal), `micronutrients` (JSONB), `unit` (Enum: 'kg', 'liter').
- `price_history`: `id` (UUID), `fertilizer_id` (FK), `price_vnd` (Integer), `effective_date` (Timestamp) (Append-only ledger).
- `formulas`: `id` (UUID), `user_id` (FK), `name`, `target_crop`, `growth_stage`, `soil_type`, `created_at`.
- `formula_ingredients`: `id` (UUID), `formula_id` (FK), `fertilizer_id` (FK), `quantity` (Decimal), `locked_price_vnd` (Integer).

### 3. Core Business Logic
- **Calculator Engine:**
  - Calculates final mass: `Total Mass = Sum(Weight_i)`.
  - Calculates Final Nutrient %: `Sum(Weight_i * Nutrient_i%) / Total Mass`.
  - Calculates Total Cost: `Sum(Weight_i * Current_Price_i)`.

### 4. API Endpoints
- **Auth:** `POST /api/v1/auth/register`, `POST /api/v1/auth/login`, `GET /api/v1/users/me`
- **Calculator:** `POST /api/v1/calculate`
- **Inventory:** `GET /api/v1/fertilizers`, `POST /api/v1/fertilizers`
- **Pricing:** `POST /api/v1/fertilizers/{id}/prices`, `GET /api/v1/fertilizers/{id}/prices/current`
- **Formulas:** `POST /api/v1/formulas`, `GET /api/v1/formulas`, `GET /api/v1/formulas/{id}`

### 5. Frontend UI/UX
- **Design Philosophy:** Mobile-first, touch-friendly, no typing inputs where possible.
- **Key Components:**
  - `CalculatorView`: Main view containing visual inventory selection.
  - `FertilizerCard`: Large, tappable cards for inventory.
  - `SliderInput`: Draggable sliders and (+ / -) stepper buttons for quantities.
  - `StickyFooter`: Fixed at the bottom, dynamically updating "Total Cost (VND)" and visual N-P-K output.
  - `SaveFormulaModal`: Uses tappable visual tags for crop and soil type instead of text inputs.
- **Visual Feedback:** Hardcoded colors (Nitrogen = Green, Phosphorus = Yellow/Orange, Potassium = Red/Purple).

## Alternatives Considered
- **React Context + Fetch vs Zustand + React Query:** We opted for Zustand and React Query to efficiently manage the highly interactive and complex calculator state (real-time recalculations on slider drags) and to provide optimal caching for inventory and prices, reducing boilerplate compared to Context API.

## Phased Implementation Plan

### Phase 1: Project Setup & Infrastructure
1. Export this design document into a `DESIGN.md` file in the project root directory.
2. Initialize Git repository and directory structure (`frontend/`, `backend/`).
3. Write `docker-compose.yml`, `backend/Dockerfile`, and `frontend/Dockerfile`.
4. Set up Vite + React + Tailwind boilerplate.
5. Set up FastAPI + SQLAlchemy + Alembic boilerplate.

### Phase 2: Database & Backend Core
1. Define SQLAlchemy models matching the schema requirements.
2. Generate initial Alembic migrations.
3. Implement core mathematical logic for the mixing calculator.
4. Implement REST API endpoints (Auth, Inventory, Pricing, Calculator, Formulas).
5. Add JWT authentication middleware.

### Phase 3: Frontend Integration
1. Configure React Query, Zustand, and Axios for API communication.
2. Build UI Components: `FertilizerCard`, `SliderInput`, N-P-K progress bars.
3. Implement `CalculatorView` integrating the stateless calculate endpoint or client-side approximation for real-time sliding, syncing with the backend `POST /calculate` for precise validation.
4. Implement `StickyFooter` and `SaveFormulaModal`.

### Phase 4: Polish & Testing
1. Refine touch-friendly styling (Tailwind).
2. Write Pytest tests for the backend mathematical engine.
3. End-to-end local Docker testing to verify full stack communication.

## Verification
- Start the application using `docker-compose up --build`.
- Verify backend API at `http://localhost:8000/docs`.
- Verify frontend at `http://localhost:80`.
- Verify correct N-P-K output via the UI matching the mathematical weighted average formula.
- Create a test formula and verify the price locks in `formula_ingredients`.

## Migration & Rollback
- Database migrations are handled via Alembic. In case of schema rollback, standard `alembic downgrade` will be used. Append-only ledgers like `price_history` ensure historical data integrity is maintained without complex rollbacks.