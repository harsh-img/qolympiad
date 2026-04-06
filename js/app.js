(function () {
  var pages = document.querySelectorAll(".page");
  var tabs = document.querySelectorAll(".nav-tab");
  var burger = document.querySelector(".nav-burger");
  var navLinks = document.querySelector(".nav-links");
  var ddBtn = document.getElementById("nav-more-btn");

  function closeDropdowns() {
    document.querySelectorAll(".nav-dd.is-open").forEach(function (d) {
      d.classList.remove("is-open");
    });
    if (ddBtn) ddBtn.setAttribute("aria-expanded", "false");
  }

  function closeNav() {
    if (navLinks) navLinks.classList.remove("is-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
    closeDropdowns();
  }

  function showPage(id) {
    pages.forEach(function (p) {
      p.classList.remove("active");
    });
    tabs.forEach(function (a) {
      a.classList.remove("active");
    });
    var page = document.getElementById("page-" + id);
    if (page) page.classList.add("active");
    var nav = document.querySelector('.nav-tab[data-page="' + id + '"]');
    if (nav) nav.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (history.replaceState) {
      history.replaceState(null, "", "#" + id);
    }
    closeNav();
  }

  window.showPage = showPage;

  tabs.forEach(function (el) {
    el.addEventListener("click", function () {
      showPage(el.getAttribute("data-page"));
    });
  });

  document.querySelectorAll("[data-goto]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.tagName === "A") e.preventDefault();
      var dest = el.getAttribute("data-goto");
      if (dest) showPage(dest);
    });
  });

  if (ddBtn) {
    ddBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var dd = ddBtn.closest(".nav-dd");
      if (!dd) return;
      var wasOpen = dd.classList.contains("is-open");
      closeDropdowns();
      if (!wasOpen) {
        dd.classList.add("is-open");
        ddBtn.setAttribute("aria-expanded", "true");
      }
    });
  }

  document.addEventListener("click", function () {
    closeDropdowns();
  });

  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  window.addEventListener("hashchange", function () {
    var id = (location.hash || "#home").replace(/^#/, "");
    if (document.getElementById("page-" + id)) {
      showPage(id);
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

  document.addEventListener("DOMContentLoaded", function () {
    var id = (location.hash || "#home").replace(/^#/, "");
    if (id && document.getElementById("page-" + id)) {
      showPage(id);
    }
  });
})();
