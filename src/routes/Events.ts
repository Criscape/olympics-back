import { paramMissingError, successful } from '@shared/constants';
import logger from '@shared/Logger';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { EventController } from 'src/controllers/EventController';
const { BAD_REQUEST, CREATED } = StatusCodes;

export async function addEvents(req: Request, res: Response) {
    const controller = new EventController();
    const body = req.body;
    const result = await controller.createEvents(body)
    .catch(err => {
        logger.err(err);
        return res.status(BAD_REQUEST).json({ error: paramMissingError });
    });
    switch (result) {
        case 0: return res.status(BAD_REQUEST).json({ error: "Bad sportShortname param" });
        case 1: return res.status(BAD_REQUEST).json({ error: "Failed in insert" });
        case 2: return res.status(BAD_REQUEST).json({ error: "Failed updating sports" });
        default: return res.status(CREATED).json({ans: successful});
    }
}