const anniversaryDate = new Date(2025, 0, 25, 0, 0, 0);

function updateCounter() {
    const now = new Date();
    
    let years = now.getFullYear() - anniversaryDate.getFullYear();
    let months = now.getMonth() - anniversaryDate.getMonth();
    let days = now.getDate() - anniversaryDate.getDate();
    let hours = now.getHours() - anniversaryDate.getHours();
    let minutes = now.getMinutes() - anniversaryDate.getMinutes();
    let seconds = now.getSeconds() - anniversaryDate.getSeconds();

    // Adjust for negative values
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        let prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    // Construct the display text with separate lines
    let counterText = `
        ${years > 0 ? `<div>${years} years</div>` : ""}
        ${months > 0 ? `<div>${months} months</div>` : ""}
        <div>${days} days</div>
        <div>${hours} hours</div>
        <div>${minutes} minutes</div>
        <div>${seconds} seconds</div>
    `;

    document.getElementById("counter").innerHTML = counterText;
}

// Update the counter every second
setInterval(updateCounter, 1000);
updateCounter();

document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('playButton');
    const playIcon = playButton.querySelector('.play-icon');
    const pauseIcon = playButton.querySelector('.pause-icon');
    const musicBars = playButton.querySelector('.music-bars');

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playButton.classList.add('playing');
        } else {
            audio.pause();
            playButton.classList.remove('playing');
        }
    }

    playButton.addEventListener('click', togglePlay);

    // Update button state when audio starts playing
    audio.addEventListener('play', () => {
        playButton.classList.add('playing');
    });

    // Update button state when audio is paused
    audio.addEventListener('pause', () => {
        playButton.classList.remove('playing');
    });

    // Optional: Update button state when audio ends
    audio.addEventListener('ended', () => {
        playButton.classList.remove('playing');
    });
});


// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', () => {
    const polaroids = document.querySelectorAll('.polaroid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updatePolaroids() {
        polaroids.forEach((polaroid, index) => {
            polaroid.className = 'polaroid'; // Reset classes
            
            // Calculate position relative to current
            const position = (index - currentIndex + polaroids.length) % polaroids.length;
            
            if (position === 0) {
                polaroid.classList.add('active');
            } else if (position === 1) {
                polaroid.classList.add('next');
            } else if (position === polaroids.length - 1) {
                polaroid.classList.add('prev');
            } else if (position > 1) {
                polaroid.classList.add('back');
            } else {
                polaroid.classList.add('front');
            }
        });
    }

    // Initialize
    updatePolaroids();

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % polaroids.length;
        updatePolaroids();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
        updatePolaroids();
    });
});


// Add click effect
document.addEventListener('click', function(e) {
    // Create multiple hearts
    const heartCount = 5; // Number of hearts per click
    
    for (let i = 0; i < heartCount; i++) {
        createHeart(e.pageX, e.pageY);
    }
});

function createHeart(x, y) {
    // Create heart element
    const heart = document.createElement('div');
    heart.innerHTML = '♡';
    heart.classList.add('click-heart');
    
    // Add random size class
    const sizes = ['small', 'medium', 'large'];
    heart.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
    
    // Set random movement direction
    const moveX = (Math.random() - 0.5) * 100; // -50px to 50px
    const moveY = -100 - Math.random() * 100; // -100px to -200px upward
    const rotation = (Math.random() - 0.5) * 90; // -45deg to 45deg
    
    heart.style.setProperty('--moveX', `${moveX}px`);
    heart.style.setProperty('--moveY', `${moveY}px`);
    heart.style.setProperty('--rotation', `${rotation}deg`);
    
    // Position heart at click location with slight offset
    heart.style.left = (x + (Math.random() - 0.5) * 20) + 'px';
    heart.style.top = (y + (Math.random() - 0.5) * 20) + 'px';
    
    // Add subtle delay for each heart
    setTimeout(() => {
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 2000); // Match this with animation duration
    }, Math.random() * 100); // Random delay up to 100ms
}
