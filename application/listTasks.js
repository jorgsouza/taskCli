import { TaskRepository } from "../infrastructure/TaskRepository.js";
import chalk from "chalk";
import dayjs from "dayjs";
import groupBy from "lodash.groupby";

// Caso queira o "Today"
const today = dayjs().format("YYYY-MM-DD");

// Função para destacar datas na descrição
function highlightDates(description) {
  const dateRegex = /\b\d{2}\.\d{2}\.\d{4}\b/g; // Formato: DD.MM.AAAA
  return description.replace(dateRegex, (match) => chalk.blue(match));
}

export async function listTasks() {
  const tasks = await TaskRepository.getAll();

  if (tasks.length === 0) {
    console.log(chalk.yellow("Nenhuma tarefa encontrada."));
    return;
  }

  const grouped = groupBy(tasks, (t) =>
    dayjs(t.createdAt).format("YYYY-MM-DD")
  );

  let total = 0;
  let done = 0;
  let notes = 0;
  let globalIndex = 1; // Contador global para numeração contínua

  for (const [date, items] of Object.entries(grouped)) {
    const label = dayjs(date).format("ddd MMM DD YYYY");
    const isToday = date === today;
    const completedCount = items.filter((t) => t.done).length;

    console.log(
      chalk.bold.cyan(
        `${isToday ? "Today - " : ""}${label} [${completedCount}/${
          items.length
        }]`
      )
    );

    items.forEach((task) => {
      total++;
      const indexDisplay = chalk.gray(`${globalIndex++}.`); // Incrementa o índice global

      let symbol = chalk.red("▢");
      let statusText = highlightDates(task.description); // Aplica destaque às datas

      if (task.done) {
        symbol = chalk.green("✔");
        statusText = chalk.strikethrough(highlightDates(task.description)); // Aplica o risco ao texto
        done++;
      }

      if (task.note) {
        symbol = chalk.blue("●"); // Símbolo para notas
        notes++;
      }

      const star = task.favorite ? chalk.yellow("★") : "";
      console.log(`${indexDisplay} ${symbol} ${statusText} ${star}`);
    });

    console.log();
  }

  const percent = Math.round((done / total) * 100);
  console.log(`${chalk.green(`${percent}%`)} of all tasks complete.`);
  console.log(
    `${chalk.green(`${done} done`)} · ${chalk.magenta(
      `${total - done} pending`
    )} · ${chalk.blue(`${notes} notes`)}`
  );

  // Salva as tarefas no arquivo após a listagem
  await TaskRepository.saveAll(tasks);
}
