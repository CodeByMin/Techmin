const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set initial canvas size based on the entire page height
canvas.width = window.innerWidth;
canvas.height = document.body.scrollHeight;

const particlesArray = [];
const maxParticles = 400; // Number of particles
let mouse = {
    x: null,
    y: null,
    radius: 150 // Mouse proximity radius for interaction
};

// Track mouse movement
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y + window.scrollY; // Adjust for scrolling
});

// Particle class definition
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.birthSize = size;
    }

    // Draw particle with a slight blur effect
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, 0.8)`; // Slight opacity
        ctx.fill();
    }

    // Update particle position
    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Move particle
        this.x += this.directionX * 2; // Adjust speed
        this.y += this.directionY * 2; // Adjust speed

        // Check collision with mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        this.draw(); // Draw particle after updating position
    }
}

// Create particle array
function init() {
    particlesArray.length = 0;
    for (let i = 0; i < maxParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size; // Spread particles over full canvas height
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#ffffff';
        let particle = new Particle(x, y, directionX, directionY, size, color);
        particlesArray.push(particle);
    }
}

// Animate particles and connect them with lines
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
    requestAnimationFrame(animate);
}

// Draw lines between particles
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                opacityValue = 1 - (distance / 100);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Resize canvas and update particles when window is resized
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; // Set height based on scrollable height
    init(); // Reinitialize particles after resizing
});

// Update canvas size when scrolling
window.addEventListener('scroll', function() {
    canvas.height = document.body.scrollHeight; // Adjust to new scrollable height
    init(); // Reinitialize particles to account for new page height
});

// Mouse out effect (stop interaction)
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Initialize and animate particles
init();
animate();

// Resume data
const resumes = [
    { title: "Software Engineer", description: "Developing applications.", count: 1 },
    { title: "Product Manager", description: "Overseeing product development.", count: 2 },
    { title: "Data Scientist", description: "Analyzing data for insights.", count: 3 }
];

// Function to display resumes
function displayResumes() {
    const statsContainer = document.getElementById('stats');

    resumes.forEach(resume => {
        const statItem = document.createElement('div');
        statItem.classList.add('stat-item');

        // Create a structured display with three lines
        statItem.innerHTML = `
            <h2>${resume.title}</h2>
            <p>${resume.description}</p>
            <p>Count: ${resume.count}</p>
        `;
        
        statsContainer.appendChild(statItem);
    });
}

// Call the function to display resumes
displayResumes();
