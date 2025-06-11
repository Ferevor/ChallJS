// Sélection de l'élément DVD
const dvd = document.getElementById('dvd');

// Dimensions de l'écran
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

// Position et vitesse initiales
let x = 400; // Position initiale en X
let y = 250; // Position initiale en Y
let dx = 2;  // Vitesse en X
let dy = 2;  // Vitesse en Y

// Fonction pour générer une couleur aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Fonction pour déplacer le logo
function moveDVD() {
    // Mise à jour des positions
    x += dx;
    y += dy;

    // Obtenir les dimensions réelles du SVG
    const dvdRect = dvd.getBoundingClientRect();

    // Vérification des collisions avec les bords
    if (x + dvdRect.width >= screenWidth || x <= 0) {
        dx = -dx; // Inverser la direction horizontale
        dvd.style.fill = getRandomColor(); // Changer la couleur
    }
    if (y + dvdRect.height >= screenHeight || y <= 0) {
        dy = -dy; // Inverser la direction verticale
        dvd.style.fill = getRandomColor(); // Changer la couleur
    }

    // Appliquer les nouvelles positions
    dvd.style.left = x + 'px';
    dvd.style.top = y + 'px';

    // Appel récursif pour l'animation
    requestAnimationFrame(moveDVD);
}

// Initialisation de l'animation
function moov() {
    dvd.style.position = 'absolute'; // S'assurer que l'élément est positionné
    moveDVD();
}

// Mettre à jour les dimensions de l'écran en cas de redimensionnement
window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
});