(function () {
  document.querySelectorAll(".year-foot").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var siteNav = document.querySelector(".site-nav");
  var burger = document.querySelector(".nav-burger");
  var navLinks = document.querySelector(".nav-links");

  if (siteNav) {
    siteNav.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  if (burger && navLinks) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.addEventListener("click", function () {
    if (navLinks && burger) {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  document.querySelectorAll(".filter-wrap .fb").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var wrap = btn.closest(".filter-wrap");
      if (!wrap) return;
      wrap.querySelectorAll(".fb").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      var grid = document.querySelector(".courses-grid");
      var key = btn.getAttribute("data-filter");
      if (!grid || !key) return;

      var cards = grid.querySelectorAll(".ccard");
      cards.forEach(function (card) {
        var raw = card.getAttribute("data-cats") || "";
        var cats = raw.split(/\s+/).filter(Boolean);
        var show = key === "all";
        if (!show && cats.length) {
          if (key === "scholar") {
            show = cats.indexOf("scholar") !== -1;
          } else if (key === "nursery-kg") {
            show = cats.indexOf("nursery-kg") !== -1;
          } else if (key === "primary") {
            show = cats.indexOf("primary") !== -1 || cats.indexOf("scholar") !== -1;
          } else if (key === "middle") {
            show = cats.indexOf("middle") !== -1 || cats.indexOf("scholar") !== -1;
          } else if (key === "secondary") {
            show = cats.indexOf("secondary") !== -1 || cats.indexOf("scholar") !== -1;
          }
        }
        card.toggleAttribute("hidden", !show);
      });
    });
  });

  if ("IntersectionObserver" in window) {
    var once = { threshold: 0.08 };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        }
      });
    }, once);
    document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal-on-scroll").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* exams.html: apply filter from ?filter= or #hash (e.g. from home class pills) */
  var coursesGrid = document.querySelector(".courses-grid");
  if (coursesGrid) {
    var params = new URLSearchParams(window.location.search);
    var f = params.get("filter");
    if (!f && window.location.hash) {
      var h = window.location.hash.slice(1);
      if (/^(all|nursery-kg|primary|middle|secondary|scholar)$/.test(h)) {
        f = h;
      }
    }
    if (f) {
      var trigger = document.querySelector('.filter-wrap .fb[data-filter="' + f + '"]');
      if (trigger) {
        trigger.click();
        window.requestAnimationFrame(function () {
          var anchor = document.querySelector(".filter-wrap") || coursesGrid;
          if (anchor && anchor.getBoundingClientRect) {
            var top = anchor.getBoundingClientRect().top + window.pageYOffset - 88;
            window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
          }
        });
      }
    }
  }
})();
