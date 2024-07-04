document.addEventListener('DOMContentLoaded', () => {

    const blogButton = document.getElementById('blogButton');
    if (blogButton) {
      blogButton.onclick = function() {
            window.location.href = 'blog/main-blog.html';
        };
    } else {
        console.log('Button not found');
    }

    const timelapseButton = document.getElementById('timelapse-button');
    if (timelapseButton) {
      console.log("oui")
      timelapseButton.onclick = function() {
        console.log("oui2")
            window.location.href = 'etoiles.html';
        };
    } else {
        console.log('Button not found');
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const projectUxSquare = entry.target.querySelector('.project_ux');
        const projectDrawingSquare = entry.target.querySelector('.project_drawing');
    
        if (entry.isIntersecting) {
          if (projectUxSquare) {
            projectUxSquare.classList.add('ux-animation');
          }
          if (projectDrawingSquare) {
            projectDrawingSquare.classList.add('drawing-animation');
          }
        } else {
          if (projectUxSquare) {
            projectUxSquare.classList.remove('ux-animation');
          }
          if (projectDrawingSquare) {
            projectDrawingSquare.classList.remove('drawing-animation');
          }
        }
      });
    });
  
    const targetElement = document.querySelector('.svg_container');
    const targetElement2 = document.querySelector('.svg_container2');
  
    if (targetElement) {
      observer.observe(targetElement);
    } else {
      console.error("L'élément à observer n'a pas été trouvé.");
    }

    if (targetElement2) {
        observer.observe(targetElement2);
      } else {
        console.error("L'élément à observer n'a pas été trouvé.");
      }
    
});
