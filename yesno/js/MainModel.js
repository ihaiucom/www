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