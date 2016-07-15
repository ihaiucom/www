/**
 * Created by zengfeng on 14-9-27.
 */


this.zf = this.zf || {};
(function(){
    var p = zf;
    p.appView = null;
    p.stage = null;
    p.stageWidth = 0;
    p.stageHeight = 0;
    p.originalWidth = 640;
    p.originalHeight = 960;
    p.originalHV = p.originalWidth / p.originalHeight;
    p.scale = 1;
    p.scaleX = 1;
    p.scaleY = 1;
    p.hv = p.originalHV;
    p.hvChange = p.originalHV;

    p.initialize = function(appView,appStage)
    {
        p.appView = appView;
        p.stage = appStage;
        p.stageWidth = 640;
        p.stageHeight = 960;

        p.scale = 1;
        p.stageWidth *= p.scale;
        p.stageHeight *= p.scale;

        var hv = $(window).width() / $(window).height();
        p.stageWidth = $(window).width();
        p.stageHeight = $(window).height();
        p.scaleX = p.stageWidth / p.originalWidth;
        p.scaleY = p.stageHeight / p.originalHeight;
        p.hv = p.stageWidth / p.stageHeight;
        p.hvChange = p.hv - p.originalHV;

        appView.width(p.stageWidth);
        appView.height(parseInt(p.stageHeight));

        appStage.css("clip", "rect(0px,"+p.stageWidth+"px,"+ p.stageHeight+"px,0px)");


        console.log(window.innerWidth);
        console.log(window.innerHeight);

//        var scaleX = window.innerWidth / p.stageWidth;
//        var scaleY = window.innerHeight / p.stageHeight;

//        var posX = 0;
//        var posY = 0;
//        posX += "px";
//        posY += "px";
//        p.appView.css("transform-origin", "left top");
//        p.appView.css("transform", "scale("+scaleX+","+scaleY+")");
//        p.appView.css("transform", "translate("+posX+", "+posY+")");

    };

    p.getScalePercentage = function()
    {
        return parseInt(p.scale * 100) + "%";
    };



}());


(function(){
    var BrowserDetect = function()
    {

    };

    var agent = window.navigator.userAgent;
    BrowserDetect.isFirefox = (agent.indexOf("Firefox") > -1);
    BrowserDetect.isOpera = (window.opera != null);
    BrowserDetect.isChrome = (agent.indexOf("Chrome") > -1);  // NOTE that Chrome on Android returns true but is a completely different browser with different abilities
    BrowserDetect.isIOS = agent.indexOf("iPod") > -1 || agent.indexOf("iPhone") > -1 || agent.indexOf("iPad") > -1;
    BrowserDetect.isAndroid = (agent.indexOf("Android") > -1);
    BrowserDetect.isBlackberry = (agent.indexOf("Blackberry") > -1);
    BrowserDetect.isTV = (agent.indexOf("Box") > -1) || (agent.indexOf("box") > -1);
    BrowserDetect.isIE = (agent.indexOf("IE") > -1) ;
    BrowserDetect.ieVersion = 0;
    if(BrowserDetect.isIE)
    {

        BrowserDetect.ieVersion = agent.substr(agent.indexOf("IE"), 10);
        BrowserDetect.ieVersion = BrowserDetect.ieVersion.substr(3, BrowserDetect.ieVersion.indexOf(";"));
        BrowserDetect.ieVersion = parseFloat(BrowserDetect.ieVersion);
    }

    BrowserDetect.isMobile = BrowserDetect.isIOS || BrowserDetect.isAndroid || BrowserDetect.isBlackberry;

    BrowserDetect.enableMusic = BrowserDetect.isChrome || BrowserDetect.isFirefox;
    BrowserDetect.clickTime = BrowserDetect.isMobile ? 50 : 200;
    BrowserDetect.statusTime = 400;

    zf.BrowserDetect = BrowserDetect;
}());

/**
 * Created by zengfeng on 14-9-29.
 */
this.zf = this.zf || {};

(function(){
    var Signal = function()
    {
        this._callList = [];
    };

    var p = Signal.prototype;
    p._callList = [];



    p.add = function(fun)
    {
        if (fun == null) return;
        var index = this._callList.indexOf(fun);
        if (index == -1)
        {
            this._runLength += 1;
            this._callList.push(fun);
        }
    };



    p.remove = function(fun)
    {
        if (fun == null) return;
        var index = this._callList.indexOf(fun);
        if (index != -1)
        {
            if (index <= this._runIndex)
            {
                this._runIndex -= 1;
                this._runLength -= 1;
            }
            else
            {
                this._runLength -= 1;
            }
            this._callList.splice(index, 1);
        }
    }

    p.clear = function()
    {
        while (this._callList.length > 0)
        {
            this._callList.pop();
        }
    };



    p.dispatch = function(args)
    {
        this.runCallList(args);
    };


    p._runIndex = 0;
    p._runLength = 0;
    p._runing = false;

    p.runCallList = function(args)
    {
        this._runing = true;
        this._runLength = this._callList.length;
        for (this._runIndex = 0; this._runIndex < this._runLength; this._runIndex++)
        {
            var fun = this._callList[this._runIndex];
            if(args)
            {
                fun(args);
            }
            else
            {
                fun();
            }
        }
        this._runing = false;
    };

    zf.Signal = Signal;
}());

/**
 * Created by zengfeng on 14-9-28.
 */
this.zf = this.zf || {};

(function(){
    var Color = function(rgba)
    {
        this.initialize(rgba);
    };
    var p = Color.prototype;
    p.rgba = 0x000000FF;
    p.r = 0;
    p.g = 0;
    p.b = 0;
    p.a = 0xFF;

    p.initialize = function(rgba)
    {
        this.setColor32(rgba);
    };

    p.setColor32 = function(rgba)
    {
        this.rgba = rgba;
        this.r = (rgba >> 24) & 0XFF ;
        this.g = (rgba >> 16) & 0xFF;
        this.b = (rgba >> 8) & 0xFF;
        this.a = rgba & 0xFF;
        return this;
    };

    p.setColor = function(rgb)
    {
        this.rgba = (rgb << 8) | 0xFF;
        this.r = (rgb >> 16) & 0xFF;
        this.g = (rgb >> 8) & 0xFF;
        this.b = rgb & 0xFF;
        this.a = 0xFF;
        return this;
    };

    p.setRGBA = function(r, g, b, a)
    {

        this.r = r & 0xFF;
        this.g = g & 0xFF;
        this.b = b & 0xFF;
        this.a = a & 0xFF;
        this.rgba = (a) | (b << 8) | (g << 16) | (r << 24);
        return this;
    };

    p.setRGB = function(r, g, b)
    {
        this.r = r & 0xFF;
        this.g = g & 0xFF;
        this.b = b & 0xFF;
        this.a = 0xFF;
        if(this.r < 0) this.r = 0;
        if(this.g < 0) this.g = 0;
        if(this.b < 0) this.b = 0;
        if(this.a < 0) this.a = 0;
        this.rgba = (this.a) | (b << 8) | (g << 16) | (r << 24);
        return this;
    };

    p.addRGBA = function(r, g, b, a)
    {
        this.r += r;
        this.g += g;
        this.b += b;
        this.a += a;
        return this.update();
    };

    p.addRGB = function(r, g, b)
    {
        this.r += r;
        this.g += g;
        this.b += b;
        return this.update();
    };

    p.update = function()
    {
        return this.setRGBA(this.r, this.g, this.b, this.a);
    };


    p.setR = function(r)
    {
        this.setRGBA(r, this.g, this.b, this.a);
        return this;
    };

    p.setG = function(g)
    {
        this.setRGBA(this.r, g, this.b, this.a);
        return this;
    };

    p.setB = function(b)
    {
        this.setRGBA(this.r, this.g, b, this.a);
        return this;
    };

    p.setA = function(a)
    {
        this.setRGBA(this.r, this.g, this.b, a);
        return this;
    };

    p.setAlpha = function(alpha)
    {
        this.setRGBA(this.r, this.g, this.b, parseInt(alpha * 0xFF));
        return this;
    };


    p.getRGB = function()
    {
        return (this.rgba >> 8);
    };

    p.getRGBA = function()
    {
        return this.rgba;
    };


    p.getRGB_css = function()
    {
        this.getRGB();
        return "#" + this.getRGB().toString(16);
    };

    p.getRGBA_css = function()
    {
        return "#" + this.rgba.toString(16);
    };


    p.getRGB_str = function()
    {
        return "rgb("+this.r+", "+ this.g +", "+ this.b +")";
    };

    p.getRGBA_str = function()
    {
        return "rgba("+this.r+", "+ this.g +", "+ this.b +", "+this.getAlpha()+")";
    };

    p.getAlpha = function()
    {
        return (this.a / 0xFF);
    };


    p.random = function()
    {
        return this.setRGBA(parseInt(Math.random() * 0xFF), parseInt(Math.random() * 0xFF), parseInt(Math.random() * 0xFF), this.a);
    }


    p.randomRange = function(min, max)
    {
        var diff = max - min;
        return this.setRGBA(parseInt(Math.random() * diff + min), parseInt(Math.random() * diff + min), parseInt(Math.random() * diff + min), this.a);
    }

    p.clone = function()
    {
        return new Color(this.rgba);
    };

    p.toString = function()
    {
        return "[Color "+this.getRGBA_str()+"]";
    };

    zf.Color = Color;
}());

(function(){
    zf.Color.Random = function()
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.random() ;
        return color ;
    };


    zf.Color.RandomRange = function(min, max)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.randomRange(min, max);
        return color ;
    };

    zf.Color.Lerp = function(a, b, t)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.r = a.r + (b.r  - a.r) * t;
        color.g = a.g + (b.g  - a.g) * t;
        color.b = a.g + (b.b  - a.b) * t;
        color.a = a.a + (b.a  - a.a) * t;
        color.update();
        return color;
    };

    zf.Color.Lerp2 = function(a, b, t)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.r = a.r + (b.r * 2 - a.r) * t;
        color.g = a.g + (b.g * 2 - a.g) * t;
        color.b = a.g + (b.b * 2 - a.b) * t;
        color.a = a.a + (b.a * 2 - a.a) * t;
        color.update();
        return color;
    };

    zf.Color.Lerp3 = function(a, b, t)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.rgba = a.rgba + (b.rgba - a.rgba) * t;
        color.setColor32(color.rgba);
        return color;
    };

}());



/**
 * Created by zengfeng on 14-10-3.
 */
this.zf = this.zf || {};

(function(){
    var Sound = function()
    {

    };

    zf.Sound = Sound;

}());


(function(){
    zf.Sound.sfx_time_out = "sfx_time_out";
    zf.Sound.sfx_menu_first_symbol = "sfx_menu_first_symbol";
    zf.Sound.sfx_timer_flip = "sfx_timer_flip";
    zf.Sound.sfx_go = "sfx_go";
    zf.Sound.sfx_new_record = "sfx_new_record";
    zf.Sound.sfx_menu_go = "sfx_menu_go";
    zf.Sound.sfx_menu_button = "sfx_menu_button";
    zf.Sound.sfx_fail = "sfx_fail";
    zf.Sound.sfx_correct = "sfx_correct";
    zf.Sound.sfx_symbol_tear = "sfx_symbol_tear";
    zf.Sound.sfx_correct_ten_in_a_row = "sfx_correct_ten_in_a_row";


    zf.Sound.play = function(audioID)
    {
//        if(zf.BrowserDetect.enableMusic)
//        {
//            createjs.Sound.play(audioID);
//        }


//        createjs.Sound.play(audioID, createjs.Sound.INTERRUPT_ANY);

//        createjs.Sound.play(audioID, {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:0.4});
//        createjs.Sound.play(audioID, {interrupt: createjs.Sound.INTERUPT_LATE, offset:0.8});
//        var audio =  document.getElementById(audioID);
//        audio.currentTime = 0.01;
//        audio.play();
    };

}());



/**
 * Created by zengfeng on 14-9-27.
 */
this.zf = this.zf || {};
(function()
{
    var ViewClass = function(elementID) {
        this.initialize(elementID);
    };
    var p = ViewClass.prototype;
    p.view = null;

    p.initialize = function(elementID) {
        this.view = $("#"+elementID);
    };

    p.show = function()
    {
        this.view.show();
    };

    p.hide = function()
    {
        this.view.hide();
    };

    p.toString = function() {
        return "[View (name="+  this.name +")]";
    };

    zf.ViewClass = ViewClass;

}());


/**
 * Created by zengfeng on 14-9-27.
 */
this.zf = this.zf || {};
(function(){

    var LoadItem = function(src, id)
    {
        this.src = src;
        this.id = id;
        this.toString = function()
        {
            return "[LoadItem(src="+this.src+", id="+this.id+")]";
        }
    };

    zf.LoadItem = LoadItem;
}());

(function()
{
    var Preload = function() {
        this.initialize();
    };
    var p = Preload.prototype;
    p.sComplete = new zf.Signal();
    p.manifest = null;
    p.total = 0;
    p.loaded = 0;
    p.data=[];
    p.initialize = function() {
        p.manifest = [
            new zf.LoadItem("./assets/ui/login_title.png", "login_title"),
            new zf.LoadItem("./assets/ui/login_head.png", "login_head"),
            new zf.LoadItem("./assets/ui/login_bg.jpg", "login_bg"),
            new zf.LoadItem("./assets/ui/btn_flaunt.png", "btn_flaunt"),
            new zf.LoadItem("./assets/ui/btn_no.png", "btn_no"),
            new zf.LoadItem("./assets/ui/btn_replay.png", "btn_replay"),
            new zf.LoadItem("./assets/ui/btn_start.png", "btn_start"),
            new zf.LoadItem("./assets/ui/btn_yes.png", "btn_yes"),
            new zf.LoadItem("./assets/ui/btn_no.png", "btn_no"),
            new zf.LoadItem("./assets/ui/icon_n.png", "icon_n"),
            new zf.LoadItem("./assets/ui/icon_y.png", "icon_y"),
            new zf.LoadItem("./assets/ui/bg_bottom.png", "bg_bottom"),
            new zf.LoadItem("./assets/ui/bg_top.png", "bg_top"),
            new zf.LoadItem("./assets/ui/bg_gameover.png", "bg_gameover"),
            new zf.LoadItem("./assets/ui/bg_score.png", "bg_score"),
            new zf.LoadItem("./assets/ui/bg_timeleft.png", "bg_timeleft"),
            new zf.LoadItem("./assets/ui/text_gameover.png", "text_gameover"),
            new zf.LoadItem("./assets/ui/text_go.png", "text_go"),
            new zf.LoadItem("./assets/ui/text_is.png", "text_is"),
            new zf.LoadItem("./assets/ui/text_remember.png", "text_remember"),
            new zf.LoadItem("./assets/ui/text_score.png", "text_score"),
            new zf.LoadItem("./assets/ui/text_scoremax.png", "text_scoremax"),
            new zf.LoadItem("./assets/ui/text_start.png", "text_start"),
            new zf.LoadItem("./assets/ui/text_timeout.png", "text_timeout"),
            new zf.LoadItem("./assets/head/1.png", "head_1"),
            new zf.LoadItem("./assets/head/2.png", "head_1"),
            new zf.LoadItem("./assets/head/3.png", "head_1")
        ];

    };

    p.load = function()
    {
        p.loaded = 0;
        p.total = p.manifest.length;

        p._loadNext();
    };

    p._loadNext = function()
    {
        if(p.loaded < p.total)
        {
            var item = p.manifest[p.loaded];
            $(document).load(item.src, null, p.onFileLoaded);
        }
        else
        {
            p.onComplete();
        }
    }

    p.onFileLoaded = function(responseTxt,statusTxt,xhr)
    {

//        var item = p.manifest[p.loaded];
//        p.data[item.id] = responseTxt;
        p.loaded ++;
        p._loadNext();
        if(statusTxt=="success")
        {

        }

        if(statusTxt=="error")
        {
            console.log("Error: "+xhr.status+": "+xhr.statusText);
        }

    }



    p.onComplete = function()
    {
        p.sComplete.dispatch();
    };

    p.getData = function(id)
    {
        return p.data[id];
    }



    p.toString = function() {
        return "[Preload (name="+  this.name +")]";
    };




    zf.Preload = Preload;
}());


/**
 * Created by zengfeng on 14-9-29.
 */

this.zf = this.zf || {};

(function(){
    var LoginView = function(elementID)
    {
        p.initialize(elementID);
    };

    var p = LoginView.prototype = new zf.ViewClass();
    p.View_initialize = p.initialize;
    p.View_show = p.show;
    p.View_hide = p.hide;
    p.bg = null;
    p.title = null;
    p.head = null;
    p.playButton = null;
    p.sClick = new zf.Signal();
    p.initialize = function(elementID) {
        this.View_initialize(elementID);
        this.bg = $("login_bg");
        this.title = $("#login_title");
        this.head = $("#login_head");
        this.playButton = $("#login_btn");
        this.bg.attr("width", zf.stageWidth);
        this.bg.attr("height", zf.stageHeight);

        var titleWidth = (zf.stageHeight * 0.2 / 136) * 559 < zf.stageWidth * 0.8  ? (zf.stageHeight * 0.2 / 136) * 559 : zf.stageWidth * 0.8;
        var titleHeight = (titleWidth / 559) * 136 > zf.stageHeight * 0.2 ? zf.stageHeight * 0.2 : (titleWidth / 559) * 136;
        this.title.attr("width", titleWidth);
        this.title.attr("height", titleHeight);
        this.title.css("top", (zf.stageHeight * 0.3 - titleHeight) * 0.3);

        var headWidth = zf.hv < 0.7 ? zf.stageWidth : (zf.stageHeight * 0.7) / 711 * 640;
        var headHeight = headWidth / 640 * 711;
        this.head.attr("width", headWidth);
        this.head.attr("height", headHeight);
        this.head.css("left", parseInt((zf.stageWidth -headWidth) * 0.5) + "px");
        var buttonWidth = (zf.stageHeight * 0.2 / 178) * 414 < zf.stageWidth * 0.6 ? (zf.stageHeight * 0.2 / 178) * 414 : zf.stageWidth * 0.6;
        var buttonHeight = (buttonWidth / 414) * 178 > zf.stageHeight * 0.2 ? zf.stageHeight * 0.2 : (buttonWidth / 414) * 178;
        this.playButton.width(buttonWidth);
        this.playButton.height(buttonHeight);
        if(zf.BrowserDetect.isMobile)
        {
            this.playButton.on("tap", p.onClickPlayButton);
        }
        else
        {

            this.playButton.click(p.onClickPlayButton);
        }

    };

    p.onClickPlayButton = function()
    {
        zf.Sound.play(zf.Sound.sfx_go);
        $(document).unbind("keydown", p.onDocumentKeydown);
        p.playButton.width(414 * (zf.scale - 0.2));
        p.playButton.height(178 * (zf.scale - 0.2));
        setTimeout(function()
        {
            p.playButton.width(414 * zf.scale);
            p.playButton.height(178 * zf.scale);
            p.sClick.dispatch();
        },zf.BrowserDetect.clickTime);
    };

    p.show = function()
    {
        p.View_show();
        $(document).keydown(p.onDocumentKeydown);
        zf.Sound.play(zf.Sound.sfx_menu_first_symbol);

    };


    p.hide = function()
    {
        p.View_hide();
        $(document).unbind("keydown", p.onDocumentKeydown);
    };

    p.onDocumentKeydown = function(event)
    {
        if(event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 65 || event.keyCode == 68)
        {
            p.onClickPlayButton();
        }
    };





    p.toString = function()
    {
        return "[LoginView (name="+  this.name +")]";
    };

    zf.LoginView = LoginView;
}());


/**
 * Created by zengfeng on 14-10-2.
 */
this.zf = this.zf || {};

(function(){
    var MainModel = function()
    {
        p.initialize();
    };

    var p = MainModel.prototype;
    p.MIN = 1;
    p.MAX = 4;
    p.pre = 0;
    p.current = 0;
    p.next = 0;

    p.scoreAdd = 1;

    p.headEnd = 1;
    p.score = 0;
    p.scoreList = [];
    p.scoreMax = 0;
    p.isScoreNewMax = false;
    p.timeleft = 0;
    p.timeleftFrame = 0;
    p.maxTime = 60 * 5;
    p.timeGap = 16;
    p.timeleftTimer = 0;


    p.sRest = new zf.Signal();
    p.sResult = new zf.Signal();
    p.sGameOver = new zf.Signal();
    p.sTimeleft = new zf.Signal();
    p.sTimeout = new zf.Signal();

    p.timeleftStart = function()
    {
        clearTimeout(p.timeleftTimer);
        console.log("timeleftStart");
        p.timeleftFrame = p.maxTime - 1;
        p.timeleft = parseInt(p.timeleftFrame / 60);
        console.log("timeleftStart p.timeleft="+p.timeleft + "  p.maxTime="+p.maxTime);
        p.timeleftTimer = setTimeout(p.timeleftUpdate, p.timeGap);
        p.sTimeleft.dispatch([p.timeleftFrame, p.timeleftFrame / p.maxTime]);
    };

    p.timeleftStop = function()
    {
        clearTimeout(p.timeleftTimer);
    };

    p.timeleftUpdate = function()
    {
        p.timeleftFrame --;
        p.timeleft = parseInt(p.timeleftFrame / 60);
//        console.log("timeleftUpdate p.timeleft="+p.timeleft + "  p.maxTime="+p.maxTime);
        if(p.timeleftFrame <= 0)
        {
            p.timeleftFrame = 0;
            p.timeleft = parseInt(p.timeleftFrame / 60);
            p.sTimeout.dispatch();
            setTimeout(p.gameOver, 2000);
        }
        else
        {
            p.timeleftTimer = setTimeout(p.timeleftUpdate, p.timeGap);
        }

        p.sTimeleft.dispatch([p.timeleftFrame, p.timeleftFrame / p.maxTime]);
    };



    p.initialize = function()
    {
        this.reset();
    };

    p.reset = function()
    {
        this.score = 0;
        this.pre = this.getRandom();
        this.current = this.getRandom();
        this.next = this.getRandom();
        console.log("MainModel reset");
        this.print();
        this.sRest.dispatch();
    };

    p.generationNext = function()
    {
        this.pre = this.current;
        this.current = this.next;
        if(Math.random() < 0.1)
        {
            this.next = this.current;
        }
        else
        {
            this.next = this.getRandom();
        }
        console.log("MainModel generationNext");
        this.print();
    };

    p.getPrePath = function()
    {
//        return preload.getData("head_"+ this.pre);
        return "./assets/head/"+this.pre+".png";
    };

    p.getCurrentPath = function()
    {
//        return preload.getData("head_"+ this.current);
        return "./assets/head/"+this.current+".png";
    };

    p.getNextPath = function()
    {
//        return preload.getData("head_"+ this.next);
        return "./assets/head/"+this.next+".png";
    };

    p.getVal = function()
    {
        return this.pre == this.current;
    }

    p.check = function(val)
    {
        var result = (val == this.getVal());
        if(result)
        {
            this.score += this.scoreAdd;
        }
        else
        {
            this.scoreList.push(this.score);
            if(this.scoreMax < this.score)
            {
                this.scoreMax = this.score;
                this.isScoreNewMax = true;
            }
            else
            {
                this.isScoreNewMax = false;
            }
            setTimeout(this.gameOver, 500);
        }
        console.log("check  val=" + val + "  getVal=" + this.getVal() + "  result="+result);
        this.sResult.dispatch([val, result]);
    };

    p.gameOver = function()
    {
        p.headEnd = p.current;
        p.timeleftStop();
        p.sGameOver.dispatch();
    };

    p.getRandom = function()
    {
        return parseInt(Math.random() * (this.MAX - this.MIN)) + this.MIN;
    }

    p.print = function()
    {
        console.log("[MainModel(pre="+ this.pre+", current="+ this.current+", next="+ this.next+", score="+this.score+")]");
    }

    zf.MainModel = MainModel;
}());


/**
 * Created by zengfeng on 14-9-29.
 */

this.zf = this.zf || {};

(function(){
    var YNButton = function(name, div, bg, iconY, iconN)
    {
        this.name = null;
        this.div = null;
        this.bg = null;
        this.iconY = null;
        this.iconN = null;
        this.enable = true;
        this.sClick = new zf.Signal();


        this.name = name;
        this.div = div;
        this.bg = bg;
        this.iconY = iconY;
        this.iconN = iconN;
        this.width = 205;
        this.height = 161;


        //205 161
        this.width = (zf.stageHeight * 0.15 / 161) * 205 < zf.stageWidth * 0.4  ? (zf.stageHeight * 0.15 / 161) * 205: zf.stageWidth * 0.4;
        this.height = (this.width / 205) * 161 > zf.stageHeight * 0.15 ? zf.stageHeight * 0.15 : (this.width / 205) * 161 ;

        this.bg.width(this.width);
        this.bg.height(this.height);
        this.div.width(this.width);
        this.div.height(this.height);
        this.iconY.width(this.width);
        this.iconY.height(this.height);
        this.iconN.width(this.width);
        this.iconN.height(this.height);

        this.bg.attr("name", name + "BG");
        this.onClick = function()
        {
            if(p.enable)
            {
                p.enable = false;
                p.bg.css("width", (p.width -4)+ "px");
                p.bg.css("top", "2px");
                p.bg.css("left", "2px");
                setTimeout(function(){
                    p.bg.css("width", p.width + "px");
                    p.bg.css("top", "0px");
                    p.bg.css("left", "0px");
                }, zf.BrowserDetect.clickTime);
                p.sClick.dispatch();
            }
        };

        if(zf.BrowserDetect.isMobile)
        {
            this.bg.on("tap", this.onClick);
        }
        else
        {
            this.bg.click(this.onClick);
        }

        var p = this;
        this.initialize = function(name, div, bg, iconY, iconN) {
            this.name = name;
            this.div = div;
            this.bg = bg;
            this.iconY = iconY;
            this.iconN = iconN;

            this.bg.attr("name", name + "BG");

            this.bg.click(this.onClick);
        };




        this.setX = function(x)
        {
            this.div.css("left", x);
        };

        this.setY = function(y)
        {
            this.div.css("bottom", y);
        };

        this.statusTimer = 0;
        this.setStatus = function(state)
        {
            clearTimeout(this.statusTimer);
            if(state == 1)
            {
                p.iconY.css("display", "block");
                p.iconN.css("display", "none");
                p.statusTimer = setTimeout(p.setStatus, zf.BrowserDetect.statusTime, -1);
                zf.Sound.play(zf.Sound.sfx_correct);

            }
            else if(state == 0)
            {
                p.iconY.css("display", "none");
                p.iconN.css("display", "block");
                p.statusTimer = setTimeout(p.setStatus, zf.BrowserDetect.statusTime, -1);
                zf.Sound.play(zf.Sound.sfx_fail);
            }
            else
            {
                p.iconY.css("display", "none");
                p.iconN.css("display", "none");
            }
        };

        this.toString = function()
        {
            return "[YNButton(name="+this.name+")]";
        }

    };




    zf.YNButton = YNButton;
}());


(function(){
    var MainView = function(elementID)
    {
        p.initialize(elementID);
    };

    var p = MainView.prototype = new zf.ViewClass();
    p.View_initialize = p.initialize;
    p.View_show = p.show;
    p.View_hide = p.hide;
    p.topBg = null;
    p.bottomBg = null;
    p.gameView = null;
    p.startPanel = null;
    p.gamePanel = null;
    p.startEventLayer = null;
    p.startText = null;
    p.startTextDiv = null;
    p.startGoText = null;
    p.startGoTextDiv = null;
    p.startRememberText = null;
    p.gameIsText = null;
    p.startTextremember = null;
    p.gameTextremember = null;
    p.img0 = null;
    p.img1 = null;
    p.noBtn = null;
    p.yesBtn = null;
    p.gameScore = null;
    p.gameTimeleft = null;
    p.gameTileleftProgress = null;
    p.gameoverText = null;
    p.gameoverTextDiv = null;
    p.imgWidth = 350;
    p.imgMinWidth = 200;
    p.imgLeft = -370;
    p.imgCenter = 145;
    p.imgRight = 660;
    p.imgSpeed = 300;
    p.STATE_START_PANEL = 0;
    p.STATE_GAME_PANEL = 1;

    p.state = 0;

    p.startTextWidth = 330;
    p.startTextHeight = 90;






    p.sClick = new zf.Signal();
    p.initialize = function(elementID) {
        this.View_initialize(elementID);

        this.topBg = $("#mainView .bg_top");
        this.bottomBg = $("#mainView .bg_bottom");
        this.topBg.height(parseInt(zf.stageHeight * 0.1));
        this.bottomBg.height(parseInt(zf.stageHeight * 0.1));

        if(zf.BrowserDetect.isIE && zf.BrowserDetect.ieVersion < 9)
        {
            this.topBg.css("background-position", "bottom center");
        }
        else
        {
            this.topBg.css("background-size",parseInt((zf.stageHeight * 0.1 / 161) * 214 )  + "px "+ parseInt(zf.stageHeight * 0.1) + "px");
            this.bottomBg.css("background-size",parseInt((zf.stageHeight * 0.1 / 94) * 54 )  + "px "+ parseInt(zf.stageHeight * 0.1) + "px");
        }



        this.startText = $("#start_startText");
        this.startTextDiv = $("#star_startTextDiv");
        this.startTextWidth = (zf.stageHeight * 0.1 / 90) * 330 < zf.stageWidth * 0.5  ? (zf.stageHeight * 0.1 / 90) * 330 : zf.stageWidth * 0.5;
        this.startTextHeight = (this.startTextWidth / 330) * 90 > zf.stageHeight * 0.1 ? zf.stageHeight * 0.1 : (this.startTextWidth / 330) * 90;
        this.startText.width(this.startTextWidth);
        this.startText.height(this.startTextHeight);
        this.startTextDiv.css("bottom", parseInt(zf.stageHeight * 0.1));
        this.textAnimation_Start();

        this.startTextremember = $("#startPanel .textremember");
        this.startTextremember.css("bottom", parseInt((zf.stageHeight + 20) * 0.1) + this.startTextHeight);
        this.startTextremember.css("font-size", parseInt(this.startTextHeight * 0.3) + "px");
//        this.startRememberText = $("#start_rememberText");
//        this.startRememberTextWidth = (zf.stageHeight * 0.1 / 32) * 209 < 175  ? (zf.stageHeight * 0.1 / 32) * 209 : 175;
//        this.startRememberTextHeight = (this.startRememberTextWidth / 209) * 32 > zf.stageHeight * 0.1 ? zf.stageHeight * 0.1 : (this.startRememberTextWidth / 209) * 32;
//        this.startRememberText.width(this.startRememberTextWidth);
//        this.startRememberText.height(this.startRememberTextHeight);

        this.gameTextremember = $("#gamePanel .textremember");
        this.gameTextremember.css("bottom", parseInt(zf.stageHeight * 0.26 )   + "px");
        this.gameTextremember.css("font-size", parseInt(this.startTextHeight * 0.3) + "px");
//        this.gameIsText = $("#game_isText");
//        this.gameIsTextWidth = (zf.stageHeight * 0.1 / 33) * 281 < 175  ? (zf.stageHeight * 0.1 / 33) * 281 : 175;
//        this.gameIsTextHeight = (this.gameIsTextWidth / 281) * 33 > zf.stageHeight * 0.1 ? zf.stageHeight * 0.1 : (this.gameIsTextWidth / 281) * 33;
//        this.gameIsText.width(this.gameIsTextWidth);
//        this.gameIsText.height(this.gameIsTextHeight);


        this.startGoText = $("#start_goText");
        this.startGoTextDiv = $("#star_goTextDiv");
        var startGoTextWidth = (zf.stageHeight * 0.3 / 118) * 217 < zf.stageWidth * 0.5  ? (zf.stageHeight * 0.3 / 118) * 217 : zf.stageWidth * 0.5;
        var startGoTextHeight = (startGoTextWidth / 217) * 118 > zf.stageHeight * 0.3 ? zf.stageHeight * 0.3 : (startGoTextWidth / 217) * 118 ;

        this.startGoText.width(startGoTextWidth);
        this.startGoText.width(startGoTextHeight);
        this.startGoTextDiv.css("bottom", parseInt((zf.stageHeight - startGoTextHeight) * 0.6) + "px");


        this.gameTimeleft = $("#game_timeleft");
        this.gameTimeleft.css("top", parseInt(zf.stageHeight * 0.1)+ "px");
        this.gameScore = $("#game_score");
        this.gameScore.css("top", parseInt(zf.stageHeight * 0.1)+ "px");


        this.startPanel = $("#startPanel");
        this.startEventLayer = $("#startEventLayer");
        if(zf.BrowserDetect.isMobile)
        {
            this.startEventLayer.on("tap", this.onClickStart);
        }
        else
        {
            this.startEventLayer.click(this.onClickStart);
        }



        this.gameView = $("#gameView");
        this.gamePanel = $("#gamePanel");
//        this.gameTileleftProgress = new zf.Progress("game_timeleftCanvas", 45, "#25367e");




        this.img0 = $("#img_0");
        this.img1 = $("#img_1");


        this.imgWidth = parseInt(zf.stageHeight * 0.5);
        this.imgMinWidth = parseInt(this.imgWidth * 0.5);

        this.imgLeft = -parseInt(this.imgWidth + 20);
        this.imgCenter = parseInt((zf.stageWidth - this.imgWidth) * 0.5);
        this.imgRight = parseInt(zf.stageWidth + this.imgWidth + 20);
        this.img0.css("bottom", parseInt(zf.stageHeight * 0.3) + "px");
        this.img1.css("bottom", parseInt(zf.stageHeight * 0.3) + "px");
        this.imgSpeed = 300;
        this.imgSpeed = this.imgSpeed + (10 * zf.hvChange);
        if(this.imgSpeed < 100) this.imgSpeed = 100;
        if(this.imgSpeed > 500) this.imgSpeed = 500;

        console.log("MainView initialize");
        this.noBtn = new zf.YNButton("noBtn", $("#game_noBtnDiv"), $("#game_noBtn"), $("#game_no_y"), $("#game_no_n"));
        this.yesBtn = new zf.YNButton("yesBtn", $("#game_yesBtnDiv"), $("#game_yesBtn"), $("#game_yes_y"), $("#game_yes_n"));

        this.noBtn.setY(parseInt(zf.stageHeight * 0.1) + "px");
        this.yesBtn.setY(parseInt(zf.stageHeight * 0.1) + "px");

        if(zf.BrowserDetect.isMobile && !zf.BrowserDetect.isTV && zf.hv > 1)
        {
            this.noBtn.setX(parseInt(this.noBtn.width * 0.1) + "px");
            this.yesBtn.setX(parseInt(zf.stageWidth -this.yesBtn.width * 1.1) + "px");

        }
        else
        {

            this.noBtn.setX(parseInt(zf.stageWidth * 0.5 - this.noBtn.width - this.noBtn.width * 0.1) + "px");
            this.yesBtn.setX(parseInt(zf.stageWidth * 0.5 + this.yesBtn.width * 0.1) + "px");
        }

        this.noBtn.sClick.add(this.onClickNo);
        this.yesBtn.sClick.add(this.onClickYes);

        this.noBtn.enable = false;
        this.yesBtn.enable = false;

        this.gameoverText = $("#game_gameoverText");
        this.gameoverTextDiv = $("#game_gameoverTextDiv");
        var gameoverTextWidth = (zf.stageHeight * 0.3 / 80) * 457 < zf.stageWidth * 0.5  ? (zf.stageHeight * 0.3 / 80) * 457 : zf.stageWidth * 0.5;
        var gameoverTextHeight = (gameoverTextWidth / 457) * 80 > zf.stageHeight * 0.3 ? zf.stageHeight * 0.3 : (gameoverTextWidth / 457) * 80;
        this.gameoverText.width(gameoverTextWidth);
        this.gameoverText.height(gameoverTextHeight);
        this.gameoverTextDiv.css("bottom", parseInt((zf.stageHeight - gameoverTextHeight) * 0.8) + "px");


//        mainModel.sRest.add(this.reset);
        mainModel.sResult.add(this.onResult);
        mainModel.sTimeleft.add(this.onTimeleft);
        mainModel.sTimeout.add(this.onTimeout);
    };
    p.onTimeout = function()
    {
        p.gameoverText.show(300);
        p.noBtn.enable = false;
        p.yesBtn.enable = false;
        zf.Sound.play(zf.Sound.sfx_time_out);
    }

    p.onTimeleftFontTag = 0;
    p.onTimeleft = function(args)
    {
        if(args[0] < 10)
        {
            if(p.onTimeleftFontTag != 1)
            {
                p.onTimeleftFontTag = 1;
                p.gameTimeleft.css("font-size", "4em");
            }
        }
        else if(args[0] < 100)
        {
            if(p.onTimeleftFontTag != 2)
            {
                p.onTimeleftFontTag = 2;
                p.gameTimeleft.css("font-size", "3.5em");
            }
        }
        else
        {
            if(p.onTimeleftFontTag != 3)
            {
                p.onTimeleftFontTag = 3;
                p.gameTimeleft.css("font-size", "2.5em");
            }
        }
        p.gameTimeleft.html(args[0]);
//        p.gameTileleftProgress.setProgress(args[1]);
    }

    p.show = function()
    {
        p.View_show();
        p.gameView.show();
        this.reset();

        $(document).keydown(p.onDocumentKeydown);
    };

    p.onDocumentKeydown = function(event)
    {

        if(p.state == p.STATE_START_PANEL)
        {
            if(event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 65 || event.keyCode == 68)
            {
                p.onClickStart();
            }
        }

        if(p.state == p.STATE_GAME_PANEL)
        {
            if(event.keyCode == 37 || event.keyCode == 65)
            {
                p.noBtn.onClick();
            }

            if(event.keyCode == 39 || event.keyCode == 68)
            {
                p.yesBtn.onClick();
            }
        }
    };



    p.hide = function()
    {
//        p.View_hide();
        p.gameView.hide();
        $(document).unbind("keydown", p.onDocumentKeydown);
    };

    p.reset = function()
    {
        p.isImage0 = true;
        p.img0.css("left", p.imgCenter + "px");
        p.img1.css("left", p.imgRight + "px");
        p.img0.width(p.imgWidth);
        p.img1.width(p.imgMinWidth);
        p.img0.attr("src", mainModel.getCurrentPath());
        p.img1.attr("src", mainModel.getNextPath());
        p.noBtn.enable = false;
        p.yesBtn.enable = false;
        p.setScore();
        p.gameoverText.hide();
        p.startPanel.show();
        p.gamePanel.hide();
        p.state = p.STATE_START_PANEL;
//        zf.Sound.play(zf.Sound.sfx_new_record);
    };

    p.setScore = function()
    {
        p.gameScore.html(mainModel.score);
    }

    p.onClickStart = function()
    {
        if(p.state == p.STATE_START_PANEL)
        {
            console.log("onClickStart");
            p.state = p.STATE_GAME_PANEL;
            setTimeout(p.closeStartPanel, 500);
            p.startGoText.fadeIn(200);
            zf.Sound.play(zf.Sound.sfx_menu_go);
        }
    };

    p.closeStartPanel = function()
    {
        console.log("closeStartPanel");
        p.startGoText.hide();
        p.startPanel.hide();
        p.gamePanel.show();
        p.playImg();

    };

    p.isImage0 = true;


    p.playImg = function()
    {
        zf.Sound.play(zf.Sound.sfx_symbol_tear);
        if(p.isImage0)
        {
            p.playImg0();
        }
        else
        {
            p.playImg1();
        }
        p.isImage0 = !p.isImage0;
    };

    p.playImg0= function()
    {
        p.img1.width(p.imgMinWidth);
        p.img1.css("left", p.imgRight + "px");
        p.img0.animate({left:p.imgLeft + "px", width:p.imgMinWidth}, p.imgSpeed);
        p.img1.animate({left:p.imgCenter + "px", width:p.imgWidth}, p.imgSpeed, p.playImagComplete);
    };
    p.playImg1 = function()
    {
        p.img0.width(p.imgMinWidth);
        p.img0.css("left", p.imgRight + "px");
        p.img1.animate({left:p.imgLeft + "px", width:p.imgMinWidth}, p.imgSpeed);
        p.img0.animate({left:p.imgCenter + "px", width:p.imgWidth}, p.imgSpeed, p.playImagComplete);
    };

    p.playImagComplete = function()
    {
        console.log("playImagComplete ");
        p.noBtn.enable = true;
        p.yesBtn.enable = true;
        mainModel.generationNext();
        mainModel.timeleftStart();
        var img = p.isImage0 ? p.img1 : p.img0;

        img.attr("src", mainModel.getNextPath());
        img.width(p.imgMinWidth);
        img.css("left",p.imgRight + "px");
    };

    p.onClickYes = function()
    {
        p.noBtn.enable = false;
        p.yesBtn.enable = false;
        mainModel.check(true);
    };

    p.onClickNo = function()
    {
        p.noBtn.enable = false;
        p.yesBtn.enable = false;
        mainModel.check(false);
    };

    p.onResult = function(args)
    {
        var yesno = args[0];
        var result = args[1];
        console.log("MainView onResult yesno=" + yesno + ", val=" + result);

        var btn = yesno ? p.yesBtn : p.noBtn;
        btn.setStatus(result ? 1 : 0);

        p.setScore();

        if(result)
        {
            p.playImg();
        }
    };





    //========================
    // textAnimation begin
    //-----------------------
    p.textAnimation_Start = function()
    {
        p.textAnimation_Hide();
    };

    p.textAnimation_Stop = function()
    {
        p.startText.stop();
        p.startText.css("opacity", 1);
    };

    p.textAnimation_Hide = function()
    {
        p.startText.animate({opacity:0.5, width:p.startTextWidth * 0.8, height:p.startTextHeight * 0.8}, 500, "linear", p.textAnimation_Show);
    };

    p.textAnimation_Show = function()
    {
        p.startText.animate({opacity:1, width:p.startTextWidth,height:p.startTextHeight}, 500, "linear", p.textAnimation_Hide);
    };
    //-----------------------
    // textAnimation end
    //========================



    p.toString = function()
    {
        return "[MainView (name="+  this.name +")]";
    }

    zf.MainView = MainView;
}());


/**
 * Created by zengfeng on 14-9-29.
 */

this.zf = this.zf || {};


(function(){
    var GameOverButton = function(name, bg)
    {

        var p = this;
        this.name = null;
        this.bg = null;
        this.sClick = new zf.Signal();


        this.name = name;
        this.bg = bg;

        this.width = parseInt((zf.stageHeight * 0.2 / 116) * 250);
        this.height = parseInt(zf.stageHeight * 0.2);
//        this.bg.width(this.width);
//        this.bg.height(this.height);

        this.bg.attr("name", name + "BG");
        this.onClick = function()
        {
            zf.Sound.play(zf.Sound.sfx_menu_button);
            p.bg.css("width", (p.width - 4) +"px");
            p.bg.css("height", (p.height - 4) +"px");
            p.bg.css("top", "2px");
            p.bg.css("left", "2px");
            setTimeout(function(){
                p.bg.css("width", p.width +"px");
                p.bg.css("height", p.height +"px");
                p.bg.css("top", "0px");
                p.bg.css("left", "0px");
                p.sClick.dispatch();
            }, zf.BrowserDetect.clickTime);
        };


        if(zf.BrowserDetect.isMobile)
        {
            this.bg.on("tap", this.onClick);
        }
        else
        {

            this.bg.click(this.onClick);
        }

        this.toString = function()
        {
            return "[GameOverButton(name="+this.name+")]";
        }

    };




    zf.GameOverButton = GameOverButton;
}());

(function(){
    var GameoverView = function(elementID)
    {
        p.initialize(elementID);
    };

    var p = GameoverView.prototype = new zf.ViewClass();
    p.View_initialize = p.initialize;
    p.View_show = p.show;
    p.View_hide = p.hide;
    p.gameoverPanel = null;
    p.gameoverContext = null;
    p.gameoverTitle = null;
    p.gameoverBg = null;
    p.scoreTabel = null;
    p.scoreKey = null;
    p.scoreMaxKey = null;
    p.btnTabel = null;
    p.flauntBtn = null;
    p.replayBtn = null;
    p.scoreTd = null;
    p.maxScoreTd = null;
    p.flauntLink = null;

    p.initialize = function(elementID) {
        this.View_initialize(elementID);
        this.gameoverPanel = $("#gameoverPanel");
        this.gameoverContext = $("#gameoverPanel .gameoverContext");
        this.gameoverContext.css("top", parseInt(zf.stageHeight * 0.11) + "px");


        this.gameoverTitle = $("#gameover_title");
        var gameoverTitleWidth = (zf.stageHeight * 0.2 / 80) * 543 < zf.stageWidth * 0.4  ? (zf.stageHeight * 0.2 / 80) * 543 : zf.stageWidth * 0.4;
        if(zf.hv < 1)
        {
            gameoverTitleWidth = zf.stageWidth * 0.8;
        }
        var gameoverTitleHeight = (gameoverTitleWidth / 543) * 80 > zf.stageHeight * 0.2 ? zf.stageHeight * 0.2 : (gameoverTitleWidth / 543) * 80;
        this.gameoverTitle.width(gameoverTitleWidth);
        this.gameoverTitle.height(gameoverTitleHeight);
//        this.gameoverContext.css("background-position-y", parseInt(gameoverTitleHeight ) + "px");
//        this.gameoverContext.css("background-size", parseInt(gameoverTitleWidth * 1.1) + "px " + parseInt(gameoverTitleHeight * 3) + "px");

        this.gameoverBg = $("#gameover_bg");
        this.gameoverBg.width(parseInt(gameoverTitleWidth * 1.1));
        this.gameoverBg.height(parseInt(gameoverTitleHeight * 3));
        this.gameoverBg.css("left",  parseInt((zf.stageWidth - gameoverTitleWidth * 1.1) * 0.5));
        this.gameoverBg.css("top", parseInt(gameoverTitleHeight ));



        this.scoreTabel = $("#gameoverPanel .gameover_scoreTabel");
        this.scoreTabel.css("margin-top", parseInt(gameoverTitleHeight * 0.5) + "px");

        this.scoreKey = $("#gameover_textscorekey");
        this.scoreMaxKey = $("#gameover_textscoremaxkey");
        var scoreHeight = parseInt(gameoverTitleHeight * 0.9);
        this.scoreKey.height(scoreHeight);
        var scoreMaxHeight = parseInt(gameoverTitleHeight * 0.7);
        this.scoreMaxKey.height(scoreMaxHeight);

        this.scoreTd = $("#scoreTd");
        this.maxScoreTd = $("#maxScoreTd");
        this.scoreTd.css("font-size", scoreHeight + "px");
        this.scoreTd.css("line-height", (scoreHeight * 1.2)+ "px");
        var scoreShadow = Math.ceil(scoreHeight / 16);
        this.scoreTd.css("text-shadow", scoreShadow + "px "+scoreShadow+"px "+scoreShadow+"px #777777");


        this.maxScoreTd.css("font-size", scoreMaxHeight + "px");
        this.maxScoreTd.css("line-height", scoreMaxHeight + "px");
        scoreShadow = Math.ceil(scoreHeight / 16) ;
        this.maxScoreTd.css("text-shadow", scoreShadow + "px "+scoreShadow+"px "+scoreShadow+"px #777777");


        this.btnTabel = $("#gameoverPanel .gameover_btnTabel");
        this.btnTabel.css("margin-top", parseInt(gameoverTitleHeight * 0.7) + "px");

        this.flauntBtn = new zf.GameOverButton("flauntBtn", $("#gameover_flauntBtn"));
        this.replayBtn = new zf.GameOverButton("replayBtn", $("#gameover_replayBtn"));

        var btnWidth = (gameoverTitleHeight / 116 ) * 250;
        var btnHeight = gameoverTitleHeight;
        this.flauntBtn.width = btnWidth;
        this.flauntBtn.height = btnHeight;
        this.flauntBtn.bg.width(btnWidth);
        this.flauntBtn.bg.height(btnHeight);
        this.replayBtn.width = btnWidth;
        this.replayBtn.height = btnHeight;
        this.replayBtn.bg.width(btnWidth);
        this.replayBtn.bg.height(btnHeight);

        this.flauntLink = $("#flauntLink");



        this.replayBtn.sClick.add(this.onClickReplay);
    };

    p.onClickFlauntBtn = function()
    {

        window.open("./php/flaunt.php?score="+mainModel.score+"&head="+mainModel.headEnd, "_blank");
    };

    p.show = function()
    {
        zf.Sound.play(zf.Sound.sfx_timer_flip);
        p.setData();
        p.View_show();
        p.gameoverPanel.show();
        p.keydownTimer = setTimeout(function(){$(document).keydown(p.onDocumentKeydown);}, 500);
    };

    p.keydownTimer = 0;

    p.onDocumentKeydown = function(event)
    {

        if(event.keyCode == 37 || event.keyCode == 65)
        {
            p.onClickFlauntBtn();

        }

        if(event.keyCode == 39 || event.keyCode == 13 || event.keyCode == 32 || event.keyCode == 68)
        {
            p.replayBtn.onClick();
        }
    };

    p.hide = function()
    {
        clearTimeout(p.keydownTimer);
        $(document).unbind("keydown", p.onDocumentKeydown);
        p.gameoverPanel.hide();
//        p.View_hide();
    };

    p.onClickReplay = function()
    {
        mainModel.reset();
    };

    p.setData = function()
    {
        this.flauntLink.attr("href", "./php/flaunt.php?score="+mainModel.score+"&head="+mainModel.headEnd);
        this.scoreTd.html(mainModel.score);
        this.maxScoreTd.html(mainModel.scoreMax);
    }

    p.toString = function()
    {
        return "[GameoverView (name="+  this.name +")]";
    }

    zf.GameoverView = GameoverView;
}());


/**
 * Created by zengfeng on 14-9-27.
 */


if(!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(e){
        for(var i=0,j; j=this[i]; i++){
            if(j==e){return i;}
        }
        return -1;
    }
}


//============================
// main
//-----------------------------
var preload;
var loginView;
var mainModel;
var mainView;
var gameoverView;
function main()
{
    zf.initialize($("#appView"), $("#appClip"));

    preload = new zf.Preload();
    preload.sComplete.add(onLoaded);
    preload.load();

}

function onLoaded()
{
    $(".ui-loader").hide();
    $("#loadingView").hide();
    loginView = new zf.LoginView("loginView");
    console.log("onLoaded");
    loginView.sClick.add(onPlay);
    loginView.show();
}

function onPlay()
{
    loginView.hide();
    mainModel = new zf.MainModel();
    mainView = new zf.MainView("mainView");
    gameoverView = new zf.GameoverView("mainView");
    mainModel.sRest.add(onRest);
    mainModel.sGameOver.add(onGameOver);
    onRest();
}

function onRest()
{
    mainView.show();
    gameoverView.hide();
}

function onGameOver()
{
    mainView.hide();
    gameoverView.show();
}




main();
