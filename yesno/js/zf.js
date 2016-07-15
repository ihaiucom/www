/**
 * Created by zengfeng on 14-9-27.
 */

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function setCookie(c_name,value,expiredays)
{
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}



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
    p.isGameOver = false;
    p.URL_ROOT = "http://112.124.4.240";
    p.URL_ASSETS_FLAUNT = "http://112.124.4.240/assets/flaunt/";
    p.URL_IMG_SHARE = "http://112.124.4.240/assets/share_main.jpg";

    p.initialize = function(appView,appStage)
    {
        if(location.href.indexOf("yesno"))
        {
            p.URL_ROOT = location.href;
        }
        else
        {
            p.URL_ROOT = "http://"+location.host + "/";
        }
        p.URL_ROOT = "http://"+location.host + "/";
        p.URL_ASSETS_FLAUNT = p.URL_ROOT + "assets/flaunt/";
        p.URL_IMG_SHARE = p.URL_ROOT + "assets/share_main.jpg";

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

    p.getFlauntImg = function()
    {

//        var filename = "flaunt_122_" + mainModel.headEnd + "_"+mainModel.score + ".png";
//        return p.URL_ASSETS_FLAUNT + filename;
        return p.URL_ROOT + "php/flauntpic_122x122.php?head="+mainModel.headEnd + "&score=" + mainModel.score;
    }



}());


(function(){
    var BrowserDetect = function()
    {

    };

    var agent = window.navigator.userAgent;
    BrowserDetect.isWeixin = false;
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
