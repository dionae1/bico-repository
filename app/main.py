from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from app.routes import (
    auth_routes,
    user_routes,
    supplier_routes,
    client_routes,
    service_routes,
    contract_routes,
)

app = FastAPI()


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


app.include_router(user_routes.router, tags=["users"])
app.include_router(auth_routes.router, tags=["auth"])
app.include_router(supplier_routes.router, tags=["suppliers"])
app.include_router(client_routes.router, tags=["clients"])
app.include_router(service_routes.router, tags=["services"])
app.include_router(contract_routes.router, tags=["contracts"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the User Management API"}
