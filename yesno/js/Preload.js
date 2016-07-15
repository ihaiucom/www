
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
            new zf.LoadItem("./assets/share_main.jpg", "share_main"),
//            new zf.LoadItem("./assets/log_16x16.ico", "log_16x16_ico"),
//            new zf.LoadItem("./assets/log_16x16.png", "log_16x16_png"),
//            new zf.LoadItem("./assets/log_code.png", "log_code"),
//            new zf.LoadItem("./assets/log_loading.png", "log_loading"),
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
//            new zf.LoadItem("./assets/ui/text_is.png", "text_is"),
//            new zf.LoadItem("./assets/ui/text_remember.png", "text_remember"),
//            new zf.LoadItem("./assets/ui/text_score.png", "text_score"),
//            new zf.LoadItem("./assets/ui/text_scoremax.png", "text_scoremax"),
            new zf.LoadItem("./assets/ui/text_start.png", "text_start"),
            new zf.LoadItem("./assets/ui/text_timeout.png", "text_timeout"),
            new zf.LoadItem("./assets/head/1.png", "head_1"),
            new zf.LoadItem("./assets/head/2.png", "head_1"),
            new zf.LoadItem("./assets/head/3.png", "head_1"),
            new zf.LoadItem("./assets/head/4.png", "head_4"),
            new zf.LoadItem("./assets/head/5.png", "head_5")
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
