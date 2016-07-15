<meta charset="utf-8" />
<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-19
 * Time: 下午1:05
 */

$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$WEB_ROOT = $DOCUMENT_ROOT."yesno_dev-v1.1/";
$WEB_ASSETS =$WEB_ROOT."assets/";
$WEB_ASSETS_FLAUNT =$WEB_ASSETS."flaunt/";
$WEB_ASSETS_HEAD =$WEB_ASSETS."head/";



$path = "/Users/zengfeng/workspaces/www/yesno_dev-v1.1/php/test/testfile.text";
$context = "ABCDEFG曾峰".time()."\n";



    if(!$handle = fopen($path, "a+"))
    {
        echo("不能打开文件 ".$path."<br>");
        exit;
    }

    if(!fwrite($handle, $context))
    {
        echo("不能写入文件 ". $path."<br>");
        exit;
    }

    echo("写入成功 ".$path."<br>");

    fclose($handle);




?>