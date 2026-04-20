import { State } from "./state.js";

//the main repl loop for controlling the apps main flow of control
export function startREPL(state: State){

    state.rl.prompt();

    state.rl.on('line', async (input) => {
        const words = cleanInput(input);
        if(words.length === 0){
            state.rl.prompt();
            return;
        }

        const commandName = words[0];

        const commands = state.commands;
        const cmd = commands[commandName];

        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`,);
            state.rl.prompt();
            return;
        }

        try {
            await cmd.callback(state);
        } catch (e) {
            console.log(e);
        }
        state.rl.prompt();
    })
}

//helper function to clean the input
export function cleanInput(input: string):string[]{
    return input.trim().toLowerCase().split(" ").filter((word) => word !== '');
}
