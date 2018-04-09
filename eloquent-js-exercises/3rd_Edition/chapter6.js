// =============================================================
//  Eloquent Javascript, Chapter 6 - The Secret Life of Objects
//
//  https://eloquentjavascript.net/06_object.html
// =============================================================

(() => {

	// ========================================================================================
	//   A vector type
	// ----------------------------------------------------------------------------------------
	//
	//  Write a class Vec that represents a vector in two-dimensional space. It takes x and y
	//  parameters (numbers), which it should save to properties of the same name.
	//
	//  Give the Vec prototype two methods, plus and minus, that take another vector as a
	//  parameter and return a new vector that has the sum or difference of the two vectors’
	//  (this and the parameter) x and y values.
	//
	//  Add a getter property length to the prototype that computes the length of the
	//  vector — that is, the distance of the point (x, y) from the origin (0, 0).
	// ========================================================================================

	class Vec {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}

		plus(vector) {
			return new Vec(this.x + vector.x, this.y + vector.y);
		}

		minus(vector) {
			return new Vec(this.x - vector.x, this.y - vector.y);
		}

		get length() {
			return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		}
	}
})();

(() => {

	// ============================================================================================
	//   Groups
	// --------------------------------------------------------------------------------------------
	//
	//  The standard JavaScript environment provides another data structure called Set. Like an
	//  instance of Map, a set holds a collection of values. Unlike Map, it does not associate
	//  other values with those — it just tracks which values are part of the set. A value can only
	//  be part of a set once — adding it again doesn’t have any effect.
	//
	//  Write a class called Group (since Set is already taken). Like Set, it has add, delete,
	//  and has methods. Its constructor creates an empty group, add adds a value to the group
	//  (but only if it isn’t already a member), delete removes its argument from the group (if
	//  it was a member), and has returns a Boolean value indicating whether its argument is a
	//  member of the group.
	//
	//  Use the === operator, or something equivalent such as indexOf, to determine whether two
	//  values are the same.
	//
	//  Give the class a static from method that takes an iteratable object as argument and
	//  creates a group that contains all the values produced by iterating over it.
	// ============================================================================================

	class Group {
		constructor() {
			this.group = [];
		}

		add(newcomer) {
			if (this.has(newcomer)) {
				return;
			}

			this.group.push(newcomer);
		}

		delete(member) {
			const index = this.group.indexOf(member);

			if (index > -1) {
				this.group.splice(index, 1);
			}
		}

		has(member) {
			return this.group.includes(member);
		}

		static from(iterable) {
			const group = new Group();

			for (const item of iterable) {
				group.add(item);
			}

			return group;
		}
	}
})();

(() => {

	// ============================================================================================
	//   Iterable groups
	// --------------------------------------------------------------------------------------------
	//
	//  Make the Group class from the previous exercise iterable. Refer back to the section about
	//  the iterator interface earlier in the chapter if you aren’t clear on the exact form of the
	//  interface anymore
	//
	//  If you used an array to represent the group’s members, don’t just return the iterator
	//  created by calling the Symbol.iterator method on the array. That would work, but defeats
	//  the purpose of this exercise.
	//
	//  It is okay if your iterator behaves strangely when the group is modified during iteration.
	// ============================================================================================

	class GroupIterator {
		constructor(group) {
			this.group = group;
			this.index = 0;
		}

		next() {
			if (this.index >= this.group.array.length) {
				return { done: true };
			}

			const ret = {
				value: this.group.array[this.index],
				done: false,
			};

			this.index++;

			return ret;
		}
	}

	class Group {
		constructor() {
			this.array = [];
		}

		add(newcomer) {
			if (this.has(newcomer)) {
				return;
			}

			this.array.push(newcomer);
		}

		delete(member) {
			const index = this.array.indexOf(member);

			if (index > -1) {
				this.array.splice(index, 1);
			}
		}

		has(member) {
			return this.array.includes(member);
		}

		[Symbol.iterator]() {
			return new GroupIterator(this);
		}

		static from(iterable) {
			const newGroup = new Group();

			for (const item of iterable) {
				newGroup.add(item);
			}

			return newGroup;
		}
	}
})();

(() => {

	// ============================================================================================
	//   Borrowing a method
	// --------------------------------------------------------------------------------------------
	//
	//  Earlier in the chapter I mentioned that an object’s hasOwnProperty can be used as a more
	//  robust alternative to the in operator when you want to ignore the prototype’s properties.
	//  But what if your map needs to include the word "hasOwnProperty"? You won’t be able to call
	//  that method anymore, because the object’s own property hides the method value.
	//
	//  Can you think of a way to call hasOwnProperty on an object that has its own property by
	//  that name?
	// ============================================================================================

	let map = {
		one: true,
		two: true,
		hasOwnProperty: true,
	};

	console.log(Object.prototype.hasOwnProperty.call(map, 'one'));
})();
