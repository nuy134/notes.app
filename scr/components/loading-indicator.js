class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .loading {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          color: #6200ea;
        }
      </style>
      <div class="loading" id="loading">Loading...</div>
    `;
  }

  show() {
    this.shadowRoot.querySelector('#loading').style.display = 'block';
  }

  hide() {
    this.shadowRoot.querySelector('#loading').style.display = 'none';
  }
}

customElements.define('loading-indicator', LoadingIndicator);
