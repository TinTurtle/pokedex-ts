import { State } from "../state.js";

//handler funciton for the 'help' command
//help - gives the list of valid commands and their description
//does this by parsing through the registry of commands
export async function commandHelp(state: State): Promise<void> {
    const commands = state.commands;
    console.log("\nWelcome to the Pokedex!");
    console.log("Usage:\n");
    for(const command in commands){
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
}