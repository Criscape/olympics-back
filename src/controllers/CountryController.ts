import { Country } from "@entities/Country";
import { Medal } from "@entities/Medal";
import logger from "@shared/Logger";
import { ICountry, ICountryDB } from "@shared/models";

export class CountryController {

    async getMedalsBoard() {
        const countries = await this.getCountries()
        .catch(err => logger.err(err));
        if (countries && countries.length !== 0) {
            let board = []
            for (let country of countries) {
                console.log('...')
                let medals = []
                for (let medal of country.medals) {
                    const medalTemp = await this.getMedalById(medal)
                    .catch(err => logger.err(err));
                    if (medalTemp) {
                        medals.push(medalTemp.rank);
                    } else {
                        return [];
                    }
                }
                if (medals.length !== 0) {
                    board.push({
                        name: country.name,
                        flag: country.flagUrl,
                        gold: medals.filter(medal => medal === 'Gold Medal').length,
                        silver: medals.filter(medal => medal === 'Silver Medal').length,
                        bronze: medals.filter(medal => medal === 'Bronze Medal').length,
                        total: medals.length
                    });
                }
            }
            return board;
        } else {
            return [];
        }
    }
    
    async createCountries(countries: ICountry[]) {
        return await Country.insertMany(countries);
    }

    async getCountries() {
        return await Country.find({});
    }

    async getMedalById(id: string) {
        return await Medal.findById(id).exec();
    }

}

