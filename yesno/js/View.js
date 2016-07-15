/**
 * Created by zengfeng on 14-9-27.
 */
this.zf = this.zf || {};
(function()
{
    var ViewClass = function(elementID) {
        this.initialize(elementID);
    };
    var p = ViewClass.prototype;
    p.view = null;

    p.initialize = function(elementID) {
        this.view = $("#"+elementID);
    };

    p.show = function(time)
    {
        if(time)
        {
            this.view.fadeIn(time);
        }
        else
        {
            this.view.show();
        }
    };

    p.hide = function()
    {
        this.view.hide();
    };

    p.toString = function() {
        return "[View (name="+  this.name +")]";
    };

    zf.ViewClass = ViewClass;

}());


/**
 * Created by zengfeng on 14-10-20.
 */


var share_imgUrl = "http://www.baidu.com/img/bdlogo.gif";
var share_lineLink = "http://112.124.4.240";
var share_descContent = '';
var share_shareTitle = '《最强思密达》';
var share_appid = '';
var share_pt = '';


function get_share_imgUrl()
{
    if(zf.isGameOver)
    {
        share_imgUrl = zf.getFlauntImg();
    }
    else
    {
        share_imgUrl = zf.URL_IMG_SHARE;
    }

    return share_imgUrl;
}


function get_share_lineLink()
{
    share_lineLink = zf.URL_ROOT;
    return share_lineLink;
}


function get_share_descContent()
{
    if(zf.isGameOver)
    {
        share_descContent = "《最强思密达》试试你的精神是否集中。我的成绩:"+ mainModel.score +"分 获得荣誉称号:"+mainModel.getChenhao()+ ".快来玩吧! --微朋佳游";
    }
    else
    {
        share_descContent = "《最强思密达》试试你的精神是否集中,快来玩吧! --微朋佳游";
    }
    return share_descContent;

}

function get_share_shareTitle()
{
    if(zf.isGameOver )
    {
        if(share_pt == 1)
        {
            share_shareTitle = "《最强思密达》试试你的精神是否集中。我的成绩:"+ mainModel.score +"分 获得荣誉称号:"+mainModel.getChenhao()+ ".快来玩吧! --微朋佳游";
        }
        else
        {
            share_shareTitle = "《最强思密达》";
        }
    }
    else
    {
        if(share_pt)
        {
            share_shareTitle = get_share_descContent();
        }
        else
        {
            share_shareTitle = "《最强思密达》";
        }
    }

    return share_shareTitle;
}


function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": share_appid,
        "img_url": get_share_imgUrl(),
        "img_width": "200",
        "img_height": "200",
        "link": get_share_lineLink(),
        "desc": get_share_descContent(),
        "title": get_share_shareTitle()
    }, function(res) {
        ajax_share("friend");
    })
}



function shareTimeline() {

    share_pt = 1;
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": get_share_imgUrl(),
        "img_width": "200",
        "img_height": "200",
        "link": get_share_lineLink(),
        "desc": get_share_descContent(),
        "title": get_share_shareTitle()

    }, function(res) {
        if(res["err_msg"] && res["err_msg"].indexOf("access_denied") > 0)
        {
            zf.msg.info("点击右上角按钮<br>分享到朋友圈");
        }
        else
        {
            ajax_share("timeline");
        }
    });



}



function shareWeibo() {

    WeixinJSBridge.invoke('shareWeibo',{

        "content": get_share_descContent(),
        "url": get_share_lineLink()
    }, function(res) {



    });



}

try
{

    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        zf.BrowserDetect.isWeixin = true;
        $("#shareWeixinHelp").show();
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            share_pt = 0;
            shareFriend();

        });



        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){

            share_pt = 1;
            shareTimeline();
        });



        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){

            share_pt = 2;
            shareWeibo();

        });



    }, false);
}
catch (e)
{

}



