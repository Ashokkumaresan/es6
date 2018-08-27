(function(w){
var _len=0,
    _width=0,
    _height=0,
    _radius=0,
    _angle=0,
    _bre=0;

 function clone(src,des){
 	for(var attr in src.prototype)
 		des.prototype[attr]=src.prototype[attr];
 } 
    Circle=function(){
    	this.item=document.createElementNS('http://www.w3.org/2000/svg','circle');
    };

    Circle.prototype.move=function(_x,_y){
    		this.item.setAttribute("r",30);
 			this.item.setAttribute("cx",_x);
 			this.item.setAttribute("cy",_y);
    }

	Circle.prototype.color=function(_clr){
		this.item.setAttribute("fill",_clr);
	}

 	Circle.prototype.get=function(){
 		return this.item;
 	}

    Circle.prototype.previous=function(shp){
    	if(shp){
    		this.x=shp.item.getAttribute("cx");
    		this.y=shp.item.getAttribute("cy");
    		this.nextShape=shp;
    	}
    	return this.nextShape;
    }

    Circle.prototype.chainAction=function(action){
    	var _x=this.x;
    	var _y=this.y;
    	if(_x){
    	  setTimeout(binder(this,function(){    	  	
    	  	this[action].apply(this,[_x,_y]);
    	  }),100*this.id); 
    	}
    	if(this.nextShape){    		
    		this.nextShape.chainAction(action);	
    	}
    }

 	Circle.prototype.getID=function(){
 		return this.id;
 	}

 	Circle.prototype.setID=function(id){
 		this.id=id;
 	}
     
     Rectangle=function(){
     	this.item=document.createElementNS('http://www.w3.org/2000/svg','rect');
     }

     clone(Circle,Rectangle);

     function binder(scope,fun){
     	return function(){
     		return fun.apply(scope,arguments);
     	}
     }

     function shapeFacade(shp){
     	return{     		
     		color:binder(shp,shp.color),
     		move:binder(shp,shp.move),
     		getID:binder(shp,shp.getID)
     	}
     }

     Rectangle.prototype.move=function(_x,_y){
     		this.item.setAttribute("width",30);
     		this.item.setAttribute("height",30);
 			this.item.setAttribute("x",_x);
 			this.item.setAttribute("y",_y);
     }
    //clone(Circle,Rectangle);

     RedCircle=function(){     
     	this.item=new Circle();
     	this.init();
    };

     BlueCircle=function () {     
     	this.item=new Circle();
     	this.init();
    };

    RedCircle.prototype.init=function(){
      	this.item.color('red');
    };

  RedCircle.prototype.get=function(){
    return this.item;
  }

    BlueCircle.prototype.init=function(){
    	this.item.color('blue');    	
    };


  BlueCircle.prototype.get=function(){
    return this.item;
  }

  CircleFactory=function(){
     	this.type={};
     	this.create=function(_type){
     		return new this.type[_type]().get();
     	}
     	this.register=function(type,_cl){
     		if(_cl.prototype.init)
     			this.type[type]=_cl;
     		else
     			console.log("Invalid Class Name");
     	}
     };

   var  ShapeContainer=function(id){
   		this.index=0;
   		this.context=id;
   }
   ShapeContainer.prototype.SID="stageElem_";
   ShapeContainer.prototype.add=function(item){
   	  ++this.index;
   	  item.setAttribute('class',this.SID+this.index);
   	  this.context.appendChild(item);
   }
   ShapeContainer.prototype.remove=function(index){
   		this.context.remove("."+this.SID+this.index);
   }

   var CompositeController=function(arr){
       this.svglist=arr;
   }

   CompositeController.prototype.action=function(act){
   	   var args=Array.prototype.slice.call(arguments);
       args.shift();
   	   for(var item in this.svglist){
   		 this.svglist[item][act].apply(this.svglist[item],args);
   	   }
   }

   function selfDestructDecorator(obj) {
	obj.item.addEventListener('click',function(){
		obj.kill();
	});

   	obj.kill=function(){
   			obj.item.remove();
   		}
   }

   function flyWeightFader(item){
   		if(item.getAttribute("fill")=="blue"){
   			item.setAttribute("fill-opacity",0.5);
   		}
   }

   function eventDispatcherDecorator(o){
   	var list={};
   	    o.addEvent=function(type,listener){
   	    	if(!list[type]){
   	    		list[type]=[];
   	    	}
   	    	if(list[type].indexOf(listener)===-1){
   	    		list[type].push(listener);
   	    	}
   	    };
   	    o.dispatch=function(e){
   	    	var _aList=list[e.type];
   	    	if(_aList){
   	    		if(!e.target){
   	    			e.target=this;
   	    		}
   	    		for(var ind in _aList){
   	    			_aList[ind](e);
   	    		}
   	    	}
   	    }
   }

setTimeout(function(){ console.log("Hello"); }, 10000);

   obj={};
   eventDispatcherDecorator(obj);
   fn=function(){
   	console.log("Second msg");
   }
   obj.addEvent("once",function(){console.log("First msg")});
   obj.addEvent("once",fn);

   obj.dispatch({type:"once"});

 var hsShape=(function(){
 	var initialize;
 	function _reset(){
 		console.log("Initialized Variables");
 		_len=0,    _width=0,    _height=0,    _radius=0,    _angle=0,    _bre=0;
 	}
 	function init(){
 		var list=[];
 		var _parent;
 	    _cf=new CircleFactory();
 	    _cc=new CompositeController(list);
 		/*_cf.register('red',RedCircle);
 		_cf.register('blue',BlueCircle);*/

 		function create(_l,_r,_c){
 			var circle=_cf.create(_c); 			
 			circle.setID(list.length);
 			var ind=list.length-1;
 			list.push(circle);
	 			rect=new Rectangle();
	 			rect.color('red');
	 			rect.move(_l,_r);
	 			selfDestructDecorator(rect);
	 			_parent.add(rect.get());
 			//list.push(rect);
 			//_pos(circle,_l,_r); 	
 			
 			
 			circle.move(_l,_r)	
 			 if(ind!=-1)
 				list[ind].previous(circle);	
 			//circle.previous(circle);
 			return shapeFacade(circle);

 		}

 		function register(name,cls){
 			_cf.register(name,cls);
 		}
 		function _pos(_c,_l,_r){
 			_c.setAttribute("r",30);
 			_c.setAttribute("cx",_l);
 			_c.setAttribute("cy",_r);
 		}
 		function add(_c){ 			
 			//_parent.add(_c.get());

 			//list.push(_c);
 			_parent.add(list[_c.getID()].get());
 		}
 		function seperate(){
 			_cc.action("move",30,60);
 		}
 		function changecolor(clr){
 	        _cc.action("color",clr);		
 		}
 		function setContainer(_place){
 			_parent=new ShapeContainer(document.querySelector(_place));
 		}
 		function reset(){
 			list[0].chainAction("move")
 		}
 		return{
 			create:create,
 			register:register,
			add:add,
			setContainer:setContainer,
			seperate:seperate,
			colorchange:changecolor,
			reset:reset,
			list:list
		}
 	}

	return{
        getInstance:function(){
        	if(!initialize)
        		initialize=init();
        	return initialize;
        }
	 }
 })(); 
window.addEventListener('load', function () {
	 shape=hsShape.getInstance();
	 shape.register('red',RedCircle);
	 shape.register('blue',BlueCircle);
	 shape.setContainer("#s_area");

	var _p=document.getElementById('s_area');
	_p.setAttribute("viewBox","0 0 "+window.innerWidth+" "+window.innerHeight+"");

	document.getElementById('s_area').addEventListener("click", function(e){	    
	    var _c=shape.create(e.pageX,e.pageY,"blue");
	    shape.add(_c);
	    console.log(shape.list);
	    flyWeightFader(shape.list[_c.getID()].get());
	});

	document.querySelector('body').addEventListener("keypress",function(e){	
	    if(e.which==109){
	    	shape.seperate();
	    }
	    else if(e.which==99){
	    	shape.colorchange("black");
	    }	
	    else if(e.which==114){
	    	shape.reset();
	    }	
	    else{
	    var _c=shape.create((Math.floor(Math.random() * (window.innerWidth - 50)) + 50),(Math.floor(Math.random() * (window.innerHeight - 50)) + 50),"red");
	    shape.add(_c);
	    console.log(shape.list);
	}
	});
});
 
})(window);