
//import * as imported from 'external.js';
//import { coun_fn } from './external.js';
console.log('ES6');
class User{
	constructor(l_user){
		console.log("Default value");
		this.name=l_user;
	}
	addUser(){
		console.log("User added: ",this.name);
	}
}
let u1=new User("Ashok");
u1.addUser();
//console.log(f_exp);
//coun_fn();
let promise=new Promise(function(resolve,reject) {
setTimeout(function(){
	reject('Error');
}, 3000);
});

promise.then(function(value){
console.log(value);
},function(err){
console.log(err);
});

function chainpromise(seconds){
	return new Promise((resolve,reject)=>{
		setTimeout(function(){
			seconds++;
			console.log("In Promise");
			if(seconds>3)
				reject("Rejected");
			else
		    	resolve(seconds);
		},4000);		
	});
}

chainpromise(1)
.then(chainpromise)
.then(function(seconds){
	console.log(seconds)
}).catch(function(msg){
	console.log(msg);
});

var pro1=new Promise((resolve,reject)=>{
	setTimeout(()=>{
		resolve("Resolved");
	},3000)
});

var pro2=new Promise((resolve,reject)=>{
	setTimeout(()=>{
		reject("Rejected");
	},4000);
});

Promise.race([pro1,pro2])
	.then((suc)=>{
		console.log(suc);
	})
	.catch((err)=>{
		console.log(err);
	});

 //Maps and Sets

 let map1={
 	name:'First map object'
 };

 let map2={
 	name:'Second map object'
 };

 let desk=new Map();
 desk.set("fi",map1);
 desk.set("se",map2);

 let set=new Set([1,1,2]);  //Unique values

 //Reflect Api

 class Person{
 	constructor(name){
 		this._name=name;
 	}
 	get name(){
 		return this._name;
 	}

 	greet(msg){
 		console.log("Hello "+this.name+" welcome to "+msg);
 	}
 }

 let person=Reflect.construct(Person,['ashok']);

 let student={
	name:'ashok',
	age:29
};

let pro_handler={
	get:function(target,name){
		return name in target ? target[name]:'Not Exist';
	},
	set:function(target,name,value){
		if(value.constructor!==Array)
		   Reflect.set(target,name,value);
		else{
			var error=new Error("Invalid Assignment");
			return error.message;
		}
	}
}

var proxy=new Proxy(student,pro_handler);

let department={
	name:'BI',
	group:"Platform",
	size:1
};

let dep_handler={
	get:(target,name)=>{
		return name in target ? target[name]:false
	}
};
let depproxy=new Proxy({},dep_handler);
Reflect.setPrototypeOf(department,depproxy);


let showName=function(msg){
	console.log("Object name "+msg);
}

let name_handler={
	apply:function(target,thisarg,argumentList){
		if(argumentList.length==2)
		  return Reflect.apply(target,thisarg,argumentList);
	}
};

let name_proxy=new Proxy(showName,name_handler);
