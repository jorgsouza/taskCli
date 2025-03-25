import { listTasks, addTask, removeTask, initializeStorage, mergeTasks } from './taskManager.js';

// Tarefas existentes no terminal (adicione aqui as tarefas que já existem)
const terminalTasks = [
    "Comprar pão",
    "Ler um livro"
];

// Inicializar o armazenamento com as tarefas existentes (somente se necessário)
initializeStorage([]);

// Mesclar as tarefas do terminal com as do arquivo
mergeTasks(terminalTasks);

const [,, command, ...args] = process.argv;

switch (command) {
    case 'list':
        listTasks();
        break;
    case 'add':
        const task = args.join(' ');
        if (!task) {
            console.log('Por favor, forneça uma descrição para a task.');
        } else {
            addTask(task);
        }
        break;
    case 'remove':
        const index = parseInt(args[0], 10);
        if (isNaN(index)) {
            console.log('Por favor, forneça o índice da task a ser removida.');
        } else {
            removeTask(index);
        }
        break;
    default:
        console.log('Comando inválido. Use "list", "add <task>" ou "remove <index>".');
}
