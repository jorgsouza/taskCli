import { randomUUID } from 'crypto';

export class Task {
  constructor(description, { favorite = false, note = false } = {}) {
    this.id = randomUUID();
    this.description = description;
    this.done = false;
    this.favorite = favorite;
    this.note = note; // Indica se a tarefa é uma nota
    this.createdAt = new Date().toISOString();
  }

  complete() {
    this.done = true;
  }
}