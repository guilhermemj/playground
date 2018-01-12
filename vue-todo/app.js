const app = (() => {

	// ==============
	//  Data Classes
	// ==============

	//  Data Persistence Class
	// ------------------------
	class ModelClass {
		constructor(namespace) {
			this.namespace = namespace;
		}

		loadData() {
			return JSON.parse(localStorage.getItem(this.namespace));
		}

		saveData(data) {
			localStorage.setItem(this.namespace, JSON.stringify(data));
		}
	}

	//  Task Class
	// -------------
	let TaskIdCounter = 0;
	const getNextTaskId = () => TaskIdCounter++;

	class Task {
		constructor(text, done) {
			this.text     = text;
			this.id       = getNextTaskId();
			this.position = 1;
			this.isDone   = !!done;
		}

		static parse({text, isDone}) {
			return new Task(text, isDone);
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
			<li class="task" :class="{ completed: task.isDone }" @click="toggleState">
				<span class="task-text">{{task.text}}</span>
				<span class="close" @click="remove">&times;</span>
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

	// Create DB instance
	const vueTodoDB = new ModelClass('vueTodoDB');

	return new Vue({
		el: '#app',

		data: {
			tasks: [],
		},

		computed: {
			sortedTasks() {
				// Clone tasks array and sort it by position
				return this.tasks.slice().sort((a, b) => a.position - b.position);
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

		created() {
			const storedData = vueTodoDB.loadData();

			this.tasks = ((!!storedData && !!storedData.length) ?
				storedData.map(Task.parse) :
				[
					new Task('This is an example task.'),
					new Task('This is an example of a completed task.', true),
				]
			);
		},

		beforeUpdate() {
			vueTodoDB.saveData(this.tasks);
		},
	});
})();
