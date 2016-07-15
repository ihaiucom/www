/**
 * Created by zengfeng on 14-9-27.
 */


if(!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(e){
        for(var i=0,j; j=this[i]; i++){
            if(j==e){return i;}
        }
        return -1;
    }
}


//============================
// main
//-----------------------------
var preload;
var loginView;
var mainModel;
var mainView;
var gameoverView;
var beginTimer = 0;
var isLoaded = false;
var isBegined = false;
function main()
{
    zf.initialize($("#appView"), $("#appClip"));

    if(zf.hv < 1) $("#loadingView img").width(parseInt(zf.stageWidth * 0.7));
    else $("#loadingView img").height(parseInt(zf.stageHeight * 0.15));

    $("#loadingView").css("line-height", parseInt(zf.stageHeight) + "px");

    isLoaded = false;
    isBegined = false;
    preload = new zf.Preload();
    preload.sComplete.add(onLoadedHandler);
    preload.load();

    beginTimer = setTimeout(onBeginHandler, 500);
    ajax_login();
}
function onLoadedHandler()
{
    isLoaded = true;
    if(isBegined && isLoaded)
    {
        onLoaded();
    }
}

function onBeginHandler()
{
    isBegined = true;
    if(isBegined && isLoaded)
    {
        onLoaded();
    }
}


function onLoaded()
{
    $(".ui-loader").hide();
    $("#loadingView").fadeOut(500);
    setTimeout(showLogin, 500);
    if(zf.BrowserDetect.isMobile)
    {
        $("#logCodeDiv").fadeOut(500);
    }
}

function showLogin()
{

    loginView = new zf.LoginView("loginView");
    console.log("onLoaded");
    loginView.sClick.add(onPlay);
    loginView.show(500);
}

function onPlay()
{


    loginView.hide();
    mainModel = new zf.MainModel();
    mainView = new zf.MainView("mainView");
    gameoverView = new zf.GameoverView("mainView");
    mainModel.sRest.add(onRest);
    mainModel.sGameOver.add(onGameOver);
    onRest();
}

function onRest()
{
    mainView.show();
    gameoverView.hide();
}

function onGameOver()
{
    mainView.hide();
    gameoverView.show();
}

function setShareContext()
{
    //$("#shareMetaDescription").text(get_share_descContent());
    $("#shareText").text(get_share_descContent());
}

function ajax_login()
{
    var url = "./php/useraccess.php?type=1&isWeixin="+(zf.BrowserDetect.isWeixin ? 1 : 0);
    $.post(url,{}, function(data,status)
    {
//        alert("Data: " + data + "\nStatus: " + status);
    });
}

function ajax_score()
{
    var url = "./php/useraccess.php?type=2&score="+mainModel.score + "&scoreMax=" + mainModel.scoreMax;
//    mainModel.ajaxData = null;
    $.post(url, {}, function(data,status)
    {
        mainModel.ajaxData = eval("("+data+")");

        $("#gameover_rank").html(mainModel.ajaxData.data.msg);
        if(!zf.BrowserDetect.isWeixin)
        {
            gameoverView.flauntLink.attr("href", gameoverView.getFlauntUrl("qzone"));
        }
//        alert("Data: " + data + "\nStatus: " + status);
    });
}


function ajax_share(shareType)
{
    var url = "./php/useraccess.php?type=3&shareType="+shareType;
    $.post(url, {}, function(data,status)
    {
//        alert("Data: " + data + "\nStatus: " + status);
    });
}


main();
