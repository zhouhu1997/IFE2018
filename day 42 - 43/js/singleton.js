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
		this.doJob = function (order) {
			if (Array.isArray(order)){
				console.log(this.name+"(服务员): 您点了一份"+order[0].name);
			} else {
				console.log(this.name+"(服务员): "+order+"来了")
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
			console.log(init.name+"(服务员): 顾客你好,欢迎光临!");
		}
	}
})();

var SingletonCook = (function () {
	var init = null;
	function Cook(name, salary, id) {
		Employee.call(this, name, salary, id);
		this.doJob = function (order) {
			console.log(this.name+"(厨师):一份"+order.name+"!开始做了");
		}
	}
	return {
		name: "Cook",
		getCook: function (name, salary, id) {
			if (init == null){
				init = new Cook(name, salary, id);
			}
			return init;
		},
		finishDish: function (order) {
			console.log(init.name+"(厨师):"+order.name+"做好了,上菜吧");
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
	console.log("顾客"+this.name+":我要开动了");
}

Customer.prototype.order = function () {
	console.log("顾客"+this.name+":点菜");
	customerOrder = dishs[parseInt(Math.random() * dishs.length)];
	if (customerOrder){
		console.log("顾客"+this.name+":我要点一份"+customerOrder.name);
	}
}

Customer.prototype.checkout = function () {
	console.log("顾客"+this.name+":结账");
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

var dishs = [new Dish({name:"奶茶",ben:5,price:20}), new Dish({name:"麻辣烫",ben:10,price: 30}), new Dish({name:"黄焖鸡",ben:10,price:35}), new Dish({name:"芝芝桃桃",ben:10,price:30}),new Dish({name:"麻辣火锅",ben:30,price:100})];
var customerOrder = null;
var numberOfCustomers = parseInt((Math.random() * 10) + 1) ;
var queue = [];
var intervalId = null;
console.log("今天有"+numberOfCustomers+"名顾客");
for (var i  = 1; i <= numberOfCustomers; i++){
	queue.push(new Customer(i));
}
intervalId = setInterval(function () {
	if (queue.length){
		var customer = queue.shift();
		if (customer){
			console.log("-----------------");
			console.log("====顾客"+customer.name+"请就餐.===");
			SingletonWaiter.welcome();
			customer.order();
			SingletonWaiter.getWaiter().doJob([customerOrder]);
			SingletonCook.getCook().doJob(customerOrder);
			SingletonCook.finishDish(customerOrder);
			SingletonWaiter.getWaiter().doJob(customerOrder.name);
			customer.eat();
			customer.checkout();
			console.log("-----------------");

		}
	} else{
		console.log("营业结束!");
		clearInterval(intervalId);
	}
}, 2000);