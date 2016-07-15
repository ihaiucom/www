<meta charset="UTF-8"/>
<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-19
 * Time: 下午12:43
 */
include "./path.php";
include "./SaveFile.php";
$texts = array(
    array(0,"三心二意"),
    array(1,"笨手笨脚"),
    array(10,"楞手楞脚"),
    array(20,"手忙脚乱"),
    array(30,"心灵手巧"),
    array(40,"手脚麻利"),
    array(50,"手疾眼快"),
    array(60,"大显神通"),
    array(70,"完美无缺"),
    array(80,"举世无双"),
    array(90,"天下第一"),
    array(100,"加人一等"),
    array(110,"京解之才"),
    array(120,"经国之才"),
    array(130,"经济之才"),
    array(140,"经世之才"),
    array(150,"经天纬地"));

$headID = rand(1, 3);
$score = rand(0, 400);

if(isset($_GET["score"]))
{
    $score =  $_GET["score"];
}

if(isset($_GET["head"]))
{
    $headID =  $_GET["head"];
}

$text = "三心二意";
$textCount = count($texts);
for($i = $textCount - 1; $i >= 0; $i--)
{

    if($score >= $texts[$i][0])
    {
        $text = $texts[$i][1];
        break;
    }
}


$filename = "flaunt_".$headID."_".$score.".png";
$filePath = $ASSETS_FLAUNT. $filename;
$fileUrl = $URL_ASSETS_FLAUNT.$filename;
if(!file_exists($filePath))
{
    //背景
    $bgPath = $ASSETS_FLAUNT . "flaunt_bg.png";
    $img = imagecreatefrompng($bgPath);

//头像
    $headPath = $ASSETS_HEAD.$headID.".png";
    if(!file_exists($headPath))
    {
        $headPath = $ASSETS_HEAD."1.png";
    }
    $head = imagecreatefrompng($headPath);
    imagecopyresized($img, $head, 55, 75, 0, 0, 120, 120, 350,350);

//分数
    $color = imagecolorallocate($img, 151, 101, 37);
    $x = 190 + (180 - (strlen($score) * 45)) * 0.5;
    imagettftext($img, 72, 0, $x, 140, $color, $FONT_STXINGKA, $score);

//称号
    $color = imagecolorallocate($img, 205, 134, 44);
    imagettftext($img, 30, 0, 190, 190, $color, $FONT_Yuanti, $text);


//保存图片
    imagepng($img, $filePath);
}


$targetUrl = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
$targetUrl.= "url=".urlencode('http://112.124.4.240');
$targetUrl.= "&showcount=1";
$targetUrl.= "&desc=".urlencode("简单好玩的游戏");
$targetUrl.= "&summary=".urlencode("快来玩吧");
$targetUrl.= "&title=".urlencode("最强思密达");
$targetUrl.= "&site=".urlencode("微朋佳游");
$targetUrl.= "&pics=".urlencode($fileUrl);
$targetUrl.= "&style=".urlencode(98);
$targetUrl.= "&width=".urlencode(400);
$targetUrl.= "&height=".urlencode(250);
header("location: ".$targetUrl);
?>
