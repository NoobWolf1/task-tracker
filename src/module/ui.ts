import { ADD, DELETE, LIST, MARK, MESSAGES, TASK_CLI, UPDATE } from '../config';
import * as readline from 'readline';
import { Validate } from './validate';
import { Validation } from '../types';

export class UI {
    private rl: readline.Interface;
    private question: (prompt: string) => Promise<string>;
    private validate: Validate;

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

        this.validate = new Validate();
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
        let isRunning: boolean = false;
        //let validate = new Validate();

        while (!isRunning) {
            input = await this.question(TASK_CLI);
            const { command, isValid } = this.validate.doInitialValidation(input, false);
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
        let validate: Validation;
        validate = this.validate.validation(input, command);
        if (validate.isValid) {
            switch (command) {
                case ADD:
                    // process data
                    console.log('validation successfull: ', validate);
                    console.log('adding data');

                    break;
                case DELETE:
                    // process data
                    console.log('deleting data', validate);
                    break;
                case LIST:
                    console.log('listing data');
                    break;
                case MARK:
                    console.log('marking data');
                    break;
                case UPDATE:
                    console.log('updating data');
                    break;
                default:
                    break;
            }
        }
    }
}
