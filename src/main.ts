import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main(){
    const state = initState();// initializing a singular state object for the session of the application
    startREPL(state);//passing it to the main control flow
}

main();