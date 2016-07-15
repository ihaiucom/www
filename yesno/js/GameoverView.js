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