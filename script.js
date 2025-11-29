// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const titles = [
    'Cloud & DevOps Engineer',
    'Platform Engineer',
    'Infrastructure Engineer',
    'Automation Specialist'
];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
typeEffect();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when they come into view
            if (entry.target.classList.contains('skill-category')) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .timeline-item, .cert-item, .contact-content');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    loadPortfolioData();
});

// Add particle effect to hero section (optional enhancement)
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(0, 217, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    particle.style.animation = `float ${3 + Math.random() * 3}s ease-in-out infinite`;
    
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 6000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Console message for developers
console.log('%c👋 Hello, Developer!', 'color: #00d9ff; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #a855f7; font-size: 14px;');

// Load structured data from YAML and render dynamic sections
async function loadPortfolioData() {
    try {
        const response = await fetch('data.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);

        if (data.skills) renderSkills(data.skills);
        if (data.projects) renderProjects(data.projects);
        if (data.experience) renderExperience(data.experience);
        if (data.certifications) renderCertifications(data.certifications);

        // Re-attach scroll animations for newly added elements
        const newAnimateElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .timeline-item, .cert-item, .contact-content');
        newAnimateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    } catch (error) {
        console.error('Failed to load portfolio data.yaml', error);
    }
}

function renderSkills(skills) {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) return;
    skillsGrid.innerHTML = '';

    skills.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'skill-category';

        const iconClass = category.icon ? `fas fa-${category.icon}` : 'fas fa-circle';

        categoryEl.innerHTML = `
            <h3><i class="${iconClass}"></i> ${category.category}</h3>
            <div class="skill-items">
                ${category.items.map(item => `
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>${item.name}</span>
                            <span>${item.level}%</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-progress="${item.level}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        skillsGrid.appendChild(categoryEl);
    });
}

function renderProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        const iconClass = project.icon ? `fas fa-${project.icon}` : 'fas fa-folder-open';

        card.innerHTML = `
            <div class="project-icon">
                <i class="${iconClass}"></i>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <a href="#" class="project-link">View Details <i class="fas fa-arrow-right"></i></a>
        `;

        projectsGrid.appendChild(card);
    });
}

function renderExperience(experiences) {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;
    timeline.innerHTML = '';

    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';

        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <p class="company">${exp.company}</p>
                <p class="duration">${exp.duration}</p>
                <p class="location">${exp.location}</p>
                <ul>
                    ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
            </div>
        `;

        timeline.appendChild(item);
    });
}

function renderCertifications(certs) {
    const certGrid = document.getElementById('certGrid');
    if (!certGrid) return;
    certGrid.innerHTML = '';

    certs.forEach(cert => {
        const item = document.createElement('div');
        item.className = 'cert-item';

        let iconHtml = '';
        if (cert.type === 'image' && cert.iconPath) {
            iconHtml = `<img src="${cert.iconPath}" alt="${cert.name}" class="cert-icon-img">`;
        } else if (cert.type === 'fontawesome' && cert.iconClass) {
            iconHtml = `<i class="${cert.iconClass}"></i>`;
        }

        item.innerHTML = `
            ${iconHtml}
            <p>${cert.name}</p>
        `;

        certGrid.appendChild(item);
    });
}
