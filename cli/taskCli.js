import { Command } from 'commander';
import chalk from 'chalk';
import { createTask } from '../application/createTask.js';
import { listTasks } from '../application/listTasks.js';
import { deleteTask } from '../application/deleteTask.js';
import { completeTask } from '../application/completeTask.js';
import { recordTasks } from '../application/recordTasks.js';

const program = new Command();

program
  .name('task')
  .description('CLI de tarefas')
  .version('1.0.0');

program
  .command('add')
  .description('Adiciona uma nova tarefa')
  .argument('<desc>', 'Descrição da tarefa')
  .option('--note', 'Marca a tarefa como uma nota')
  .action(async (desc, options) => {
    await createTask(desc, { note: options.note });
  });

program
  .command('list')
  .description('Lista todas as tarefas')
  .action(async () => {
    await listTasks();
  });

program
  .command('done')
  .description('Marca uma tarefa como concluída')
  .argument('<id>', 'ID da tarefa')
  .action(async (id) => {
    await completeTask(id);
  });

program
  .command('delete')
  .description('Exclui uma tarefa ou todas as tarefas concluídas')
  .argument('[id]', 'ID da tarefa (opcional)')
  .option('--completed', 'Exclui todas as tarefas concluídas')
  .action(async (id, options) => {
    if (options.completed) {
      await deleteTask(null, { completed: true });
    } else if (id) {
      await deleteTask(id);
    } else {
      console.log(chalk.red('Por favor, forneça um ID ou use a opção --completed.'));
    }
  });

program
  .command('record')
  .description('Grava a lista de tarefas do terminal atual')
  .argument('<tasks...>', 'Lista de tarefas separadas por espaço')
  .action(async (tasks) => {
    await recordTasks(tasks);
  });

program.parse();
