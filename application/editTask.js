import { TaskRepository } from '../infrastructure/TaskRepository.js';
import chalk from 'chalk';

export async function editTask(taskIndex, newDescription) {
  const tasks = await TaskRepository.getAll();

  const index = parseInt(taskIndex, 10) - 1; // Adjust to 0-based index
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log(chalk.red('Invalid index.'));
    return;
  }

  const task = tasks[index];
  const oldDescription = task.description;
  task.description = newDescription;
  
  await TaskRepository.update(task);
  console.log(chalk.green(`Task updated successfully:`));
  console.log(chalk.gray(`Old: ${oldDescription}`));
  console.log(chalk.white(`New: ${newDescription}`));
}
