import {
  DONE,
  HIGH,
  IN_PROGRESS,
  LOW,
  MEDIUM,
  MESSAGES,
  PRIORITY_ARRAY,
  PROGRESS_ARRAY,
  TODO,
  VALID_INPUT,
} from '../config';
import { Validation, Priority, Status } from '../types';
export class Validate {
  public doInitialValidation(input: string, isValid: boolean): Validation {
    const validObj: Validation = {
      command: '',
      isValid,
    };
    if (input.trim() === '') {
      console.log(MESSAGES.EMPTY_STRING_ENTERED);

      return validObj;
    }
    const argList = input.split(' ');
    // argsList cant be of 1 length
    const command = argList[0];
    if (argList.length === 1) {
      validObj.command = command;
      console.log(MESSAGES.ONE_LENGTH_IS_INCORRECT);

      return validObj;
    }

    //first elem should be in the list
    isValid = VALID_INPUT.includes(command);
    validObj.command = command;
    validObj.isValid = isValid;
    return validObj;
  }

  public addValidation(input: string, command: string): Validation {
    const isValid: boolean = false;
    const validation: Validation = {
      isValid,
      command,
    };
    const quoteStart = input.indexOf('"');
    const quoteEnd = input.indexOf('"', quoteStart + 1);
    if (quoteStart === -1 || quoteEnd === -1 || quoteEnd <= quoteStart + 1) {
      console.log(MESSAGES.MISSING_TITLE);

      return validation;
    }
    const title = input.slice(quoteStart + 1, quoteEnd);
    validation['title'] = title;

    const rest = input
      .slice(quoteEnd + 1)
      .trim()
      .split(' ')
      .filter(Boolean); // what is this? i mean how does it work
    if (rest.length > 2) {
      console.log(MESSAGES.MAX_ARGUMENTS(command));
      return validation;
    }

    let priority: Priority = LOW;
    let status: Status = TODO;
    validation['priority'] = priority;
    validation['status'] = status;

    if (rest.length === 1) {
      const word = rest[0].toLowerCase();
      if (PRIORITY_ARRAY.includes(word as Priority)) {
        validation['priority'] = priority;
        priority = word as Priority;
      } else if (PROGRESS_ARRAY.includes(word as Status)) {
        validation['status'] = status;
        status = word as Status;
      } else {
        console.log(MESSAGES.INVALID_ARGUMENT(word, command));
        return validation;
      }
    }

    if (rest.length === 2) {
      const [first, second] = rest.map((w) => w.toLowerCase());
      if (PRIORITY_ARRAY.includes(first as Priority)) {
        validation['priority'] = priority;
        priority = first as Priority;
      } else {
        console.log(MESSAGES.INVALID_ARGUMENT(first, command));
        return validation;
      }

      if (PROGRESS_ARRAY.includes(second as Status)) {
        validation['status'] = status;
        status = second as Status;
      } else {
        console.log(MESSAGES.INVALID_ARGUMENT(second, command));
        return validation;
      }
    }
    validation['isValid'] = true;
    return validation;
  }
}
