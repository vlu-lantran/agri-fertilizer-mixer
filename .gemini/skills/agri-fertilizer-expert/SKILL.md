---
name: agri-fertilizer-expert
description: Expert system architect and domain knowledge base for building Agricultural Fertilizer Blending Calculators. Use when designing N-P-K calculation logic, price locking ledgers, or creating mobile-first UI for farmers.
---

# Agricultural Fertilizer Blending Calculator Expert

This skill provides domain expertise and architectural patterns for building localized, mobile-first agricultural fertilizer calculators (specifically tailored to the Vietnamese market).

## Architecture Stack
When asked to scaffold or maintain this application, utilize the following production-ready stack:

*   **Backend:** Python 3.11+, FastAPI, SQLAlchemy (Async), Alembic, Pydantic v2.
*   **Database:** PostgreSQL 15+ (Relational is required for append-only financial ledgers).
*   **Frontend:** React 19 (Vite), TypeScript, TailwindCSS v4, Zustand (with persist middleware), React Query, Lucide React.
*   **Infrastructure:** Docker, Docker Compose, Nginx.

## Core Domain Logic

### 1. The N-P-K Mixing Formula
Never use simple addition for mixing fertilizers. The calculation must always use a **Weighted Average** to find the true percentage of Nitrogen (N), Phosphorus (P), and Potassium (K) in a mix.

`Total Mass = Sum(Weight_i)`
`Final Nutrient % = Sum(Weight_i * Nutrient_i_Percent) / Total Mass`

*Always use exact `Decimal` types in the backend to prevent floating point inaccuracies.*

### 2. Append-Only Price Ledger
Fertilizer prices change constantly. When a farmer saves a formula, the price of the ingredients at that exact moment must be locked in.
1.  Store prices in an append-only `price_history` table (`id`, `fertilizer_id`, `price_vnd`, `effective_date`).
2.  When a formula is saved, query the *most recent* row in `price_history` for each ingredient.
3.  Store that specific price permanently in the `formula_ingredients` join table (`locked_price_vnd`).

### 3. Mobile-First UI/UX Guidelines
Farmers use these apps in the field on mobile devices. Design choices must reflect this:
*   **No Text Inputs for Numbers:** Use large `+` and `-` stepper buttons combined with HTML5 `<input type="range">` sliders.
*   **Visual Selectors:** Use large tap targets (pill buttons) instead of `<select>` dropdowns or text inputs for choices like Crop Type or Soil Type.
*   **Color Feedback:** Hardcode visual associations: Nitrogen = Green, Phosphorus = Yellow/Orange, Potassium = Red.
*   **Bilingual Support & Currency:** Default to Vietnamese. Format currency strictly using `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.
*   **Offline Persistence:** Wrap the Zustand store in `persist` middleware so local changes aren't lost if the browser is refreshed in the field.

## Deployment & CI/CD
The project should be fully containerized. Include a multi-stage Dockerfile for the frontend (Node build -> Nginx Alpine) and a slim Python image for the backend. Standard deployments should utilize Google Cloud Run or a similar serverless container platform, authenticating via Workload Identity Federation.
