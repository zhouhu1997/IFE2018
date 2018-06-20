function Restaurant(props){
	this.cash = props.cash;
	this.seats = props.seats;
	this.staff = props.staff;
}

Restaurant.prototype.hire = function (employee) {
	var hireEmployee = this.staff.push(employee);
	console.log("Hire "+employee.name);
}

Restaurant.prototype.fire = function (employee) {
	var index = this.staff.indexOf(employee);
	var fireEmployee = index >= 0 ? this.staff.splice(index,1) : "no one";
	console.log("Fire "+index+ " ");
}

function Employee(name, salary, id){
	this.id = id || 0;
	this.name = name;
	this.salary = salary;
}

Employee.prototype.doJob = function() {
	console.log(this.name+" doing the job");
}

function Waiter(name, salary, id, behavior){
	Employee.call(this, name, salary, id);
	this.behavior = behavior;
	if (Array.isArray(behavior)){
		this.doJob = function () {
			console.log(this.name+" 点菜啦");
		}
	} else {
		this.doJob = function () {
			console.log(this.name+" 上菜啦")
		}
	}
}

function Cook(name, salary, id) {
	Employee.call(this, name, salary, id);
	this.doJob = function () {
		console.log(this.name+"("+id+") 做菜啦");
	}
}

inherits(Waiter, Employee);
inherits(Cook, Employee);

function Customer() {}

Customer.prototype.eat = function () {
	console.log("Eat");
}

Customer.prototype.order = function () {
	console.log("点菜");
}

function Dish(props){
	this.name = props.name;
	this.ben = props.ben;
	this.price = props.price;
}

function inherits(Child, Parent){
	var F = function () {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
}
