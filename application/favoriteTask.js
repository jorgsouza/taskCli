import { TaskRepository } from '../infrastructure/TaskRepository.js';
import chalk from 'chalk';

export async function favoriteTask(taskIndex) {
  const tasks = await TaskRepository.getAll();

  const index = parseInt(taskIndex, 10) - 1; // Adjust to 0-based index
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log(chalk.red('Invalid index.'));
    return;
  }

  const task = tasks[index];
  task.favorite = !task.favorite; // Toggle favorite status
  
  await TaskRepository.update(task);
  console.log(
    task.favorite
      ? chalk.yellow(`Task marked as favorite: ${task.description}`)
      : chalk.blue(`Task removed from favorites: ${task.description}`)
  );
}
