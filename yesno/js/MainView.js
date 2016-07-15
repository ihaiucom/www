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
    p.gameTimeleftWidth = 110;
    p.gameTimeleftScale = 1;






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

        this.gameTimeleftWidth = parseInt(zf.stageHeight * 0.1);
        if(this.gameTimeleftWidth > 110) this.gameTimeleftWidth = 110;
        else if(this.gameTimeleftWidth < 50) this.gameTimeleftWidth = 50;
        this.gameTimeleftScale = this.gameTimeleftWidth  / 110;
        this.gameTimeleft.width(this.gameTimeleftWidth + "px");
        this.gameTimeleft.height(this.gameTimeleftWidth + "px");
        this.gameTimeleft.css("background-size", this.gameTimeleftWidth+ "px " + this.gameTimeleftWidth + "px");
        this.gameTimeleft.css("line-height", parseInt(100 * p.gameTimeleftScale)+ "px ");
        this.gameTimeleft.css("font-size", (4 * p.gameTimeleftScale) + "em");

        this.gameScore.css("background-size", parseInt(148 * p.gameTimeleftScale) + "px " + parseInt(100 * p.gameTimeleftScale) + "px");
        this.gameScore.width(parseInt(148 * p.gameTimeleftScale) + "px ");
        this.gameScore.height(parseInt(100 * p.gameTimeleftScale) + "px");
        this.gameScore.css("line-height",  parseInt(100 * p.gameTimeleftScale)+ "px ");
        this.gameScore.css("font-size", (4 * p.gameTimeleftScale) + "em");





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
                p.gameTimeleft.css("font-size", (4 * p.gameTimeleftScale) + "em");
            }
        }
        else if(args[0] < 100)
        {
            if(p.onTimeleftFontTag != 2)
            {
                p.onTimeleftFontTag = 2;
                p.gameTimeleft.css("font-size", (3.5 * p.gameTimeleftScale) + "em");
            }
        }
        else
        {
            if(p.onTimeleftFontTag != 3)
            {
                p.onTimeleftFontTag = 3;
                p.gameTimeleft.css("font-size", (2.5 * p.gameTimeleftScale) + "em");
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
            setTimeout(p.closeStartPanel, 1500);
            p.startGoText.fadeIn(500);
            zf.Sound.play(zf.Sound.sfx_menu_go);

            if(!zf.BrowserDetect.isMobile)
            {
                var msg = "可以使用方向键 &lt;-</b> 和 <b>-&gt;</b>";
                zf.msg.info(msg, msg.length - 15);
            }
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