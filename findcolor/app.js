// JavaScript Document

var game_content = document.getElementById("game_content");
var game_canvas = document.getElementById("gameView");
var stageWidth = window.innerWidth-20;
var stageHeight = window.innerHeight - 50-20;
stageWidth = stageHeight = Math.min(stageWidth, stageHeight);
game_content.style.width = stageWidth + "px";
game_content.style.height = stageHeight + "px";
game_canvas.width = stageWidth;
game_canvas.height = stageHeight;

// init stage
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage);

var gameView = new createjs.Container();
stage.addChild(gameView);


var honorConfigs = ["瞎子","色盲","色郎","色狼","色鬼","色魔","超级色魔","变态色魔","孤独求色"];
var honorLvConfigs = [20, 30, 40, 50, 60, 70, 80, 90, 100];
var page_loading = document.getElementById("page_loading");
var page_start = document.getElementById("page_start");
var page_gameing = document.getElementById("page_gameing");
var page_dailog = document.getElementById("page_dailog");
var dailog_gameover = document.getElementById("dailog_gameover");
var dailog_pause = document.getElementById("dailog_pause");


var scoreText = document.getElementById("score_value");
var timeText = document.getElementById("time");
var honorText = document.getElementById("honor");

var play_button = document.getElementById("play_button");
var pause_button = document.getElementById("pause_button");
var replay_button = document.getElementById("replay_button");
var contionue_button = document.getElementById("contionue_button");



function setGameOver()
{
    var index = 0;
    if(grid.score >= honorLvConfigs[honorLvConfigs.length - 1])
    {
        index = honorLvConfigs[honorLvConfigs.length - 1];
    }
    else
    {
        for(var i = 0; i < honorLvConfigs.length; i ++)
        {
            if(grid.score > honorLvConfigs[i])
            {
                index = i + 1;
            }
        }
    }

    honorText.innerHTML = honorConfigs[index] + " Lv." + grid.score;
}

function Time()
{
    this.maxSecond = 60;
    this.second = 60;
    this.rewardSecond = 0;
    this._timer;
    var self = this;

    this.addSecond = function(value)
    {
        this.second += value;
        this.rewardSecond += value;
    }

    this.restart = function()
    {
        this.second = this.maxSecond;
        this.rewardSecond = 0;
        this.start();
    }

    this.start = function()
    {
        this._timer = setInterval(this.onTime, 1000);
        this.setText();
    }

    this.stop = function()
    {
        clearInterval(this._timer);
    }

    this.onTime = function()
    {
        self.second -= 1;
        if(parseInt(self.second) <= 0)
        {
            self.over();
        }
        self.setText();
    }

    this.over = function()
    {
        this.stop();
        state.setState(State.PAGE_DAILOG_GAMEOVER);
    }

    this.setText = function()
    {
        var str = this.second + "   (+" + this.rewardSecond+")";
//        var index = str.indexOf(".");
//        if(index == -1)
//        {
//            str += ".0";
//        }
//        else
//        {
//            str = str.substring(0, index) + str.substr(index, 2);
//        }
        timeText.innerHTML = str;
    }
}


var pages = [page_loading, page_start, page_gameing, page_dailog, dailog_gameover, dailog_pause];
function State()
{
    this._value = 0;
    this.setState = function(state)
    {
        this._value = state;
        for(var i = 0; i < pages.length; i ++)
        {
            var div = pages[i];
            div.style.display = null;
        }

        if(state <= 2)
        {
            var div = pages[state];
            div.style.display = "block";
        }
        else if(state == State.PAGE_DAILOG_GAMEOVER)
        {
            page_dailog.style.display = "block";
            dailog_gameover.style.display = "block";
            setGameOver();
        }
        else if(state == State.PAGE_DAILOG_PAUSE)
        {
            page_dailog.style.display = "block";
            dailog_pause.style.display = "block";
        }
    }

    this.getValue = function()
    {
        return this._value;
    }
}

State.PAGE_LOAD = 0;
State.PAGE_START = 1;
State.PAGE_GAMEING = 2;
State.PAGE_DAILOG_GAMEOVER = 3;
State.PAGE_DAILOG_PAUSE = 4;






function Grid()
{
    this.width = stageWidth;
    this.height = stageHeight;
    this.padding = 8;
    this.maxN = Math.min(parseInt(this.width / 80), 10);


    this.drawBG = function()
    {
        var bg = new createjs.Shape();
        bg.graphics.beginFill("#DDDDDD");
        bg.graphics.drawRoundRect(0, 0, this.width, this.height, 10);
        bg.graphics.endFill();
        gameView.addChild(bg);
    }




    this.score = 0;
    this.n = 2;
    this._secondScore = 0;
    this._color = 0xFF0000;
    this._lightColor = 0xEE0000;
    var self = this;

    this.reset = function()
    {
        this.score = 0;
        this.n = 2;
        this._secondScore = 0;
        this.randomColor();
        this.drawGrid();
        this.startRewardTime();

        scoreText.innerHTML = this.score;
    }


    this._rewardTimer;
    this.startRewardTime = function()
    {
        clearInterval(this._rewardTimer);
        this._rewardTimer = setInterval(function()
        {
            if(self._secondScore >= 2)
            {
                timer.addSecond(1);
            }
            self._secondScore = 0;
        }, 3000);
    }

    this.stopRewardTime = function()
    {
        clearInterval(this._rewardTimer);
    }

    this.randomColor = function()
    {

        var r = parseInt(Math.random() * 0x77 + 0x22);
        var g = parseInt(Math.random() * 0x77 + 0x22);
        var b = parseInt(Math.random() * 0x77 + 0x22);


        this._color = (r << 16) | (g << 8) | (b);
        this._lightColor = this.getLightColor();
        this._color = this._color.toString(16);
        while(this._color.length < 6)
        {
            this._color = "0" + this._color;
        }
        this._color = "#" + this._color;

        this._lightColor = this._lightColor.toString(16);
        while(this._lightColor.length < 6)
        {
            this._lightColor = "0" + this._lightColor;
        }
        this._lightColor = "#" + this._lightColor;
    }

    this.getLightColor = function()
    {
        var r = this._color >> 16;
        var g = (this._color >> 8) & 0xFF;
        var b = this._color & 0xFF;

        var rate = 50 * ((1 / (this.score + 1)) > 0.3 ? (1 / (this.score + 1)) : 0.3);

        r = r + 20 < 255 ? r + rate : 255;
        g = g + 20 < 255 ? g + rate : 255;
        b = b + 20 < 255 ? b + rate : 255;

        r = parseInt(r);
        g = parseInt(g);
        b = parseInt(b);


        return (r << 16) | (g << 8) | (b);
    }


    this.drawGrid = function()
    {
        this.drawBG();
        var x = parseInt(Math.random() * this.n);
        var y = parseInt(Math.random() * this.n);
        var gap = 3;
        var cellWidth = (this.width - this.padding * 2) / this.n - gap;
        var cellHeight = (this.height - this.padding * 2) / this.n - gap;
        for(var indexX = 0; indexX < this.n; indexX ++)
        {
            for(var indexY = 0; indexY < this.n; indexY ++)
            {
                var r = new Rect(this.n, this._color, this._lightColor, cellWidth, cellHeight);
                gameView.addChild(r);
                r.x = this.padding + (cellWidth + gap) * indexX;
                r.y = this.padding + (cellHeight + gap) * indexY;

                if(x == indexX && y == indexY)
                {
                    r.setRectType(1);
                    r.addEventListener("click", this.onClickLightRect);
                }
            }
        }
    }

    this.onClickLightRect = function(event)
    {
        gameView.removeAllChildren();
        if(self.n < self.maxN)
        {
            ++self.n;
        }
        self.score ++;
        self._secondScore ++;
        self.randomColor();
        self.drawGrid();
        scoreText.innerHTML = self.score;

    }
}

var timer = new Time();

var state = new State();
state.setState(State.PAGE_START);

var grid = new Grid();

play_button.addEventListener("click", onPlayButton);
replay_button.addEventListener("click", onReplayButton);
pause_button.addEventListener("click", onPauseButton);
contionue_button.addEventListener("click", onContionueButton);

function onPlayButton(event)
{
    timer.start();
    state.setState(State.PAGE_GAMEING);
    grid.reset();
}

function onReplayButton(event)
{
    timer.restart();
    state.setState(State.PAGE_GAMEING);
    grid.reset();
}

function onPauseButton(event)
{
    timer.stop();
    state.setState(State.PAGE_DAILOG_PAUSE);
}

function onContionueButton(event)
{
    timer.start();
    state.setState(State.PAGE_GAMEING);
}


