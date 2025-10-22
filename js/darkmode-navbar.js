(function () {
  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('pref-theme', isDark ? 'dark' : 'light');

    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
      icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      icon.style.transform = 'rotate(180deg)';
      setTimeout(() => (icon.style.transform = 'rotate(0deg)'), 300);
    }
  }

  function applySavedTheme() {
    const saved = localStorage.getItem('pref-theme');
    const icon = document.querySelector('#theme-toggle i');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
      if (icon) icon.className = 'fas fa-sun';
    } else {
      if (icon) icon.className = 'fas fa-moon';
    }
  }

  function setup() {
    applySavedTheme();
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.removeEventListener('click', toggleTheme);
      toggle.addEventListener('click', toggleTheme);
    }
  }

  document.addEventListener('DOMContentLoaded', setup);
  document.addEventListener('pjax:complete', setup);
})();
