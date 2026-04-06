(function () {
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = document.getElementById("login-msg");
      if (!msg) return;
      var email = (document.getElementById("login-email") || {}).value;
      var pass = (document.getElementById("login-password") || {}).value;
      if (!email || !String(email).trim()) {
        msg.className = "form-msg err";
        msg.style.display = "block";
        msg.textContent = "Please enter your email.";
        return;
      }
      if (!pass || pass.length < 6) {
        msg.className = "form-msg err";
        msg.style.display = "block";
        msg.textContent = "Password must be at least 6 characters (demo).";
        return;
      }
      msg.className = "form-msg ok";
      msg.style.display = "block";
      msg.textContent = "Demo login successful — replace with your API redirect or session.";
    });
  }
})();
