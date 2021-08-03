import { Country } from "@entities/Country";
import { ICountry } from "@shared/models";

export class CountryController {
    
    async createCountries(countries: ICountry[]) {
        return await Country.insertMany(countries);
    }

}

