//this class handles all the endpoints regarding the PokeAPI to handle all the REST actions 
export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    //to fetch 20 locations from the api
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

        // the logic checks for the pageURL and if it is undefined then takes the default case, being the first fetch of the session
        //so this piece of code is to figure if this api fetch is the first one for this endpoint ie. location-area
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area/`; 

        const response = await fetch(url, {
            method: "GET",
        });

        return response.json();
    }
    //to fetch the details on a particular location
    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        const response = await fetch(url);

        return response.json();
    }
}


//type to store the response from the 'baseURL/locations-area/' endpoint; stores the 20 locations and their respective url
export type ShallowLocations = {
    count: number;
    next: string ;
    previous: string;
    results: [
        {
            name: string;
            url: string;
        },
    ];
};

//type to store the response from the 'baseURL/locations-area/{locationName}' endpoint; gives detailed info about the location requested 
export type Location = {
    encounter_method_rates: [
        {
            encounter_method: {
                name: string;
                url: string;
            };
            version_details: [
                {
                    rate: number;
                    version: {
                        name: string;
                        url: string;
                    };
                },
            ];
        },
    ];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: [
        {
            language: {
                name: string;
                url: string;
            };
            name: string;
        },
    ];
    pokemon_encounters: [
        {
            pokemon: {
                name: string;
                url: string;
            };
            version_details: [
                {
                    version: {
                        name: string;
                        url: string;
                    };
                    max_chance: number;
                    encounter_details: [
                        {
                            min_level: number;
                            max_level: number;
                            condition_values: [];
                            chance: number;
                            method: {
                                name: string;
                                url: string;
                            };
                        },
                    ];
                },
            ];
        },
    ];
};
