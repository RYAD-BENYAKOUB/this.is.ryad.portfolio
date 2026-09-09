// ═══════════════════════════════════════════
// main.js — Mohammed Ryad Portfolio
// GitHub API fetch, dark mode, scroll effects
// ═══════════════════════════════════════════

(function () {
  'use strict';

  // ── Constants ──
  const GITHUB_USER = 'RYAD-BENYAKOUB';
  const REPOS_PER_PAGE = 6;
  const GITHUB_API = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=owner`;

  // Language colors (GitHub-style)
  const LANG_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    PHP: '#4F5D95',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'Jupyter Notebook': '#DA5B0B',
    Shell: '#89e051',
    Blade: '#f7523f',
    Vue: '#41b883',
    Dart: '#00B4AB',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
  };

  // ── State ──
  let allRepos = [];
  let displayedCount = 0;

  // ── DOM Elements ──
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ══════════════════════════════════════════
  // DARK / LIGHT MODE
  // ══════════════════════════════════════════
  function initTheme() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;

    document.documentElement.classList.toggle('light', !isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }

  function toggleTheme() {
    const isLight = document.documentElement.classList.toggle('light');
    document.documentElement.classList.toggle('dark', !isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  // ══════════════════════════════════════════
  // MOBILE MENU
  // ══════════════════════════════════════════
  function initMobileMenu() {
    const toggle = $('#menu-toggle');
    const menu = $('#mobile-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const isOpen = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ══════════════════════════════════════════
  // NAVBAR SCROLL EFFECT + ACTIVE SECTION
  // ══════════════════════════════════════════
  function initNavbar() {
    const navbar = $('#navbar');
    const sections = $$('section[id]');
    const navLinks = $$('.nav-link[data-section]');

    window.addEventListener('scroll', () => {
      // Shadow on scroll
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }

      // Active section
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.dataset.section === current);
      });
    });
  }

  // ══════════════════════════════════════════
  // SMOOTH SCROLL
  // ══════════════════════════════════════════
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ══════════════════════════════════════════
  // SCROLL REVEAL
  // ══════════════════════════════════════════
  function initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    $$('.reveal').forEach((el) => observer.observe(el));
  }

  // ══════════════════════════════════════════
  // GITHUB PROJECTS
  // ══════════════════════════════════════════
  function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card reveal';

    const langColor = LANG_COLORS[repo.language] || '#8b8b8b';

    let langBadge = '';
    if (repo.language) {
      langBadge = `
        <span class="lang-badge">
          <span class="lang-dot" style="background:${langColor};"></span>
          ${repo.language}
        </span>
      `;
    }

    let starBadge = '';
    if (repo.stargazers_count > 0) {
      starBadge = `
        <span class="star-count">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          ${repo.stargazers_count}
        </span>
      `;
    }

    let homepageLink = '';
    if (repo.homepage) {
      homepageLink = `
        <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Live demo of ${repo.name}">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Live Demo
        </a>
      `;
    }

    card.innerHTML = `
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem;margin-bottom:0.5rem;">
        <h3>${formatRepoName(repo.name)}</h3>
        ${starBadge}
      </div>
      <p>${repo.description || 'No description available.'}</p>
      <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
        ${langBadge}
      </div>
      <div class="project-links">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="View ${repo.name} on GitHub">
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View Code
        </a>
        ${homepageLink}
      </div>
    `;

    return card;
  }

  function formatRepoName(name) {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function clearSkeletons() {
    for (let i = 1; i <= 6; i++) {
      const skel = $(`#skeleton-${i}`);
      if (skel) skel.remove();
    }
  }

  function showMore() {
    const grid = $('#projects-grid');
    const end = Math.min(displayedCount + REPOS_PER_PAGE, allRepos.length);

    for (let i = displayedCount; i < end; i++) {
      const card = createProjectCard(allRepos[i]);
      grid.appendChild(card);
    }

    displayedCount = end;

    // Re-observe new cards for reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    grid.querySelectorAll('.project-card:not(.active)').forEach((el) => observer.observe(el));

    // Toggle load-more button
    const container = $('#load-more-container');
    if (displayedCount >= allRepos.length) {
      container.style.display = 'none';
    } else {
      container.style.display = 'block';
    }
  }

  async function fetchProjects() {
    try {
      const response = await fetch(GITHUB_API);
      if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

      const repos = await response.json();

      // Filter out forked repos and the portfolio repo itself, sort by updated
      allRepos = repos
        .filter((r) => !r.fork && r.name !== 'RYAD-BENYAKOUB' && r.name !== 'this.is.ryad.portfolio')
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      clearSkeletons();

      if (allRepos.length === 0) {
        $('#projects-grid').innerHTML =
          '<p style="text-align:center;color:var(--text-muted);grid-column:1/-1;padding:2rem;">No projects found.</p>';
        return;
      }

      showMore();
    } catch (err) {
      console.error('Failed to fetch GitHub repos:', err);
      clearSkeletons();
      $('#projects-error').style.display = 'block';
    }
  }

  // ══════════════════════════════════════════
  // CONTACT FORM
  // ══════════════════════════════════════════
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const status = $('#form-status');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="animation:spin 1s linear infinite;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Sending...
      `;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          status.className = 'form-status success';
          status.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong. Please try emailing me directly.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // ══════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════
  function init() {
    initTheme();
    initMobileMenu();
    initNavbar();
    initSmoothScroll();
    initScrollReveal();
    initContactForm();
    fetchProjects();

    // Theme toggle buttons
    const toggleDesktop = $('#theme-toggle');
    const toggleMobile = $('#theme-toggle-mobile');
    if (toggleDesktop) toggleDesktop.addEventListener('click', toggleTheme);
    if (toggleMobile) toggleMobile.addEventListener('click', toggleTheme);

    // Load more button
    const loadMoreBtn = $('#load-more-btn');
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', showMore);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
