document.addEventListener('DOMContentLoaded', () => {

    const timelapseButton = document.getElementById('timelapse-button');
    if (timelapseButton) {
      timelapseButton.onclick = function() {
            window.location.href = 'etoiles.html';
        };
    } else { console.log('Button not found');}
    const osintButton = document.getElementById('osint-button');
    if (osintButton) {
        osintButton.onclick = function() {
            window.location.href = 'osint.html';
        };
    } else { console.log('Button not found');}
});