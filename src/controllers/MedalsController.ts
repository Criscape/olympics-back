import { Country } from "@entities/Country";
import { Event } from "@entities/Event";
import { Medal } from "@entities/Medal";
import { Sport } from "@entities/Sport";
import logger from "@shared/Logger";
import { IMedalBody } from "@shared/models";
import { EventController } from "./EventController";

export class MedalController {

    async createMedals(medals: IMedalBody[]) {
        let sportsRef: any = {};
        let countriesRef: any = {};
        let newMedals = [];
        for (const medal of medals) {
            if (sportsRef[medal.sportShortname] === undefined) {
                const result = await this.findSportByShortname(medal.sportShortname)
                .catch(err => logger.err(err));
                if (!result) {
                    console.log(medal.sportShortname)
                    return 0;
                }
                sportsRef[medal.sportShortname] = result.id;
            }
            if (countriesRef[medal.countryShortname] === undefined) {
                const country = await this.findCountryIdByCountryShortname(medal.countryShortname)
                .catch(err => logger.err(err));
                if (!country) {
                    return 1;
                }
                countriesRef[medal.countryShortname] = country.id;  
            }
            let eventId = await this.getEventIdBySportAndEventName(sportsRef[medal.sportShortname], medal.event)
            .catch(err => logger.err(err));
            if (!eventId) {
                const eventController = new EventController();
                const result3 = await eventController.createEvents([{ name: medal.event, sportShortname: medal.sportShortname }])
                .catch(err => logger.err(err));
                console.log(medal.sportShortname, medal.event)
                if (!result3) {
                    return 2;
                }
                eventId = await this.getEventIdBySportAndEventName(sportsRef[medal.sportShortname], medal.event)
                .catch(err => logger.err(err));
                if (!eventId) {
                    return 2;
                }
            }
            let aExists = newMedals.filter(medal1 => {
                return medal1.country === countriesRef[medal.countryShortname] && String(medal1.event) === String(eventId) && medal1.rank === medal.rank
            });
            if (aExists.length === 0) {
                newMedals.push({
                    country: countriesRef[medal.countryShortname],
                    event: eventId,
                    rank: medal.rank
                });
            }
        }
        const result = await Medal.insertMany(newMedals)
        .catch(err => logger.err(err)); 
        if (result && result.length !== 0) {
            let countryIds = new Set(result.map(medal => medal.country));
            let eventIds = new Set(result.map(medal => medal.event));
            for (let countryId of countryIds) {
                const filterMedals = result.filter(medal => medal.country === countryId);
                const medalsIds = filterMedals.map(medal => medal.id);
                const result2 = await this.updateCountriesMedals(countryId, medalsIds)
                .catch(err => logger.err(err));
                if (!result2) {
                    return 3;
                }
            }
            for (let eventId of eventIds) {
                const filterMedals = result.filter(medal => medal.event === eventId);
                const medalsIds = filterMedals.map(medal => medal.id);
                const result2 = await this.updateEventsMedals(eventId, medalsIds)
                .catch(err => logger.err(err));
                if (!result2) {
                    return 4;
                }
            }
        } else {
            return 5;
        }
        return 6;
    }

    async getEventIdBySportAndEventName(sportId: string, name: string) {
        const sport = await this.findSportById(sportId)
        .catch(err => logger.err(err));
        if (sport) {
            for (let event of sport.events) {
                const event2 = await this.findEventById(event)
                .catch(err => logger.err(err));
                if (event2 && event2.name === name) {
                    return event;   
                }
            }
        }
        return 0;
    }

    async updateCountriesMedals(countryId: string, medals: string[]) {
        const country = await this.findCountryById(countryId)
        .catch(err => logger.err(err));
        if (country) {
            country.medals.push([...medals]);
            return await country.save();
        } else {
            return 0;
        }
    }

    async updateEventsMedals(eventId: string, medals: string[]) {
        const event = await this.findEventById(eventId)
        .catch(err => logger.err(err));
        if (event) {
            event.medals.push([...medals]);
            return await event.save();
        } else {
            return 0;
        }
    }

    async findCountryById(id: string) {
        return await Country.findById(id).exec();
    }

    async findCountryIdByCountryShortname(shortname: string) {
        return await Country.findOne({ shortname }).exec();
    }

    async findEventById(id: string) {
        return await Event.findById(id).exec();
    }

    async findSportByShortname(shortname: string) {
        return await Sport.findOne({ shortname }).exec();
    }

    async findSportById(id: string) {
        return await Sport.findById(id).exec();
    }

}