/* ================================
   GLOBAL VARIABLES
   ================================ */

let musicStarted = false;
let currentSection = 'landing';

// Important Dates
const proposalDate = new Date('2025-10-12');
const firstKissDate = new Date('2025-11-19');
const todayDate = new Date();

// Wishes for the Wish Jar
const wishes = [
    "More beautiful moments together 💕",
    "Adventures and travels with you 🌍",
    "Growing stronger every day 💪",
    "Endless laughter and joy 😄",
    "More cuddles, kisses and hugs 🤗",
    "Building our dreams together ✨",
    "Creating more memories 📸",
    "Your happiness always 😊",
    "Stay happy forever and keep laughing and smiling 😍",
    "Health and peace for us 🧿"
];

/* ================================
   INITIALIZATION
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Start panda eye tracking
    startEyeTracking();
    
    // Landing click to start
    document.getElementById('landing').addEventListener('click', startJourney);
    
    // Calculate countdowns
    updateCountdowns();
});

/* ================================
   PANDA EYE TRACKING
   ================================ */

function startEyeTracking() {
    const leftPupil = document.querySelector('.left-pupil');
    const rightPupil = document.querySelector('.right-pupil');
    const leftEye = document.querySelector('.left-eye');
    const rightEye = document.querySelector('.right-eye');
    
    if (!leftPupil || !rightPupil) return;
    
    document.addEventListener('mousemove', function(e) {
        // Only track eyes on landing page
        if (currentSection !== 'landing') return;
        
        // Left Eye
        const leftEyeRect = leftEye.getBoundingClientRect();
        const leftEyeX = leftEyeRect.left + leftEyeRect.width / 2;
        const leftEyeY = leftEyeRect.top + leftEyeRect.height / 2;
        
        const leftAngle = Math.atan2(e.clientY - leftEyeY, e.clientX - leftEyeX);
        const leftDistance = Math.min(8, Math.hypot(e.clientX - leftEyeX, e.clientY - leftEyeY) / 30);
        
        const leftPupilX = Math.cos(leftAngle) * leftDistance;
        const leftPupilY = Math.sin(leftAngle) * leftDistance;
        
        leftPupil.style.transform = `translate(calc(-50% + ${leftPupilX}px), calc(-50% + ${leftPupilY}px))`;
        
        // Right Eye
        const rightEyeRect = rightEye.getBoundingClientRect();
        const rightEyeX = rightEyeRect.left + rightEyeRect.width / 2;
        const rightEyeY = rightEyeRect.top + rightEyeRect.height / 2;
        
        const rightAngle = Math.atan2(e.clientY - rightEyeY, e.clientX - rightEyeX);
        const rightDistance = Math.min(8, Math.hypot(e.clientX - rightEyeX, e.clientY - rightEyeY) / 30);
        
        const rightPupilX = Math.cos(rightAngle) * rightDistance;
        const rightPupilY = Math.sin(rightAngle) * rightDistance;
        
        rightPupil.style.transform = `translate(calc(-50% + ${rightPupilX}px), calc(-50% + ${rightPupilY}px))`;
    });
}

/* ================================
   START JOURNEY (FROM LANDING)
   ================================ */

function startJourney() {
    // Play background music
    if (!musicStarted) {
        const music = document.getElementById('bgMusic');
        music.play().catch(err => console.log('Music autoplay prevented'));
        musicStarted = true;
    }
    
    // Create floating hearts effect
    createFloatingHearts(20);
    
    // Transition to countdown section
    setTimeout(() => {
        goToSection('countdown');
    }, 1000);
}

/* ================================
   SECTION NAVIGATION
   ================================ */

function goToSection(sectionId) {
    // Hide current section
    const currentSec = document.querySelector('.section.active');
    if (currentSec) {
        currentSec.classList.remove('active');
    }
    
    // Show new section
    const newSection = document.getElementById(sectionId);
    newSection.classList.add('active');
    currentSection = sectionId;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Section-specific actions
    if (sectionId === 'wishjar') {
        setTimeout(() => fillWishJar(), 500);
    }
    
    if (sectionId === 'final') {
        setTimeout(() => typeFinalMessage(), 500);
    }
}

/* ================================
   COUNTDOWN CALCULATIONS
   ================================ */

function updateCountdowns() {
    // Days since proposal
    const daysSinceProposal = Math.floor((todayDate - proposalDate) / (1000 * 60 * 60 * 24));
    document.getElementById('daysSinceProposal').textContent = daysSinceProposal;
    
    // Days since first kiss
    const daysSinceFirstKiss = Math.floor((todayDate - firstKissDate) / (1000 * 60 * 60 * 24));
    document.getElementById('daysSinceFirstKiss').textContent = daysSinceFirstKiss;
    
    // Days of love (using proposal date as start)
    const daysOfLove = Math.floor((todayDate - proposalDate) / (1000 * 60 * 60 * 24));
    document.getElementById('daysOfLove').textContent = daysOfLove;
    
    // Animate numbers
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.countdown-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    });
}

/* ================================
   MOMENT CARDS - FLIP & TYPING EFFECT
   ================================ */

function revealMoment(card) {
    // Flip the card
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
        
        // Start typing effect
        const typingElement = card.querySelector('.typing-text');
        const text = typingElement.getAttribute('data-text');
        
        setTimeout(() => {
            typeText(typingElement, text, 30);
        }, 600);
        
        // Create heart burst
        createFloatingHearts(10);
    }
}

/* ================================
   TYPING EFFECT
   ================================ */

function typeText(element, text, speed) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ================================
   WISH JAR ANIMATION
   ================================ */

function fillWishJar() {
    const container = document.getElementById('wishesContainer');
    container.innerHTML = '';
    
    wishes.forEach((wish, index) => {
        setTimeout(() => {
            const wishPaper = document.createElement('div');
            wishPaper.className = 'wish-paper';
            wishPaper.textContent = wish;
            container.appendChild(wishPaper);
        }, index * 800);
    });
}

/* ================================
   LOVE LETTER - ENVELOPE OPENING
   ================================ */

function openLetter() {
    const envelope = document.querySelector('.envelope');
    const letterContent = document.getElementById('letterContent');
    const finalBtn = document.getElementById('finalBtn');
    
    // Open envelope animation
    envelope.classList.add('open');
    
    // Show letter after envelope opens
    setTimeout(() => {
        letterContent.classList.add('show');
        
        // Type the letter
        const letterText = document.getElementById('letterText');
        const message = `My Dearest Baby Princess,

As we step into 2026, I want you to know that you are the best thing that ever happened to me. Every moment with you feels like a beautiful dream that I never want to wake up from.

Thank you, my love, for every tiny moment that felt enormous in my heart. Thank you for every gentle nudge, every playful scold, every smile that made me forget everything else... 

You are the reason my heart became softer, my days became brighter, and my world feels warmer. Your love has transformed me in ways I never thought possible.

When you button my shirt, scold me for not eating, remind me to sleep early, or let me rest in your lap - in all these little moments, I find my home, my peace, my everything.

Even your playful pinches and teasing about my "English problems" make me smile! Being your Pookie is the greatest honor of my life. 😊

Let's make 2026 the year of us - deeper, softer, sweeter, and full of moments we haven't even dreamed of yet. I promise to love you more each day, to make you laugh, to be there for you always, and to create a lifetime of beautiful memories together.

You are my Baby, my Princess, my Panda-Love, my Forever.

Happy New Year 2026, My Love! ❤️🐼✨

Here's to us, to our love, and to all the magical moments ahead!`;
        
        typeText(letterText, message, 20);
        
        // Show button after typing
        setTimeout(() => {
            finalBtn.style.display = 'inline-block';
        }, message.length * 20 + 1000);
    }, 1000);
}

/* ================================
   FINAL MESSAGE TYPING
   ================================ */

function typeFinalMessage() {
    const finalText = document.getElementById('finalText');
    const message = `🎆 Welcome to 2026, My Beautiful Love! 🎆

This year is OURS - a year of endless love, countless smiles, beautiful adventures, and dreams coming true! 

Every sunrise will bring us closer, every sunset will make our love stronger, and every moment will be a treasure we create together.

I promise to:
• Love you more than yesterday, less than tomorrow 💕
• Make you laugh until your cheeks hurt 😄
• Be your biggest supporter and your safe place 🏠
• Create magical memories with you every single day ✨
• Cherish every pinch, every scold, every hug 🤗
• Be the best Pookie you could ever have! 🥰

You're not just my girlfriend - you're my best friend, my home, my happiness, my everything! 

Thank you for choosing me, for loving me with all my flaws (and my English problems! 😂), for making every day brighter just by being YOU!

Here's to 2026 - Our Year of Love, Laughter, and Forever! 🎉

I LOVE YOU SO MUCH, MY BABY PRINCESS! ❤️👑

Forever and Always,
Your Pookie 🐼💕`;
    
    typeText(finalText, message, 25);
}

/* ================================
   SECRET MESSAGE REVEAL
   ================================ */

function revealSecret() {
    const secretMessage = document.getElementById('secretMessage');
    secretMessage.classList.add('show');
    
    // Create heart burst
    createFloatingHearts(30);
    
    // Hide button after click
    document.querySelector('.secret-btn').style.display = 'none';
}

/* ================================
   FLOATING HEARTS ANIMATION
   ================================ */

function createFloatingHearts(count) {
    const container = document.getElementById('floatingHearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            
            container.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 100);
    }
}

/* ================================
   FIREWORKS ANIMATION
   ================================ */

function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.classList.add('active');
    
    const fireworks = [];
    const particles = [];
    
    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5;
            this.speed = 3;
            this.acceleration = 1.05;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
        
        update() {
            this.speed *= this.acceleration;
            this.y -= this.speed;
            
            if (this.y <= this.targetY) {
                return true; // Explode
            }
            return false;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.velocityX = (Math.random() - 0.5) * 8;
            this.velocityY = (Math.random() - 0.5) * 8;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
            this.color = color;
        }
        
        update() {
            this.velocityY += 0.1; // Gravity
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    function createParticles(x, y, color) {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            if (fireworks[i].update()) {
                createParticles(fireworks[i].x, fireworks[i].y, fireworks[i].color);
                fireworks.splice(i, 1);
            }
        }
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Launch fireworks
    const launchInterval = setInterval(() => {
        fireworks.push(new Firework());
    }, 300);
    
    // Stop after 10 seconds
    setTimeout(() => {
        clearInterval(launchInterval);
        setTimeout(() => {
            canvas.classList.remove('active');
        }, 3000);
    }, 10000);
    
    animate();
    
    // Create heart burst
    createFloatingHearts(50);
}

/* ================================
   RESPONSIVE CANVAS RESIZE
   ================================ */

window.addEventListener('resize', function() {
    const canvas = document.getElementById('fireworksCanvas');
    if (canvas.classList.contains('active')) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

/* ================================
   PREVENT RIGHT CLICK (OPTIONAL)
   ================================ */

// Uncomment if you want to prevent right-click
// document.addEventListener('contextmenu', e => e.preventDefault());

/* ================================
   CONSOLE MESSAGE (Easter Egg)
   ================================ */

console.log('%c💕 Made with Love for My Baby Princess 💕', 'color: #d81b60; font-size: 20px; font-weight: bold;');
console.log('%c✨ Happy New Year 2026! ✨', 'color: #ff6f00; font-size: 16px;');
console.log('%c- Your Pookie 🐼', 'color: #c2185b; font-size: 14px; font-style: italic;');