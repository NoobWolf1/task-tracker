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
    let isValidInput: boolean = false;
    //let validate = new Validate();

    while (!isValidInput) {
      input = await this.question(TASK_CLI);
      const { command, isValid } = this.validate.doInitialValidation(input, isValidInput);
      if (isValid) {
        console.log('Succesful Initial validation');
        await this.findMethod(command, input);
      } else {
        // invalid option
        console.log(MESSAGES.INVALID_OPTION_ENTERED);
      }
    }
  }

  private async findMethod(command: string, input: string): Promise<void> {
    let val;
    switch (command) {
      case ADD:
        const validatedData: Validation = this.validate.addValidation(input, command);
        if (validatedData.isValid) {
          // process data
          console.log('validation successfull: ', validatedData);

          console.log('adding data');
        }
        break;
      case DELETE:
        console.log('deleting data');
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
