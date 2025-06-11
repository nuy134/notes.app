const notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>Aplikasi Catatan</div>`;
  }
}

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
        form {
          display: flex;
          flex-direction: column;
        }
        input, textarea, button {
          font-family: inherit;
          font-size: 1rem;
          padding: 0.6rem;
          margin-bottom: 1rem;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 100%;
          box-sizing: border-box;
        }
        textarea {
          resize: vertical;
          min-height: 80px;
        }
        button {
          background: #6200ea;
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background: #4b00b5;
        }
        button:disabled {
          background: #999;
          cursor: not-allowed;
        }
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

  addNote(event) {
    event.preventDefault();
    const title = this.titleInput.value.trim();
    const body = this.bodyInput.value.trim();

    const newNote = {
      id: `notes-${Date.now()}`,
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.dispatchEvent(new CustomEvent('note-added', {
      detail: newNote,
      bubbles: true,
      composed: true,
    }));

    this.form.reset();
    this.toggleButton();
  }
}

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.notes = [...notesData];
  }

  connectedCallback() {
    this.render();

    this.addEventListener('note-added', (e) => {
      this.notes.push(e.detail);
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 0;
        }
        .note-item {
          background: #fff;
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          word-wrap: break-word;
        }
        .note-item h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          color:rgb(1, 7, 84);
          word-break: break-word;
        }
        .note-item p {
          flex-grow: 1;
          white-space: pre-wrap;
          color: #555;
          margin: 0 0 0.8rem 0;
          word-break: break-word;
        }
        .note-meta {
          font-size: 0.8rem;
          color: #888;
          text-align: right;
          user-select: none;
        }
      </style>
      <div class="grid" aria-label="Daftar catatan">
        ${this.notes.map(note => `
          <div class="note-item" role="article">
            <h3>${this.escapeHTML(note.title)}</h3>
            <p>${this.escapeHTML(note.body)}</p>
            <div class="note-meta">${new Date(note.createdAt).toLocaleString()}</div>
          </div>
        `).join('')}
      </div>
    `;
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

customElements.define('app-bar', AppBar);
customElements.define('note-form', NoteForm);
customElements.define('note-list', NoteList);
