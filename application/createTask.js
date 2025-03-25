import { Task } from "../domain/Task.js";
import { TaskRepository } from "../infrastructure/TaskRepository.js";
import chalk from "chalk";

export async function createTask(desc, options = {}) {
  const task = new Task(desc, options); // Passa as opções, incluindo "note"
  await TaskRepository.add(task);
  console.log(chalk.green(`Tarefa criada: ${desc}${options.note ? ' (Nota)' : ''}`));
}
