import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
const { BAD_REQUEST, CREATED, OK } = StatusCodes;


export async function addSports(req: Request, res: Response) {
    return res.status(CREATED).json();
}