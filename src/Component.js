const template = html`
  <h1>Hello world</h1>
  <style>
    h1 {
      font-size: xx-large;
      color: red;
      font-family: "Comic Sans MS", cursive, sans-serif;
    }
  </style>
`;

export default class Component extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );
  }
}

customElements.define("name-afix-component", Component);

/**
 * makeTemplate is a template tag used to construct a <template>.
 * @param {TemplateStringsArray} htmlString
 */
function html(htmlString) {
  const template = document.createElement("template");
  template.innerHTML = String.raw(htmlString);
  return template;
}
