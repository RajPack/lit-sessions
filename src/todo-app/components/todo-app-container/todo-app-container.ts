import { LitElement, html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import styles from "./todo-app-container.scss";
import fonts from '../../../../styles/css/fa.min.css'
import '../../../shared/components/dl-placeholder/dl-placeholder'
import {DlTodoItem} from '../dl-todo-item/dl-todo-item'
import { TodoItem } from "src/todo-app/interfaces/todo-item";
import { TodoItemService } from "../../services/todos.service";

@customElement("todo-app-container")
export class TodoAppContainer extends LitElement {
  static styles = [ styles, bootstrap, fonts, ...DlTodoItem.styles];

  @state() todoList?: TodoItem[]

  connectedCallback(): void {
      super.connectedCallback()
      TodoItemService.getTodoList().subscribe(list => this.todoList = list)
  }

  render() {
    return html`
      <div class="todo-app container-fluid col-8">
        <h1 class="display-3">Todo App</h1>
            ${this.renderAddTodoSection()}
            ${this.todoList ? this.renderTodoList() :this.renderTodoItemsPlaceholder()}
      </div>
    `;
  }

  renderAddTodoSection() {
      return html` <div class="input-group mb-3">
      <input
        type="text"
        class="form-control me-3"
        name=""
        id=""
        aria-describedby="helpId"
        placeholder="Add Item here"
      />
      <input
        name=""
        id=""
        class="btn btn-primary"
        type="button"
        value="Add Item"
      />
    </div>`
  }

  renderTodoList() : TemplateResult {
    const list = this.todoList as TodoItem[]
    return html`${list.map(item => html`<dl-todo-item .item=${item}></dl-todo-item>`)}`
  }

  renderTodoItemsPlaceholder(): TemplateResult {
    return html`
      <dl-placeholder>
        <div class="todo-item mb-2 rounded-1"></div>
        <div class="todo-item mb-2 rounded-1"></div>
        <div class="todo-item mb-2 rounded-1"></div>
        <div class="todo-item mb-2 rounded-1"></div>
        <div class="todo-item mb-2 rounded-1"></div>
        <div class="todo-item mb-2 rounded-1"></div>
      </dl-placeholder>
    `
  }
}
