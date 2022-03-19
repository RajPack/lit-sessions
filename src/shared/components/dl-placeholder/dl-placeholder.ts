import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./dl-placeholder.scss";

@customElement("dl-placeholder")
export class DlPlaceholder extends LitElement {
  static styles = [styles];


  render() {
    return html`
        <div class="placeholder-container">
            <slot></slot>
        </div>
    `;
  }
}
