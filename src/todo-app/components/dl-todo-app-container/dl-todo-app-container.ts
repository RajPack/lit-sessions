import { LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import styles from "./dl-todo-app-container.scss";
import fonts from "../../../../styles/css/fa.min.css";
import "../../../shared/components/dl-placeholder/dl-placeholder";
import { DlTodoItem } from "../dl-todo-item/dl-todo-item";
import { DlTodoInput } from "../dl-todo-input/dl-todo-input";
import { TodoItem } from "src/todo-app/interfaces/todo-item";
import { TodoItemService } from "../../services/todos.service";
import { of, switchMap } from "rxjs";

@customElement("dl-todo-app-container")
export class DlTodoAppContainer extends LitElement {
  static styles = [
    styles,
    bootstrap,
    fonts,
    ...DlTodoItem.styles,
    ...DlTodoInput.styles,
  ];

  @state() todoList?: TodoItem[];

  connectedCallback(): void {
    super.connectedCallback();
    TodoItemService.getTodoList().subscribe((list) => (this.todoList = list));
  }

  addTodo(item: string) {
    TodoItemService.addTodoItem(item).subscribe((list) => {
      this.todoList = list;
      this.requestUpdate();
    });
  }

  deleteTodo(todo: TodoItem) {
    TodoItemService.deleteTodoItem(todo)
      .pipe(
        switchMap((successfulDelete) => {
          return successfulDelete
            ? TodoItemService.getTodoList()
            : of(this.todoList);
        })
      )
      .subscribe((list) => (this.todoList = list));
  }

  updateTodo(todo: TodoItem) {
    TodoItemService.updateTodoitem(todo);
  }

  render() {
    return html`
      <div class="todo-app container-fluid col-8">
        <h1 class="my-4">Todo App</h1>
        <dl-todo-input
          @addTodo=${(e: CustomEvent<string>) => this.addTodo(e.detail)}
        ></dl-todo-input>
        ${this.todoList
          ? this.renderTodoList()
          : this.renderTodoItemsPlaceholder()}
      </div>
    `;
  }

  renderTodoList(): TemplateResult {
    const list = this.todoList as TodoItem[];
    return html`${repeat(
      list,
      (item) => item.text,
      (item) => html`<dl-todo-item
        .item=${item}
        @deleteTodo=${(e: CustomEvent) => this.deleteTodo(e.detail)}
        @taskComplete=${(e: CustomEvent) =>
          this.updateTodo({
            ...e.detail.item,
            isComplete: e.detail.isComplete,
          })}
      ></dl-todo-item>`
    )}`;
  }

  renderTodoItemsPlaceholder(): TemplateResult {
    return html`
      <dl-placeholder>
        <div class="todo-item my-4 rounded"></div>
        <div class="todo-item my-4 rounded"></div>
        <div class="todo-item my-4 rounded"></div>
        <div class="todo-item my-4 rounded"></div>
      </dl-placeholder>
    `;
  }
}
