import { tsAnyKeyword } from "@babel/types";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const sameTask = tasks.find((t) => t.title === newTaskTitle);

    if (sameTask) {
      return Alert.alert(
        "Task já cadastrada!",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map((task) => ({ ...task }));
    updateTasks.find((task) =>
      task.id === id ? (task.done = !task.done) : ""
    );
    setTasks(updateTasks);
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTasks = tasks.map((task) => ({ ...task }));
    updateTasks.find((task) =>
      task.id === taskId ? (task.title = taskNewTitle) : ""
    );
    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => {
            setTasks((oldState) => oldState.filter((task) => task.id !== id));
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
