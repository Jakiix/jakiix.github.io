document.addEventListener('DOMContentLoaded', () => {

    const timelapseButton = document.getElementById('timelapse-button');
    if (timelapseButton) {
      timelapseButton.onclick = function() {
            window.location.href = 'etoiles.html';
        };
    } else { console.log('Button not found');}
});