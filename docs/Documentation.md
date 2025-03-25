# Documentação Completa do Task CLI

## Visão Geral
O Task CLI é uma ferramenta de linha de comando para gerenciar tarefas. Ele utiliza princípios de DDD (Domain-Driven Design) e DRY (Don't Repeat Yourself) para organizar o código.

---

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd taskCli
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Torne o CLI executável:
   ```bash
   chmod +x index.js
   ```

4. Adicione o CLI globalmente ao sistema:
   ```bash
   npm link
   ```

Agora você pode usar o comando `task` globalmente no terminal.

---

## Estrutura do Projeto
- **application/**: Contém a lógica de aplicação, como criação, listagem, conclusão e exclusão de tarefas.
- **cli/**: Implementa a interface de linha de comando usando o pacote `commander`.
- **domain/**: Define a entidade `Task` e suas propriedades.
- **infrastructure/**: Gerencia o armazenamento persistente das tarefas.
- **shared/**: Contém utilitários compartilhados, como funções de leitura/escrita de arquivos.

---

## Módulos e Funcionalidades

### 1. **Task**
Local: `domain/Task.js`

Define a entidade `Task` com propriedades como `id`, `description`, `done`, `favorite`, `note` e `createdAt`. Inclui métodos como `complete()` para marcar a tarefa como concluída.

---

### 2. **TaskRepository**
Local: `infrastructure/TaskRepository.js`

Gerencia a persistência das tarefas no arquivo `tasks.json`. Oferece métodos como:
- `getAll()`: Retorna todas as tarefas.
- `saveAll(tasks)`: Salva todas as tarefas.
- `add(task)`: Adiciona uma nova tarefa.
- `remove(id)`: Remove uma tarefa pelo ID.
- `update(taskToUpdate)`: Atualiza uma tarefa existente.

---

### 3. **Comandos CLI**
Local: `cli/taskCli.js`

Define os comandos disponíveis:
- `add <desc>`: Adiciona uma nova tarefa.
- `list`: Lista todas as tarefas.
- `done <id>`: Marca uma tarefa como concluída.
- `delete [id]`: Exclui uma tarefa ou todas as concluídas com `--completed`.
- `record <tasks...>`: Grava uma lista de tarefas.

---

### 4. **Armazenamento**
Local: `shared/storage.js`

Utiliza o pacote `fs-extra` para manipular o arquivo `tasks.json`. Funções principais:
- `loadData(file)`: Carrega os dados do arquivo.
- `saveData(file, data)`: Salva os dados no arquivo.

---

### 5. **Listagem de Tarefas**
Local: `application/listTasks.js`

Agrupa tarefas por data de criação e exibe informações como:
- Total de tarefas.
- Tarefas concluídas.
- Notas.

---

### 6. **Outros Módulos**
- `createTask.js`: Cria uma nova tarefa.
- `completeTask.js`: Marca uma tarefa como concluída.
- `deleteTask.js`: Exclui tarefas.
- `recordTasks.js`: Grava múltiplas tarefas.

---

## Fluxo de Execução
1. O usuário executa um comando via CLI.
2. O comando é processado pelo `commander` em `cli/taskCli.js`.
3. A lógica correspondente é chamada nos módulos de `application/`.
4. As tarefas são manipuladas e persistidas usando `TaskRepository`.

---

## Dependências
- `chalk`: Para estilizar a saída no terminal.
- `commander`: Para criar a CLI.
- `dayjs`: Para manipulação de datas.
- `fs-extra`: Para leitura/escrita de arquivos.
- `lodash.groupby`: Para agrupar tarefas por data.

---

## Arquivo de Configuração
- `tasks.json`: Armazena as tarefas persistidas.
