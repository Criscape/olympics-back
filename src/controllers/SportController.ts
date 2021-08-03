import { Sport } from "@entities/Sport";
import { ISport } from "@shared/models";

export class SportController {
    
    async createSports(sports: ISport[]) {
        return await Sport.insertMany(sports);
    }
    
    async createSport(sport: ISport) {
        return await Sport.create(sport);
    }

}

