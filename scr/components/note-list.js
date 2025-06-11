class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.notes = [];
  }

  connectedCallback() {
    this.fetchNotes();
    this.addEventListener('note-added', (e) => {
      this.notes.push(e.detail);
      this.render();
    });
  }

  async fetchNotes() {
    // Tampilkan indikator loading
    document.querySelector('loading-indicator').show();

    try {
      const response = await fetch('https://notes-api.dicoding.dev/v2/notes');
      if (response.ok) {
        this.notes = await response.json();
        this.render();
      } else {
        console.error('Gagal mengambil catatan');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    } finally {
      // Sembunyikan indikator loading
      document.querySelector('loading-indicator').hide();
    }
  }

  async deleteNote(id) {
    try {
      const response = await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.render();
      } else {
        console.error('Gagal menghapus catatan');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Styles for the note list */
      </style>
      <div class="grid" aria-label="Daftar catatan">
        ${this.notes.map(note => `
          <div class="note-item" role="article">
            <h3>${this.escapeHTML(note.title)}</h3>
            <p>${this.escapeHTML(note.body)}</p>
            <div class="note-meta">${new Date(note.createdAt).toLocaleString()}</div>
            <button class="delete-btn" data-id="${note.id}">Hapus</button>
          </div>
        `).join('')}
      </div>
    `;

    this.shadowRoot.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', () => {
        const noteId = button.getAttribute('data-id');
        this.deleteNote(noteId);
      });
    });
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => {
      const chars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      };
      return chars[tag] || tag;
    });
  }
}

customElements.define('note-list', NoteList);
