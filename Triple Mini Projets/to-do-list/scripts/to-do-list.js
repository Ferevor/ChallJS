class Task {
    constructor(text, parent) {
        // Crée la div de la tâche
        this.div = document.createElement('div');
        this.div.className = 'task';

        // Crée la checkbox
        this.checkbox = document.createElement('input');
        this.checkbox.type = 'checkbox';

        // Ajoute le texte
        this.span = document.createElement('span');
        this.span.textContent = text;

        // Ajoute la checkbox et le texte à la div
        this.div.appendChild(this.checkbox);
        this.div.appendChild(this.span);

        // Ajoute la div au parent (tasklist)
        parent.appendChild(this.div);

        // Supprime la tâche si la checkbox est cochée
        this.checkbox.addEventListener('change', () => {
            if (this.checkbox.checked) {
                this.div.remove();
            }
        });
    }
}

// Sélection des éléments
const input = document.getElementById('taskvalue');
const button = document.getElementById('newtask');
const tasklist = document.getElementById('tasklist');

// Ajoute une nouvelle tâche au clic sur le bouton
button.addEventListener('click', () => {
    const value = input.value.trim();
    if (value !== '') {
        new Task(value, tasklist);
        input.value = '';
    }
});