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

$filename = "flaunt_".$headID."_".$score.".png";
$filePath = $ASSETS_FLAUNT. $filename;
$fileUrl = $URL_ASSETS_FLAUNT.$filename;
//if(!file_exists($filePath))
//{
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
    $x = 180 + (200 - (strlen($text) * 10)) * 0.5;
    imagettftext($img, 20, 0, $x, 190, $color, $FONT_Yuanti, $text);


////保存图片
//    imagepng($img, $filePath);
//}


header("Content-type:application/x-png");
header("Content-Disposition:attachment;filename='".$filename."'");
imagepng($img);
?>