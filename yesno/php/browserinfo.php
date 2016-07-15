<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-22
 * Time: 下午9:04
 */

$info = json_encode($_SERVER);

$info = str_replace("{", "{<br>\n&nbsp;&nbsp;&nbsp;&nbsp;", $info);
$info = str_replace("}", "}<br>\n&nbsp;&nbsp;&nbsp;&nbsp;", $info);
$info = str_replace(",\"", ",<br>\n&nbsp;&nbsp;&nbsp;&nbsp;\"", $info);


$useragent = $_SERVER["HTTP_USER_AGENT"];
$window = strpos($useragent, "Windows") ? true : false;

echo $info;
?>