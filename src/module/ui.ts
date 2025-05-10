import {MESSAGES} from '../config'
import * as readline from 'readline';

export class UI {

    private rl: readline.Interface;
    private question: (prompt: string) => Promise<string>;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.question = (prompt: string): Promise<string> => {
            return new Promise((resolve) => {
                this.rl.question(prompt, resolve);
            });
        }
    }

    public async start(): Promise<void> {
        this.welcome();
    }

    

    public welcome(): void {
        console.log(MESSAGES.WELCOME);
        console.log(MESSAGES.PLEASE_ENTER_A_COMMAND);
    }
}