const template = html`
  <div class="dialog" role="dialog" aria-modal="true"></div>
  <style>
    .dialog {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--afix-dialog-background-color, rgba(0, 0, 0, 0.9));
      transform: translateY(0);
      transition: transform var(--afix-dialog-transition-duration, 150ms)
        var(--afix-dialog-transition-easing, ease-in-out);
      backdrop-filter: saturate(140%) blur(20px);
      -webkit-backdrop-filter: saturate(140%) blur(20px);
    }

    .dialog:empty {
      transform: translateY(100vh);
    }

    .children {
      display: contents;
    }
  </style>
`;

export class DialogElement extends HTMLElement {
  constructor() {
    super();

    /** @type {boolean} */
    this.open = false;

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

    if (this.shadowRoot) {
      const dialog = this.shadowRoot.querySelector(".dialog");
      if (dialog instanceof HTMLElement) {
        this.dialog = dialog;
      } else {
        throw new Error("error initialising");
      }
    }

    if (this.children.length) {
      this.childrenContainer = document.createElement("div");
      this.childrenContainer.classList.add("children");
      for (const child of this.children) {
        this.childrenContainer.appendChild(child);
      }
    }
  }

  show() {
    if (this.childrenContainer) {
      this.dialog.appendChild(this.childrenContainer);

      this.open = true;
      this.dispatchEvent(new Event("show"));
    }
  }

  close() {
    if (this.childrenContainer) {
      this.dialog.removeChild(this.childrenContainer);

      this.open = false;
      this.dispatchEvent(new Event("close"));
    }
  }

  static get observedAttributes() {
    return ["open"];
  }

  /**
   * @param {string} name
   * @param {string | null} _ the old attribute value
   * @param {string | null} newValue the new attribute value
   */
  attributeChangedCallback(name, _, newValue) {
    switch (name) {
      case "open":
        if (newValue === null) {
          this.close();
        } else {
          this.show();
        }
        break;
    }
  }
}

export default DialogElement;

if (!customElements.get('afix-dialog')) {
  customElements.define("afix-dialog", DialogElement);
}

/**
 * makeTemplate is a template tag used to construct a <template>.
 * @param {TemplateStringsArray} htmlString
 */
function html(htmlString) {
  const template = document.createElement("template");
  template.innerHTML = String.raw(htmlString);
  return template;
}
