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
        isValid: false,
    };

    public set setValidation(v: Validation) {
        this.validate = v;
    }

    public set setValidationCommand(command: string) {
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
        // if (argList.length === 1) {
        //     this.validate.command = command;
        //     console.log(MESSAGES.ONE_LENGTH_IS_INCORRECT);

        //     return this.validate;
        // }

        //first elem should be in the list
        isValid = VALID_INPUT.includes(command);
        this.validate.command = command;
        this.validate.isValid = isValid;
        return this.validate;
    }

    public validation(input: string, command: string): Validation {
        this.validate['command'] = command;
        this.validate['isValid'] = false;
        switch (command) {
            case ADD:
                this.validate = this.addValidation(input, command);
                break;
            case DELETE:
                this.validate = this.deleteValidation(input, command);
                break;
            case LIST:
                this.validate = this.listValidation(input, command);
                break;
            case MARK:
                this.validate = this.markValidation(input, command);
                break;
            case UPDATE:
                this.validate = this.updateValidation(input, command);
                break;
            default:
                break;
        }

        return this.validate;
    }

    private addValidation(input: string, command: string): Validation {
        const quoteStart = input.indexOf('"');
        const quoteEnd = input.indexOf('"', quoteStart + 1);
        if (quoteStart === -1 || quoteEnd === -1 || quoteEnd <= quoteStart + 1) {
            console.log(MESSAGES.MISSING(TITLE));
            console.log(this.validate.isValid)
            return this.validate;
        }
        const title = input.slice(quoteStart + 1, quoteEnd);
        this.validate['title'] = title;

        const rest = input
            .slice(quoteEnd + 1)
            .trim()
            .split(' ')
            .filter(Boolean); // what is this? i mean how does it work
        if (rest.length > 2) {
            console.log(MESSAGES.MAX_ARGUMENTS(command));
            return this.validate;
        }

        let priority: Priority = LOW;
        let status: Status = TODO;
        this.validate['priority'] = priority;
        this.validate['status'] = status;

        if (rest.length === 1) {
            const word = rest[0].toLowerCase();
            if (PRIORITY_ARRAY.includes(word as Priority)) {
                this.validate['priority'] = priority;
                priority = word as Priority;
            } else if (PROGRESS_ARRAY.includes(word as Status)) {
                this.validate['status'] = status;
                status = word as Status;
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(word, command));
                return this.validate;
            }
        }

        if (rest.length === 2) {
            const [first, second] = rest.map((w) => w.toLowerCase());
            if (PRIORITY_ARRAY.includes(first as Priority)) {
                this.validate['priority'] = priority;
                priority = first as Priority;
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(first, command));
                return this.validate;
            }

            if (PROGRESS_ARRAY.includes(second as Status)) {
                this.validate['status'] = status;
                status = second as Status;
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(second, command));
                return this.validate;
            }
        }
        this.validate['isValid'] = true;
        return this.validate;
    }

    private deleteValidation(input: string, command: string) {
        const argList = input.split(' ');
        if (argList.length > 2) {
            console.log(MESSAGES.MAX_ARGUMENTS(command));
            return this.validate;
        }
        if (argList.length <= 1) {
            console.log(MESSAGES.MISSING(ID));
            return this.validate;
        }
        if (argList.length === 2) {
            let second: number;
            if (!isNaN(Number(argList[1]))) {
                second = Number(argList[1]);
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
        const argList = input.split(' ');
        const length = argList.length;

        if (length > 2) {
            // if input.arglist is of size > 2 return false invalid
            console.log(MESSAGES.MAX_ARGUMENTS(LIST));
            return this.validate;
        }

        if (length === 1) {
            // if input is only list then return with true and need return in the listAll true
            this.validate['listAll'] = true;
            this.validate['isValid'] = true;
            return this.validate;
        }
        if (length === 2) {
            // if input.arglist is of size == 2 check of type an return flag accordingly
            if (argList[1] === TODO) {
                this.validate['listTodo'] = true;
            } else if (argList[1] === IN_PROGRESS) {
                this.validate['listInProgress'] = true;
            } else if (argList[1] === DONE) {
                this.validate['listDone'] = true;
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(TEXT, command));
                return this.validate;
            }
        }
        this.validate['isValid'] = true;
        return this.validate;
    }

    private markValidation(input: string, command: string): Validation {
        // mark in-progress 1
        const argList = input.split(" ");
        const length = argList.length;
        if(length > 3) {
            console.log(MESSAGES.MAX_ARGUMENTS(command));
            return this.validate;
        }
        if(length <= 2) {
            console.log(MESSAGES.MIN_ARGUMENTS(command));
            return this.validate;
        }
        if(length === 3) {
            if(PROGRESS_ARRAY.includes(argList[1])) {
                this.validate['statusCommand'] = argList[1] as Status;
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(argList[1], command));
                return this.validate;
            }
            if(isNaN(Number(argList[2]))) {
                console.log(MESSAGES.INVALID_ARGUMENT(argList[2], command));
                return this.validate;
            } else {
                this.validate['_id'] = Number(argList[2]);
            }
        }
        this.validate['isValid'] = true;
        return this.validate;
    }

    private updateValidation(input: string, command: string): Validation {
        const argList = input.split(" ");
        // this only updates the title
        const length = argList.length;
        if(length <= 2) {
            console.log(MESSAGES.MIN_ARGUMENTS(command));
            return this.validate;
        }
        if(length >= 3) {
            if(!isNaN(Number(argList[1]))) {
                this.validate['_id'] = Number(argList[1]);
            } else {
                console.log(MESSAGES.INVALID_ARGUMENT(argList[1], command));
                return this.validate;
            }
            const quoteStart = input.indexOf('"');
            const quoteEnd = input.indexOf('"', quoteStart + 1);
            if (quoteStart === -1 || quoteEnd === -1 || quoteEnd <= quoteStart + 1) {
                console.log(MESSAGES.MISSING(TITLE));

                return this.validate;
            }
            const title = input.slice(quoteStart + 1, quoteEnd);
            this.validate['title'] = title;       
        }

        this.validate['isValid'] = true;
        return this.validate;
    }
}
