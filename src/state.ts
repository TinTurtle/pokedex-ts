import { createInterface, type Interface } from "readline";
import { commandExit } from "./handlers/command_exit.js";
import { commandHelp } from "./handlers/command_help.js";
import { commandMap } from "./handlers/command_map.js";
import { PokeAPI } from "./api/pokeapi.js";
import { commandMapB } from "./handlers/command_mapb.js";

//the object type to handle and maintain the single state of all important values
//this maintains the statefulness of the system with each session
//things like the readline Interface, the api instance, and the navigating through different parts of the api
export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    PokeAPI: PokeAPI;
    nextLocationURL: string | undefined;
    prevLocationURL: string | undefined;
};

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    const commands = {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "",
            callback: commandMapB,
        },
    };

    const pokeapi = new PokeAPI();

    return {
        rl: rl,
        commands: commands,
        PokeAPI: pokeapi,
        nextLocationURL: undefined,
        prevLocationURL: undefined,
    };
}
