'use strict';
let f_exp=1000;
function coun_fn(){
	let res=0;
	for(let i=0;i<f_exp;i++){
		res+=i;
		console.log(res);
	}
}
export { f_exp,coun_fn };