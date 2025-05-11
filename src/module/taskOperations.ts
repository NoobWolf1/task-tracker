import { Status, Task, Validation } from '../types';
import { Storage } from './storage';

export class TaskOperations {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  /**
   * Add a new task
   */
  public addTask(validatedObj: Validation): void {
    const { title, priority, status } = validatedObj;
    
    if (!title) {
      console.error('Title is required to add a task');
      return;
    }
    
    const newTask = this.storage.addTask(title, priority, status);
    console.log(`Task added successfully (ID: ${newTask._id})`);
  }

  /**
   * Update a task
   */
  public updateTask(validatedObj: Validation): void {
    const { _id, title } = validatedObj;
    
    if (!_id || !title) {
      console.error('Task ID and title are required to update a task');
      return;
    }
    
    const updatedTask = this.storage.updateTask(_id, { title });
    
    if (updatedTask) {
      console.log(`Task updated successfully (ID: ${_id})`);
    } else {
      console.error(`Task with ID ${_id} not found`);
    }
  }

  /**
   * Delete a task
   */
  public deleteTask(validatedObj: Validation): void {
    const { _id } = validatedObj;
    
    if (!_id) {
      console.error('Task ID is required to delete a task');
      return;
    }
    
    const deleted = this.storage.deleteTask(_id);
    
    if (deleted) {
      console.log(`Task deleted successfully (ID: ${_id})`);
    } else {
      console.error(`Task with ID ${_id} not found`);
    }
  }

  /**
   * Mark a task's status
   */
  public markTaskStatus(validatedObj: Validation): void {
    const { _id, statusCommand } = validatedObj;
    
    if (!_id || !statusCommand) {
      console.error('Task ID and status are required to mark a task');
      return;
    }
    
    const markedTask = this.storage.markTaskStatus(_id, statusCommand);
    
    if (markedTask) {
      console.log(`Task marked as ${statusCommand} successfully (ID: ${_id})`);
    } else {
      console.error(`Task with ID ${_id} not found`);
    }
  }

  /**
   * List tasks
   */
  public listTasks(validatedObj: Validation): void {
    if (validatedObj.listAll) {
      this.displayTasks(this.storage.getAllTasks());
    } else if (validatedObj.listTodo) {
      this.displayTasks(this.storage.getTasksByStatus('todo'));
    } else if (validatedObj.listInProgress) {
      this.displayTasks(this.storage.getTasksByStatus('in-progress'));
    } else if (validatedObj.listDone) {
      this.displayTasks(this.storage.getTasksByStatus('done'));
    }
  }

  /**
   * Display tasks in a formatted way
   */
  private displayTasks(tasks: Task[]): void {
    if (tasks.length === 0) {
      console.log('No tasks found');
      return;
    }

    console.log('\n=== Tasks ===');
    tasks.forEach(task => {
      const createdAtFormatted = task.createdAt.toLocaleString();
      const updatedAtFormatted = task.updatedAt.toLocaleString();
      
      console.log(`ID: ${task._id}`);
      console.log(`Title: ${task.title}`);
      console.log(`Priority: ${task.priority}`);
      console.log(`Status: ${task.status}`);
      console.log(`Created: ${createdAtFormatted}`);
      console.log(`Updated: ${updatedAtFormatted}`);
      console.log('---');
    });
  }
}