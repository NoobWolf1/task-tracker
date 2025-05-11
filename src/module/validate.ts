import {
    ADD,
    DELETE,
    DONE,
    ID,
    IN_PROGRESS,
    LIST,
    LOW,
    MARK,
    MESSAGES,
    PRIORITY_ARRAY,
    PROGRESS_ARRAY,
    TEXT,
    TITLE,
    TODO,
    UPDATE,
    VALID_INPUT,
} from '../config';
import { Validation, Priority, Status } from '../types';
export class Validate {
    private validate: Validation = {
        command: '',
        isValid: false
    }
    
    
    public set setValidation(v: Validation) {
        this.validate = v;
    }

    public set setValidationCommand(command: string){
        this.validate['command'] = command;
    }
    
    
    public doInitialValidation(input: string, isValid: boolean): Validation {
        if (input.trim() === '') {
            console.log(MESSAGES.EMPTY_STRING_ENTERED);

            return this.validate;
        }
        const argList = input.split(' ');
        // argsList cant be of 1 length
        const command = argList[0];
        if (argList.length === 1) {
            this.validate.command = command;
            console.log(MESSAGES.ONE_LENGTH_IS_INCORRECT);

            return this.validate;
        }

        //first elem should be in the list
        isValid = VALID_INPUT.includes(command);
        this.validate.command = command;
        this.validate.isValid = isValid;
        return this.validate;
    }

    public validation(input: string, command: string): Validation {
        this.validate['command'] = command;
        switch (command) {
            case ADD:
                this.validate = this.addValidation(input, command);
                break;
            case DELETE:
                this.validate = this.deleteValidation(input, command);
                break;
            case LIST:
                this.validate = this.listValidation(input, command);
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

        return this.validate;
    }

    private addValidation(input: string, command: string): Validation {
        const isValid: boolean = false;
        const validation: Validation = {
            isValid,
            command,
        };
        const quoteStart = input.indexOf('"');
        const quoteEnd = input.indexOf('"', quoteStart + 1);
        if (quoteStart === -1 || quoteEnd === -1 || quoteEnd <= quoteStart + 1) {
            console.log(MESSAGES.MISSING(TITLE));

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

    private deleteValidation(input: string, command: string) {
        this.validate['command'] = command;
        const argsList = input.split(' ');
        if (argsList.length > 2) {
            console.log(MESSAGES.MAX_ARGUMENTS(command));
            return this.validate;
        }
        if (argsList.length <= 1) {
            console.log(MESSAGES.MISSING(ID));
        }
        if (argsList.length === 2) {
            let second: number;
            if (!isNaN(Number(argsList[1]))) {
                second = Number(argsList[1]);
                this.validate['_id'] = second;
                this.validate['isValid'] = true;
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(TEXT, command));
                return this.validate;
            }
        }

        return this.validate;
    }

    private listValidation(input: string, command: string): Validation {
        const argList = input.split(" ");
        const length = argList.length;

        if(length > 2) {
            // if input.arglist is of size > 2 return false invalid
            console.log(MESSAGES.MAX_ARGUMENTS(LIST));
            return this.validate;
        }

        if(length === 1) {
            // if input is only list then return with true and need return in the listAll true
            this.validate['listAll'] = true;
            return this.validate;
        }
        if(length === 2) {
            // if input.arglist is of size == 2 check of type an return flag accordingly
            if(argList[1] === TODO) {
                this.validate['listTodo'] = true;
            } else if(argList[1] === IN_PROGRESS) {
                this.validate['listInProgress'] = true;
            } else if(argList[1] === DONE) {
                this.validate['listDone'] = true;
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(TEXT, command));
                return this.validate;
            }
        }
        return this.validate;
    }
}
