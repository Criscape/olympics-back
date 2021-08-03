import { Event } from "@entities/Event";
import { Sport } from "@entities/Sport";
import logger from "@shared/Logger";
import { IEventBody } from "@shared/models";

export class EventController {

    async createEvents(events: IEventBody[]) {
        let sportsRef: any = {};
        let newEvents = [];
        for (const event of events) {
            if (sportsRef[event.sportShortname] === undefined)  {
                const result = await this.findSportByShortname(event.sportShortname)
                .catch(err => logger.err(err));
                if (!result) {
                    return 0;
                }
                sportsRef[event.sportShortname] = result.id;
            }
            newEvents.push({
                sport: sportsRef[event.sportShortname],
                name: event.name
            });
        }
        const result = await Event.insertMany(newEvents)
        .catch(err => logger.err(err));
        if (result) {
            const sportIds = result.map(event => event.sport);
            for (let sportId of sportIds) {
                const filterEvents = result.filter(event => event.sport === sportId);
                const eventsIds = filterEvents.map(event => event.id);
                const result2 = await this.updateSportEvents(sportId, eventsIds)
                .catch(err => logger.err(err));
                if (!result2) {
                    return 2;
                }
            }
        } else {
            return 1;
        }
        return 3;
    }

    async findSportByShortname(shortname: string) {
        return await Sport.findOne({ shortname }).exec();
    }

    async findSportById(id: string) {
        return await Sport.findById(id).exec();
    }

    async updateSportEvents(sportId: string, events: string[]) {
        const sport = await this.findSportById(sportId)
        .catch(err => logger.err(err));
        if (sport) {
            sport.events.push([...events]);
            return await sport.save();
        } else {
            return 0;
        }
    }
}