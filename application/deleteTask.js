import { TaskRepository } from '../infrastructure/TaskRepository.js';
import chalk from 'chalk';

export async function deleteTask(taskIndex, options = {}) {
  const tasks = await TaskRepository.getAll();

  if (options.completed) {
    const remainingTasks = tasks.filter((t) => !t.done);
    const deletedCount = tasks.length - remainingTasks.length;

    if (deletedCount === 0) {
      console.log(chalk.yellow('Nenhuma tarefa concluída encontrada para excluir.'));
      return;
    }

    await TaskRepository.saveAll(remainingTasks);
    console.log(chalk.blue(`${deletedCount} tarefa(s) concluída(s) excluída(s).`));
    return;
  }

  const index = parseInt(taskIndex, 10) - 1; // Ajusta o índice para base 0
  if (isNaN(index) || index < 0 || index >= tasks.length) {
    console.log(chalk.red('Índice inválido.'));
    return;
  }

  const task = tasks[index];

  tasks.splice(index, 1); // Remove a tarefa pelo índice
  await TaskRepository.saveAll(tasks);

  console.log(chalk.blue('Tarefa removida com sucesso.'));
}
