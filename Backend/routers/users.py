from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from utility.auth import authenticate_user, create_access_token, get_current_user
from schema.models import User
from db import get_session
from config import settings
from Models.schema import LoginRequest, Token, UserCreate, UserRead

router = APIRouter(tags=["Users"])

@router.post("/signup", response_model=UserRead)
def signup(user:UserCreate, session:Session = Depends(get_session)):
    existing_user = session.exec(select(User).where(User.user_name == user.user_name)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Usename already registered")
    new_user = User(user_name=user.user_name, email=user.email)
    new_user.set_password(user.password)
    new_user.set_role(user.role)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user


@router.post("/login", response_model=Token)
def login(request:LoginRequest, session:Session = Depends(get_session),):
    user = authenticate_user(session, request.user_name, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub":user.user_name},
                                       expires_delta=timedelta(minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES)
                                       )
    return {"access_token":access_token, "token_type":"bearer"}\
    
@router.get("/users/me", response_model=UserRead)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user