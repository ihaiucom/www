<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-19
 * Time: 下午2:32
 */

include "../SaveFile.php";

$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$WEB_ROOT = $DOCUMENT_ROOT."yesno_dev-v1.1/";
$WEB_ASSETS =$WEB_ROOT."assets/";
$WEB_ASSETS_FLAUNT =$WEB_ASSETS."flaunt/";
$WEB_ASSETS_HEAD =$WEB_ASSETS."head/";


saveFile("./testsavefile.txt", "ABC一二三\n", "a");

$filePath = $WEB_ASSETS_FLAUNT."log.txt";
echo(file_exists($WEB_ASSETS_FLAUNT)."<br>");
echo(is_dir($WEB_ASSETS_FLAUNT)."<br>");
echo($WEB_ASSETS_FLAUNT);
//chmod($WEB_ASSETS_FLAUNT, 0755);
saveFile($filePath, "ABC一二三\n", "a+");

?>