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

    // --- Fullscreen: let the simulation fill the whole screen ---
    // NOTE: each sim draws in a fixed logical coordinate space and maps pointer
    // positions through getBoundingClientRect(), so scaling the canvas via CSS
    // keeps mouse/touch interaction correct at any zoom level.
    const simLayout = document.querySelector('.sim-layout');
    // projectile.html uses .proj-canvas-wrap; the others use .canvas-wrapper
    const canvasWrap = document.querySelector('.canvas-wrapper, .proj-canvas-wrap');

    if (simLayout && canvasWrap) {
        const btn = document.createElement('button');
        btn.className = 'btn-fullscreen';
        btn.type = 'button';
        btn.innerHTML = '⛶';
        btn.title = 'Fullscreen simulation';
        btn.setAttribute('aria-label', 'Fullscreen simulation');
        if (getComputedStyle(canvasWrap).position === 'static') {
            canvasWrap.style.position = 'relative';
        }
        canvasWrap.appendChild(btn);

        const isFs = () => document.fullscreenElement === simLayout;

        const toggle = () => {
            if (isFs()) {
                if (document.exitFullscreen) document.exitFullscreen();
            } else {
                const req = simLayout.requestFullscreen
                    || simLayout.webkitRequestFullscreen;
                if (req) {
                    const p = req.call(simLayout);
                    if (p && p.catch) p.catch(() => {});
                }
            }
        };

        btn.addEventListener('click', toggle);

        const syncUi = () => {
            const active = isFs();
            simLayout.classList.toggle('fs-active', active);
            document.body.classList.toggle('sim-fs', active);
            btn.innerHTML = active ? '⤢' : '⛶';
            btn.title = active ? 'Exit fullscreen' : 'Fullscreen simulation';
            btn.setAttribute('aria-label', btn.title);
        };

        document.addEventListener('fullscreenchange', syncUi);
        document.addEventListener('webkitfullscreenchange', syncUi);
    }

    console.log('CommonLab loaded');
});
