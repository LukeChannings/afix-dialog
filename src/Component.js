const template = html`
  <div class="dialog" role="dialog" aria-modal="true">
    <slot name="content"></slot>
  </div>
  <style>
    .dialog {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      background: var(--afix-dialog-background-color, rgba(0, 0, 0, 0.75));
      transform: translateX(-100vw);
      opacity: 0;
      transition: opacity var(--afix-dialog-transition-duration, 150ms)
        var(--afix-dialog-transition-easing, cubic-bezier(0.61, 1, 0.88, 1));
      backdrop-filter: saturate(140%) blur(20px);
      -webkit-backdrop-filter: saturate(140%) blur(20px);
      pointer-events: none;
    }

    .--open {
      display: block;
      transform: translateY(0);
      opacity: 1;
      pointer-events: initial;
    }
  </style>
`;

export class DialogElement extends HTMLElement {
  constructor() {
    super();

    this.show = this.show.bind(this);
    this.close = this.close.bind(this);

    /** @type {boolean} */
    this.open = false;

    /** @type {HTMLElement | null} */
    this.htmlFor;

    this.setHtmlFor(this.getAttribute("for"));

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true)
    );

    if (this.shadowRoot) {
      const dialog = this.shadowRoot.querySelector(".dialog");
      if (dialog instanceof HTMLElement) {
        this.dialog = dialog;
      } else {
        throw new Error("couldnt get a handle on the root element");
      }
    }
  }

  show() {
    if (this.open) return;

    this.dialog.classList.add("--open");
    this.open = true;
    this.setAttribute("open", "");
    this.dispatchEvent(new Event("show"));
  }

  close() {
    if (!this.open) return;

    this.dialog.classList.remove("--open");
    this.open = false;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  }

  /**
   * @private
   * @param {string | null} htmlFor
   */
  setHtmlFor(htmlFor) {
    if (htmlFor && htmlFor !== "") {
      const htmlForEl = document.getElementById(htmlFor);
      if (htmlForEl instanceof HTMLElement) {
        if (htmlForEl === this.htmlFor) return;

        if (this.htmlFor instanceof HTMLElement) {
          this.htmlFor.removeEventListener("click", this.show);
        }

        this.htmlFor = htmlForEl;
        this.htmlFor.addEventListener("click", this.show);
      }
    }
  }

  static get observedAttributes() {
    return ["open", "for"];
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
      case "for":
        this.setHtmlFor(newValue);
        break;
    }
  }
}

export default DialogElement;

if (!customElements.get("afix-dialog")) {
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
