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
    const username = 'codygeorge315'; // Verify this is your exact MonkeyType username
    const wpmElement = document.getElementById('monkeytype-wpm');
    const accuracyElement = document.getElementById('monkeytype-accuracy');
    
    console.log('Fetching MonkeyType stats...');
    console.log('WPM Element:', wpmElement);
    console.log('Accuracy Element:', accuracyElement);
    
    if (!wpmElement || !accuracyElement) {
        console.log('MonkeyType elements not found, aborting fetch');
        return;
    }
    
    try {
        console.log('Making API request to MonkeyType...');
        
        // Try multiple approaches to handle CORS issues
        let response;
        let apiUrl = `https://api.monkeytype.com/v1/users/profile?username=${username}`;
        
        // Try different API endpoints (updated based on current MonkeyType API)
        const apiEndpoints = [
            `https://api.monkeytype.com/v1/users/${username}`,
            `https://api.monkeytype.com/v1/users/${username}/profile`,
            `https://api.monkeytype.com/v1/users/profile?username=${username}`,
            `https://api.monkeytype.com/v1/users/${username}/personal-bests`
        ];
        
        let success = false;
        
        for (let endpoint of apiEndpoints) {
            try {
                console.log(`Trying endpoint: ${endpoint}`);
                response = await fetch(endpoint, {
                    headers: {
                        'Authorization': `Bearer Njg4ODYyM2ZkZWJmZjc4YTQzMWFlNGQ4LlNkUWphUUpHb3dJWHFIbERRX3ZrVy0waW5ZcHl2Mkdw`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    console.log(`API call successful with endpoint: ${endpoint}`);
                    success = true;
                    break;
                } else {
                    console.log(`Endpoint ${endpoint} returned status: ${response.status}`);
                }
            } catch (error) {
                console.log(`Endpoint ${endpoint} failed:`, error.message);
            }
        }
        
        if (!success) {
            // Try with CORS proxies
            for (let endpoint of apiEndpoints) {
                try {
                    console.log(`Trying CORS proxy for: ${endpoint}`);
                    const corsProxy = 'https://api.allorigins.win/raw?url=';
                    response = await fetch(corsProxy + encodeURIComponent(endpoint));
                    if (response.ok) {
                        console.log('CORS proxy call successful');
                        success = true;
                        break;
                    }
                } catch (proxyError) {
                    console.log('CORS proxy failed, trying alternative...');
                    try {
                        const altProxy = 'https://corsproxy.io/?';
                        response = await fetch(altProxy + encodeURIComponent(endpoint));
                        if (response.ok) {
                            console.log('Alternative proxy call successful');
                            success = true;
                            break;
                        }
                    } catch (altError) {
                        console.log('Alternative proxy also failed');
                    }
                }
            }
        }
        
        // If all API calls fail, use fallback data
        if (!response || !response.ok) {
            console.log('All API attempts failed, using fallback data');
            // Use your known stats as fallback
            const fallbackWpm = 83;
            const fallbackAccuracy = 99.0; // Updated to match your display
            
            animateNumber(wpmElement, parseInt(wpmElement.textContent), fallbackWpm);
            animateNumber(accuracyElement, 0, fallbackAccuracy, true);
            return;
        }
        
        console.log('API Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch MonkeyType stats: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Data received:', data);
        
        // Try different data structures that MonkeyType API might return
        let personalBests = null;
        let userData = null;
        
        // Check various possible data structures
        if (data.data && data.data.personalBests) {
            personalBests = data.data.personalBests;
            userData = data.data;
        } else if (data.personalBests) {
            personalBests = data.personalBests;
            userData = data;
        } else if (data.data) {
            userData = data.data;
        } else if (data) {
            userData = data;
        }
        
        console.log('Personal bests found:', personalBests);
        console.log('User data found:', userData);
        
        let highestWpm = 83; // Fallback to your current high
        let highestAccuracy = 0;
        
        // Extract stats from personal bests if available
        if (personalBests && personalBests.time) {
            const timeModes = personalBests.time;
            console.log('Time modes found:', Object.keys(timeModes));
            
            // Check different time modes for highest WPM and accuracy
            Object.values(timeModes).forEach(mode => {
                if (mode) {
                    if (mode.wpm > highestWpm) {
                        highestWpm = mode.wpm;
                    }
                    if (mode.accuracy > highestAccuracy) {
                        highestAccuracy = mode.accuracy;
                    }
                }
            });
        }
        
        // Also check for stats in user data
        if (userData) {
            if (userData.personalBests && userData.personalBests.wpm > highestWpm) {
                highestWpm = userData.personalBests.wpm;
            }
            if (userData.personalBests && userData.personalBests.accuracy > highestAccuracy) {
                highestAccuracy = userData.personalBests.accuracy;
            }
        }
        
        console.log('Highest WPM found:', highestWpm);
        console.log('Highest Accuracy found:', highestAccuracy);
        
        // Update the displays with animation
        animateNumber(wpmElement, parseInt(wpmElement.textContent), highestWpm);
        
        // Only update accuracy if we found a value greater than 0
        if (highestAccuracy > 0) {
            const currentAccuracy = accuracyElement.textContent === '99%' ? 99 : parseFloat(accuracyElement.textContent);
            animateNumber(accuracyElement, currentAccuracy, highestAccuracy, true);
        }
    } catch (error) {
        console.log('MonkeyType API error:', error);
        console.log('Error details:', error.message);
        // Keep the current values if API fails
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