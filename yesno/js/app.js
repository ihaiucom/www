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
function main()
{
    zf.initialize($("#appView"), $("#appClip"));

    preload = new zf.Preload();
    preload.sComplete.add(onLoaded);
    preload.load();

}

function onLoaded()
{
    $(".ui-loader").hide();
    $("#loadingView").hide();
    loginView = new zf.LoginView("loginView");
    console.log("onLoaded");
    loginView.sClick.add(onPlay);
    loginView.show();
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




main();
