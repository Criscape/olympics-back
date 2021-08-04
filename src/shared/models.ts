export interface ISport {
    name: string;
    shortname: string;
}

export interface IEventBody {
    name: string;
    sportShortname: string;
}

export interface ICountry {
    name: string;
    shortname: string;
    flagUrl: string;
}

export interface ICountryDB {
    name: string;
    shortname: string;
    flagUrl: string;
    medals: string[];
}

export interface IMedalBody {
    rank: string;
    countryShortname: string;
    sportShortname: string;
    event: string;
}