<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-19
 * Time: 下午12:43
 */
include "./path.php";
include "./SaveFile.php";
include "./FlauntData.php";


$filename = "flaunt_122_".$headID."_".$score.".png";
$filePath = $ASSETS_FLAUNT. $filename;
$fileUrl = $URL_ASSETS_FLAUNT.$filename;
if(!file_exists($filePath))
{
    //背景
    $bgPath = $ASSETS_FLAUNT . "flaunt_bg_122x122.png";
    $img = imagecreatefrompng($bgPath);

//头像
    $headPath = $ASSETS_HEAD.$headID.".png";
    if(!file_exists($headPath))
    {
        $headPath = $ASSETS_HEAD."1.png";
    }
    $head = imagecreatefrompng($headPath);
    imagecopyresized($img, $head, 17, 33, 0, 0, 40, 40, 350,350);

//分数
    $color = imagecolorallocate($img, 151, 101, 37);
    $x = 48 + (60 - (strlen($score) * 15)) * 0.5;
    imagettftext($img, 30, 0, $x, 66, $color, $FONT_STXINGKA, $score);

//称号
    $color = imagecolorallocate($img, 205, 134, 44);
    $x = 0 + (122 - (strlen($text) * 6)) * 0.5;
    imagettftext($img, 11, 0, $x, 88, $color, $FONT_Yuanti, $text);


//保存图片
    imagepng($img, $filePath);
}

//
//echo ("<h1>最强思密达</h1>\n");
//echo ("试试你的精神是否集中。我的成绩:".$score."分 获得荣誉称号:".$text);
//echo ("<img src='".$fileUrl."' />");
//$fileUrl = "http://112.124.4.240/assets/flaunt/flaunt_1_21.png";
if($pt == $PT_QQ)
{

    $targetUrl = "http://connect.qq.com/widget/shareqq/index.html?";
    /*获取URL，可加上来自分享到QQ标识，方便统计*/
    $targetUrl.= "url=".urlencode('http://weipenggame.com');
    /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
    if(empty($_GET["msg"]))
    {
        $targetUrl.= "&desc=".urlencode("试试你的精神是否集中。我的成绩:".$score."分 获得荣誉称号:".$text);
    }
    else
    {
        $targetUrl.= "&desc=".urlencode("我的成绩:".$score."分，获得荣誉称号:".$text."。".$_GET["msg"]."快来玩吧。--微朋佳游");
    }
    /*分享摘要(可选)*/
    $targetUrl.= "&summary=".urlencode("快来玩吧");
    /*分享标题(可选)*/
    $targetUrl.= "&title=".urlencode("最强思密达");
    /*分享来源(可选) 如：QQ分享*/
    $targetUrl.= "&site=".urlencode("微朋佳游");
    /*分享图片(可选)*/
    $targetUrl.= "&pics=".urlencode($fileUrl);
    $targetUrl.= "&style=201";
    $targetUrl.= "&width=400";
    $targetUrl.= "&height=250";
    header("location: ".$targetUrl);
}
//else if($pt == $PT_WEIBO)
//{
//
//      &source=%E4%BC%98%E9%85%B7%E7%BD%91&sourceUrl=http%3A%2F%2Fwww.youku.com%2F&content=utf8&searchPic=false
//    $targetUrl = "http://service.weibo.com/share/share.php?";
//    $targetUrl.= "url=".urlencode('http://weipenggame.com');
//    $targetUrl.= "&appkey=2684493555";
//    $targetUrl.= "&ralateUid=1642904381";
//    $targetUrl.= "&desc=".urlencode("试试你的精神是否集中。我的成绩:".$score."分 获得荣誉称号:".$text);
//    $targetUrl.= "&summary=".urlencode("快来玩吧");
//    $targetUrl.= "&title=".urlencode("最强思密达");
//    $targetUrl.= "&site=".urlencode("微朋佳游");
//    $targetUrl.= "&pics=".urlencode($fileUrl);
//    $targetUrl.= "&style=203";
//    $targetUrl.= "&width=400";
//    $targetUrl.= "&height=250";
//    header("location: ".$targetUrl);
//}
else
{

    $targetUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
    $targetUrl.= "url=".urlencode('http://weipenggame.com');
    $targetUrl.= "&showcount=1";
    if(empty($_GET["msg"]))
    {

        $targetUrl.= "&desc=".urlencode("试试你的精神是否集中。我的成绩:".$score."分 获得荣誉称号:".$text);
        $targetUrl.= "&summary=".urlencode("试试你的精神是否集中。我的成绩:".$score."分 获得荣誉称号:".$text."。快来玩吧。--微朋佳游");
    }
    else
    {
        $targetUrl.= "&desc=".urlencode("我的成绩:".$score."分，获得荣誉称号:".$text."。".$_GET["msg"]."快来玩吧。--微朋佳游");
        $targetUrl.= "&summary=".urlencode("我的成绩:".$score."分 获得荣誉称号:".$text."。".$_GET["msg"]."快来玩吧。--微朋佳游");
    }

    $targetUrl.= "&title=".urlencode("最强思密达");
    $targetUrl.= "&site=".urlencode("微朋佳游");
    $targetUrl.= "&pics=".urlencode($fileUrl);
    $targetUrl.= "&style=203";
    $targetUrl.= "&width=400";
    $targetUrl.= "&height=250";

    header("location: ".$targetUrl);

}

?>