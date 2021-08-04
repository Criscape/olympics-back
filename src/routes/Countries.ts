import { paramMissingError, successful } from '@shared/constants';
import logger from '@shared/Logger';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { CountryController } from 'src/controllers/CountryController';
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

export async function addCountries(req: Request, res: Response) {
    const controller = new CountryController();
    const body = req.body;
    await controller.createCountries(body)
    .catch(err => {
        logger.err(err);
        return res.status(BAD_REQUEST).json({ error: paramMissingError });
    });
    return res.status(CREATED).json({ans: successful});
}

export async function getBoard(req: Request, res: Response) {
    const controller = new CountryController();
    const result = await controller.getMedalsBoard()
    .catch(err => {
        logger.err(err);
        return res.status(BAD_REQUEST).json({ error: paramMissingError });
    });
    return res.status(OK).json(result);
}