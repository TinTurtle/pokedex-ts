import { State } from "../state.js";

//handler funciton for the 'mapb' command
//this is for navigating backwards on the maps list(go back to the previous 20 locations)

export async function commandMapB(state: State): Promise<void>{
    try{
        if(!state){
           throw new Error("StateObject Undefined")
        }
        const res = await state.PokeAPI.fetchLocations(state.prevLocationURL);
        
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