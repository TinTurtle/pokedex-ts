import { State } from "../state.js";

//handler funciton for the 'exit' command


export async function commandExit(state: State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.rl.close();// closes the readline instance
    process.exit(0);// terminates the program
};