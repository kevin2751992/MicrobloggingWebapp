export default class Modal extends window.HTMLElement {
  constructor () {
    // Always call super first in constructor
    super();
    console.log('Component added');
    // Create a shadow root
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
         <!-- this styling is scoped to the element! -->
         <style>h1 { color: red; }</style>
         <h1>Greetings from the dark side of the DOM</h1>
      `;
  }

  // Lifecycle
  connectedCallback () {
    console.log('Component added');
  }

  attributeChangeCallback () { }
  disconnectedCallback () { }
}
window.customElements.define('my-modal', Modal);
