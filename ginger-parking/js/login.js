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

      var user = document.getElementById('username'),
          password = document.getElementById('password');

      // Validate input
      user.parentNode.classList[user.value ? 'remove' : 'add']('is-invalid');
      password.parentNode.classList[password.value ? 'remove' : 'add']('is-invalid');

      if (!user.value || !password.value) return;

      // Add progressbar
      var pb = document.getElementById('progressbar');

      pb.classList.remove('invisible');
      pb.classList.add('mdl-progress__indeterminate');

      // Simulate server delay
      setTimeout(function () {
        location.href = './admin.html';

        pb.classList.add('invisible');
        pb.classList.remove('mdl-progress__indeterminate');
      }, 1500);
    });
}));
