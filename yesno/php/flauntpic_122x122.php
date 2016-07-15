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
//if(!file_exists($filePath))
//{
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
//    imagepng($img, $filePath);
//}


header("Content-type:application/x-png");
header("Content-Disposition:attachment;filename='".$filename."'");
imagepng($img);


?>