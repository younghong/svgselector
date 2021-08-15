var Log = console.log;
var writer;

window.onload = function(){

    writer = document.getElementById('writer');
    writer.addEventListener('keydown',writerKeydown,false);
    writer.addEventListener('input',writerKeyup,false);
}

var disableinput=false;

// 이벤트 차단 관리.
writerKeydown = function(event){

    oldTextLength=writer.value.length;
    //Log(` down length =  ${writer.value.length} `);

    //Log(event.key , event.keyCode);
    var isRunning=false;

    //test code
    if( event.code == 'ArrowLeft' ){
        upAreaFontSize();
    }


   // 37 38 39 40 46 8 
   switch (event.keyCode) {
        case 37:isRunning=true;break;
        case 38:isRunning=true;break;
        case 39:isRunning=true;break;
        case 40:isRunning=true;break;
        case 46:isRunning=true;break;
        case 8:isRunning=true;break;
       default:break;
   }

    if( isRunning || (writer.selectionStart != writer.selectionEnd)  ){

    }else{
        var pt=getFontValue();

        if( event.keyCode == 13 ){
             var isNext = checkNext();
             if( (pt == 8 || pt == 7) && !isNext ){
                 disabledEvent(event);
             }
        }
     
        // selection이 있거나,  delete , backspace키가 있다면 건너뛴다.
        if(disableinput===true){
            Log("stop evvent");
            disabledEvent(event);
        }
    }
}

/***
 * 1.글자를 줄인다.
 * 2.min size 제한 기능
 * 3.글자를 키운다.
 * 4.max size 제한 기능
 * 5.현재 상태가 글자를 더하고 있는 상태인지 줄이고 있는 상태인지 체크 필요.
 * 
 */


var oldsize;


// font size를 줄여서 모든 내용이 area에 표현되도록 한다.
downAreaFontSize = function(){

    //text가 area를 벗어나는지 판단한다.
    //판단하는 방법 1:TEXT개별 크기 확인,  2:스크롤높이로 확인.
    
    var origHeight = writer.style.height,
 //       height = writer.offsetHeight,
        scrollHeight = writer.scrollHeight;


    var height=getPointString2Int(origHeight);


    //Log(`origHeight: ${origHeight} , height: ${height} , scrollHeight: ${scrollHeight} `); 

    //벗어나는 area만큼의 비율로 fontsize를 줄인다.
    if(oldsize==undefined)oldsize=getFontValue();

    var px = getCalculateFontSize( getFontValue() ,  height , scrollHeight );
    px = Math.round(px);
    var pt = getPixcel2Point(px);

    //여기는 다운시키는 함수이기 때문에 이전 사이즈보다 커지면 안된다.
    if( oldsize < pt ){
        pt=oldsize;
    }

    //최소 폰트사이즈 단계에서 영역제어.
    if( pt == 7 || pt == 8){

        var isNextInput = checkNextInput(writer.value);
        if( !isNextInput ){
            disableinput=true;
        }else{
            disableinput=false;
        }
    
    }

    if( height < scrollHeight ){
        //Log(`px: ${px} ,  pt:  ${pt}`);
        const min = 7;
        if( pt < 7 ){
            pt=7;
        }
       // Log('영역을 벗어났습니다.');
        setTextAreaFontSize(pt);
    }else{
       // Log('영역 안에 있습니다.');
    }

    oldsize=pt;

}
upAreaFontSize = function(){
    //영역크기/글자수 = 폰트영역크기
    var origWidth = writer.style.width;
    var origHeight = writer.style.height;

    var width = getPointString2Int(origWidth);
    var height = getPointString2Int(origHeight);

    var area = width*height;
    var textSize = writer.value.length;

    var fontAreaSize = area/textSize;
    var fontsize = Math.sqrt(fontAreaSize);
    Log(`fontarea size = ${fontsize}`);
    
    
    setTextAreaFontSize(getPixcel2Point(fontsize));
    //Log(` ${Math.sqrt(4)}`);
}
// font size를 키워서 모든 내용이 area에 표현되도록 한다.
upAreaFontSize1 = function(){


    //값을 줄이면 영역을 넘어간다.
    //값을 줄였을 때, 영역을 넘어가는지 추가 판단이 필요하다.




  //text가 area를 벗어나는지 판단한다.
    //판단하는 방법 1:TEXT개별 크기 확인,  2:스크롤높이로 확인.
    
    var origHeight = writer.style.height,
        scrollHeight = writer.scrollHeight;
    var height=getPointString2Int(origHeight);

    //벗어나는 area만큼의 비율로 fontsize를 줄인다.
    if(oldsize==undefined)oldsize=getFontValue();

    var pt=getFontValue();
    var px=getPoint2Pixcel(pt);
    var h = px * getTotalLineCount(writer.value,pt);
    var cpx = getCalculateFontSize( getFontValue() ,  height , scrollHeight  );

    Log(` h= ${h}  , height= ${height} , scroll= ${scrollHeight}`);

    cpx = Math.round(cpx);
    var pt = getPixcel2Point(cpx);

    //여기는 업시키는 함수이기 때문에 이전 사이즈보다 작아면 안된다.
    if( oldsize > pt ){
        //pt=oldsize;
    }

    //최소 폰트사이즈 단계에서 영역제어.
    if( pt == 7 || pt == 8){

        var isNextInput = checkNextInput(writer.value);
        if( !isNextInput ){
            disableinput=true;
        }else{
            disableinput=false;
        }
    
    }

    if( height > scrollHeight ){
        
    }else{
       // Log('영역 안에 있습니다.');
       const max = 24;
       if( pt > max ){
           pt=max;
       }
       disableinput=false;


       if( checkNextHeight(writer.value,pt) ){
        //setTextAreaFontSize(pt);
        Log("폰트사이즈 적용시",pt);
       }else{
        Log("폰트사이즈 적용시 영역 벗어남.",pt);
       }
       setTextAreaFontSize(pt);

       
    }

    oldsize=pt;

}

getCalculateFontSize = function(value,  height , scrollHeight ){
    // pt => px
    // 비율 구하기 = height/scrollHeight
    // px * 비율
    return getPoint2Pixcel(value) * (height/scrollHeight);
}

getPoint2Pixcel = function(value){
    var c = 96/72;
    return Math.ceil(c*value);
    //return c*value;
}

getPixcel2Point = function(value){

    var c = 72/96;
    return Math.ceil(c*value);
    //return c*value;
}

setTextAreaFontSize = function(value){

    if( value < 7 ){
        value=7;
    }
    writer.style['font-size'] =value +'pt';
}


getFontValue = function(){
    var fs = writer.style['font-size'];
    fs = fs.replace('pt','');
    fs = parseFloat(fs);
    return fs;
}

getPointString2Int = function(value){
    var result = value.replace('pt','');
    result = parseFloat(result);
    return result;
}


var oldTextLength=0;

writerKeyup = function(event){



    //upAreaFontSize();

    //return;

    if(oldTextLength < writer.value.length){
        downAreaFontSize();
    }else if(oldTextLength > writer.value.length){
        upAreaFontSize();
    }else{
        downAreaFontSize();
    }

    
    

}


checkNext = function(){
    var height = writer.offsetHeight;

    var pt=getFontValue();
    var px=getPoint2Pixcel(pt);
    var h = px * getTotalLineCount(writer.value,pt);

    if( h + px > height ){
        Log(`Enter를 허용하면 안된다, pt= ${pt} ,  px= ${px}`);
        return false;
    }else{
        Log("Enter는 가능.");
        return true;
    }
}



// 마지막 줄에 왔으면 text를 하나 더해서 다음입력 가능 여부를 확인.
checkNextInput = function(text){
    var origHeight = writer.style.height;
    var height=getPointString2Int(origHeight);
    var pt=getFontValue();
    var px=getPoint2Pixcel(pt);
    var lc=getTotalLineCount(text,pt);
    var h = px * lc;
    if( (h + px > height) ){

        if( lc < getTotalLineCount(text+"W",pt)  ){
            return false;
        }else{
            return true;
        }
                
    }else{
        //Log("입력을 허용");
        return true;
    }
}

checkNextHeight = function(text,pt){
    var origHeight = writer.style.height;
    var height=getPointString2Int(origHeight);
    //var pt=getFontValue();
    var px=getPoint2Pixcel(pt);
    var h = px * getTotalLineCount(text,pt);

    if( h + px > height ){
        //Log(`입력을 허용하면 안된다, pt= ${pt} ,  px= ${px}`);
        return false;
    }else{
        //Log("입력을 허용");
        return true;
    }
}


getTotalLineCount = function(text,pt){

    var origHeight = writer.style.height,
        height = writer.offsetHeight,
        scrollHeight = writer.scrollHeight,
        origWidth = writer.style.width,
        width = writer.offsetWidth,
        scrollWidth = writer.scrollWidth;

    //var pt=getFontValue();
    var px=getPoint2Pixcel(pt);
    var ww=getPointString2Int(origWidth);

    var totalCount = 0;
    text.split('\n').forEach(function(line){
        totalCount+=getTextLineCount(line.split(''),px,ww);
    });

    Log(`totalCount: ${totalCount}`);
    return totalCount;
}


// text 한줄에서 발생하는 line의 수를 구한다.
getTextLineCount = function(text,px,areaWidth){
    var rowCount=1;
    var size=0;
    text.forEach(function(word){
        var o = measureText(word,px);
        //Log( `current= ${size+o.width}  ,  areaWidth= ${areaWidth}` );
        if( (size+o.width) > areaWidth ){
            rowCount++;
            size=o.width;
        }else{
            size+=o.width;
        }
    });

    return rowCount;
}

















measureText = function(txt,size) {
    //var testFont = this.fontStyle + " " + this.fontWeight + " " + _testFontSize +'px ' + 'Arial';  
    var testFont = 400 + " " +size +'px ' + 'Helvetica';  
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("2d");
    ctx.font = testFont;    
    return ctx.measureText(txt);
}











getTextCal = function(){

    var mySize=getFontValue();
   
    var fontSize=  mySize *1.3333/2;

    Log('Font size b',fontSize);
    fontSize = Math.ceil(fontSize);
    Log('Font size a',fontSize);

    var vSize =Math.ceil(mySize*1.3333);


    var text = writer.value;

    //unicode range 체크 필요.  한글,영문,특수문자
    //일단 테스트로 숫자로만 입력한다.

    //라인계산.

    //라인별 너비계산.
    var lines = text.split('\n');


    //글자 하나하나를 모두 계산하여 라인을 생성한다.
    var textArray = text.split('');

    var maxWidth=100;
    var maxHeight=100;
    var currentWidth=0;
    
    var line=[];
    var lineChar='';  

    textArray.forEach(function(char,idx){

        if(currentWidth==0){
            lineChar="";
        }

        currentWidth+=fontSize;

        if( maxWidth <= currentWidth  ){
            line.push(lineChar);

            lineChar=char;
            currentWidth=fontSize;

        }else{
            lineChar+=char;
        }
        
        if( idx == textArray.length-1 ){
            line.push(lineChar);
        }
    });
    Log(line);


    //if(  (line.length * vSize) > 100 ){
        var scale =  100 / (line.length * vSize);
        var setSize = (mySize*scale);

        //if(setSize>24)setSize=24;

        Log('SET FONT SIZE',setSize);
        writer.style['font-size'] =setSize +'pt';
    //}
    

    

    return;




    lines.forEach(function(iter){


        if( (iter.length * fontSize) > 100 ) {
            Log('너비 초과');

            //너비를 초과하면 너비에 맞는 글자 수를 구해야 한다.
            //글자별로 너비가 다르지만 현재는 숫자로만 계산하겠다.
            // 100 > x * fontSize =>  x = 100/fontSize;
            var maxWidthLength = 100/fontSize;
            maxWidthLength = Math.round(maxWidthLength);
            Log('maxWidthLength',maxWidthLength);

            //초과되는 너비를 찾았으면 라인카운트를 늘려준다.

        }else{
            Log('너비 미만');
        }
    

    });



    Log(text);

}


function disabledEvent(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else if (window.event) {
        window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
}

var oldLength=0;
var newLength=0;

// 라인길이를 계산.
test1 = function(){

    var CH = writer.clientHeight;
    //var CH = 100;

    var fontsize = getFontValue();
    var currentFontsize=fontsize;
    Log('get fontsize',fontsize);

    var lines = writer.value.split('\n');
    //var len = lines.length;
    var len = getLineCount();

    var c = 96/72;
    var test =  fontsize*len*c;  
    test = parseInt(test);
    var ff = CH / test;    

    Log('VV',CH,test,ff);


    fontsize = ff * fontsize;
    Log('set fontsize1',fontsize);
    fontsize = parseInt(fontsize);
    Log('set fontsize2',fontsize);
    

    const max=24;
    const min=7;

    fontsize = fontsize > max ? max : fontsize;
    fontsize = fontsize < min ? min : fontsize;

    Log('set fontsize3',fontsize);

    newLength=writer.value.length;
    if( newLength > oldLength ){
        Log('fontsize를 줄어야 한다.',newLength,oldLength);
        if( currentFontsize < fontsize ){
            fontsize = currentFontsize;
            Log( '키우면 안됨.' , currentFontsize , fontsize);
        }
    }else{
        Log('fontsize를 늘려야 한다.',newLength,oldLength);

    }
    oldLength = newLength;


    if(  fontsize == 7 && CH < (writer.scrollHeight+fontsize) ){
        Log("area over");
        
        disableinput=true;
    }else{
        disableinput=false;
    }
    writer.style['font-size'] = fontsize+'pt';
}

test2 = function(){
    //textarea 내부의 텍스트들을 모두 읽어서 현재 라인수를 계산한다.
    //Log('Line Count', calculateHeight() );

    //글자너비가 영역의 너비를 넘어가면 라인카운트를 늘린다.
    //다음라인

    
}

getLineCount = function(){
    var w = writer.clientWidth;
    //w=100;
    var h = writer.offsetHeight;

    var c = 96/72;
    var fontsize = getFontValue();
    var cv = fontsize * c;

    var lines = writer.value.split('\n');
    var lineCount=0;


    lines.forEach(function(line){


        var wsize = measureText(line,cv).width;


        if( w < wsize ){
            var a = wsize / w;
            a = Math.ceil(a);
            Log('OVER WIDTH',a);
            lineCount+=a;
        }else{
            lineCount++;
        }
        
    });

    Log('Line Count',lineCount);
    return lineCount;
}







writerKeyup_bak = function(event){




    //글자수를 계산.
    //getTextCal();
    //return;

    //라인 길이로 계산.
    test1();
    //test2();

    //getLineCount();

    //test99991();
    return;


    if(  writer.clientHeight < writer.scrollHeight ){
        Log('영역을 벗어남',writer.clientHeight , writer.scrollHeight);
        //fontsize를 줄인다.
        

        var ff = writer.clientHeight / writer.scrollHeight;    
        Log('ff=',ff , fontsize);
        fontsize = ff * fontsize;
        writer.style['font-size'] = fontsize+'pt';

    }else{
        Log('영역에 들어옴',writer.clientHeight , writer.scrollHeight);

        // if(104 == writer.scrollHeight){
        //     Log('기본 영역',fontsize);            
        // }else{
        //     var fontsize = getFontValue();
        //     var ff = writer.clientHeight / writer.scrollHeight;    
        //     Log('ff=',ff , fontsize);
        //     fontsize = ff * fontsize;
        //     writer.style['font-size'] = fontsize+'pt';
        // }




       

    }

    return;



    //if(  writer.clientHeight < writer.scrollHeight ){

        var fs = writer.style['font-size'];
        Log('fontSize',fs);

        fs = fs.replace('pt','');
        fs = parseFloat(fs);

        var lines = writer.value.split('\n');





        // 72pt = 96px
        var c = 96/72;



        var test =  40*lines.length*c;
        Log('test',test);
        if( writer.scrollHeight > writer.clientHeight ){
        //if( test < writer.clientHeight ){

            var v = fs*lines.length*c;

            //if( v > writer.clientHeight ){
    
                // fontsize * line length = area height
                // area height / line length = font size;
    
                //var ff = writer.clientHeight / (lines.length*c);
                var ff = writer.clientHeight / writer.scrollHeight;
    
                Log('ff=',ff);
                writer.style['font-size'] = ff+'pt';
           //}




        }else{
            writer.style['font-size'] = 40+'pt';

        }
       
    //}
}






var calculateContentHeight = function( ta, scanAmount ) {
    var origHeight = ta.style.height,
        height = ta.offsetHeight,
        scrollHeight = ta.scrollHeight,
        overflow = ta.style.overflow;
    /// only bother if the ta is bigger than content
    if ( height >= scrollHeight ) {
        /// check that our browser supports changing dimension
        /// calculations mid-way through a function call...
        ta.style.height = (height + scanAmount) + 'px';
        /// because the scrollbar can cause calculation problems
        ta.style.overflow = 'hidden';
        /// by checking that scrollHeight has updated
        if ( scrollHeight < ta.scrollHeight ) {
            /// now try and scan the ta's height downwards
            /// until scrollHeight becomes larger than height
            while (ta.offsetHeight >= ta.scrollHeight) {
                ta.style.height = (height -= scanAmount)+'px';
            }
            /// be more specific to get the exact height
            while (ta.offsetHeight < ta.scrollHeight) {
                ta.style.height = (height++)+'px';
            }
            /// reset the ta back to it's original height
            ta.style.height = origHeight;
            /// put the overflow back
            ta.style.overflow = overflow;
            return height;
        }
    } else {
        return scrollHeight;
    }
}

var calculateHeight = function() {
    var ta = document.getElementById("writer"),
        style = (window.getComputedStyle) ?
            window.getComputedStyle(ta) : ta.currentStyle,
        
        // This will get the line-height only if it is set in the css,
        // otherwise it's "normal"
        taLineHeight = parseInt(style.lineHeight, 10),
        // Get the scroll height of the textarea
        taHeight = calculateContentHeight(ta, taLineHeight),
        // calculate the number of lines
        numberOfLines = Math.ceil(taHeight / taLineHeight);


    return numberOfLines;
};


var max = 0;
var targetScale=1;

var oldLength=0;
var newLength=0;

test99991 = function(){

    if( max == 0 ){
        max = writer.clientHeight;
    }

    newLength=writer.value.length;
    
    if(  max < writer.scrollHeight  && (writer.clientHeight != writer.scrollHeight) ){
        var scale = max / writer.scrollHeight;
        var changeSize = max / scale;

        writer.style.transform = "scale("+scale+")";
        writer.style.width = changeSize+"px";
        writer.style.height= changeSize+"px";
        targetScale = scale;
        Log('영역을 벗어남',writer.clientHeight , writer.scrollHeight , scale,changeSize);
    }else{
        Log('영역에 들어옴',writer.clientHeight , writer.scrollHeight);
        if( targetScale < 1 ){
            

            //글자가 줄어들 때.
            var c = 96/72;
            var fontsize = getFontValue();
            var fontHeight = fontsize* c;
            var cv = fontsize/2 * c;
            Log(fontHeight);


            //var wsize = measureText(writer.value,cv).width;
            //wsize = Math.ceil(wsize);
            var wsize = cv*writer.value.length;
            var rowNum = wsize/writer.scrollWidth;
            rowNum = Math.ceil(rowNum);

            Log('rowNum',rowNum);



            if( rowNum*fontHeight < writer.clientHeight ){
                Log('줄여도됨');


                return;
                var scale = rowNum*fontHeight / max;
                var changeSize = max * scale;
                Log(rowNum*fontHeight ,changeSize,scale, max );
                writer.style.transform = "scale("+scale+")";
                writer.style.width = changeSize+"px";
                writer.style.height= changeSize+"px";
                targetScale = scale;


    
            }






        }
    }



    oldLength = newLength;



    return 

    //1.text line 수를 구한다.
    //2.라인의 높이를 구한다.
    //3.(text line * 높이)의 값과  area의 비율을 구해서 화면을 축소/확대 시킨다.

    var lines = writer.value.split('\n');
    var lineCount = lines.length;

    var c = 96/72;
    var fontsize = getFontValue();
    var cv = fontsize * c;
    var h = cv;

    




    //if( max == 0 ){
        max = writer.clientHeight;
    //}

    //var scale = max / writer.scrollHeight;
    var scale = writer.clientHeight/(lineCount * h);

    if( scale < 1 ){

        var changeSize = max / scale;

        writer.style.transform = "scale("+scale+")";
        writer.style.width = changeSize+"px";
        writer.style.height= changeSize+"px";
    
    }





}