// Terminal cursor tracking
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.terminal-cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
});

// Smooth scrolling for navigation links
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

// Typing effect for the hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Animation complete - remove the blinking cursor
            element.style.borderRight = 'none';
        }
    }
    
    type();
}

// Initialize typing effects when page loads
window.addEventListener('load', function() {
    // Handle the main terminal typing command
    const typingCommand = document.querySelector('.typing-command');
    if (typingCommand) {
        const originalText = typingCommand.textContent;
        typingCommand.textContent = '';
        
        // Start typing after a delay
        setTimeout(() => {
            typeWriter(typingCommand, originalText, 100);
        }, 3000);
    }
    
    // Handle the navigation brand typing
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const originalText = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '2px solid var(--text-primary)';
        
        // Start typing immediately for navigation
        setTimeout(() => {
            typeWriter(typingText, originalText, 150);
        }, 500);
    }
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Animate stats on scroll
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const finalValue = parseInt(stat.textContent);
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let currentValue = 0;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        stat.textContent = finalValue + '+';
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(currentValue) + '+';
                    }
                }, 16);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let the form submit normally to Formspree
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Show success message after a short delay
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 4px;
        color: #fff;
        font-family: 'JetBrains Mono', monospace;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#00ff41' : type === 'error' ? '#ff4757' : '#00ff00'};
        border: 1px solid ${type === 'success' ? '#00cc00' : type === 'error' ? '#cc0000' : '#00cc00'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Could implement search functionality here
        console.log('Search shortcut pressed');
    }
    
    // Escape key to close any open modals or notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00ff41, #00ff00);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
    const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// MonkeyType API Integration
async function fetchMonkeyTypeStats() {
    const username = 'codygeorge315';
    const wpmElement = document.getElementById('monkeytype-wpm');
    const accuracyElement = document.getElementById('monkeytype-accuracy');

    if (!wpmElement || !accuracyElement) {
        console.log('MonkeyType elements not found, aborting fetch');
        return;
    }

    try {
        // Use the backend proxy to fetch MonkeyType personal bests for the user
        const response = await fetch('https://monkeytypebackend-cvm7vhbjb-cody-georges-projects.vercel.app/api/monkeytype', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                endpoint: 'https://api.monkeytype.com/users/personalBests',
                method: 'GET'
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch MonkeyType personal bests: ${response.status}`);
        }

        const data = await response.json();
        // Parse data - API returns personal bests organized by mode
        let highestWpm = 0;
        let highestAccuracy = 0;
        
        if (data && data.data) {
            // Check all test modes for the highest WPM and accuracy
            const modes = ['time', 'words', 'quote', 'zen', 'custom'];
            
            modes.forEach(mode => {
                if (data.data[mode]) {
                    Object.values(data.data[mode]).forEach(modeData => {
                        if (Array.isArray(modeData)) {
                            modeData.forEach(record => {
                                if (record.wpm && record.wpm > highestWpm) {
                                    highestWpm = record.wpm;
                                }
                                if (record.acc && record.acc > highestAccuracy) {
                                    highestAccuracy = record.acc;
                                }
                            });
                        }
                    });
                }
            });
        }

        // Update the displays with animation
        animateNumber(wpmElement, parseInt(wpmElement.textContent), highestWpm);
        if (highestAccuracy > 0) {
            const currentAccuracy = accuracyElement.textContent === '99%' ? 99 : parseFloat(accuracyElement.textContent);
            animateNumber(accuracyElement, currentAccuracy, highestAccuracy, true);
        }
    } catch (error) {
        console.log('MonkeyType API error:', error);
        // Use fallback data if needed
        const fallbackWpm = 63;
        const fallbackAccuracy = 97.0;
        animateNumber(wpmElement, parseInt(wpmElement.textContent), fallbackWpm);
        animateNumber(accuracyElement, 0, fallbackAccuracy, true);
    }
}

// Animate number changes
function animateNumber(element, startValue, endValue, isDecimal = false) {
    const duration = 1000;
    const increment = (endValue - startValue) / (duration / 16);
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
            if (isDecimal) {
                element.textContent = endValue.toFixed(1) + '%';
            } else {
                element.textContent = Math.round(endValue);
            }
            clearInterval(timer);
        } else {
            if (isDecimal) {
                element.textContent = currentValue.toFixed(1) + '%';
            } else {
                element.textContent = Math.round(currentValue);
            }
        }
    }, 16);
}

// Manual stats update function (you can call this to update your stats)
function updateMonkeyTypeStats(wpm, accuracy) {
    const wpmElement = document.getElementById('monkeytype-wpm');
    const accuracyElement = document.getElementById('monkeytype-accuracy');
    
    if (wpmElement && accuracyElement) {
        animateNumber(wpmElement, parseInt(wpmElement.textContent), wpm);
        animateNumber(accuracyElement, 0, accuracy, true);
        console.log(`Updated stats: WPM ${wpm}, Accuracy ${accuracy}%`);
    }
}

// Quick update functions for common scenarios
function updateWPM(wpm) {
    const wpmElement = document.getElementById('monkeytype-wpm');
    if (wpmElement) {
        animateNumber(wpmElement, parseInt(wpmElement.textContent), wpm);
        console.log(`Updated WPM to: ${wpm}`);
    }
}

function updateAccuracy(accuracy) {
    const accuracyElement = document.getElementById('monkeytype-accuracy');
    if (accuracyElement) {
        animateNumber(accuracyElement, 0, accuracy, true);
        console.log(`Updated Accuracy to: ${accuracy}%`);
    }
}

// Fetch MonkeyType stats when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Ensure elements exist before trying to fetch
    const wpmElement = document.getElementById('monkeytype-wpm');
    const accuracyElement = document.getElementById('monkeytype-accuracy');
    
    if (wpmElement && accuracyElement) {
        // Delay the API call to avoid overwhelming the server
        setTimeout(fetchMonkeyTypeStats, 2000);
    } else {
        console.log('MonkeyType elements not found, retrying...');
        // Retry after a short delay in case DOM is still loading
        setTimeout(() => {
            const retryWpmElement = document.getElementById('monkeytype-wpm');
            const retryAccuracyElement = document.getElementById('monkeytype-accuracy');
            if (retryWpmElement && retryAccuracyElement) {
                fetchMonkeyTypeStats();
            }
        }, 1000);
    }
});

// Also try on window load as backup
window.addEventListener('load', function() {
    const wpmElement = document.getElementById('monkeytype-wpm');
    const accuracyElement = document.getElementById('monkeytype-accuracy');
    
    if (wpmElement && accuracyElement && wpmElement.textContent === '83') {
        // Only fetch if we still have the default value
        setTimeout(fetchMonkeyTypeStats, 3000);
    }
});

// Add some terminal-style console messages
console.log('%cWelcome to the Matrix...', 'color: #00ff41; font-family: "JetBrains Mono", monospace; font-size: 20px; font-weight: bold;');
console.log('%cThis portfolio was built with HTML, CSS, and JavaScript.', 'color: #00cc00; font-family: "JetBrains Mono", monospace;');
console.log('%cFeel free to explore the code!', 'color: #666666; font-family: "JetBrains Mono", monospace;'); 