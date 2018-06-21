var SingletonRestaurant = (function(){
	var instantiated = null;
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
		console.log("Fire "+fireEmployee[0].name);
	}

	return {
		name: "SingletonRestaurant",
		getRestaurant: function (prop) {
			if (instantiated === null){
				instantiated = new Restaurant(prop);
			}
			return instantiated;
		}
	}
})();


function Employee(name, salary, id){
	this.id = id || 0;
	this.name = name;
	this.salary = salary;
}

Employee.prototype.doJob = function() {
	console.log(this.name+" doing the job");
}

var SingletonWaiter = (function(){
	var init = null;
	function Waiter(name, salary, id) {
		Employee.call(this, name, salary, id);
		this.doJob = function (behavior) {
			if (Array.isArray(behavior)){
				console.log(this.name+" 点菜啦");
			} else {
				console.log(this.name+" 上菜啦")
			}
		}
	}
	return {
		name: "Waiter",
		getWaiter: function (name, salary, id) {
			if (init == null){
				init = new Waiter(name, salary, id);
			}
			return init;
		},
		welcome: function () {
			console.log("顾客你好, 欢迎光临");
		}
	}
})();

var SingletonCook = (function () {
	var init = null;
	function Cook(name, salary, id) {
		Employee.call(this, name, salary, id);
		this.doJob = function () {
			console.log(this.name+"("+this.id+") 做菜啦");
		}
	}
	return {
		name: "Cook",
		getCook: function (name, salary, id) {
			if (init == null){
				init = new Cook(name, salary, id);
			}
			return init;
		}
	}
})();

inherits(SingletonWaiter.getWaiter("Tony","9999","12"), Employee);
inherits(SingletonCook.getCook("Nan","20000","13"), Employee);
SingletonRestaurant.getRestaurant({cash:100000, seats:1, staff: 10});

function Customer(name) {
	this.name = name;
}

Customer.prototype.eat = function () {
	console.log("Eat");
}

Customer.prototype.order = function () {
	console.log("点菜");
}

Customer.prototype.checkout = function () {
	console.log("结账");
}

Customer.prototype.come = function () {
	console.log("顾客"+this.name+"决定在这里吃饭! 我来了");
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

var dishs = [new Dish({name:"奶擦",ben:5,price:20}), new Dish({name:"麻辣烫",ben:10,price: 30}), new Dish({name:"黄焖鸡",ben:10,price:35}), new Dish({name:"芝芝桃桃",ben:10,price:30}),new Dish({name:"麻辣火锅",ben:30,price:100})];
var numberOfCustomers = parseInt((Math.random() * 10) + 1) ;
for (var i = 1; i <= numberOfCustomers; i++){
	var customer = new Customer(1);
	if (customer){
		customer.come();
		SingletonWaiter.welcome();
		customer.order();
	}
}
