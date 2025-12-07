// State
let currentSection = 0;
const totalSections = 3;

// Elements
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Function to update active section
function updateSection(newSection, direction) {
    const oldSection = currentSection;
    
    if (newSection < 0 || newSection >= totalSections || newSection === oldSection) {
        return;
    }

    // Update current section
    currentSection = newSection;

    // Animate out old section
    const oldSectionEl = sections[oldSection];
    const newSectionEl = sections[newSection];

    // Remove all animation classes first
    sections.forEach(section => {
        section.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
    });

    // Apply exit animation to old section
    if (direction > 0) {
        oldSectionEl.classList.add('slide-out-left');
        newSectionEl.classList.add('slide-in-right');
    } else {
        oldSectionEl.classList.add('slide-out-right');
        newSectionEl.classList.add('slide-in-left');
    }

    // After a brief delay, show new section
    setTimeout(() => {
        oldSectionEl.style.position = 'absolute';
        newSectionEl.style.position = 'relative';
        newSectionEl.classList.remove('slide-in-left', 'slide-in-right');
        newSectionEl.classList.add('active');
    }, 100);

    // Update dots
    dots.forEach((dot, index) => {
        if (index === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Event listeners for navigation arrows
prevBtn.addEventListener('click', () => {
    const newSection = (currentSection - 1 + totalSections) % totalSections;
    updateSection(newSection, -1);
});

nextBtn.addEventListener('click', () => {
    const newSection = (currentSection + 1) % totalSections;
    updateSection(newSection, 1);
});

// Event listeners for dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const direction = index > currentSection ? 1 : -1;
        updateSection(index, direction);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Touch/Swipe support
let touchStartX = 0;
let touchEndX = 0;

const slider = document.querySelector('.content-slider');

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next section
            nextBtn.click();
        } else {
            // Swipe right - previous section
            prevBtn.click();
        }
    }
}

// Initialize - make sure first section is visible
sections[0].classList.add('active');
sections[0].style.position = 'relative';
for (let i = 1; i < sections.length; i++) {
    sections[i].style.position = 'absolute';
}
