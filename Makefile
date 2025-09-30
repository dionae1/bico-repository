.PHONY: start install-backend install-frontend install setup-backend setup-frontend dev-backend dev-frontend stop clean help

# Default target
help:
	@echo "Available targets:"
	@echo "  help             - Show this help message"
	@echo "  check            - Check if required dependencies are installed"
	@echo "  install-system   - Install system dependencies (Node.js, Python)"
	@echo "  install          - Install all dependencies (backend and frontend)"
	@echo "  install-backend  - Install backend dependencies"
	@echo "  install-frontend - Install frontend dependencies"
	@echo "  setup-backend    - Setup backend (install deps + run migrations)"
	@echo "  setup-frontend   - Setup frontend (install deps)"
	@echo "  dev-backend      - Start backend development server"
	@echo "  dev-frontend     - Start frontend development server"
	@echo "  start            - Start both backend and frontend in separate terminals"
	@echo "  stop             - Stop all running processes"
	@echo "  clean            - Clean up generated files"
	@echo "  fix-permissions  - Fix virtual environment permissions"

# Check dependencies
check:
	@echo "Checking system dependencies..."
	@command -v python3 >/dev/null 2>&1 || { echo "❌ Python3 is not installed. Please install it first."; exit 1; }
	@command -v node >/dev/null 2>&1 || { echo "❌ Node.js is not installed. Run 'make install-system' to install it."; exit 1; }
	@command -v npm >/dev/null 2>&1 || { echo "❌ npm is not installed. Run 'make install-system' to install it."; exit 1; }
	@echo "✅ All system dependencies are installed"

# Install system dependencies
install-system:
	@echo "Installing system dependencies..."
	@echo "Installing Node.js and npm via NodeSource repository..."
	curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
	sudo apt-get install -y nodejs
	@echo "✅ Node.js and npm installed successfully"
	@node --version
	@npm --version

# Fix permissions for virtual environment
fix-permissions:
	@echo "Fixing virtual environment permissions..."
	@if [ -d "backend/venv" ]; then \
		sudo chown -R $(USER):$(USER) backend/venv; \
		echo "✅ Virtual environment permissions fixed"; \
	else \
		echo "ℹ️  Virtual environment doesn't exist yet"; \
	fi

# Install dependencies
install: check install-backend install-frontend

install-backend:
	@echo "Installing backend dependencies..."
	@if [ -d "backend/venv" ] && [ "$$(stat -c %U backend/venv)" != "$(USER)" ]; then \
		echo "🔧 Fixing virtual environment permissions first..."; \
		make fix-permissions; \
	fi
	cd backend && \
	rm -rf venv && \
	python3 -m venv venv && \
	source venv/bin/activate && \
	pip install --upgrade pip && \
	pip install -r requirements.txt
	@echo "✅ Backend dependencies installed successfully"

install-frontend:
	@echo "Installing frontend dependencies..."
	@command -v npm >/dev/null 2>&1 || { echo "❌ npm not found. Run 'make install-system' first."; exit 1; }
	cd frontend && npm install
	@echo "✅ Frontend dependencies installed successfully"

# Setup targets
setup-backend: install-backend
	@echo "Setting up backend..."
	cd backend && \
	source venv/bin/activate && \
	alembic upgrade head

setup-frontend: install-frontend
	@echo "Frontend setup complete"

# Development servers
dev-backend:
	@echo "Starting backend development server..."
	cd backend && \
	source venv/bin/activate && \
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend:
	@echo "Starting frontend development server..."
	cd frontend && npm run dev

# Start both services in separate terminals
start: check
	@echo "Starting backend and frontend servers..."
	@echo "Checking if dependencies are installed..."
	@if [ ! -d "backend/venv" ]; then \
		echo "❌ Backend virtual environment not found. Run 'make install-backend' first."; \
		exit 1; \
	fi
	@if [ ! -d "frontend/node_modules" ]; then \
		echo "❌ Frontend dependencies not found. Run 'make install-frontend' first."; \
		exit 1; \
	fi
	@echo "✅ Dependencies check passed. Starting servers..."
	@echo "Backend will start first, then frontend..."
	gnome-terminal --tab --title="Backend" -- bash -c "cd $(PWD)/backend && source venv/bin/activate && echo 'Starting backend server...' && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 || (echo 'Backend failed to start. Press Enter to continue...'; read); exec bash" & \
	sleep 3 && \
	gnome-terminal --tab --title="Frontend" -- bash -c "cd $(PWD)/frontend && echo 'Starting frontend server...' && npm run dev || (echo 'Frontend failed to start. Press Enter to continue...'; read); exec bash"

# Stop processes
stop:
	@echo "Stopping development servers..."
	@pkill -f "uvicorn app.main:app" 2>/dev/null || true
	@pkill -f "vite" 2>/dev/null || true
	@echo "Servers stopped"

# Clean up
clean:
	@echo "Cleaning up..."
	cd backend && find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	cd frontend && rm -rf node_modules/.vite 2>/dev/null || true
	@echo "Cleanup complete"
