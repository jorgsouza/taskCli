import { TaskRepository } from '../infrastructure/TaskRepository.js';
import chalk from 'chalk';

export async function completeTask(taskIndex) {
  const tasks = await TaskRepository.getAll();

  const index = parseInt(taskIndex, 10) - 1; // Ajusta o índice para base 0
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log(chalk.red('Índice inválido.'));
    return;
  }

  const task = tasks[index];

  if (task.done) {
    console.log(chalk.yellow('Essa tarefa já está concluída.'));
    return;
  }

  task.done = true;
  await TaskRepository.update(task);
  console.log(chalk.green(`Tarefa concluída: ${chalk.strikethrough(task.description)}`));
}