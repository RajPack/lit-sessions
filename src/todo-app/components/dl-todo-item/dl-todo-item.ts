import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TodoItem } from "src/todo-app/interfaces/todo-item";
import styles from "./dl-todo-item.scss";

@customElement("dl-todo-item")
export class DlTodoItem extends LitElement {
  static styles = [styles];
  @property({ attribute: false }) item?: TodoItem;

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  render() {
    if (!this.item) {
      return html``;
    }
    return html`<div class="todo-item row justify-content-between">
      <span class="col">${this.item.text}</span>
      <span class="col-auto fas fa-trash-can"></span>
    </div>`;
  }
}
