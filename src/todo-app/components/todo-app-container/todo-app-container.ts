import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import bootstrap from "bootstrap/dist/css/bootstrap.css";
import styles from "./todo-app-container.scss";

@customElement("todo-app-container")
export class TodoAppContainer extends LitElement {
  static styles = [bootstrap, styles];

  render() {
    return html`
      <div class="todo-app container-fluid col-10">
        <h1 class="display-3">Todo App</h1>
            ${this.getAddTaskTemplate()}
      </div>
    `;
  }

  getAddTaskTemplate() {
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
}
