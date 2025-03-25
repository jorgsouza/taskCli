import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho absoluto para o arquivo de armazenamento
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storagePath = path.resolve(__dirname, 'taskStorage.json');

// Função para carregar tasks do arquivo JSON
function loadTasks() {
    if (!fs.existsSync(storagePath)) {
        fs.writeFileSync(storagePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(storagePath, 'utf-8');
    return JSON.parse(data);
}

// Função para salvar tasks no arquivo JSON
function saveTasks(tasks) {
    fs.writeFileSync(storagePath, JSON.stringify(tasks, null, 2));
}

// Função para inicializar o arquivo de armazenamento com tarefas existentes
function initializeStorage(existingTasks = []) {
    if (!fs.existsSync(storagePath)) {
        // Se o arquivo não existir, cria com as tarefas fornecidas
        saveTasks(existingTasks);
        console.log('Armazenamento inicializado com tarefas existentes.');
    } else {
        const currentTasks = loadTasks();
        if (currentTasks.length === 0) {
            // Se o arquivo existir, mas estiver vazio, preenche com as tarefas fornecidas
            saveTasks(existingTasks);
            console.log('Armazenamento atualizado com tarefas existentes.');
        } else {
            console.log('Armazenamento já contém tarefas. Nenhuma alteração foi feita.');
        }
    }
}

// Função para listar tasks
function listTasks() {
    const tasks = loadTasks();
    if (tasks.length === 0) {
        console.log('Nenhuma task encontrada.');
    } else {
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    }
}

// Função para adicionar uma nova task
function addTask(task) {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    console.log(`Task adicionada: "${task}"`);
}

// Função para remover uma task
function removeTask(index) {
    const tasks = loadTasks();
    if (index < 1 || index > tasks.length) {
        console.log('Índice inválido.');
        return;
    }
    const removed = tasks.splice(index - 1, 1);
    saveTasks(tasks);
    console.log(`Task removida: "${removed}"`);
}

// Função para mesclar tarefas existentes no terminal com as do arquivo
function mergeTasks(newTasks = []) {
    const currentTasks = loadTasks();
    const mergedTasks = [...new Set([...currentTasks, ...newTasks])]; // Remove duplicatas
    saveTasks(mergedTasks);
    console.log('Tarefas mescladas com sucesso.');
}

export { listTasks, addTask, removeTask, initializeStorage, mergeTasks };
