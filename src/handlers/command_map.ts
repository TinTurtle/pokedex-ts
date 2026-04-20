import { State } from "../state.js";

//handler funciton for the 'map' command
//this is for fetching the first 20 locations-areas on the PokeAPI
//OR
//for navigating forwards on the maps list(go to the next 20 locations)


export async function commandMap(state: State): Promise<void>{
    try{
        if(!state){
           throw new Error("StateObject Undefined")
        }
        const res = await state.PokeAPI.fetchLocations(state.nextLocationURL);
        
        state.nextLocationURL = res.next;
        state.prevLocationURL = res.previous;

        const locations = res.results;
        for(const item of locations){
            console.log(item.name);
        }
    }catch(error: unknown){
        if(error instanceof Error){
            console.error(error.message);
        }else{
            console.error("Unknown Error Occured!");
        }
    }
}