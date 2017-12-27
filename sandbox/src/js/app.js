/* global Vue */

Vue.component('app-header', {
	template: `
		<header id="page-header">
			<div class="container">
				<h1>Teste</h1>
			</div>

			<slot />
		</header>
	`,
});

Vue.component('app-footer', {
	template: `
		<footer id="page-footer">
			<div class="container">
				<slot />
			</div>
		</footer>
	`,
});

Vue.component('login-form', {
	template: `
		<form novalidate @submit.prevent="submitTest">
			<div class="row mb-3">
				<div class="form-group col-12 col-md-6">
					<label class="sr-only" for="username-field">Usuário</label>
					<input type="text" name="username" id="username-field" class="form-control" placeholder="Usuário..." required>
				</div>

				<div class="form-group col-12 col-md-6">
					<label class="sr-only" for="password-field">Senha</label>
					<input type="password" name="password" id="password-field" class="form-control" placeholder="Senha..." required>
				</div>
			</div>

			<div class="clearfix">
				<button type="button" class="btn btn-link btn-sm" data-action="forgot-pass">Esqueci minha senha</button>

				<button class="btn btn-primary text-uppercase float-right">Entrar</button>
			</div>
		</form>
	`,

	methods: {
		submitTest: function submitLoginForm() {
			const form = this.$el;

			form.classList.add('was-validated');

			if (!form.checkValidity()) return;

			// Simulate server delay
			setTimeout(() => {
				window.location.href = './admin.html';
			}, 1500);
		},
	},
});

const app = new Vue({
	el: '#app',

	data: {
		message: 'Blablabla',
	},

	computed: {
		reversedMessage: function reverseMessage() {
			return this.message.split('').reverse().join('');
		},
	},
});
