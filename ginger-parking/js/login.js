// Simulate jQuery ready event
(function(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }

}(function() {

  // Form submission function
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


  // Forgot password rude responses
  var lib = [
    'Ninguém liga :D',
    'Tente 123456.',
    'Tente 00000.',
    'O problema é seu :)',
    'Peça uma nova senha ao RH, seilá.'
  ];

  document.querySelector('[data-action=forgot-pass]')
    .addEventListener('click', function () {
      alert( lib[ Math.floor(Math.random() * lib.length) ] );
    });
}));
