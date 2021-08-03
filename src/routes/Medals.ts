import { paramMissingError, successful } from '@shared/constants';
import logger from '@shared/Logger';
import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { MedalController } from 'src/controllers/MedalsController';
const { BAD_REQUEST, CREATED } = StatusCodes;

export async function addMedals(req: Request, res: Response) {
    const controller = new MedalController();
    const body = req.body;
    const result = await controller.createMedals(body)
    .catch(err => {
        logger.err(err);
        return res.status(BAD_REQUEST).json({ error: paramMissingError });
    });
    switch (result) {
        case 0: return res.status(BAD_REQUEST).json({ error: "Bad sportShortname param" });
        case 1: return res.status(BAD_REQUEST).json({ error: "Bad country param" });
        case 2: return res.status(BAD_REQUEST).json({ error: "Bad sport and event param" });
        case 3: return res.status(BAD_REQUEST).json({ error: "Failed updating countries" });
        case 4: return res.status(BAD_REQUEST).json({ error: "Failed updating events" });
        case 5: return res.status(BAD_REQUEST).json({ error: "Failed creating medals" });
        default: return res.status(CREATED).json({ans: successful});
    }
}