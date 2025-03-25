# Task CLI

Uma ferramenta de linha de comando para gerenciar tarefas com suporte a notas, favoritos e agrupamento por data.

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
   npm run make-executable
   ```

---

## Uso

### Comandos Disponíveis

- **Adicionar uma tarefa**:
  ```bash
  task add "Descrição da tarefa"
  ```

- **Adicionar uma nota**:
  ```bash
  task add "Descrição da nota" --note
  ```

- **Listar tarefas**:
  ```bash
  task list
  ```

- **Concluir uma tarefa**:
  ```bash
  task done <id>
  ```

- **Excluir uma tarefa**:
  ```bash
  task delete <id>
  ```

- **Excluir todas as concluídas**:
  ```bash
  task delete --completed
  ```

- **Gravar múltiplas tarefas**:
  ```bash
  task record "Tarefa 1" "Tarefa 2"
  ```

---

## Exemplo de Saída

```bash
$ task list
Today - Mon Mar 25 2025 [2/4]
1. ▢ Validar todos as issues para ajudar fulaninho de tal
2. ✔ criar um sumário para a aplicação X
3. ● QA -> Falar com Fulano de tal
```

---

## Estrutura do Projeto

Veja a [documentação completa](./docs/Documentation.md) para mais detalhes.

---

## Licença
Este projeto está licenciado sob a licença ISC.
