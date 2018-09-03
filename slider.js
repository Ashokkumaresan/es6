(function(){
   class MiniSlider{
       constructor(_id,_img){           
           try {
               this.id=document.querySelector(_id);
               this.container=_id;
               this.images=_img;
               this.list=[];
               load(this.container,this.images,this.list);
           } catch (e) {
               //Catch Statement
           }
       }
       
       start(){
           console.log("Start image movement "+this.images.length);
            let _main=document.querySelector(this.container+" .mainDisplay img");
           setInterval(()=>{
               document.querySelectorAll(this.container+" .subList .list").removeClass("border");
               console.log(this.list);
               let _con=this.list.shift();
               let _img=this.images.shift();
               _main.setAttribute("src",_img);
               _con.addClass("border");
               this.images.push(_img);
               this.list.push(_con);
           },4000);
       }
   }
let load=(_id,_img,_lst)=>{
    console.log("load images");
    let _main=document.querySelector(_id+" .mainDisplay");
    let _sublist=document.querySelector(_id+" .subList");
    for(im of _img){
        let _imgcontainer=document.createElement("div");
        _imgcontainer.setAttribute("class","list");
        let _m=document.createElement("img");
        _m.setAttribute("src",im);
        _imgcontainer.appendChild(_m);
        _sublist.appendChild(_imgcontainer);
        _lst.push(_imgcontainer);
    }
//load main image
    let _immain=document.createElement("img");
        _immain.setAttribute("src",_img[0]);
    _main.appendChild(_immain);
}
 Slider=(()=>{
     return {
         Mini:MiniSlider
     }
 })();
    
})();