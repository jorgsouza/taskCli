import { TaskRepository } from "../infrastructure/TaskRepository.js";
import { Task } from "../domain/Task.js";
import chalk from "chalk";

export async function recordTasks(taskDescriptions) {
  const tasks = await TaskRepository.getAll();

  taskDescriptions.forEach((desc) => {
    const task = new Task(desc);
    tasks.push(task);
  });

  await TaskRepository.saveAll(tasks);
  console.log(chalk.green("Tarefas gravadas com sucesso!"));
}
