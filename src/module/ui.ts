import { ADD, DELETE, LIST, MARK, MESSAGES, TASK_CLI, UPDATE } from '../config';
import * as readline from 'readline';
import { Validate } from './validate';
import { Validation } from '../types';

export class UI {
    private rl: readline.Interface;
    private question: (prompt: string) => Promise<string>;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        this.question = (prompt: string): Promise<string> => {
            return new Promise((resolve) => {
                this.rl.question(prompt, resolve);
            });
        };
    }

    public async start(): Promise<void> {
        try {
            this.welcome();
            // prompt the user now.
            await this.getInput();
        } catch (error) {
            console.error('Error occured in UI: ', error);
        }
    }

    private welcome(): void {
        console.log(MESSAGES.WELCOME);
        console.log(MESSAGES.PLEASE_ENTER_A_COMMAND);
        console.log(MESSAGES.QUIT);
    }

    private async getInput() {
        let input: string = '';
        const isRunning: boolean = false;
        //let validate = new Validate();

        while (!isRunning) {
            input = await this.question(TASK_CLI);
            const validate = new Validate();
            const { command, isValid } = validate.doInitialValidation(input, false);
            if (isValid) {
                console.log('Succesful Initial validation');
                // need to return false here to programmaticaly quit
                await this.findMethod(command, input);
            } else {
                // invalid option
                console.log(MESSAGES.INVALID_OPTION_ENTERED);
            }
        }
    }

    private async findMethod(command: string, input: string): Promise<void> {
        const validate = new Validate();
        const validatedObj: Validation = validate.validation(input, command);

        console.log('in findMethod', validatedObj);
        if (validatedObj.isValid) {
            switch (command) {
                case ADD:
                    // process data
                    console.log('add validation success ', validatedObj);
                    break;
                case DELETE:
                    // process data
                    console.log('delete validation success', validatedObj);
                    break;
                case LIST:
                    // process data
                    console.log('list validation success', validatedObj);
                    break;
                case MARK:
                    // process data
                    console.log('mark validation success', validatedObj);
                    break;
                case UPDATE:
                    // process data
                    console.log('updation validation success', validatedObj);
                    break;
                default:
                    break;
            }
        }
    }
}
