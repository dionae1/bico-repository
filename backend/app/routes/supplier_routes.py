from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from app.db.models import User
from app.services import supplier as supplier_service
from app.schemas.supplier import ResponseSupplier, CreateSupplierRequest
from app.schemas.response import ResponseSchema
from app.core.auth import get_current_user

router = APIRouter(prefix="/suppliers", tags=["suppliers"])


@router.post("/", response_model=ResponseSchema)
def create_supplier(
    supplier: CreateSupplierRequest, current_user: User = Depends(get_current_user)
) -> ResponseSchema:

    try:
        created_supplier = supplier_service.create_supplier(
            name=supplier.name,
            email=supplier.email,
            phone=supplier.phone,
        )

    except IntegrityError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Supplier with this email already exists",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supplier creation failed",
        )

    response = ResponseSupplier.from_model(created_supplier)
    return ResponseSchema(
        success=True,
        message="Supplier created successfully",
        data=response,
    )


@router.get("/{supplier_id}", response_model=ResponseSchema)
def get_supplier(
    supplier_id: int, current_user: User = Depends(get_current_user)
) -> ResponseSchema:
    supplier = supplier_service.get_supplier_by_id(supplier_id=supplier_id)
    if not supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    response = ResponseSupplier.from_model(supplier)
    return ResponseSchema(
        success=True,
        message="Supplier retrieved successfully",
        data=response,
    )


@router.put("/{supplier_id}", response_model=ResponseSchema)
def update_supplier(
    supplier_id: int,
    supplier: CreateSupplierRequest,
    current_user: User = Depends(get_current_user),
) -> ResponseSchema:
    updated_supplier = supplier_service.update_supplier(
        supplier_id=supplier_id,
        name=supplier.name,
        email=supplier.email,
        phone=supplier.phone,
    )

    if not updated_supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    response = ResponseSupplier.from_model(updated_supplier)
    return ResponseSchema(
        success=True,
        message="Supplier updated successfully",
        data=response,
    )


@router.patch("/{supplier_id}/toggle-status", response_model=ResponseSchema)
def toggle_supplier_status(
    supplier_id: int, current_user: User = Depends(get_current_user)
) -> ResponseSchema:
    updated_supplier = supplier_service.toggle_status(supplier_id=supplier_id)
    if not updated_supplier:
        raise HTTPException(status_code=404, detail="Supplier not found")

    response = ResponseSupplier.from_model(updated_supplier)
    return ResponseSchema(
        success=True,
        message="Supplier status toggled successfully",
        data=response,
    )


@router.delete("/{supplier_id}")
def delete_supplier(
    supplier_id: int, current_user: User = Depends(get_current_user)
) -> ResponseSchema:
    success = supplier_service.delete_supplier(supplier_id=supplier_id)
    if not success:
        raise HTTPException(status_code=404, detail="Supplier not found")

    return ResponseSchema(
        success=True,
        message="Supplier deleted successfully",
    )
