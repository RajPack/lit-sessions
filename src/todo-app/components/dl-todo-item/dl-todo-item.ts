import { LitElement, html, css, TemplateResult } from "lit";
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

  private _completeTask(e: InputEvent) {
    const inputElem = e.target as HTMLInputElement;
    const isComplete = inputElem.checked;
    const todoItem = this.item as TodoItem;
    todoItem.isComplete = isComplete;
    this.dispatchEvent(
      new CustomEvent("taskComplete", {
        detail: { isComplete, item: todoItem },
      })
    );
    this.requestUpdate();
  }

  render() {
    if (!this.item) {
      return html``;
    }
    return html`<div
      class="todo-item bg-light border rounded d-flex justify-content-between align-items-center shadow-sm my-4 px-4 py-2"
    >
      <div
        class="form-check form-check-inline todo-item__complete-check col-auto"
      >
        <input
          type="checkbox"
          class="form-check-input"
          value="checkedValue"
          @change=${this._completeTask}
        />
      </div>
      <span
        class="col ${this.item.isComplete
          ? "text-decoration-line-through text-muted fst-italic"
          : ""}"
        >${this.item.text}</span
      >
      <span class="col-auto fas fa-trash-can text-secondary"></span>
    </div>`;
  }
}
