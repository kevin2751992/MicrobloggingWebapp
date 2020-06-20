export default class Modal extends window.HTMLElement {
  constructor () {
    super();
    // initializations

    var shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = ' <h1>Test</h1>';
  }

  // Lifecycle
  connectedCallback () {
    console.log('Component added');
  }

  attributeChangeCallback () {}
  disconnectedCallback () {}
}

const customElementRegistry = window.customElements;
customElementRegistry.define('mymodal', Modal);
