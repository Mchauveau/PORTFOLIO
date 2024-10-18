document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour afficher le contenu avec un effet de fondu
    function fadeIn(element, duration) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        let start = null;
        
        function step(timestamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            element.style.opacity = Math.min(progress / duration, 1);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Fonction pour masquer le contenu avec un effet de fondu
    function fadeOut(element, duration, callback) {
        element.style.opacity = 1;
        
        let start = null;
        
        function step(timestamp) {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            element.style.opacity = Math.max(1 - progress / duration, 0);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            } else {
                element.style.display = 'none';
                if (callback) callback();
            }
        }
        
        window.requestAnimationFrame(step);
    }

    // Attendre que le DOM soit chargé, puis exécuter la fonction
    setTimeout(function() {
        const mainContent = document.querySelector('main');
        fadeIn(mainContent, 1000); // Afficher le contenu principal en 1 seconde
    }, 500); // Attendre 0.5 seconde avant de déclencher l'animation

    // Récupérer tous les liens de navigation
    const navLinks = document.querySelectorAll('nav a');

    // Ajouter un écouteur pour la navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const currentSection = document.querySelector('main > section.active-section');

            if (currentSection) {
                fadeOut(currentSection, 500, function() {
                    currentSection.classList.remove('active-section');
                    fadeIn(targetSection, 500);
                    targetSection.classList.add('active-section');
                });
            } else {
                fadeIn(targetSection, 500);
                targetSection.classList.add('active-section');
            }
        });
    });

    // Ajouter un écouteur pour les boutons de téléchargement
    const buttons = document.querySelectorAll('.download-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const file = this.getAttribute('data-file');
            const link = document.createElement('a');
            link.href = file;
            link.download = file.split('/').pop(); // Extraire le nom du fichier
            link.click();
        });
    });
});