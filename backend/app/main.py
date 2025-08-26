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

v1_router = APIRouter(prefix="/api/v1")

v1_router.include_router(user_routes.router, tags=["users"])
v1_router.include_router(auth_routes.router, tags=["auth"])
v1_router.include_router(supplier_routes.router, tags=["suppliers"])
v1_router.include_router(client_routes.router, tags=["clients"])
v1_router.include_router(service_routes.router, tags=["services"])
v1_router.include_router(contract_routes.router, tags=["contracts"])

app.include_router(v1_router)


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
