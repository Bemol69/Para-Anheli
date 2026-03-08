/* =============================================
   1. TYPEWRITER EFFECT
   ============================================= */
const text = "Mi novia, mi compañera, mi nunis. Eres un regalo de Dios en mi vida y hoy celebro cada parte de ti.";
const typewriterEl = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typewriterEl.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 45);
    } else {
        typewriterEl.classList.add('done'); // Remove blinking cursor
    }
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 600);
});

/* =============================================
   2. FLOATING PARTICLES
   ============================================= */
const emojis = ['🤍', '💖', '✨', '🌸', '🕊️', '💌'];
const container = document.getElementById('particles-container');

function createParticle() {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (Math.random() * 1.2 + 0.5) + 'rem';
    const duration = Math.random() * 8 + 7;
    p.style.animationDuration = duration + 's';
    p.style.opacity = (Math.random() * 0.4 + 0.3);
    container.appendChild(p);
    setTimeout(() => p.remove(), duration * 1000);
}

setInterval(createParticle, 600);

/* =============================================
   3. SCROLL-REVEAL (Intersection Observer)
   ============================================= */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

/* =============================================
   4. HERO BUTTON SCROLL
   ============================================= */
document.getElementById('next-btn').addEventListener('click', () => {
    document.querySelector('.verse-section').scrollIntoView({ behavior: 'smooth' });
});

/* =============================================
   5. CAT SURPRISE ANIMATION
   ============================================= */
const petBtn   = document.getElementById('pet-btn');
const overlay  = document.getElementById('cat-overlay');
const catImg   = document.getElementById('cat-img');

petBtn.addEventListener('click', () => {
    petBtn.disabled = true;
    petBtn.querySelector('span').innerText = '🐱 ¡Ahí viene!';

    // Step 1: show overlay and grow cat
    overlay.classList.add('active');

    // Step 2: extra scale pop after landing
    setTimeout(() => {
        overlay.classList.add('big');
    }, 700);

    // Step 3: bounce back to normal
    setTimeout(() => {
        overlay.classList.remove('big');
    }, 1100);

    // Step 4: after 2.8s start bye animation
    setTimeout(() => {
        overlay.classList.add('bye');
    }, 2800);

    // Step 5: fully remove overlay classes
    setTimeout(() => {
        overlay.classList.remove('active', 'bye');
        petBtn.disabled = false;
        petBtn.querySelector('span').innerText = '🐾 Llamar a la gatita';
    }, 3400);
});

// Also close overlay if user taps anywhere on it
overlay.addEventListener('click', () => {
    if (overlay.classList.contains('active')) {
        overlay.classList.add('bye');
        setTimeout(() => {
            overlay.classList.remove('active', 'bye');
        }, 600);
    }
});

/* =============================================
   6. MUSIC PLAYER
   ============================================= */
const music    = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');
let musicStarted = false;

function startMusic() {
    if (!musicStarted) {
        music.volume = 0.5;
        music.play().then(() => {
            musicStarted = true;
            musicBtn.classList.add('playing');
            musicBtn.innerText = '🎵';
        }).catch(() => {});
    }
}

// Arranca la música en el primer toque del usuario
document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });

// Botón para pausar/reanudar
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // no dispara startMusic otra vez
    if (music.paused) {
        music.play();
        musicBtn.classList.add('playing');
        musicBtn.innerText = '🎵';
    } else {
        music.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerText = '🔇';
    }
});