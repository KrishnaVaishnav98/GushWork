/**
 * Mangalam HDPE Pipes - Interactive Features
 * Production-quality JavaScript for all interactive components
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. TOP BANNER CLOSE
     ========================================================== */
  const topBanner = document.getElementById('topBanner');
  const bannerClose = document.getElementById('bannerClose');

  if (bannerClose && topBanner) {
    bannerClose.addEventListener('click', () => {
      topBanner.style.transition = 'all 0.3s ease';
      topBanner.style.maxHeight = '0';
      topBanner.style.padding = '0';
      topBanner.style.overflow = 'hidden';
      setTimeout(() => {
        topBanner.classList.add('hidden');
      }, 300);
    });
  }

  /* ==========================================================
     2. MOBILE MENU TOGGLE
     ========================================================== */
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      // Animate hamburger icon
      const isOpen = mainNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ==========================================================
     3. STICKY HEADER - Scroll Direction Detection
     ========================================================== */
  const stickyHeader = document.getElementById('stickyHeader');
  const heroSection = document.getElementById('heroSection');

  if (stickyHeader && heroSection) {
    let lastScrollY = 0;
    let ticking = false;

    const updateStickyHeader = () => {
      const currentScrollY = window.scrollY;
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
      const scrollingDown = currentScrollY > lastScrollY;

      if (scrollingDown && currentScrollY > heroBottom) {
        // Scrolling DOWN past hero -> show sticky
        stickyHeader.classList.add('visible');
      } else if (!scrollingDown) {
        // Scrolling UP -> hide sticky
        stickyHeader.classList.remove('visible');
      }

      // Always hide when above hero
      if (currentScrollY <= heroBottom * 0.5) {
        stickyHeader.classList.remove('visible');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateStickyHeader);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ==========================================================
     4. IMAGE CAROUSEL WITH ZOOM
     ========================================================== */
  const carouselMain = document.getElementById('carouselMain');
  const mainImage = document.getElementById('mainImage');
  const thumbContainer = document.getElementById('carouselThumbs');
  const carouselPrev = document.getElementById('carouselPrev');
  const carouselNext = document.getElementById('carouselNext');
  const zoomLens = document.getElementById('zoomLens');
  const zoomPreview = document.getElementById('zoomPreview');

  const images = [
    'assets/images/product-main.jpg',
    'assets/images/product-main.jpg',
    'assets/images/product-main.jpg',
    'assets/images/product-main.jpg',
    'assets/images/product-main.jpg',
    'assets/images/product-main.jpg'
  ];

  let currentImageIndex = 0;

  function setMainImage(index) {
    currentImageIndex = index;
    mainImage.style.opacity = '0.5';
    setTimeout(() => {
      mainImage.src = images[index];
      mainImage.style.opacity = '1';
    }, 150);

    // Update thumbnails
    const thumbs = thumbContainer.querySelectorAll('.thumb');
    thumbs.forEach((t, i) => {
      t.classList.toggle('active', i === index);
    });

    // Update zoom preview background
    if (zoomPreview) {
      zoomPreview.style.backgroundImage = `url(${images[index]})`;
    }
  }

  if (thumbContainer) {
    thumbContainer.addEventListener('click', (e) => {
      const thumb = e.target.closest('.thumb');
      if (thumb) {
        const idx = parseInt(thumb.dataset.index, 10);
        setMainImage(idx);
      }
    });
  }

  if (carouselPrev) {
    carouselPrev.addEventListener('click', () => {
      const idx = (currentImageIndex - 1 + images.length) % images.length;
      setMainImage(idx);
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener('click', () => {
      const idx = (currentImageIndex + 1) % images.length;
      setMainImage(idx);
    });
  }

  // Zoom on hover - lens follows cursor, preview shows magnified area
  if (carouselMain && zoomLens && zoomPreview && mainImage) {
    const zoomFactor = 2.6;
    const lensSize = 124;
    const previewSize = 350;

    // Set initial preview background
    zoomPreview.style.backgroundImage = `url(${images[0]})`;

    carouselMain.addEventListener('mousemove', (e) => {
      const rect = carouselMain.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Position lens centered on cursor, clamped within image
      let lensX = x - lensSize / 2;
      let lensY = y - lensSize / 2;
      lensX = Math.max(0, Math.min(lensX, rect.width - lensSize));
      lensY = Math.max(0, Math.min(lensY, rect.height - lensSize));

      zoomLens.style.left = lensX + 'px';
      zoomLens.style.top = lensY + 'px';

      // Calculate zoom preview background position
      const bgW = rect.width * zoomFactor;
      const bgH = rect.height * zoomFactor;
      const bgX = -(x * zoomFactor - previewSize / 2);
      const bgY = -(y * zoomFactor - previewSize / 2);

      zoomPreview.style.backgroundSize = bgW + 'px ' + bgH + 'px';
      zoomPreview.style.backgroundPosition = bgX + 'px ' + bgY + 'px';
    });

    carouselMain.addEventListener('mouseenter', () => {
      zoomLens.style.opacity = '1';
      zoomPreview.style.opacity = '1';
    });

    carouselMain.addEventListener('mouseleave', () => {
      zoomLens.style.opacity = '0';
      zoomPreview.style.opacity = '0';
    });

    // Update preview image when carousel changes
    const originalSetMainImage = setMainImage;
    setMainImage = function(index) {
      originalSetMainImage(index);
      zoomPreview.style.backgroundImage = `url(${images[index]})`;
    };
  }

  /* ==========================================================
     5. ACCORDION (FAQ)
     ========================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      accordionItems.forEach((i) => i.classList.remove('active'));

      // Open clicked item if it wasn't already open
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ==========================================================
     6. INDUSTRIES CAROUSEL
     ========================================================== */
  const industriesCarousel = document.getElementById('industriesCarousel');
  const industriesPrev = document.getElementById('industriesPrev');
  const industriesNext = document.getElementById('industriesNext');

  if (industriesCarousel && industriesPrev && industriesNext) {
    const scrollAmount = 444; // card width (420) + gap (24)

    industriesPrev.addEventListener('click', () => {
      industriesCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    industriesNext.addEventListener('click', () => {
      industriesCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /* ==========================================================
     7. MANUFACTURING PROCESS TABS
     ========================================================== */
  const processTabsContainer = document.getElementById('processTabs');
  const processTitle = document.getElementById('processTitle');
  const processDesc = document.getElementById('processDesc');
  const processChecklist = document.getElementById('processChecklist');
  const processPrev = document.getElementById('processPrev');
  const processNext = document.getElementById('processNext');

  const processData = [
    {
      title: 'Raw Material Selection & Preparation',
      desc: 'The manufacturing process begins with careful selection and testing of high-quality PE80 and PE100 grade polyethylene resin. Raw materials are sourced from certified suppliers and undergo rigorous quality checks.',
      items: ['Incoming quality inspection of PE resin', 'Melt Flow Index (MFI) testing', 'Moisture content analysis', 'Carbon black dispersion testing']
    },
    {
      title: 'Extrusion Process',
      desc: 'The prepared polyethylene compound is fed into a single-screw extruder where it is heated to precisely controlled temperatures. The molten material is pushed through an annular die to form the pipe shape.',
      items: ['Temperature-controlled melting zones', 'Precision annular die system', 'Consistent melt pressure monitoring', 'Automatic material feeding']
    },
    {
      title: 'Vacuum Cooling',
      desc: 'Immediately after extrusion, the pipe enters a vacuum cooling tank where it is cooled uniformly to maintain dimensional accuracy and prevent deformation.',
      items: ['Controlled vacuum pressure', 'Uniform cooling distribution', 'Temperature gradient monitoring', 'Dimensional stability assurance']
    },
    {
      title: 'Sizing & Calibration',
      desc: 'The cooled pipe passes through precision sizing equipment that ensures accurate outer diameter and wall thickness measurements according to specified standards.',
      items: ['Laser diameter measurement', 'Wall thickness verification', 'Ovality control system', 'Real-time dimensional feedback']
    },
    {
      title: 'Quality Control Testing',
      desc: 'Every pipe undergoes comprehensive quality testing including hydrostatic pressure testing, tensile strength testing, and environmental stress crack resistance testing.',
      items: ['Hydrostatic pressure testing', 'Tensile strength verification', 'Impact resistance testing', 'Environmental stress crack testing']
    },
    {
      title: 'Marking & Identification',
      desc: 'Pipes are permanently marked with product identification including manufacturer, material grade, diameter, pressure rating, and production date using inkjet or laser marking systems.',
      items: ['Inkjet/laser marking systems', 'Standard-compliant labeling', 'Batch traceability codes', 'Color stripe identification']
    },
    {
      title: 'Precision Cutting',
      desc: 'Pipes are cut to specified lengths using automated cutting machines that ensure clean, square cuts. For smaller diameters, pipes can be wound into coils.',
      items: ['Automated length cutting', 'Square-cut accuracy', 'Coiling for smaller diameters', 'Custom length processing']
    },
    {
      title: 'Packaging & Dispatch',
      desc: 'Finished pipes are carefully packaged and bundled for transportation. Proper packaging ensures pipes arrive at the project site in perfect condition.',
      items: ['Protective end caps', 'Bundle strapping', 'Loading optimization', 'Dispatch documentation']
    }
  ];

  let currentProcess = 0;

  function updateProcess(index) {
    currentProcess = index;
    const data = processData[index];

    if (processTitle) processTitle.textContent = data.title;
    if (processDesc) processDesc.textContent = data.desc;

    if (processChecklist) {
      processChecklist.innerHTML = data.items.map(item =>
        `<li>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#2b3990"/><path d="M6 10l3 3 5-5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          ${item}
        </li>`
      ).join('');
    }

    // Update tab states
    if (processTabsContainer) {
      const tabs = processTabsContainer.querySelectorAll('.process-tab');
      tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
      });
    }
  }

  if (processTabsContainer) {
    processTabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.process-tab');
      if (tab) {
        const idx = parseInt(tab.dataset.tab, 10);
        updateProcess(idx);
      }
    });
  }

  if (processPrev) {
    processPrev.addEventListener('click', () => {
      const idx = (currentProcess - 1 + processData.length) % processData.length;
      updateProcess(idx);
    });
  }

  if (processNext) {
    processNext.addEventListener('click', () => {
      const idx = (currentProcess + 1) % processData.length;
      updateProcess(idx);
    });
  }

  /* ==========================================================
     8. TESTIMONIALS - Infinite Auto-Scrolling Carousel
     ========================================================== */
  const testimonialsCarousel = document.getElementById('testimonialsCarousel');

  if (testimonialsCarousel) {
    // Duplicate cards for seamless infinite loop
    const cards = testimonialsCarousel.querySelectorAll('.testimonial-card');
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      testimonialsCarousel.appendChild(clone);
    });

    let scrollSpeed = 1; // pixels per frame
    let scrollPos = 0;
    let isPaused = false;

    // Calculate the width of the original set of cards
    function getOriginalWidth() {
      const gap = 24;
      let totalWidth = 0;
      for (let i = 0; i < cards.length; i++) {
        totalWidth += cards[i].offsetWidth + gap;
      }
      return totalWidth;
    }

    function autoScroll() {
      if (!isPaused) {
        scrollPos += scrollSpeed;
        const originalWidth = getOriginalWidth();

        // When we've scrolled past the original set, reset seamlessly
        if (scrollPos >= originalWidth) {
          scrollPos -= originalWidth;
        }

        testimonialsCarousel.style.transform = `translateX(-${scrollPos}px)`;
      }
      requestAnimationFrame(autoScroll);
    }

    // Pause on hover
    testimonialsCarousel.addEventListener('mouseenter', () => { isPaused = true; });
    testimonialsCarousel.addEventListener('mouseleave', () => { isPaused = false; });

    // Start scrolling
    requestAnimationFrame(autoScroll);
  }

  /* ==========================================================
     9. FORM HANDLING
     ========================================================== */
  /* ==========================================================
     9. MODALS
     ========================================================== */
  const catalogueModal = document.getElementById('catalogueModal');
  const quoteModal = document.getElementById('quoteModal');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close buttons
  document.getElementById('catalogueModalClose')?.addEventListener('click', () => closeModal(catalogueModal));
  document.getElementById('quoteModalClose')?.addEventListener('click', () => closeModal(quoteModal));

  // Close on overlay click (outside modal container)
  [catalogueModal, quoteModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(catalogueModal);
      closeModal(quoteModal);
    }
  });

  // "Download Full Technical Datasheet" -> opens brochure/catalogue modal
  document.querySelectorAll('.specs-cta .btn, .specs-cta button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(catalogueModal);
    });
  });

  // Brochure form submit
  const brochureForm = document.getElementById('brochureForm');
  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(catalogueModal);
      const successDiv = document.createElement('div');
      successDiv.className = 'modal-overlay active';
      successDiv.innerHTML = '<div class="modal-container modal-container--sm" style="text-align:center;padding:48px"><svg width="48" height="48" viewBox="0 0 256 256" fill="#2b3990"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg><h2 style="margin:16px 0 8px;font-family:Urbanist,sans-serif;font-size:24px">Brochure Sent!</h2><p style="color:#4d545b;margin-bottom:24px">The catalogue will be sent to your email shortly.</p><button class="btn btn-primary" onclick="this.closest(\'.modal-overlay\').remove();document.body.style.overflow=\'\'">Close</button></div>';
      successDiv.addEventListener('click', (e) => { if (e.target === successDiv) { successDiv.remove(); document.body.style.overflow = ''; }});
      document.body.appendChild(successDiv);
      brochureForm.reset();
    });
  }

  // "Request a Quote" / "Get Custom Quote" -> opens quote modal
  document.querySelectorAll('[data-modal="quote"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModal);
    });
  });

  // Quote modal form submit
  const quoteModalForm = document.getElementById('quoteModalForm');
  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(quoteModal);
      // Show a brief success message
      const successDiv = document.createElement('div');
      successDiv.className = 'modal-overlay active';
      successDiv.innerHTML = '<div class="modal-container modal-container--sm" style="text-align:center;padding:48px"><svg width="48" height="48" viewBox="0 0 256 256" fill="#2b3990"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg><h2 style="margin:16px 0 8px;font-family:Urbanist,sans-serif;font-size:24px">Quote Request Submitted!</h2><p style="color:#4d545b;margin-bottom:24px">Our team will contact you within 24 hours.</p><button class="btn btn-primary" onclick="this.closest(\'.modal-overlay\').remove();document.body.style.overflow=\'\'">Close</button></div>';
      successDiv.addEventListener('click', (e) => { if (e.target === successDiv) { successDiv.remove(); document.body.style.overflow = ''; }});
      document.body.appendChild(successDiv);
      quoteModalForm.reset();
    });
  }

  // CTA form and catalogue form - also use modals
  const ctaForm = document.getElementById('ctaForm');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successDiv = document.createElement('div');
      successDiv.className = 'modal-overlay active';
      successDiv.innerHTML = '<div class="modal-container modal-container--sm" style="text-align:center;padding:48px"><svg width="48" height="48" viewBox="0 0 256 256" fill="#2b3990"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg><h2 style="margin:16px 0 8px;font-family:Urbanist,sans-serif;font-size:24px">Quote Request Submitted!</h2><p style="color:#4d545b;margin-bottom:24px">Our team will contact you within 24 hours.</p><button class="btn btn-primary" onclick="this.closest(\'.modal-overlay\').remove();document.body.style.overflow=\'\'">Close</button></div>';
      successDiv.addEventListener('click', (e) => { if (e.target === successDiv) { successDiv.remove(); document.body.style.overflow = ''; }});
      document.body.appendChild(successDiv);
      document.body.style.overflow = 'hidden';
      ctaForm.reset();
    });
  }

  const catalogueForm = document.getElementById('catalogueForm');
  if (catalogueForm) {
    catalogueForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successDiv = document.createElement('div');
      successDiv.className = 'modal-overlay active';
      successDiv.innerHTML = '<div class="modal-container modal-container--sm" style="text-align:center;padding:48px"><svg width="48" height="48" viewBox="0 0 256 256" fill="#2b3990"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg><h2 style="margin:16px 0 8px;font-family:Urbanist,sans-serif;font-size:24px">Catalogue Sent!</h2><p style="color:#4d545b;margin-bottom:24px">The catalogue will be sent to your email shortly.</p><button class="btn btn-primary" onclick="this.closest(\'.modal-overlay\').remove();document.body.style.overflow=\'\'">Close</button></div>';
      successDiv.addEventListener('click', (e) => { if (e.target === successDiv) { successDiv.remove(); document.body.style.overflow = ''; }});
      document.body.appendChild(successDiv);
      document.body.style.overflow = 'hidden';
      catalogueForm.reset();
    });
  }

  /* ==========================================================
     10. SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Close mobile menu if open
        if (mainNav) mainNav.classList.remove('open');
      }
    });
  });

});
