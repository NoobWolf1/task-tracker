// TODO:

import { UI } from "./src/module";

// this should be the entry point
async function main() : Promise<void> {
    try {
        const ui = new UI();
        await ui.start();
        
    } catch (error) {
        console.error('Fatal error: ', error);
        process.exit(1);
    }
}

main();

// show the welcome message

// give demo tutorial if feeling generous

// can give out a message saying there are no tasks in todo list, (if storage is empty else, show some message if it is not empty)

// system should now wait for user input, and parse it,

// correct service should be called

// data must be returned/created/updated/deleted

// wait for other commands (if any)

// wait for exit interrupt or custom exit interrupt to quit app
