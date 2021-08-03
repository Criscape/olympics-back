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
}

export interface IMedalBody {
    rank: string;
    country: string;
    sportShortname: string;
    event: string;
}