(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById("siteHeader");
  const toTopBtn = document.getElementById("toTop");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;
    if (y > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    if (y > 600) {
      toTopBtn.classList.add("show");
    } else {
      toTopBtn.classList.remove("show");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  function toggleMobileMenu() {
    const isActive = navToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active", isActive);
    navToggle.setAttribute("aria-expanded", String(isActive));
    document.body.style.overflow = isActive ? "hidden" : "";
  }

  navToggle.addEventListener("click", toggleMobileMenu);

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileMenu();
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = (Array.prototype.indexOf.call(
              el.parentElement ? el.parentElement.children : [],
              el
            ) % 4) * 70;
            setTimeout(function () {
              el.classList.add("in-view");
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- Animated stat counters ---------- */
  const statEls = document.querySelectorAll(".stat-num");

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window && statEls.length) {
    const statIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    statEls.forEach(function (el) {
      statIO.observe(el);
    });
  } else {
    statEls.forEach(function (el) {
      el.textContent = el.getAttribute("data-count");
    });
  }

  /* ---------- Appointment form ---------- */
  const form = document.getElementById("appointmentForm");
  const formNote = document.getElementById("formNote");
  const appointmentSubmit = document.getElementById("appointmentSubmit");

  if (form) {
    form.addEventListener("submit", function () {
      if (appointmentSubmit) {
        appointmentSubmit.disabled = true;
        appointmentSubmit.textContent = "Sending request…";
      }
      if (formNote) {
        formNote.textContent = "Sending your appointment request to chanderkantharsh.mindhealer@gmail.com…";
      }
    });
  }


  /* ---------- Workshop announcement popup ---------- */
  const workshopModal = document.getElementById("workshopModal");
  if (workshopModal) {
    const dialog = workshopModal.querySelector(".workshop-modal-dialog");
    const closeButton = workshopModal.querySelector(".workshop-modal-close");
    const sessionKey = "chanderkantWorkshopPosterSeenV1";
    let previousFocus = null;
    let previousOverflow = "";

    function wasShownThisSession() {
      try { return window.sessionStorage.getItem(sessionKey) === "yes"; }
      catch (err) { return false; }
    }
    function rememberShown() {
      try { window.sessionStorage.setItem(sessionKey, "yes"); }
      catch (err) { /* Storage can be disabled; popup remains dismissible. */ }
    }
    function openWorkshopModal() {
      if (!workshopModal.hidden) return;
      previousFocus = document.activeElement;
      previousOverflow = document.body.style.overflow;
      workshopModal.hidden = false;
      workshopModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      rememberShown();
      closeButton.focus({ preventScroll: true });
    }
    function closeWorkshopModal() {
      if (workshopModal.hidden) return;
      workshopModal.hidden = true;
      workshopModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = previousOverflow;
      if (previousFocus && previousFocus !== document.body && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    }

    document.querySelectorAll("[data-workshop-open]").forEach(function (button) {
      button.addEventListener("click", openWorkshopModal);
    });
    workshopModal.querySelectorAll("[data-workshop-close], [data-workshop-action]").forEach(function (el) {
      el.addEventListener("click", closeWorkshopModal);
    });
    document.addEventListener("keydown", function (e) {
      if (workshopModal.hidden) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeWorkshopModal();
      } else if (e.key === "Tab") {
        const controls = Array.from(dialog.querySelectorAll('a[href], button:not([disabled])'));
        if (!controls.length) { e.preventDefault(); dialog.focus(); return; }
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });

    // A gentle one-time welcome, not a popup on every refresh or deep link.
    if (!wasShownThisSession() && !window.location.hash) {
      window.setTimeout(function () {
        if (document.visibilityState === "visible" && window.scrollY < 260 && !wasShownThisSession()) {
          openWorkshopModal();
        }
      }, 1700);
    }
  }

  /* ---------- Close dropdown on outside tap (mobile-safe) ---------- */
  document.addEventListener("click", function (e) {
    const openDropdowns = document.querySelectorAll(".has-dropdown");
    openDropdowns.forEach(function (dd) {
      if (!dd.contains(e.target)) dd.classList.remove("open");
    });
  });
})();
