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