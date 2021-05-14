/*=================================
date:20210513
desc:svg canvas class
autor:kyh
=================================*/


function SvgCanvas(){

    const svgns = "http://www.w3.org/2000/svg";
    const svgID='ROOTSVG';
    const selectorID = 'selector-g';

    this.rootContainer; //div
    this.svgContainer; //svg
    this.Selector;

    this.items=[];
    this.callBackItemProperty;

    this.initialize = function(container,callBack){

        //div - svg parent
        this.rootContainer=document.getElementById(container);

        //svg
        this.createBackgroundSVG(svgID,500,400,'green');
        this.createSelector();

        this.svgContainer.addEventListener("mouseup", this.canvasMouseUpHandler);
        this.svgContainer.addEventListener("mousemove", this.canvasMouseMoveHandler);
        this.svgContainer.addEventListener("mousedown", this.canvasMouseDownHandler);

        this.callBackItemProperty = callBack;
    }

    this.reset = function(){

        var len = this.items.length;
        for( var i=len-1; i>=0; i-- ){
            this.removeItem( this.items[i] );
        }

        this.items=[];
        //this.svgContainer.innerHTML = '';
    }

    this.createBackgroundSVG = function(id , width , height , color) {
            
        this.svgContainer = document.createElementNS(svgns, 'svg');
        this.svgContainer.setAttributeNS(null, 'id', id);
        this.svgContainer.setAttributeNS(null, 'width', width);
        this.svgContainer.setAttributeNS(null, 'height', height);
        //this.svgContainer.setAttributeNS(null, 'style', 'background-color:'+color);

        this.rootContainer.appendChild(this.svgContainer);
    }

    this.createSelector = function(){      
            
        this.Selector = document.createElementNS(svgns, 'g');
        this.Selector.setAttributeNS(null, 'id', selectorID);
        this.Selector.setAttributeNS(null, 'stroke', 'yellow');
        this.Selector.setAttributeNS(null, 'stroke-width', 1);
        this.Selector.setAttributeNS(null, 'visibility', "hidden");
        
        //const LINE_FILL="#ff0000";
        const LINE_FILL="#645df6";
        const LINE_DASH='1';
        const LINE_WIDTH=2;

        var selectorLine = [
            {id:'selector-left',stroke:LINE_FILL , 'stroke-width':LINE_WIDTH},
            {id:'selector-right',stroke:LINE_FILL, 'stroke-width':LINE_WIDTH},
            {id:'selector-top',stroke:LINE_FILL, 'stroke-width':LINE_WIDTH},
            {id:'selector-bottom',stroke:LINE_FILL, 'stroke-width':LINE_WIDTH}
        ];

        // var selectorLine = [
        //     {id:'selector-left','stroke-dasharray':LINE_DASH,stroke:LINE_FILL , 'stroke-width':3},
        //     {id:'selector-right','stroke-dasharray':LINE_DASH,stroke:LINE_FILL, 'stroke-width':3},
        //     {id:'selector-top','stroke-dasharray':LINE_DASH,stroke:LINE_FILL, 'stroke-width':3},
        //     {id:'selector-bottom','stroke-dasharray':LINE_DASH,stroke:LINE_FILL, 'stroke-width':3}
        // ];

        selectorLine.forEach( (selector) => {
            var line = document.createElementNS(svgns, 'line');

            for( const key in selector ){
                if (Object.hasOwnProperty.call(selector, key)) {
                    line.setAttributeNS(null, key, selector[key]);
                }
            }
            this.Selector.appendChild(line);
        });


        const RS=10;
        const RF="#ff0000";

        var selectorPoint = [
            {id:'selector-e' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'e-resize'},
            {id:'selector-nw' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'nw-resize'},
            {id:'selector-ne' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'ne-resize'},
            {id:'selector-n' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'n-resize'},
            {id:'selector-sw' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'sw-resize'},
            {id:'selector-se' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'se-resize'},
            {id:'selector-s' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'s-resize'},
            {id:'selector-w' , width:RS , height:RS , fill:RF, x:0 , y:0 , cursor:'w-resize'},
        ];

        selectorPoint.forEach( (selector) => {

            var rect = document.createElementNS(svgns, 'rect');

            for (const key in selector) {
                if (Object.hasOwnProperty.call(selector, key)) {
                    rect.setAttributeNS(null, key, selector[key]);
                }
            }

            rect.addEventListener("mousedown", this.mouseDownHandler);
            this.Selector.appendChild(rect);
        } );
        
        this.svgContainer.appendChild(this.Selector);
    }

    // graphic item의 child의 속성을 변경해야함.
    this.getTargetItem = (target) => {
        var child = target.children[0];
        return child;
    }









    /*=====================
    date: 20210513
    desc: svg element position
    author: kyh
    =====================*/
    this.setTargetPosition = (target,x,y) => {
        var translate = 'translate('+x+','+y+')';
        target.setAttributeNS(null, 'transform', translate);
    }

    this.setTargetPositionX = (target,x) => {
        var translate = 'translate('+x+','+ this.getTargetPosition(target)[1] +')';
        target.setAttributeNS(null, 'transform', translate);
    }

    this.setTargetPositionY = (target,y) => {
        var translate = 'translate('+this.getTargetPosition(target)[0]+','+y+')';
        target.setAttributeNS(null, 'transform', translate);
    }

    this.getTargetPosition = (target) => {
        var trasform =  target.getAttribute("transform");
        var values = trasform.split(' ');

        var translate = values[0];
        //var rotate = values[1];
        //var scale = values[2];

        var translatevalue = translate.substring(10 , translate.length-1);
        console.log(translatevalue);
        var position = translatevalue.split(',');
        x = parseInt(position[0]);
        y = parseInt(position[1]);

        return [x,y];
    }

    /*=====================
    date: 20210513
    desc: svg element size
    author: kyh
    =====================*/
    this.setTargetSize = (target,width,height) => {
        target.setAttributeNS(null, 'width', width);
        target.setAttributeNS(null, 'height', height);
    }

    this.setTargetWidth = (target,width) => {
        target.setAttributeNS(null, 'width', width);
    }

    this.setTargetHeight = (target,height) => {
        target.setAttributeNS(null, 'height', height);
    }

    this.getTargetSize = (child) =>{
        width = parseInt(child.getAttribute("width"));
        height = parseInt(child.getAttribute("height"));
        return [width , height];
    }


    this.addElement = function(element){
        this.svgContainer.insertBefore(element,this.Selector);
    }



    this.addItem = function(item){
        item.init();
        this.addElement(item.element);
        item.update();
        this.items.push(item);
        this.addItemEvent(item.element);
    }

    this.removeItem = function(item) {

        console.log(item.class + ":"+item.id);

        var idx = this.items.findIndex( (itor) => {
            return item == itor.item;
        });

        var remove = this.items.splice(idx,1);
        //removeItemEvent(currentTarget);
        // svg area
        this.svgContainer.removeChild(item.element);    
        this.Selector.setAttribute("visibility","hidden");
        
    }

    this.addItemEvent = (target) => {
        target.addEventListener("click",this.itemClickHandler);
        target.addEventListener("mousemove", this.itemMoveHandler);
        target.addEventListener("mousedown", this.itemDownHandler);
        target.addEventListener("mouseup", this.itemMouseUpHandler);
        //target.addEventListener("dblclick",targetDoubleClickHandler);
    }

    this.removeItemEvent = (target) => {
        target.removeEventListener("click",this.itemClickHandler);
        target.removeEventListener("mousemove", this.itemMoveHandler);
        target.removeEventListener("mousedown", this.itemDownHandler);
        target.removeEventListener("mouseup", this.itemMouseUpHandler);
    }


    this.itemClickHandler = (event) => {
        this.Selector.setAttribute("visibility","visible");
        this.currentTarget=event.currentTarget;
        this.updateSelector(event.currentTarget);
    }



    this.currentTarget;
    //var currentTargetType;

    this.startX;
    this.startY;
    this.isMoveDown=false;

    this.mx;
    this.my;

    this.itemDownHandler = (event) => {

        this.currentTarget=event.currentTarget;
        //currentTargetType = currentTarget.getAttribute('class');

        event.preventDefault();

        this.isMoveDown=true;
        this.startX = event.pageX;
        this.startY = event.pageY;

        var position = this.getTargetPosition(this.currentTarget);
        this.mx = position[0];
        this.my = position[1];

        this.updateSelector(this.currentTarget);


        var app=this;
        var idx = this.items.findIndex( function(itor)  {
            return app.currentTarget == itor.element;
        });
    
        var item = this.items[idx];
        if( this.callBackItemProperty != null && this.callBackItemProperty != undefined ){
            this.callBackItemProperty( item.getProperties() );
        }
        
    }

    this.itemMoveHandler = (event) => {
        if( this.isMoveDown ){
            var x = event.pageX-this.startX;
            var y = event.pageY-this.startY;
            this.setTargetPosition(this.currentTarget,this.mx+x,this.my+y);
            this.updateSelector(this.currentTarget);
        }
    }

    this.itemMouseUpHandler = (event) => {
        this.isMoveDown=false;
    }



    /*=====================
    date: 20210513
    desc: Selector 
    author: kyh
    =====================*/

    this.isDown=false;
    this.scaleW;
    this.scaleH;

    this.scaleX;
    this.scaleY;

    this.mouseDownX;
    this.mouseDownY;

    this.currentTransTarget;

    this.mouseDownHandler = (event) => {

        this.currentTransTarget = event.currentTarget;

        this.isDown=true;

        var position = this.getTargetPosition(this.currentTarget);
        this.scaleX = position[0];
        this.scaleY = position[1];
        
        var size = this.getTargetSize(this.getTargetItem(this.currentTarget));   
        this.scaleW = size[0];
        this.scaleH = size[1];

        this.mouseDownX = event.pageX;
        this.mouseDownY = event.pageY;
    }


    this.canvasMouseMoveHandler = (event) => {
        if( this.isDown ){

            // 최초 mouse down 위치 값 mouseDownX
            // 현재 mouse move 위치 값 pageX
            // 현재 위치에서 최초 위치값의 차를 
            if( this.currentTransTarget.id == "selector-n" ){
                var h = -(event.pageY-this.mouseDownY);
                this.setTargetPositionY(this.currentTarget,this.scaleY-h);
                this. setTargetHeight( this.getTargetItem(this.currentTarget) , this.scaleH+h );
            }else if( this.currentTransTarget.id == "selector-e" ){
                var w = event.pageX-this.mouseDownX;
                this.setTargetWidth( this.getTargetItem(this.currentTarget) , this.scaleW+w );
            }else if( this.currentTransTarget.id == "selector-ne" ){
                var h = -(event.pageY-this.mouseDownY);
                this.setTargetPositionY(this.currentTarget,this.scaleY-h);
                this.setTargetHeight( this.getTargetItem(this.currentTarget) , this.scaleH+h );
                var w = event.pageX-this.mouseDownX;
                this.setTargetWidth( this.getTargetItem(this.currentTarget) , this.scaleW+w );
            }else if( this.currentTransTarget.id == "selector-nw" ){
                var h = -(event.pageY-this.mouseDownY);
                this.setTargetPositionY(this.currentTarget,this.scaleY-h);
                this.setTargetHeight( this.getTargetItem(this.currentTarget) , this.scaleH+h );
                var w = -(event.pageX-this.mouseDownX);
                this.setTargetPositionX(this.currentTarget,this.scaleX-w);
                this.setTargetWidth( this.getTargetItem(this.currentTarget) , this.scaleW+w );
            }else if( this.currentTransTarget.id == "selector-se" ){
                var w = event.pageX-this.mouseDownX;
                var h = event.pageY-this.mouseDownY;
                this.setTargetWidth( this.getTargetItem(this.currentTarget) , this.scaleW+w );
                this.setTargetHeight( this.getTargetItem(this.currentTarget) , this.scaleH+h );
            }else if( this.currentTransTarget.id == "selector-sw" ){
                var h = event.pageY-this.mouseDownY;
                this.setTargetHeight( this.getTargetItem(this.currentTarget) , this.scaleH+h );
                var w = -(event.pageX-this.mouseDownX);
                this.setTargetPositionX(this.currentTarget,this.scaleX-w);
                this.setTargetWidth( this.getTargetItem(this.currentTarget) , this.scaleW+w );
            }  else if( this.currentTransTarget.id == "selector-s" ){
                var h = event.pageY-this.mouseDownY;
                this.setTargetHeight( this.getTargetItem(this.currentTarget) , this.scaleH+h );
            }else if( this.currentTransTarget.id == "selector-w" ){
                var w = -(event.pageX-this.mouseDownX);
                this.setTargetPositionX(this.currentTarget,this.scaleX-w);
                this.setTargetWidth( this.getTargetItem(this.currentTarget) , this.scaleW+w );
            }
        this.updateSelector(this.currentTarget);
        }
    }

    this.canvasMouseUpHandler = (event) => {
        this.isDown=false;
        this.isMoveDown=false;
    }

    this.canvasMouseDownHandler = (event) => {
        if( this.isMoveDown == true || this.isDown == true ){
        }else{
            this.Selector.setAttribute("visibility","hidden");    
        }
    }


    this.updateSelector = (target) => {
        
        var position = this.getTargetPosition(target);
        var x = position[0];
        var y = position[1];
        
        var size = this.getTargetSize(this.getTargetItem(target));   
        var width = size[0];
        var height = size[1];

        var test = 'translate('+x+' '+y+')';
        this.Selector.setAttribute("transform",test);
        
        var e = document.getElementById('selector-e');
        var ne = document.getElementById('selector-ne');
        var nw = document.getElementById('selector-nw');
        var n = document.getElementById('selector-n');
        var se = document.getElementById('selector-se');
        var sw = document.getElementById('selector-sw');

        var s = document.getElementById('selector-s');
        var w = document.getElementById('selector-w');

        //selector size;
        const RS=10;

        //e
        e.setAttribute("x",width-(RS/2));
        e.setAttribute("y",(height/2-RS/2));
        
        //ne
        ne.setAttribute("x",width-(RS/2));
        ne.setAttribute("y",-(RS/2));

        //nw
        nw.setAttribute("x",-(RS/2));
        nw.setAttribute("y",-(RS/2));

        //n
        n.setAttribute("x",(width/2-RS/2));
        n.setAttribute("y",-(RS/2));

        //se
        se.setAttribute("x",width-(RS/2));
        se.setAttribute("y",height-(RS/2));

        //sw
        sw.setAttribute("x",-(RS/2));
        sw.setAttribute("y",height-(RS/2));

        //s
        s.setAttribute("x",(width/2-RS/2));
        s.setAttribute("y",height-(RS/2));

        //w
        w.setAttribute("x",-(RS/2));
        w.setAttribute("y", (height/2-RS/2) );

        lineLeft = document.getElementById('selector-left');
        lineRight = document.getElementById('selector-right');
        lineTop = document.getElementById('selector-top');
        lineBottom = document.getElementById('selector-bottom');

        lineLeft.setAttribute('x1',0);
        lineLeft.setAttribute('y1',0);
        lineLeft.setAttribute('x2',0);
        lineLeft.setAttribute('y2',height);

        lineRight.setAttribute('x1',width);
        lineRight.setAttribute('y1',0);
        lineRight.setAttribute('x2',width);
        lineRight.setAttribute('y2',height);

        lineTop.setAttribute('x1',0);
        lineTop.setAttribute('y1',0);
        lineTop.setAttribute('x2',width);
        lineTop.setAttribute('y2',0);

        lineBottom.setAttribute('x1',0);
        lineBottom.setAttribute('y1',height);
        lineBottom.setAttribute('x2',width);
        lineBottom.setAttribute('y2',height);
    }

    this.getData = function(){
        var formData = {};

        var parsingItems=[];
        this.items.forEach( function(iter)  {
            parsingItems.push( iter.getProperties() );
        } );
        
        formData.items=parsingItems;

        return formData;
    }


    this.setData = function(formData){
        
        var app = this;

        formData.items.forEach( function(item){

            if( item.class == 'Sign' ){
                var sign = new Sign();
                app.addItem(sign);
                sign.setProperties(item);
            }else if(item.class == 'Text'){
                var text = new Text();
                app.addItem(text);
                text.setProperties(item);
            }
            

        } );

    }


    
    this.setScaledSize = function(width,height)  {
        
        svgContainer.setAttribute( 'width', width);
        svgContainer.setAttribute( 'height', height);
  
   }
    
   this.setCurrentItemProperty = function(attr,value)  {
    
        var app=this;
        var idx = this.items.findIndex( function(itor) {
            return app.currentTarget == itor.element;
        });

        var item = this.items[idx];
        this.setProperty(item.type,item,attr,value);
    }


    this.addText = function(x,y,w,h,color,size){
        var text = new Text();
        this.addItem(text);
        text.setProperty('x',x);
        text.setProperty('y',y);
        text.setProperty('width',w);
        text.setProperty('height',h);
        text.setProperty('fontColor',color);
        text.setProperty('fontSize',size);
    }
    this.addSign = function(x,y,w,h){
        var sign = new Sign();
        this.addItem(sign);
        sign.setProperty('x',x);
        sign.setProperty('y',y);
        sign.setProperty('width',w);
        sign.setProperty('height',h);
    }
    
    this.getItems = function(){
        return this.items;
    }
    

}


