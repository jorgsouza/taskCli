import { TaskRepository } from '../infrastructure/TaskRepository.js';
import chalk from 'chalk';

export async function deleteTask(taskId, options = {}) {
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

  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    console.log(chalk.red('Tarefa não encontrada.'));
    return;
  }

  const [removedTask] = tasks.splice(taskIndex, 1);
  await TaskRepository.saveAll(tasks);

  console.log(chalk.blue(`Tarefa removida: ${removedTask.description}`));
}
