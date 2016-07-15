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
    p.MAX = 6;
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
    p.minTime = 50;
    p.timeGap = 16;
    p.timeleftTimer = 0;


    p.sRest = new zf.Signal();
    p.sResult = new zf.Signal();
    p.sGameOver = new zf.Signal();
    p.sTimeleft = new zf.Signal();
    p.sTimeout = new zf.Signal();
    p.chenHaos = [];
    p.ajaxData = null;

    p.timeleftStart = function()
    {
        clearTimeout(p.timeleftTimer);
        console.log("timeleftStart");
        p.timeleftFrame = p.maxTime - 1;
        p.timeleftFrame -= Math.floor(p.score * 4);
        if(p.timeleftFrame  < p.minTime)
        {
            p.timeleftFrame =  p.minTime;
        }
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

        this.chenHaos = [
            [0,"三心二意"],
            [1,"笨手笨脚"],
            [10,"心灵手巧"],
            [20,"手脚麻利"],
            [30,"手疾眼快"],
            [40,"大显神通"],
            [50,"完美无缺"],
            [60,"举世无双"],
            [70,"天下第一"],
            [80,"加人一等"],
            [90,"京解之才"],
            [100,"经国之才"],
            [110,"经济之才"],
            [120,"经世之才"],
            [130,"经天纬地"]];

        this.reset();
    };

    p.reset = function()
    {
        if(localStorage)
        {
            if(localStorage.scoreMax)
            {
                this.scoreMax = parseInt(localStorage.scoreMax);
            }
        }
        else
        {
            if(getCookie("scoreMax"))
            {
                this.scoreMax = parseInt(getCookie("scoreMax"));
            }
        }
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
        var rateVal = Math.round(Math.random() * 100 + 0.5);
        if(rateVal < 10 || rateVal > 85)
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
                if(localStorage)
                {
                    localStorage.scoreMax = this.scoreMax;
                }
                else
                {
                    setCookie("scoreMax", this.scoreMax, 365);
                }
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
        ajax_score();
    };

    p.numdatas = null;

    p.getRandom = function()
    {
        if(p.numdatas == null)
        {
            p.numdatas = [];
            var count = this.MAX - this.MIN;
            for(var i = 0; i < 1000000; i ++)
            {
                p.numdatas[i] = Math.floor(Math.random() * count) + this.MIN;
            }
        }

        var index = Math.round(Math.random() * p.numdatas.length);
        var val = p.numdatas[index];
        p.numdatas.splice(index, 1);
        return val;
    }

    p.getChenhao = function()
    {
        var text = "三心二意";
        var count = mainModel.chenHaos.length;
        for(var i = count - 1; i >= 0; i--)
        {
            if(mainModel.score >= mainModel.chenHaos[i][0])
            {
                text = mainModel.chenHaos[i][1] + " LV" + (mainModel.score - mainModel.chenHaos[i][0] + 1);
                break;
            }
        }
        return text;
    }



    p.print = function()
    {
        console.log("[MainModel(pre="+ this.pre+", current="+ this.current+", next="+ this.next+", score="+this.score+")]");
    }

    zf.MainModel = MainModel;
}());