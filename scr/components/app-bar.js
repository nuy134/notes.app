class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>Aplikasi Catatan</div>`;
  }
}

customElements.define('app-bar', AppBar);
