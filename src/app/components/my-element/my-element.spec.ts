import { MyElement } from "./my-element";
import { html, fixture, expect as chaiExpect } from "@open-wc/testing";

describe("Test MyElement component", () => {
  it("creates", async () => {
    const elem = new MyElement();
    chaiExpect(elem).dom.to.exist;
  });
  it("renders my-element", async () => {
    const template = html`<my-element></my-element>`;
    const elem: MyElement = await fixture(template);
    await elem.updateComplete;
    chaiExpect(elem).shadowDom.to.equal(`<div class="container">
    App title
    </div>`);
  });
});
