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
})();
