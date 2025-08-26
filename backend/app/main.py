from fastapi import APIRouter, FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from app.routes import (
    auth_routes,
    user_routes,
    supplier_routes,
    client_routes,
    service_routes,
    contract_routes,
)

app = FastAPI(title="CSManager API", version="1.0.0")

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(user_routes.router, tags=["users"])
api_router.include_router(auth_routes.router, tags=["auth"])
api_router.include_router(supplier_routes.router, tags=["suppliers"])
api_router.include_router(client_routes.router, tags=["clients"])
api_router.include_router(service_routes.router, tags=["services"])
api_router.include_router(contract_routes.router, tags=["contracts"])

app.include_router(api_router)

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "message": exc.detail if exc.detail else "An error occurred",
            "data": None,
            "error": str(exc),
        },
    )
