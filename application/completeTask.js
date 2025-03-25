import { TaskRepository } from '../infrastructure/TaskRepository.js';
import chalk from 'chalk';

export async function completeTask(taskId) {
  const tasks = await TaskRepository.getAll();

  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    console.log(chalk.red('Tarefa não encontrada.'));
    return;
  }

  if (task.done) {
    console.log(chalk.yellow('Essa tarefa já está concluída.'));
    return;
  }

  task.done = true;
  await TaskRepository.update(task);
  console.log(chalk.green(`Tarefa concluída: ${task.description}`));
}