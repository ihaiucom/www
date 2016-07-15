/**
 * Created by zengfeng on 14-9-27.
 */


this.zf = this.zf || {};
(function(){
    var LoadingView = function()
    {
        this.initialize();
    };

    var p = LoadingView.prototype = new zf.ViewClass();
    p.View_update = p.update;
    p.bg = null;
    p.loadText = null;
    p.progressShape = null;
    p.fileProgressShape = null;
    p.frame = 0;

    p.initialize = function() {
        p.bg = new createjs.Shape();
        p.bg.graphics.beginFill("#0786b3");
        p.bg.graphics.drawRect(0, 0, zf.stageWidth, zf.stageHeight);
        p.bg.graphics.endFill();
        p.addChild(p.bg);



        p.loadText = new createjs.Text("Loading", "12px 'Helvetica Neue'", "#ffFFFF");
        p.loadText.textAlign = "center";
        p.loadText.width = 200;
        p.loadText.x = zf.stageWidth * 0.5;
        p.loadText.y = zf.stageHeight * 0.5 + 10;
        p.addChild(p.loadText);

        p.progressShape = new zf.FanShape(Math.PI*0.4);
        p.addChild(p.progressShape);
        p.progressShape.x = zf.stageWidth * 0.5;
        p.progressShape.y = zf.stageHeight * 0.5;
    };




    p.update = function(event)
    {
        if(p.View_update != null) p.View_update(event);
        p.frame ++;
//        var num = p.frame % 100;
//        var gapFrame = 30;
//        if(num == gapFrame)
//        {
//            p.loadText.text = "Loading";
//        }
//        else if(num == gapFrame * 2)
//        {
//            p.loadText.text = "Loading.";
//        }
//        else if(num == gapFrame * 3)
//        {
//            p.loadText.text = "Loading..";
//        }
//        else if(num == gapFrame * 4)
//        {
//            p.loadText.text = "Loading...";
//        }


        var r = 100;
        var border = 10;
        var g = p.progressShape.graphics;
        g.clear();

        g.setStrokeStyle(border, "round");
        g.beginStroke("rgba(2,111,150,1)");
        g.beginStroke("#FFFFFF");
        g.beginFill("rgba(255,255,255,0.3)");
//        g.beginRadialGradientFill(["#137a9e","#ffffff"], [0, 1], 0, 0, 0, 0, 0, 200)
        g.drawCircle(0, 0, r + border);
        g.endFill();
        g.endStroke();


        g.setStrokeStyle(1, "round");
        g.beginStroke("#056181");
        g.beginFill("rgba(255,255,255,0.3)");
        g.drawCircle(0, 0, r);
        g.endFill();
        g.endStroke();

//        p.progressShape.drawFanDoubleLerp(0, 0, r, Math.PI * 0, Math.PI*((p.frame % 200)/100), parseInt(p.frame / 200));
        p.progressShape.drawFanDoubleLerpColor(0, 0, r-3, Math.PI * 0, Math.PI*((p.frame % 100)/50), parseInt(p.frame / 100), 0xff48df77, 0xc9ff5677, 0xff48dfFF, 0xc9ff56FF);

    }


    p.toString = function()
    {
        return "[LoadingView (name="+  this.name +")]";
    }

    zf.LoadingView = LoadingView;

}());
