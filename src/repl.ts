import { State } from "./state.js";

//the main repl loop for controlling the apps main flow of control
export function startREPL(state: State){

    state.rl.prompt();

    state.rl.on('line', async (input) => {
        const words = cleanInput(input);// cleaning and filtering the input
        //skipping an empty command
        if(words.length === 0){
            state.rl.prompt();
            return;
        }

        const commandName = words[0];

        const commands = state.commands;
        const cmd = commands[commandName]; // looking up the registry for a match

        // handle invalid commands
        if (!cmd) {
            console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`,);
            state.rl.prompt();
            return;
        }

        // call the calback function related to the command in the registry
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
