import { LitElement, html, css } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./dl-todo-input.scss";

@customElement("dl-todo-input")
export class DlTodoInput extends LitElement {
  static styles = [styles];
  @query("#textBox") textBoxElem!: HTMLInputElement;

  private _addTodo(value: string) {
    this.textBoxElem.value = "";
    this.dispatchEvent(new CustomEvent<string>("addTodo", { detail: value }));
  }

  protected createRenderRoot(): Element | ShadowRoot {
      return this;
  }

  render() {
    return html`
      <div class="input-group input-group-lg mb-3">
        <input
          type="text"
          class="form-control"
          name=""
          id="textBox"
          aria-describedby="helpId"
          placeholder="Add todo task"
        />
        <input
          name=""
          id=""
          class="btn btn-primary"
          type="button"
          value="Add Item"
          @click=${() => this._addTodo(this.textBoxElem.value)}
        />
      </div>
    `;
  }
}
