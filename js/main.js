document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Hide all tab content sections
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Remove active style from all tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected content section & activate button
            const selectedContent = document.getElementById(`content-${targetTab}`);
            if (selectedContent) {
                selectedContent.classList.remove('hidden');
            }
            button.classList.add('active');
        });
    });
});

// Database of Shoots
const shootData = {
    'shoot-1': {
        title: 'Debut Editorial Collection',
        date: 'July 2026',
        images: [
            'img/shoots/shoot-1/slide-1-cover.png',
            'img/shoots/shoot-1/slide-2.png',
            'img/shoots/shoot-1/slide-3.png',
            'img/shoots/shoot-1/slide-4.png',
            'img/shoots/shoot-1/slide-5.png',
            'img/shoots/shoot-1/slide-6.png',
            'img/shoots/shoot-1/slide-7.png'
        ]
    }
    // Future shoots (e.g., 'shoot-2') can be added right here!
};

let currentShootKey = null;
let currentSlideIndex = 0;

// Tab Switcher Initialization
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            tabContents.forEach(content => content.classList.add('hidden'));
            tabButtons.forEach(btn => btn.classList.remove('active'));

            const selectedContent = document.getElementById(`content-${targetTab}`);
            if (selectedContent) selectedContent.classList.remove('hidden');
            button.classList.add('active');
        });
    });

    // Keyboard navigation support for modal
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('gallery-modal');
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') closeGallery();
        }
    });
});

// Open Gallery Modal
function openGallery(shootKey) {
    if (!shootData[shootKey]) return;

    currentShootKey = shootKey;
    currentSlideIndex = 0;

    const modal = document.getElementById('gallery-modal');
    document.getElementById('modal-title').textContent = shootData[shootKey].title;

    renderSlide();
    renderDots();

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

// Close Gallery Modal
function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore background scrolling
}

// Render Current Slide
function renderSlide() {
    const shoot = shootData[currentShootKey];
    const imgElement = document.getElementById('modal-image');
    const counterElement = document.getElementById('modal-counter');

    imgElement.src = shoot.images[currentSlideIndex];
    counterElement.textContent = `Slide ${currentSlideIndex + 1} of ${shoot.images.length}`;

    // Update active dot indicator
    const dots = document.querySelectorAll('#modal-dots .dot');
    dots.forEach((dot, idx) => {
        if (idx === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Render Dot Indicators
function renderDots() {
    const dotsContainer = document.getElementById('modal-dots');
    dotsContainer.innerHTML = '';

    const shoot = shootData[currentShootKey];
    shoot.images.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `dot ${idx === 0 ? 'active' : ''}`;
        dot.onclick = () => {
            currentSlideIndex = idx;
            renderSlide();
        };
        dotsContainer.appendChild(dot);
    });
}

// Slide Navigation Controls
function nextSlide() {
    const shoot = shootData[currentShootKey];
    currentSlideIndex = (currentSlideIndex + 1) % shoot.images.length;
    renderSlide();
}

function prevSlide() {
    const shoot = shootData[currentShootKey];
    currentSlideIndex = (currentSlideIndex - 1 + shoot.images.length) % shoot.images.length;
    renderSlide();
}

// Filter Logic
document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // 1. FILTER LOGIC FOR AMBER'S ORIGINAL WORKS
    // -------------------------------------------------------------
    const origFilters = document.querySelectorAll('.orig-filter');
    const origCards = document.querySelectorAll('.orig-card');

    origFilters.forEach(button => {
        button.addEventListener('click', () => {
            const targetSub = button.getAttribute('data-sub');

            origFilters.forEach(btn => {
                btn.classList.remove('bg-pink-600', 'text-white', 'shadow-sm');
                btn.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            });
            button.classList.add('bg-pink-600', 'text-white', 'shadow-sm');
            button.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

            origCards.forEach(card => {
                if (targetSub === 'all' || card.getAttribute('data-sub') === targetSub) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 2. FILTER LOGIC FOR AFFILIATED & MODELED BRANDS
    // -------------------------------------------------------------
    const affilFilters = document.querySelectorAll('.affil-filter');
    const affilCards = document.querySelectorAll('.affil-card');

    affilFilters.forEach(button => {
        button.addEventListener('click', () => {
            const targetBrand = button.getAttribute('data-brand');

            affilFilters.forEach(btn => {
                btn.classList.remove('bg-slate-900', 'text-white', 'shadow-sm');
                btn.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
            });
            button.classList.add('bg-slate-900', 'text-white', 'shadow-sm');
            button.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

            affilCards.forEach(card => {
                if (targetBrand === 'all' || card.getAttribute('data-brand') === targetBrand) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

});

// Copy to Clipboard Helper
function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btnElement.innerText;
        btnElement.innerText = 'Copied!';
        btnElement.classList.add('bg-emerald-100', 'text-emerald-700');
        
        setTimeout(() => {
            btnElement.innerText = originalText;
            btnElement.classList.remove('bg-emerald-100', 'text-emerald-700');
        }, 2000);
    });
}

// Mobile Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            // Toggle visibility
            mobileMenu.classList.toggle('hidden');

            // Toggle icon between bars and close (X)
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });
    }
});

// Journal Category Filter Logic
document.addEventListener('DOMContentLoaded', () => {
    const journalFilters = document.querySelectorAll('.journal-filter');
    const journalCards = document.querySelectorAll('.journal-card');

    if (journalFilters.length > 0) {
        journalFilters.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                // Toggle active button styles
                journalFilters.forEach(btn => {
                    btn.classList.remove('bg-pink-600', 'text-white', 'shadow-sm');
                    btn.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
                });
                button.classList.add('bg-pink-600', 'text-white', 'shadow-sm');
                button.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');

                // Filter article cards
                journalCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
});