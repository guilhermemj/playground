// Simulate jQuery ready event
(function(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }

}(function() {
  document.getElementById('login-form')
    .addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();

      this.classList.add('was-validated');

      if ( !this.checkValidity() ) return;

      // TODO: Add progressbar

      // Simulate server delay
      setTimeout(function () {
        location.href = './admin.html';
      }, 1500);
    });
}));
