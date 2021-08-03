import { paramMissingError } from '@shared/constants';
import logger from '@shared/Logger';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { SportController } from 'src/controllers/SportController';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function addSports(req: Request, res: Response) {
    const controller = new SportController();
    const body = req.body;
    await controller.createSports(body)
    .catch(err => {
        logger.err(err);
        return res.status(BAD_REQUEST).json({ error: paramMissingError });
    });
    return res.status(CREATED).json();
}