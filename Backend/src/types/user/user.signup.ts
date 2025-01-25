import { Request, Response } from "express";

export interface SignupRequestBody {
    email: string;
    name: string;
    password: string;
}

export interface SignupResponseBody {
  success: boolean;
  message: string;
}

type SignupRequest = Request<{}, SignupResponseBody, SignupRequestBody>;
type SignupResponse = Response<SignupResponseBody>;

export { SignupRequest, SignupResponse };
