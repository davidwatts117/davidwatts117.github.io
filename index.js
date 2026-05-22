'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // --- Active nav link highlight on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.primary-nav a');

    const updateActiveNav = () => {
        let currentId = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                currentId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.style.color = href === `#${currentId}` ? '#4a6fa5' : '';
            link.style.fontWeight = href === `#${currentId}` ? '600' : '';
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // --- Fullscreen: sim box left, info right ---
    const canvasWrap = document.querySelector('.canvas-wrapper');
    const simLayout = document.querySelector('.sim-layout');
    if (canvasWrap && simLayout) {
        const btn = document.createElement('button');
        btn.className = 'btn-fullscreen';
        btn.innerHTML = '⛶';
        btn.title = 'Fullscreen simulation';
        canvasWrap.style.position = 'relative';
        canvasWrap.appendChild(btn);

        btn.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                simLayout.requestFullscreen().catch(() => {});
            }
        });

        document.addEventListener('fullscreenchange', () => {
            simLayout.classList.toggle('fs-active', !!document.fullscreenElement);
        });
    }

    console.log('CommonLab loaded');
});
