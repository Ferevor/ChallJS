//Row reversal
document.querySelectorAll('.section img').forEach(img => {
    img.addEventListener('click', () => {
        const section = document.querySelector('.section');
        section.classList.toggle('reverse');
    });
});

//Give your name
document.querySelector('.button').addEventListener('click', () => {
    const input = document.querySelector('.input');
    const name = input.value.trim();

    if (name) {
        const contactSection = document.querySelector('.section-right');
        const paragraph = contactSection.querySelector('p');
        paragraph.textContent = `Welcome, Comrade ${name} 👋! Together, we shall carry the revolutionary spirit forward.`;

        // Remove the input and button
        input.remove();
        document.querySelector('.button').remove();
    }
});

//Modal
document.querySelectorAll('.article-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const card = link.closest('.chip'); // Trouve la carte parente
        const modal = document.getElementById('modal');
        const title = card.querySelector('.title-dash').textContent;
        const body = card.querySelector('.chip-content').textContent;

        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-body').textContent = body;

        modal.classList.replace("hidden", "visible"); // Affiche le modal
    });
});

// Fermer le modal
document.querySelector('.close-button').addEventListener('click', () => {
    const modal = document.getElementById('modal');
    modal.classList.replace("visible", "hidden"); // Cache le modal
});

// Fermer le modal avec la touche Échap
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { // Vérifie si la touche Échap est pressée
        const modal = document.getElementById('modal');
        if (modal.classList.contains('visible')) {
            modal.classList.replace("visible", "hidden"); // Cache le modal
        }
    }
});

// Allignement du texte
document.getElementById('align-left').addEventListener('click', () => {
    const modalBody = document.querySelector('.modal-body');
    const modalTitle = document.querySelector('.modal-title');
    
    // Set text alignment to left
    modalBody.style.textAlign = 'left';
    modalTitle.style.textAlign = 'left';

    // Update button font-weight
    document.getElementById('align-left').classList.add('bold');
    document.getElementById('align-center').classList.remove('bold');
});

document.getElementById('align-center').addEventListener('click', () => {
    const modalBody = document.querySelector('.modal-body');
    const modalTitle = document.querySelector('.modal-title');
    
    // Set text alignment to center
    modalBody.style.textAlign = 'center';
    modalTitle.style.textAlign = 'center';

    // Update button font-weight
    document.getElementById('align-center').classList.add('bold');
    document.getElementById('align-left').classList.remove('bold');
});

// Chuck norris quote
const header = document.querySelector('.header');

async function fetchRandomQuote() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        const data = await response.json();
        header.textContent = data.value;
    } catch (error) {
        console.error('Error fetching quote:', error);
        header.textContent = 'Chuck Norris is too busy to provide a quote right now.';
    }
}

// Fetch a quote on page load
fetchRandomQuote();

// Update the quote every 10 seconds
setInterval(fetchRandomQuote, 10000);

