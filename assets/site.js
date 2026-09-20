/* =========================================================
   YASIN KAYA KUCUKBAS — PORTFOLIO
   Tum sayfalarin ortak davranisi tek dosyada.
   Navigasyon isaretlemesi, mobil START menusu, pencere
   kapatma/geri yukleme ve iletisim formu buradan yonetilir.
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    setActiveNavLink();
    setupStartMenu();
    setupNavMinimize();
    setupWindowClose();
    setupContactForm();
    setCurrentYear();
  });

  /* ---------- 1. Bulundugumuz sayfanin menu linkini isaretle ----------
     Menu HTML'i her sayfada ayni; aktif link burada hesaplanir,
     boylece elle isaretleme hatasi olmaz. */
  function setActiveNavLink() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('#nav-links a[data-nav]');

    Array.prototype.forEach.call(links, function (link) {
      if (link.getAttribute('data-nav') === path) {
        link.classList.add('text-personal', 'underline', 'decoration-4', 'underline-offset-4');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---------- 2. Mobil START menusu ----------
     768px altinda menu linkleri yatayda tasiyordu. Artik
     baslik cubugundaki START dugmesi acip kapatiyor. */
  function setupStartMenu() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('max-md:hidden') === false;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'START ▼' : 'START ▲';
    });

    // Bir linke tiklaninca menu kapansin
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth < 768) {
        links.classList.add('max-md:hidden');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'START ▲';
      }
    });

    // Esc ile kapat
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !links.classList.contains('max-md:hidden')) {
        links.classList.add('max-md:hidden');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'START ▲';
      }
    });
  }

  /* ---------- 3. Menuyu kucult / geri yukle ---------- */
  function setupNavMinimize() {
    var navbar = document.getElementById('os-navbar');
    var closeBtn = document.getElementById('nav-close-btn');
    var reopen = document.getElementById('reopen-trigger');
    if (!navbar || !closeBtn || !reopen) return;

    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      navbar.style.transform = 'translateY(-160%) scale(0.85)';
      navbar.style.opacity = '0';
      window.setTimeout(function () {
        navbar.classList.add('hidden');
        reopen.classList.remove('hidden');
        reopen.focus();
      }, 350);
    });

    reopen.addEventListener('click', function () {
      reopen.classList.add('hidden');
      navbar.classList.remove('hidden');
      window.setTimeout(function () {
        navbar.style.transform = 'translateY(0) scale(1)';
        navbar.style.opacity = '1';
      }, 10);
    });
  }

  /* ---------- 4. Pencere [X] dugmeleri ----------
     Eskiden dekoratiflerdi ama tiklanabilir gorunuyorlardi.
     Artik gercekten kartlari kapatiyor; alttaki gorev cubugu
     hepsini geri getiriyor. */
  function setupWindowClose() {
    var buttons = document.querySelectorAll('[data-win-close]');
    var taskbar = document.getElementById('taskbar');
    var restoreBtn = document.getElementById('restore-all');
    if (!buttons.length) return;

    var closed = [];

    Array.prototype.forEach.call(buttons, function (btn) {
      btn.addEventListener('click', function () {
        var win = btn.closest('[data-window]');
        if (!win) return;
        win.style.transition = 'transform .2s ease-in, opacity .2s ease-in';
        win.style.transform = 'scale(.9)';
        win.style.opacity = '0';
        window.setTimeout(function () {
          win.classList.add('hidden');
          closed.push(win);
          if (taskbar) taskbar.classList.remove('hidden');
        }, 200);
      });
    });

    if (restoreBtn) {
      restoreBtn.addEventListener('click', function () {
        closed.forEach(function (win) {
          win.classList.remove('hidden');
          win.style.transform = 'scale(1)';
          win.style.opacity = '1';
        });
        closed = [];
        if (taskbar) taskbar.classList.add('hidden');
      });
    }
  }

  /* ---------- 5. Iletisim formu ---------- */
  function setupContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var modal = document.getElementById('status-modal');
    var modalTitle = document.getElementById('modal-status-text');
    var modalBody = document.getElementById('modal-message-text');
    var modalOk = document.getElementById('modal-ok-btn');
    var modalClose = document.getElementById('modal-close');

    function showModal(title, message) {
      modalTitle.textContent = title;
      modalBody.textContent = message;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      modalOk.focus();
    }
    function hideModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    if (modalOk) modalOk.addEventListener('click', hideModal);
    if (modalClose) modalClose.addEventListener('click', hideModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideModal();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var timeInput = document.getElementById('current_time');
      if (timeInput) timeInput.value = new Date().toLocaleString('tr-TR');

      var submitBtn = document.getElementById('submitBtn');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'SENDING...';
      submitBtn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form)))
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            showModal('SUCCESS!', 'Your message has been sent. I will get back to you as soon as possible.');
            form.reset();
          } else {
            showModal('ERROR!', 'Something went wrong: ' + (result.data.message || 'unknown error'));
          }
        })
        .catch(function () {
          showModal('SYSTEM ERROR!', 'Connection failed. Please check your internet connection and try again.');
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  }

  /* ---------- 6. Footer yili ---------- */
  function setCurrentYear() {
    var el = document.getElementById('current-year');
    if (el) el.textContent = String(new Date().getFullYear());
  }
})();
