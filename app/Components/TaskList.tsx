import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Task } from "../Objects/Task";

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTaskCompletion }) => {
  return (
    <ScrollView
      style={{
        flex: 1,
        marginTop: 20,
        marginBottom: 80,
        padding: 20,
        backgroundColor: "#f8f9fa",
        minHeight: "100%",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: tasks.length === 0 ? "center" : "flex-start", // Center if no tasks, otherwise align at the top
        alignItems: "center",
        paddingVertical: 20,
      }}
    >
      {tasks.length === 0 ? (
        <Text>All done! 🔥</Text> // Show this message if there are no tasks
      ) : (
        tasks.map((task) => (
          <View
            key={task.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: task.completed ? "#d4edda" : "#fff", // Green background for completed tasks
              padding: 10,
              marginVertical: 5,
              width: "90%",
              borderRadius: 10,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              elevation: 2,
            }}
          >
            {/* Checkbox to toggle task completion */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)} // Calls toggleTaskCompletion with the task ID
              style={{
                marginRight: 10,
                width: 20,
                height: 20,
                cursor: "pointer",
                borderRadius: 5,
                backgroundColor: task.completed ? "#28a745" : "#fff", // Green background for completed tasks
                border: task.completed ? "2px solid #28a745" : "2px solid #ccc", // Green border for completed tasks
              }}
            />

            {/* Task name */}
            <Text
              style={{
                marginLeft: 10,
              }}
            >
              {task.name}
            </Text>

            {/* Debug information */}
            <Text
                style={{
                    marginLeft: 10,
                    fontSize: 10,
                    color: "#6c757d",
                }}
            >
                {`ID: ${task.id}, ListID: ${task.listId ? task.listId : "None"}, Description: ${task.description ? task.description : "No description"}, Due: ${task.dueDate ? task.dueDate : "No due date"} | Time Estimate: ${task.timeEstimate ? task.timeEstimate : "No estimate"}, Completed: ${task.completed}, Created At: ${task.createdAt.toLocaleDateString()}, Last Updated: ${task.updatedAt.toLocaleDateString()}, Parent: ${task.parent ? task.parent.name : "None"} | Importance: ${task.importance}, Difficulty: ${task.difficulty}`}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default TaskList;