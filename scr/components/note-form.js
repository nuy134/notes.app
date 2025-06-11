class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Styles for the form */
      </style>
      <form id="form">
        <input type="text" id="title" placeholder="Judul" required />
        <textarea id="body" placeholder="Isi catatan" required></textarea>
        <button type="submit" disabled>Tambah Catatan</button>
      </form>
    `;

    this.titleInput = this.shadowRoot.querySelector('#title');
    this.bodyInput = this.shadowRoot.querySelector('#body');
    this.submitBtn = this.shadowRoot.querySelector('button');
    this.form = this.shadowRoot.querySelector('form');

    this.titleInput.addEventListener('input', () => this.toggleButton());
    this.bodyInput.addEventListener('input', () => this.toggleButton());
    this.form.addEventListener('submit', this.addNote.bind(this));
  }

  toggleButton() {
    const isValid = this.titleInput.value.trim() !== '' && this.bodyInput.value.trim() !== '';
    this.submitBtn.disabled = !isValid;
  }

  async addNote(event) {
    event.preventDefault();
    const title = this.titleInput.value.trim();
    const body = this.bodyInput.value.trim();

    const newNote = {
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    // Tampilkan indikator loading
    document.querySelector('loading-indicator').show();

    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const addedNote = await response.json();
        this.dispatchEvent(new CustomEvent('note-added', {
          detail: addedNote,
          bubbles: true,
          composed: true,
        }));
        this.form.reset();
        this.toggleButton();
      } else {
        console.error('Gagal menambahkan catatan');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    } finally {
      // Sembunyikan indikator loading
      document.querySelector('loading-indicator').hide();
    }
  }
}

customElements.define('note-form', NoteForm);
