import { Request, Response } from "express";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  success: boolean;
  message: string;
}


type LoginRequest = Request<{}, LoginResponseBody, LoginRequestBody>;
type LoginResponse = Response<LoginResponseBody>;

export { LoginRequest, LoginResponse };
