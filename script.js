// Curtain animation on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
});

// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.getAttribute('data-section');

        // Update active button
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update active section
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetSection) {
                section.classList.add('active');
            }
        });

        // Smooth scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Showtime interaction
const showtimeBtns = document.querySelectorAll('.time');

showtimeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const filmCard = e.target.closest('.film-card');
        const filmTitle = filmCard.querySelector('h3').textContent;
        const selectedTime = e.target.textContent;

        // Create a subtle confirmation effect
        e.target.style.transform = 'scale(1.1)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 200);

        // In a real implementation, this would link to a booking system
        console.log(`Selected: ${filmTitle} at ${selectedTime}`);
    });
});

// Add subtle parallax effect to hero on scroll
let heroContent = document.querySelector('.hero-content');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(${1 + scrolled * 0.0001})`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }

    lastScroll = scrolled;
});

// Add shimmer effect to film cards on hover
const filmCards = document.querySelectorAll('.film-card');

filmCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s ease';
    });

    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Animate heritage stories on scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const heritageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            heritageObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const heritageStories = document.querySelectorAll('.heritage-story');
heritageStories.forEach(story => {
    story.style.opacity = '0';
    story.style.transform = 'translateX(-30px)';
    story.style.transition = 'all 0.6s ease';
    heritageObserver.observe(story);
});

// Location cards animation
const locationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            locationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const locationCards = document.querySelectorAll('.location-card');
locationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    locationObserver.observe(card);
});
