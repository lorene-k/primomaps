FRONTEND_DIR := frontend
BACKEND_DIR := backend

all:	dev

dev:	frontend backend

frontend:
		@cd $(FRONTEND_DIR) && npm run dev

backend:
		@cd $(BACKEND_DIR) && uv run fastapi dev app/main.py

install:
		@cd $(FRONTEND_DIR) && npm install
		@cd $(BACKEND_DIR) && uv sync --frozen

test:
		@$(MAKE) test-frontend
		@$(MAKE) test-backend

test-frontend:
		@cd $(FRONTEND_DIR) && npm run test

test-backend:
		@cd $(BACKEND_DIR) && uv run pytest

format:
		@cd $(FRONTEND_DIR) && npm run format
		@cd $(FRONTEND_DIR) && npm run lint:fix
		@cd $(BACKEND_DIR) && uv run ruff format .
		@cd $(BACKEND_DIR) && uv run ruff check --fix .

format-check:
		@cd $(FRONTEND_DIR) && npm run format:check
		@cd $(BACKEND_DIR) && uv run ruff format --check .

lint-check:
		@cd $(FRONTEND_DIR) && npm run lint
		@cd $(BACKEND_DIR) && uv run ruff check .

check:
		@$(MAKE) format-check
		@$(MAKE) lint-check
		@$(MAKE) test

.PHONY: all dev frontend backend install \
        test test-frontend test-backend \
        format format-check lint-check check