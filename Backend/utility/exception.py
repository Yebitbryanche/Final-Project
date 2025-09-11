from fastapi import HTTPException

def not_found(item:str):
    raise HTTPException(status_code=404, detail=f"{item} not found")
