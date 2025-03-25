import { loadData, saveData } from '../shared/storage.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.resolve(__dirname, '../tasks.json'); // Caminho absoluto para tasks.json

export class TaskRepository {
  static async getAll() {
    return await loadData(FILE);
  }

  static async saveAll(tasks) {
    await saveData(FILE, tasks);
  }

  static async add(task) {
    const tasks = await this.getAll();
    tasks.push(task);
    await this.saveAll(tasks);
  }

  static async remove(id) {
    let tasks = await this.getAll();
    tasks = tasks.filter(t => t.id !== id);
    await this.saveAll(tasks);
  }

  static async update(taskToUpdate) {
    let tasks = await this.getAll();
    tasks = tasks.map(t => t.id === taskToUpdate.id ? taskToUpdate : t);
    await this.saveAll(tasks);
  }
}
