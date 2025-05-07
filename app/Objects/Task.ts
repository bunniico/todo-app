export interface Task {
    id: string;
    name: string;
    listId?: string; // ID of the list this task belongs to (reserved for future use)
    parent?: Task; // Optional parent task if this is a subtask; intended for hierarchical task structures in future updates
    subtasks?: Task[]; // Optional array of subtasks, can be used for hierarchical task structures
    description?: string;
    timeEstimate?: number; // Estimated time to complete the task in hours (supports fractional values, e.g., 1.5 for 1 hour 30 minutes)
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    dueDate?: Date;
    importance: number; // 1-5 scale for importance: 
    difficulty: number; // 1-5 scale for difficulty: 1 = Very Easy, 2 = Easy, 3 = Moderate, 4 = Hard, 5 = Very Hard
                        // 3 - Moderate importance, 4 - High importance, 
                        // 5 - Critical importance
}

export default Task;