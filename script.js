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

As we step into 2026, I just want you to know one simple thing — you are the best thing that has ever happened to me. Truly. Being with you feels unreal sometimes, like a dream I never want to wake up from. Every moment with you feels special, even the smallest ones.

Thank you for loving me the way you do. Thank you for every little care, every playful scolding, every time you worry about me more than I worry about myself. You’ve made my heart softer, my days happier, and my whole world warmer just by being in it. I didn’t know love could feel this safe and comforting until you.

When you button my shirt, get angry because I didn’t eat, tell me to sleep early, or let me rest in your lap — those moments mean everything to me. That’s when I feel most at peace. That’s when I feel like I belong. With you, I’ve found my home.

Even your playful pinches and teasing me about my “English problems” make me smile every time. And honestly… being your Pookie is something I’m really proud of. There’s no better title in the world for me. 😊

Let’s make 2026 our year — softer, deeper, sweeter, and full of memories we haven’t even imagined yet. I promise to love you more every day, to make you laugh, to stand by you, and to take care of you the way you take care of me.

You’re my baby, my princess, my panda-love, my forever.
Happy New Year 2026, my love ❤️🐼✨
Here’s to us, to our love, and to everything beautiful that’s waiting for us ahead.`;
        
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