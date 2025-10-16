// Everton TV Archive - JavaScript

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Everton TV Archive loaded successfully!');

    // Initialize features
    initializeNavigation();
    initializeVideoCards();
    initializeCTAButton();
    initializeCategoryCards();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the section to scroll to
            const target = this.getAttribute('href');
            console.log('Navigating to:', target);
            
            // Show notification
            showNotification(`Navigating to ${target.substring(1)} section`);
        });
    });
}

// Video card interactions
function initializeVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const videoTitle = this.querySelector('h3').textContent;
            console.log('Playing video:', videoTitle);
            playVideo(videoTitle);
        });

        // Add entrance animation
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// CTA Button functionality
function initializeCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            console.log('Watch Now button clicked');
            showNotification('Welcome to Everton TV! Browse our content below.');
            
            // Scroll to featured content
            const featuredSection = document.querySelector('.featured');
            if (featuredSection) {
                featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

// Category card interactions
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            console.log('Category selected:', categoryName);
            showNotification(`Loading ${categoryName} content...`);
        });
    });
}

// Video player simulation
function playVideo(title) {
    showNotification(`Now playing: ${title}`);
    
    // Simulate video loading
    setTimeout(() => {
        console.log('Video loaded:', title);
    }, 1000);
}

// Notification system
function showNotification(message) {
    // Check if notification already exists
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'notification';
        document.body.appendChild(notification);
        
        // Add notification styles if not already present
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: linear-gradient(135deg, #003366 0%, #0052a3 100%);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 5px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    animation: slideIn 0.3s ease-out;
                    max-width: 300px;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.animation = 'slideIn 0.3s ease-out';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 3000);
}

// Live content update simulation
function updateLiveContent() {
    const liveBadge = document.querySelector('.live-badge');
    if (liveBadge) {
        setInterval(() => {
            liveBadge.style.opacity = liveBadge.style.opacity === '0.5' ? '1' : '0.5';
        }, 1000);
    }
}

// Initialize live content updates
updateLiveContent();

// Search functionality (placeholder for future implementation)
function searchContent(query) {
    console.log('Searching for:', query);
    showNotification(`Searching for: ${query}`);
    // This would integrate with a backend API in a real implementation
}

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        playVideo,
        searchContent,
        showNotification
    };
}
