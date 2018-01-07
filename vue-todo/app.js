const app = (() => {

	// ==============
	//  Data Classes
	// ==============

	let TaskIdCounter = 0;
	const getNextTaskId = () => TaskIdCounter++;

	class Task {
		constructor(text, done) {
			this.text     = text;
			this.id       = getNextTaskId();
			this.position = 1;
			this.isDone   = !!done;
		}
	}


	// ==================
	//  Task Input Form
	// ==================

	Vue.component('todo-form', {
		template: `
			<form class="form" @submit.prevent="validateForm" autocomplete="off">
				<div class="form-group">
					<div class="input-group">
						<input type="text" name="task-text" class="form-control" placeholder="Add a task..." required>

						<div class="input-group-append">
							<button class="btn btn-dark">Add</button>
						</div>
					</div>
				</div>
			</form>
		`,

		methods: {
			validateForm() {
				const input = this.$el.querySelector('[name=task-text]');

				if (!input) return;

				this.$emit('valid-submit', input.value);
				this.$el.reset();
			},
		},
	});


	// ================
	//  Task Component
	// ================

	Vue.component('todo-item', {
		template: `
			<li :class="{ disabled: task.isDone }" @click.self="toggleState">
				{{task.text}}
				<span class="float-right close" @click="remove">&times;</span>
			</li>
		`,

		props: {
			task: {
				type: Task,
				default: null,
			},
		},

		methods: {
			toggleState() {
				this.task.isDone = !this.task.isDone;
			},

			remove() {
				this.$emit('remove', this.task.id);
			},
		},
	});


	// ================
	//  Root Component
	// ================

	return new Vue({
		el: '#app',

		data: {
			tasks: [
				new Task('This is an example task.'),
				new Task('This is an example of a completed task.', true),
			],
		},

		computed: {
			sortedTasks() {
				// Clone tasks array and sort it by position
				return this.tasks.slice().sort((a, b) => {
					return a.position - b.position;
				});
			},
		},

		methods: {
			addTask(content) {
				this.tasks.push(new Task(content));
			},

			removeTask(id) {
				const index = this.tasks.findIndex((item) => item.id == id);

				if (index == -1) return;

				this.tasks.splice(index, 1);
			},
		},
	});
})();