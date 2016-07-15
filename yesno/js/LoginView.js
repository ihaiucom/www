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