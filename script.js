/* ==========================================================================
   NAVNEET SHARMA — PORTFOLIO CLIENT ENGINE
   Interactive Features, Real Data, Terminal CLI, Projects Filter & Modals
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initTypewriter();
  initCounters();
  initProjects();
  initTerminal();
  initModals();
  initCopyButtons();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER
   -------------------------------------------------------------------------- */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('navneet_theme') || 'dark';

  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('navneet_theme', next);
      showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

/* --------------------------------------------------------------------------
   2. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }, { passive: true });

  // Mobile Drawer toggles
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });

    if (drawerClose) {
      drawerClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    }

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // Active section scroll spy
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          targetNav.classList.add('active');
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const roles = [
    "LSM-Tree Storage Engines in Go",
    "High-Concurrency Backend Microservices",
    "Real-Time WebRTC & Monaco Platforms",
    "Distributed BullMQ & Cloud Pipelines",
    "200+ Algorithmic LeetCode Solutions",
    "Modern Full-Stack Applications"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 65;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIndex === current.length) {
      typingSpeed = 1800; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 350;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. STATS ANIMATED COUNTERS
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1500;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + '+';
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current) + '+';
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.hero-visual');
  if (statsSection) observer.observe(statsSection);
}

/* --------------------------------------------------------------------------
   5. REAL PROJECTS DATA & RENDERING
   -------------------------------------------------------------------------- */
const PROJECTS_DATA = [
  {
    id: "lsm-tree",
    title: "LSM-Tree Storage Engine",
    category: "systems",
    badge: "Production Engine",
    badgeType: "live",
    description: "Production-grade Log-Structured Merge-Tree storage engine with WiscKey key-value separation, embedded Bloom filters, size-tiered compaction, and interactive live dashboard in pure Go.",
    liveUrl: "https://lsm-tree-storage-engine.vercel.app",
    githubUrl: "https://github.com/navsharma26/lsm-tree-storage-engine",
    tags: ["Go", "LSM-Tree", "WiscKey", "Bloom Filters", "Compaction", "SSTables"],
    highlights: [
      "Decoupled keys and values via WiscKey architecture, reducing write amplification from O(N) to O(1) for large payloads",
      "Embedded Bloom filters per SSTable block to eliminate unnecessary disk I/O on negative point lookups",
      "Real-time visual telemetry cockpit displaying active memtable flushing and multi-level compactions"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Core Architecture Overview</h4>
        <p>This engine implements a multi-tiered storage architecture consisting of a Write-Ahead Log (WAL) for durability, an in-memory skiplist Memtable for fast sorted writes, and Immutable SSTable tiers on disk. Large values are offloaded to an append-only Value Log (vLog) using the WiscKey paradigm to optimize SSD write cycles.</p>
      </div>
      <div class="modal-arch-section">
        <h4>Key Technical Innovations</h4>
        <ul>
          <li><strong>Zero-Allocation Binary Encoding:</strong> Custom serialization for keys, offsets, and checksums.</li>
          <li><strong>Concurrent Compaction Worker:</strong> Size-tiered background goroutines merge overlapping SSTables without blocking read traffic.</li>
          <li><strong>Probabilistic Bloom Filters:</strong> 1% false positive rate tuning to short-circuit missing key lookups.</li>
        </ul>
      </div>
    `
  },
  {
    id: "devsync",
    title: "DevSync ⚡ Real-Time Interview Platform",
    category: "fullstack",
    badge: "Live WebRTC",
    badgeType: "live",
    description: "Real-time collaborative technical interview platform featuring synchronized Monaco Editor, WebRTC peer-to-peer audio/video streaming, anti-cheat telemetry, and challenge authoring.",
    liveUrl: "https://client-eta-rouge-48.vercel.app",
    githubUrl: "https://github.com/navsharma26/devsync",
    tags: ["Monaco Editor", "WebRTC", "Socket.io", "React", "Node.js", "Anti-Cheat"],
    highlights: [
      "Sub-50ms synchronized multi-cursor coding sessions using operational delta broadcasting",
      "Mesh WebRTC media channels with adaptive bitrate and STUN/TURN ICE negotiation",
      "Anti-cheat behavioral telemetry tracking window blur, paste anomalies, and keystroke patterns"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>System Architecture</h4>
        <p>DevSync splits responsibility between a stateful WebSocket synchronization server (managing room state, compiler execution queues, and chat) and a peer-to-peer WebRTC mesh network for zero-latency audio/video feeds.</p>
      </div>
      <div class="modal-arch-section">
        <h4>Engineering Features</h4>
        <ul>
          <li><strong>Monaco Code Sync:</strong> Synchronizes code AST differences across participants while preventing edit race collisions.</li>
          <li><strong>Multi-Language Code Execution:</strong> Remote sandboxed compilation container pipeline with strict CPU and memory limits.</li>
        </ul>
      </div>
    `
  },
  {
    id: "radix-kv",
    title: "RadixKV — Distributed In-Memory Store",
    category: "systems",
    badge: "RESP Cockpit",
    badgeType: "live",
    description: "High-performance distributed in-memory Key-Value store with streaming RESP (Redis Serialization Protocol) parser, radix-tree prefix compression, and real-time observability dashboard.",
    liveUrl: "https://radix-kv-web.vercel.app",
    githubUrl: "https://github.com/navsharma26/RadixKV",
    tags: ["TypeScript", "RESP Protocol", "Radix Tree", "In-Memory KV", "Distributed"],
    highlights: [
      "Custom zero-copy streaming RESP protocol parser compatible with standard Redis CLI tooling",
      "Radix-tree prefix indexing providing sub-millisecond retrieval and memory compression",
      "Interactive latency distribution histograms and memory fragmentation telemetry"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Storage Internals</h4>
        <p>Built from the ground up to explore cache locality and protocol parsing. Leverages an adaptive Radix Tree structure allowing prefix lookups and range scans at O(k) complexity where k is key length.</p>
      </div>
    `
  },
  {
    id: "resufit",
    title: "ResuFit — AI Resume Optimization Engine",
    category: "ai-cloud",
    badge: "AI Platform",
    badgeType: "live",
    description: "AI-powered resume optimization, requirement gap analysis, hybrid scoring engine, and automated persona cover letter generator for engineering candidates.",
    liveUrl: "https://resufit-theta.vercel.app",
    githubUrl: "https://github.com/navsharma26/ResuFit",
    tags: ["TypeScript", "Next.js", "AI Scoring", "NLP", "Gap Analysis", "Tailwind CSS"],
    highlights: [
      "Hybrid scoring algorithm computing contextual keyword density and ATS semantic match",
      "Automated persona cover letter generator matching candidate experience with job requisitions",
      "Diagnostic matrix highlighting missing technical proficiencies and actionable resume fixes"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Scoring Algorithm</h4>
        <p>Parses structured PDF and text resumes, extracts entities (skills, frameworks, experience durations), and runs vector cosine similarity against job descriptions to produce an ATS readiness score.</p>
      </div>
    `
  },
  {
    id: "paynest",
    title: "PayNest / Flow — Distributed Banking Core",
    category: "systems",
    badge: "Distributed Core",
    badgeType: "core",
    description: "Distributed digital banking core and payment ecosystem built with Node.js, gRPC, Apache Kafka, Apollo GraphQL, React, and MongoDB ACID multi-document transactions.",
    liveUrl: "https://github.com/navsharma26/PayNest",
    githubUrl: "https://github.com/navsharma26/PayNest",
    tags: ["Node.js", "gRPC", "Apache Kafka", "Apollo GraphQL", "MongoDB", "ACID"],
    highlights: [
      "Event-driven architecture with Apache Kafka for idempotent financial ledger processing",
      "High-throughput inter-service communication powered by gRPC and Protobuf serialization",
      "Strict ACID consistency model ensuring zero duplicate ledger entries under network partitions"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Ledger Consistency Model</h4>
        <p>Utilizes the Saga pattern orchestrated with Kafka event streams. When an account transfer initiates, balance holds are applied within a distributed transaction; failure at any downstream ledger triggers automated compensating transactions.</p>
      </div>
    `
  },
  {
    id: "mediaflow",
    title: "MediaFlow — Distributed Cloud Media Processing",
    category: "fullstack",
    badge: "Cloud Queue",
    badgeType: "live",
    description: "Distributed cloud media processing platform built with Next.js App Router, BullMQ async queues, Redis, Sharp, FFmpeg, and AWS S3 multipart upload pipelines.",
    liveUrl: "https://mediaflow-platform.vercel.app",
    githubUrl: "https://github.com/navsharma26/mediaflow",
    tags: ["Next.js", "BullMQ", "Redis", "Sharp", "FFmpeg", "AWS S3", "TypeScript"],
    highlights: [
      "Decoupled asynchronous worker queue with BullMQ and Redis for heavy media encoding",
      "Scalable AWS S3 multipart upload pipeline with pre-signed direct URLs",
      "Automated adaptive image resizing and video transcoding with progress telemetry"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Worker Pipeline Architecture</h4>
        <p>Media uploads bypass the web server directly to S3 via pre-signed URLs. Webhooks queue transcoding jobs to BullMQ workers running FFmpeg and Sharp in isolated worker threads.</p>
      </div>
    `
  },
  {
    id: "llm-test-gen",
    title: "LLM-Assisted Automated API Test Generator",
    category: "ai-cloud",
    badge: "FastAPI Backend",
    badgeType: "live",
    description: "Automated API Test & Edge-Case Generator powered by LLMs and FastAPI. Ingests OpenAPI specifications to synthesize comprehensive test suites and boundary conditions.",
    liveUrl: "https://llm-api-test-generator.onrender.com/docs",
    githubUrl: "https://github.com/navsharma26/LLM-Assisted-Automated-API-Test-Generator",
    tags: ["Python", "FastAPI", "OpenAPI", "LLM", "Pytest", "Render"],
    highlights: [
      "Ingests OpenAPI schemas to generate boundary condition tests and negative fuzzing payloads",
      "FastAPI interactive Swagger UI documentation and live validation endpoints",
      "Automated pytest sandbox execution with vulnerability and error-handling reports"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Schema Analysis Engine</h4>
        <p>Analyzes JSON/YAML OpenAPI schemas, identifies endpoint parameters, boundary types, and error status codes, then generates deterministic pytest scripts with realistic mock data.</p>
      </div>
    `
  },
  {
    id: "smart-retail",
    title: "Smart Retail & Customer Intelligence",
    category: "ai-cloud",
    badge: "CV + NLP",
    badgeType: "live",
    description: "Enterprise Smart Retail & Customer Intelligence Platform combining MobileNetV2 Computer Vision, customer sentiment analysis, and a hybrid FastAPI chatbot.",
    liveUrl: "https://smart-retail-customer.onrender.com/",
    githubUrl: "https://github.com/navsharma26/Smart-Retail-Customer-Intelligence-Platform",
    tags: ["Computer Vision", "MobileNetV2", "FastAPI", "Sentiment Analysis", "Python"],
    highlights: [
      "Real-time customer demographic and footfall telemetry using lightweight MobileNetV2",
      "Hybrid customer engagement chatbot with sentiment classification and inventory hooks",
      "Scalable containerized deployment on Render with sub-second inference pipelines"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Dual Pipeline Model</h4>
        <p>Separates video frame analysis (running on MobileNetV2 with edge quantization) from NLP customer dialogue inference, communicating via asynchronous FastAPI endpoints.</p>
      </div>
    `
  },
  {
    id: "ventora",
    title: "Ventora — High-Concurrency Event Booking",
    category: "fullstack",
    badge: "ACID MERN",
    badgeType: "live",
    description: "Production-ready event management and ticket booking platform with multi-document ACID transactions, OTP email verification, and administrative telemetry.",
    liveUrl: "https://eventora-mern-nine.vercel.app",
    githubUrl: "https://github.com/navsharma26/ventora-MERN",
    tags: ["React", "Node.js", "Express", "MongoDB", "ACID", "JWT + OTP", "Tailwind"],
    highlights: [
      "Architected with MongoDB multi-document ACID transactions to eliminate race conditions",
      "Dual-layer authentication utilizing HttpOnly JWT access/refresh tokens and OTP verification",
      "Real-time ticket inventory telemetry and revenue aggregation pipelines"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Concurrency Resolution</h4>
        <p>Prevents overbooking during flash ticket releases by utilizing session-scoped optimistic locking and two-phase ACID commits in MongoDB.</p>
      </div>
    `
  },
  {
    id: "sales-analytics",
    title: "Multi-Channel Sales & Customer Analytics",
    category: "ai-cloud",
    badge: "Streamlit Cloud",
    badgeType: "live",
    description: "Enterprise-grade multi-channel sales and customer analytics dashboard built with Python, SQL window functions, and interactive Streamlit visualizations.",
    liveUrl: "https://multi-channel-sales-analytics-emfaxgvsdchas68dkj82kr.streamlit.app/",
    githubUrl: "https://github.com/navsharma26/multi-channel-sales-analytics",
    tags: ["Python", "Streamlit", "SQL", "Pandas", "Analytics", "Cohort Analysis"],
    highlights: [
      "Aggregates multi-channel sales data with SQL analytical window functions",
      "Interactive customer cohort retention curves and churn predictive indicators",
      "Real-time live deployment on Streamlit Community Cloud"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Analytics Engine</h4>
        <p>Processes transactional datasets with optimized vector operations in Pandas and SQLite, computing RFM (Recency, Frequency, Monetary) segmentation and revenue attribution.</p>
      </div>
    `
  },
  {
    id: "snippet-master",
    title: "Snippet Master Reboot",
    category: "fullstack",
    badge: "Code Engine",
    badgeType: "live",
    description: "Developer code management engine featuring syntax highlighting with Prism.js, granular public/private access controls, and TanStack Query state caching.",
    liveUrl: "https://snippet-master-reboot.vercel.app",
    githubUrl: "https://github.com/navsharma26/Snippet-Master-Reboot",
    tags: ["React", "Node.js", "TanStack Query", "Prism.js", "MongoDB", "Express"],
    highlights: [
      "MongoDB compound text indexing and client-side debounced search, reducing queries by 40%",
      "Integrated TanStack Query for cache invalidation, eliminating redundant network requests",
      "Robust rate limiting (express-rate-limit) and NoSQL sanitization middleware"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Caching Strategy</h4>
        <p>Uses optimistic UI updates paired with stale-while-revalidate client caching, providing instant code browsing without server roundtrips for visited snippets.</p>
      </div>
    `
  },
  {
    id: "ticket-booking",
    title: "Ticket Booking Frontend & REST Engine",
    category: "fullstack",
    badge: "Vercel Live",
    badgeType: "live",
    description: "Fast, responsive ticket reservation system featuring interactive venue layout seating, immediate booking confirmations, and RESTful API state synchronization.",
    liveUrl: "https://ticket-booking-frontend-vert.vercel.app",
    githubUrl: "https://github.com/navsharma26/ticket-booking-system",
    tags: ["JavaScript", "React", "Node.js", "Express", "REST API", "Vercel"],
    highlights: [
      "Interactive seating selector with immediate seat state toggling and validation",
      "Streamlined REST API endpoints for booking confirmation and ticket dispatch",
      "Mobile-first responsive styling with sub-second initial paint times"
    ],
    architecture: `
      <div class="modal-arch-section">
        <h4>Seating State Engine</h4>
        <p>Tracks active seat reservations in memory with time-to-live expirations, releasing unconfirmed seats automatically after 10 minutes.</p>
      </div>
    `
  }
];

function initProjects() {
  const grid = document.getElementById('projects-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('project-search');

  let currentFilter = 'all';
  let searchQuery = '';

  function render() {
    if (!grid) return;

    const filtered = PROJECTS_DATA.filter(item => {
      const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-xl); border: 1px solid var(--border-subtle);">
          <p style="font-size: 1.1rem; color: var(--text-muted);">No projects found matching "${searchQuery}".</p>
          <button class="btn btn-sm btn-outline" style="margin-top: 1rem;" id="reset-search-btn">Reset Search</button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-search-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          searchInput.value = '';
          searchQuery = '';
          render();
        });
      }
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <div class="project-card" data-id="${p.id}">
        <div class="project-top">
          <span class="project-badge ${p.badgeType}">${p.badge}</span>
          <div class="project-links">
            ${p.liveUrl ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="proj-link-icon" title="Open Live Project">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            ` : ''}
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="proj-link-icon" title="View Source on GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>

        <ul class="project-highlights">
          ${p.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>

        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>

        <div class="project-cta-row">
          <button class="btn btn-sm btn-outline view-arch-btn" data-id="${p.id}" style="width: 100%;">
            Architecture Deep Dive &rarr;
          </button>
        </div>
      </div>
    `).join('');

    // Attach click listeners to Architecture buttons
    document.querySelectorAll('.view-arch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      render();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  render();
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE TERMINAL CLI ENGINE
   -------------------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const chips = document.querySelectorAll('.terminal-chip');
  const terminalBody = document.getElementById('terminal-body');

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
      <div class="term-response">
        <span class="term-cyan">Available Commands:</span><br>
        • <span class="term-highlight">skills</span> - Display categorized engineering proficiencies<br>
        • <span class="term-highlight">projects</span> - List top production projects and live URLs<br>
        • <span class="term-highlight">exp</span> - Show work experience at MP Online & education<br>
        • <span class="term-highlight">about</span> - Background, philosophy, and VIT details<br>
        • <span class="term-highlight">certs</span> - List verified Coursera, Google & AWS credentials<br>
        • <span class="term-highlight">stats</span> - Summary of GitHub, LeetCode, and academic metrics<br>
        • <span class="term-highlight">contact</span> - Phone, email, location, and social links<br>
        • <span class="term-highlight">theme &lt;dark|light&gt;</span> - Toggle dark or light theme<br>
        • <span class="term-highlight">sudo hire-me</span> - Unlock offer generation contract 😉<br>
        • <span class="term-highlight">date</span> - Print current timestamp<br>
        • <span class="term-highlight">clear</span> - Clear the terminal screen
      </div>
    `,
    skills: () => `
      <div class="term-response">
        <span class="term-cyan">Technical Stack & Proficiencies:</span><br>
        • <strong>Languages:</strong> Go, TypeScript, JavaScript, Python, C++, Java, SQL<br>
        • <strong>Backend:</strong> Node.js, Express, FastAPI, gRPC, Protobuf, Kafka, BullMQ<br>
        • <strong>Databases:</strong> PostgreSQL, MongoDB (ACID), Redis (RESP), LSM-Tree, Bloom Filters<br>
        • <strong>Cloud & DevOps:</strong> Docker, AWS (EC2, S3), Vercel, Render, Linux, Git<br>
        • <strong>Frontend:</strong> React.js, Next.js, Monaco Editor, WebRTC, Tailwind CSS<br>
        • <strong>CS Core:</strong> Data Structures & Algo (200+ solved), OS, Networks, DBMS
      </div>
    `,
    projects: () => `
      <div class="term-response">
        <span class="term-cyan">Top Production Highlights:</span><br>
        1. <strong>LSM-Tree Storage Engine (Go):</strong> WiscKey separation, Bloom filters & compaction.<br>
           &nbsp;&nbsp;↳ Live: <a href="https://lsm-tree-storage-engine.vercel.app" target="_blank" class="term-cmd-sample">lsm-tree-storage-engine.vercel.app</a><br>
        2. <strong>DevSync (Real-Time WebRTC Platform):</strong> Monaco Editor collaborative coding.<br>
           &nbsp;&nbsp;↳ Live: <a href="https://client-eta-rouge-48.vercel.app" target="_blank" class="term-cmd-sample">client-eta-rouge-48.vercel.app</a><br>
        3. <strong>RadixKV (Distributed In-Memory Store):</strong> Streaming RESP parser & dashboard.<br>
           &nbsp;&nbsp;↳ Live: <a href="https://radix-kv-web.vercel.app" target="_blank" class="term-cmd-sample">radix-kv-web.vercel.app</a><br>
        4. <strong>ResuFit (AI Resume Optimizer):</strong> ATS gap analysis & scoring.<br>
           &nbsp;&nbsp;↳ Live: <a href="https://resufit-theta.vercel.app" target="_blank" class="term-cmd-sample">resufit-theta.vercel.app</a><br>
        5. <strong>MediaFlow (Cloud Media Processor):</strong> BullMQ, Redis, FFmpeg, AWS S3.<br>
           &nbsp;&nbsp;↳ Live: <a href="https://mediaflow-platform.vercel.app" target="_blank" class="term-cmd-sample">mediaflow-platform.vercel.app</a>
      </div>
    `,
    exp: () => `
      <div class="term-response">
        <span class="term-cyan">Work Experience & Academics:</span><br>
        • <strong>MP Online</strong> (May 2026 – July 2026) — Advanced Software Engineering & Dev Intern<br>
          - Built citizen-facing microservices in Node.js, Express, and PostgreSQL.<br>
          - Optimized database indexing, reducing query endpoint latency by 25%.<br>
        • <strong>Vellore Institute of Technology (VIT Bhopal)</strong> (2023 – 2027)<br>
          - B.Tech Computer Science & Engineering • CGPA: 8.25 / 10
      </div>
    `,
    about: () => `
      <div class="term-response">
        <span class="term-cyan">About Navneet Sharma:</span><br>
        Software Engineer specializing in backend architectures, storage internals, and distributed systems.<br>
        Current Location: Bhopal, Madhya Pradesh, India (willing to relocate for on-site/hybrid/remote roles).
      </div>
    `,
    whoami: () => `
      <div class="term-response">
        visitor@portfolio-guest (Role: Recruiter / Engineer / Evaluator) — Welcome!
      </div>
    `,
    contact: () => `
      <div class="term-response">
        <span class="term-cyan">Direct Contact Channels:</span><br>
        • <strong>Email:</strong> <a href="mailto:navsharma30405@gmail.com" class="term-cmd-sample">navsharma30405@gmail.com</a><br>
        • <strong>Phone:</strong> <a href="tel:+916206529544" class="term-cmd-sample">+91-6206529544</a><br>
        • <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/navsharma26" target="_blank" class="term-cmd-sample">linkedin.com/in/navsharma26</a><br>
        • <strong>GitHub:</strong> <a href="https://github.com/navsharma26" target="_blank" class="term-cmd-sample">github.com/navsharma26</a><br>
        • <strong>Location:</strong> Bhopal, MP, India
      </div>
    `,
    certs: () => `
      <div class="term-response">
        <span class="term-cyan">Verified Credentials:</span><br>
        • MP Online Intern Certificate (Gov of MP)<br>
        • Google IT Support Professional Certificate (Coursera)<br>
        • AWS Cloud Technical Essentials (Intellipaat Academy)<br>
        • The Bits and Bytes of Networking (Google)<br>
        • Programming in Java (Vidyarthi)
      </div>
    `,
    stats: () => `
      <div class="term-response">
        <span class="term-cyan">Engineering Metrics:</span><br>
        • Public GitHub Repos: 30+<br>
        • Production Cloud Deployments: 10+ (Vercel & Render)<br>
        • LeetCode Problems Solved: 200+ (DP, Graphs, Trees)<br>
        • VIT Academic CGPA: 8.25 / 10.0
      </div>
    `,
    date: () => `
      <div class="term-response">
        ${new Date().toUTCString()}
      </div>
    `,
    "sudo hire-me": () => `
      <div class="term-response" style="color: var(--color-green);">
        [SUCCESS] 🚀 Access Granted! Preparing Offer Package...<br>
        Candidate: Navneet Sharma<br>
        Skills Match: 100% (Backend, Distributed Systems, High Concurrency)<br>
        Next Step: Email <a href="mailto:navsharma30405@gmail.com" style="color: var(--color-green); text-decoration: underline;">navsharma30405@gmail.com</a> to schedule technical interview!
      </div>
    `
  };

  function execute(cmdStr) {
    const raw = cmdStr.trim();
    if (!raw) return;

    history.push(raw);
    historyIndex = history.length;

    // Echo command
    const entry = document.createElement('div');
    entry.className = 'term-line term-user-entry';
    entry.innerHTML = `<span class="term-prompt">visitor@navneet:~$</span> ${escapeHTML(raw)}`;
    output.appendChild(entry);

    const lower = raw.toLowerCase();

    if (lower === 'clear') {
      output.innerHTML = '';
      return;
    }

    // Theme command
    if (lower.startsWith('theme ')) {
      const targetTheme = lower.split(' ')[1];
      if (['dark', 'light'].includes(targetTheme)) {
        applyTheme(targetTheme);
        localStorage.setItem('navneet_theme', targetTheme);
        const resp = document.createElement('div');
        resp.className = 'term-line';
        resp.innerHTML = `<div class="term-response" style="color:var(--color-green);">Theme changed to <strong>${targetTheme.toUpperCase()}</strong></div>`;
        output.appendChild(resp);
        showToast(`Theme switched to ${targetTheme.toUpperCase()}`);
      } else {
        const resp = document.createElement('div');
        resp.className = 'term-line';
        resp.innerHTML = `<div class="term-response" style="color:var(--color-red);">Invalid theme. Choose: dark or light</div>`;
        output.appendChild(resp);
      }
      terminalBody.scrollTop = terminalBody.scrollHeight;
      return;
    }

    if (commands[lower]) {
      const resp = document.createElement('div');
      resp.className = 'term-line';
      resp.innerHTML = commands[lower]();
      output.appendChild(resp);
    } else {
      const resp = document.createElement('div');
      resp.className = 'term-line';
      resp.innerHTML = `
        <div class="term-response" style="color: #ef4444;">
          command not found: ${escapeHTML(raw)}. Type <span class="term-highlight">help</span> for available commands.
        </div>
      `;
      output.appendChild(resp);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        execute(input.value);
        input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = '';
        }
        e.preventDefault();
      }
    });
  }

  // Quick chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) execute(cmd);
    });
  });

  // Delegated clicks on clickable samples in output
  output.addEventListener('click', (e) => {
    if (e.target.classList.contains('term-cmd-sample') && !e.target.hasAttribute('href')) {
      execute(e.target.textContent);
    }
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* --------------------------------------------------------------------------
   7. MODALS (PROJECT & RESUME)
   -------------------------------------------------------------------------- */
function initModals() {
  const resumeNavBtn = document.getElementById('resume-nav-btn');
  const resumeModal = document.getElementById('resume-modal');
  const modalResumeClose = document.getElementById('modal-resume-close');

  const projectModal = document.getElementById('project-modal');
  const modalProjectClose = document.getElementById('modal-project-close');

  // Resume modal triggers
  if (resumeNavBtn && resumeModal) {
    resumeNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (modalResumeClose && resumeModal) {
    modalResumeClose.addEventListener('click', () => {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    resumeModal.querySelector('.modal-backdrop').addEventListener('click', () => {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Project modal close
  if (modalProjectClose && projectModal) {
    modalProjectClose.addEventListener('click', () => {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    projectModal.querySelector('.modal-backdrop').addEventListener('click', () => {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal) resumeModal.classList.remove('open');
      if (projectModal) projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

function openProjectModal(id) {
  const p = PROJECTS_DATA.find(x => x.id === id);
  if (!p) return;

  const modal = document.getElementById('project-modal');
  const title = document.getElementById('proj-modal-title');
  const subtitle = document.getElementById('proj-modal-subtitle');
  const body = document.getElementById('proj-modal-body');
  const footer = document.getElementById('proj-modal-footer');

  title.textContent = p.title;
  subtitle.textContent = p.badge + ' • ' + p.category.toUpperCase();

  body.innerHTML = `
    <p style="margin-bottom: 1rem; font-size: 1.05rem; color: var(--text-main);">${p.description}</p>
    
    ${p.architecture || ''}

    <div class="modal-arch-section" style="margin-top: 1.25rem;">
      <h4>Key Architectural Milestones</h4>
      <ul>
        ${p.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <div class="modal-arch-section">
      <h4>Technologies Utilized</h4>
      <div class="modal-arch-tags">
        ${p.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
      </div>
    </div>
  `;

  footer.innerHTML = `
    ${p.liveUrl ? `
      <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
        Open Live Demo &rarr;
      </a>
    ` : ''}
    <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">
      GitHub Repository &rarr;
    </a>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* --------------------------------------------------------------------------
   8. COPY TO CLIPBOARD BUTTONS
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = btn.getAttribute('data-copy');
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`Copied "${val}" to clipboard!`);
        }).catch(() => {
          showToast('Failed to copy. Please manually select text.');
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. CONTACT FORM
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !message) {
      status.className = 'form-status error';
      status.textContent = 'Please fill out all required fields.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending...`;

    // Simulate sending and trigger mailto fallback
    setTimeout(() => {
      status.className = 'form-status success';
      status.innerHTML = `Thank you, ${escapeHTML(name)}! Your message has been prepared. Opening your mail client...`;
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Message Sent!`;

      // Trigger mailto link with encoded parameters
      const mailtoUrl = `mailto:navsharma30405@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('Hi Navneet,\n\n' + message + '\n\nBest,\n' + name + '\nEmail: ' + email)}`;
      window.location.href = mailtoUrl;

      showToast("Message client opened! Navneet will reply promptly.");
      form.reset();
    }, 800);
  });
}

/* --------------------------------------------------------------------------
   10. TOAST SYSTEM
   -------------------------------------------------------------------------- */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('show');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
