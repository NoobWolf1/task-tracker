import path from "path";
import * as fs from "fs";
import { Priority, Status, Task } from "../types";

export class Storage {
    private filePath: string;
    private tasks: Task[] = [];
    private lastId: number = 0;

    constructor() {
        // Creating the data directory if it doesn't exist
        const dataDir = path.join(process.cwd(), 'data');
        if(!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true});
        }

        this.filePath = path.join(dataDir, 'index.json');

    }

    private loadTasks(): void {
        try {
            if(fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf-8');
                const parsed = JSON.parse(data);

                // Convert string and dates back to data obj
                this.tasks = parsed.tasks.map((task: any) => ({
                    ...task,
                    createdAt: new Date(task.createdAt),
                    updatedAt: new Date(task.updatedAt)
                }));

                this.lastId = parsed.lastId || 0;
            } else {
                // Initialize with empty tasks and lastId = 0;
                this.saveTasks();
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
            // Initialize with empty tasks and lastId = 0
            this.tasks = [];
            this.lastId = 0;
        }
    }

    
    //Save tasks to the JSON file
   
    private saveTasks(): void {
        try {
        const data = JSON.stringify({
            tasks: this.tasks,
            lastId: this.lastId
        }, null, 2);
        
        fs.writeFileSync(this.filePath, data, 'utf8');
        } catch (error) {
        console.error('Error saving tasks:', error);
        }
    }

    /**
   * Get all tasks
   */
  public getAllTasks(): Task[] {
    return [...this.tasks]; // Return a copy to avoid direct modification
  }

  /**
   * Get tasks by status
   */
  public getTasksByStatus(status: Status): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  /**
   * Get a task by ID
   */
  public getTaskById(id: number): Task | undefined {
    return this.tasks.find(task => task._id === id);
  }

  /**
   * Add a new task
   */
  public addTask(title: string, priority?: Priority, status?: Status): Task {
    this.lastId += 1;
    const now = new Date();
    
    const newTask: Task = {
      _id: this.lastId,
      title,
      priority: priority || 'low',
      status: status || 'todo',
      createdAt: now,
      updatedAt: now
    };
    
    this.tasks.push(newTask);
    this.saveTasks();
    
    return newTask;
  }

  /**
   * Update a task
   */
  public updateTask(id: number, updates: Partial<Omit<Task, '_id' | 'createdAt'>>): Task | undefined {
    const taskIndex = this.tasks.findIndex(task => task._id === id);
    
    if (taskIndex === -1) {
      return undefined;
    }
    
    const updatedTask = {
      ...this.tasks[taskIndex],
      ...updates,
      updatedAt: new Date() // Always update the updatedAt field
    };
    
    this.tasks[taskIndex] = updatedTask;
    this.saveTasks();
    
    return updatedTask;
  }

  /**
   * Delete a task
   */
  public deleteTask(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task._id !== id);
    
    if (this.tasks.length < initialLength) {
      this.saveTasks();
      return true;
    }
    
    return false;
  }

  /**
   * Mark a task status
   */
  public markTaskStatus(id: number, status: Status): Task | undefined {
    return this.updateTask(id, { status });
  }
}