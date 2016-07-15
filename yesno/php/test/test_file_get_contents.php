<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-31
 * Time: 上午8:00
 */

$url = "http://opendata.baidu.com/api.php?query=114.112.11.44&resource_id=6006&format=json&ie=utf8&oe=utf-8";
$result = file_get_contents($url);
$obj = json_decode($result);
if(count($obj->data) > 0)
{
    $city = $obj->data["0"]->location;
//    print_r($obj);

    echo($city);
}
else
{
    echo("未知城市");
}
?>