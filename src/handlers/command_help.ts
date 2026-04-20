import { State } from "../state.js";

//handler funciton for the 'help' command

export async function commandHelp(state: State): Promise<void> {
    const commands = state.commands;
    console.log("\nWelcome to the Pokedex!");
    console.log("Usage:\n");
    for(const command in commands){
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
}