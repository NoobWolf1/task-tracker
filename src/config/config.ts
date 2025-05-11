export const HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
    TODO = 'todo',
    IN_PROGRESS = 'in-progress',
    DONE = 'done',
    TASK_CLI = 'task-cli ',
    ADD = 'add',
    DELETE = 'delete',
    MARK = 'mark',
    UPDATE = 'update',
    LIST = 'list',
    VALID_INPUT = [ADD, UPDATE, DELETE, MARK, LIST],
    PRIORITY_ARRAY = [LOW, MEDIUM, HIGH],
    PROGRESS_ARRAY = [TODO, IN_PROGRESS, DONE],
    TITLE = 'quoted title',
    ID = 'id',
    TEXT = 'text'


export const MESSAGES = {
    WELCOME: 'Hi Welcome to a simple Task Manager.',
    PLEASE_ENTER_A_COMMAND: 'Please enter a command (use documentation to see all valid commands).', // make it descriptive
    QUIT: 'Press Ctrl + C to quit.',
    BYE_BYE: 'All your data is saved, see you next time.',
    SAVE: 'Saving your data.',
    DATA_SAVED: 'Your data is saved.',
    INVALID_OPTION_ENTERED: 'Invalid option selected, please refer the documentation.', // make it descriptive
    EMPTY_STRING_ENTERED: 'Empty string entered, please try again.',
    ONE_LENGTH_IS_INCORRECT: 'One word input is incorrect.',
    MISSING: (word: string) => `Missing or invalid ${word}`,
    MAX_ARGUMENTS: (command: string) => `Added more than required arguments for ${command} command.`,
    INVALID_ARGUMENT: (word: string, command: string) => `${word} is an invalid argument for ${command}`,
};
