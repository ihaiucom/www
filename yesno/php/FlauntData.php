<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-20
 * Time: 下午7:14
 */

$texts = array(
    array(0,"三心二意"),
    array(1,"笨手笨脚"),
    array(10,"心灵手巧"),
    array(20,"手脚麻利"),
    array(30,"手疾眼快"),
    array(40,"大显神通"),
    array(50,"完美无缺"),
    array(60,"举世无双"),
    array(70,"天下第一"),
    array(80,"加人一等"),
    array(90,"京解之才"),
    array(100,"经国之才"),
    array(110,"经济之才"),
    array(120,"经世之才"),
    array(130,"经天纬地"));

$headID = rand(1, 5);
$score = rand(0, 400);

$PT_QZONE = "qzone";
$PT_QQ = "qq";
$PT_WEIBO = "weibo";
$pt = $PT_QZONE;

if(isset($_GET["score"]))
{
    $score =  $_GET["score"];
}

if(isset($_GET["head"]))
{
    $headID =  $_GET["head"];
}

if(isset($_GET["pt"]))
{
    $pt = $_GET["pt"];
}

$text = "三心二意";
$textCount = count($texts);
for($i = $textCount - 1; $i >= 0; $i--)
{

    if($score >= $texts[$i][0])
    {
        $text = $texts[$i][1] ." LV".($score - $texts[$i][0] + 1);
        break;
    }
}

?>