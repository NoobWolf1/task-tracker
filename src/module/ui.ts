import { ADD, DELETE, LIST, MARK, MESSAGES, TASK_CLI, UPDATE } from '../config';
import * as readline from 'readline';
import { Validate } from './validate';
import { Validation } from '../types';
import { TaskOperations } from './taskOperations';

export class UI {
    private rl: readline.Interface;
    private question: (prompt: string) => Promise<string>;
    private taskOperations: TaskOperations;

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

        this.taskOperations = new TaskOperations();
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

        while (!isRunning) {
            input = await this.question(TASK_CLI);
            const validate = new Validate();
            const { command, isValid } = validate.doInitialValidation(input, false);
            if (isValid) {
                console.log('Successful Initial validation');
                // need to return false here to programmatically quit
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

        if (validatedObj.isValid) {
            switch (command) {
                case ADD:
                    this.taskOperations.addTask(validatedObj);
                    break;
                case DELETE:
                    this.taskOperations.deleteTask(validatedObj);
                    break;
                case LIST:
                    this.taskOperations.listTasks(validatedObj);
                    break;
                case MARK:
                    this.taskOperations.markTaskStatus(validatedObj);
                    break;
                case UPDATE:
                    this.taskOperations.updateTask(validatedObj);
                    break;
                default:
                    break;
            }
        }
    }

    public close(): void {
        console.log(MESSAGES.BYE_BYE);
        this.rl.close();
    }
}