'use strict';

// Navigation mobile et repère de la rubrique consultée.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
}
menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
const navLinks = [...navigation.querySelectorAll('a:not(.nav-cta)')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Les heures sont retranscrites des deux affiches présentes dans le dossier.
const schedules = {
  saturday: { times: ['13h00 — 14h00', '14h00 — 15h00', '15h00 — 16h00', '16h00 — 17h00'], source: 'rentre1.jpg' },
  sunday: { times: ['09h00 — 10h00', '10h00 — 11h00', '11h00 — 12h00', '12h00 — 13h00'], source: 'rentre.jpg' }
};
const tabs = [...document.querySelectorAll('[data-day]')];
function selectDay(tab) {
  const schedule = schedules[tab.dataset.day];
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.querySelectorAll('[data-time]').forEach((item, index) => { item.textContent = schedule.times[index]; });
  document.querySelector('#schedule-table').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#schedule-source').href = schedule.source;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectDay(tab));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[tabs.length - 1] : tabs[(index + 1) % tabs.length];
    selectDay(next);
    next.focus();
  });
});

// Filtres et visionneuse commune aux photos et aux affiches des coachs.
const filters = [...document.querySelectorAll('[data-filter]')];
const galleryItems = [...document.querySelectorAll('.gallery-item')];
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => {
    const selected = item === filter;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  galleryItems.forEach(item => {
    item.hidden = filter.dataset.filter !== 'all' && item.dataset.category !== filter.dataset.filter;
  });
}));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let album = [];
let photoIndex = 0;
let lastTrigger = null;
function displayPhoto() {
  const photo = album[photoIndex];
  lightboxImage.src = photo.dataset.image;
  lightboxImage.alt = photo.querySelector('img').alt;
  lightboxCaption.textContent = photo.dataset.caption;
  document.querySelector('.lightbox-count').textContent = `${photoIndex + 1} / ${album.length}`;
}
function movePhoto(step) {
  photoIndex = (photoIndex + step + album.length) % album.length;
  displayPhoto();
}
document.querySelectorAll('[data-image]').forEach(trigger => trigger.addEventListener('click', () => {
  album = trigger.classList.contains('gallery-item')
    ? galleryItems.filter(item => !item.hidden)
    : [...document.querySelectorAll('.coach-photo')];
  photoIndex = album.indexOf(trigger);
  lastTrigger = trigger;
  displayPhoto();
  lightbox.showModal();
  document.body.classList.add('modal-open');
  document.querySelector('.lightbox-close').focus();
}));
document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => movePhoto(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => movePhoto(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
  }
});
lightbox.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  lastTrigger?.focus();
});
document.querySelector('#year').textContent = new Date().getFullYear();
