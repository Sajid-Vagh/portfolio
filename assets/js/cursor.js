/* assets/js/cursor.js */

document.addEventListener('DOMContentLoaded', () => {

  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');

  const moveCursor = (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorCircle.style.transform = `translate(${posX}px, ${posY}px)`;
  };

  window.addEventListener('mousemove', moveCursor);
  
  const interactiveElements = document.querySelectorAll(
    'a, button, input, .portfolio-item, .grid-item, .card, .scroll-btn, .menu-btn, .filters li'
  );

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorCircle.classList.add('hovered');
      cursorDot.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursorCircle.classList.remove('hovered');
      cursorDot.classList.remove('hovered');
    });
  });
});