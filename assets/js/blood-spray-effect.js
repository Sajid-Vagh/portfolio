// Get the elements for the effect
const canvas = document.getElementById('bloodSprayCanvas');
const customCursor = document.querySelector('.custom-cursor');

if (canvas && customCursor) {
    const ctx = canvas.getContext('2d');

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const mouse = {
        x: undefined,
        y: undefined
    };

    // MODIFICATION: Listen for mousemove on the entire window
    window.addEventListener('mousemove', (e) => {
        // Update mouse coordinates
        mouse.x = e.x;
        mouse.y = e.y;

        // Update the custom cursor's position
        customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

        // Create new particles
        for (let i = 0; i < 5; i++) { // Reduced particle count slightly for performance
            particles.push(new Particle());
        }
    });

    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 1.5 + 1; // Slightly larger particles
            this.speedX = (Math.random() - 0.5) * 2.5;
            this.speedY = (Math.random() - 0.5) * 2.5;
            this.opacity = 1;
            this.life = 50;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.02;
            this.life--;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            // Gold color gradient (as you requested)
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
            gradient.addColorStop(0, `rgba(255, 223, 0, ${this.opacity})`); // Bright Gold
            gradient.addColorStop(1, `rgba(255, 140, 0, 0)`);       // Fade to transparent orange
            
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    }

    function handleParticles() {
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].opacity <= 0 || particles[i].life <= 0) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        // Clear the canvas without drawing a background color
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }

    animate();

    // Resize the canvas when the window is resized
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}