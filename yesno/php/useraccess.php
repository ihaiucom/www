<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-30
 * Time: 下午10:02
 */

include "./db.php";

if(!empty($_GET["type"]))
{
    $ip = $_SERVER["REMOTE_ADDR"];
    $score = empty($_GET["score"]) ? 0 : $_GET["score"];
    $scoreMax = empty($_GET["scoreMax"]) ? $score : $_GET["scoreMax"];



    $item = db_findIP($ip, $table);
    if(!$item)
    {
        db_insert($ip, $score, $scoreMax, $table);
    }
    else
    {
        if($_GET["type"] == 1)
        {
            db_updateLoginTime($ip, $table);
        }
        else if($_GET["type"] == 2)
        {
            db_updateScore($ip, $score, $table);
        }
        else if($_GET["type"] == 3)
        {
            $shareType = empty($_GET["shareType"]) ? "qzone" : $_GET["shareType"];
            db_updateShareCount($ip, $shareType, $table);
        }
    }

    if($_GET["type"] == 1)
    {
        $useragent = $_SERVER["HTTP_USER_AGENT"];
        $window = strpos($useragent, "Windows") ? true : false;
        $mac = strpos($useragent, "Macintosh") ? true : false;
        $iPad =  strpos($useragent, "iPad") ? true : false;
        $iPhone =  strpos($useragent, "iPhone") ? true : false;
        $iPod =  strpos($useragent, "iPod") ? true : false;
        $ios = $iPad || $iPhone || $iPod;
        $android = strpos($useragent, "Android") ? true : false;
        $blackberry = strpos($useragent, "Blackberry") ? true : false;
        $tv = strpos($useragent, "Box") ? true : false;
        $weixin = $_GET["isWeixin"] == 1;
        $chrome = strpos($useragent, "Chrome") ? true : false;
        $firefox = strpos($useragent, "Firefox") ? true : false;
        $opera = strpos($useragent, "Opera") ? true : false;
        $ie = strpos($useragent, "IE ") ? true : false;
        $ie6 = $ie7 = $ie8= $ie9 = $ieother= false;
        if($ie)
        {
            $ieversion = substr($useragent, strpos($useragent, "IE "), 10);
            $ieversion = substr($ieversion, 3, strpos($ieversion, "; ") - 3);
            if($ieversion >= 6.0 && $ieversion < 7)
            {
                $ie6 = true;
            }
            else if($ieversion < 8)
            {
                $ie7 = true;
            }
            else if($ieversion < 9)
            {
                $ie8 = true;
            }
            else if($ieversion < 10)
            {
                $ie9 = true;
            }
            else
            {
                $ieother = true;
            }
        }

        $values = "";
        if($window) $values .= "window=window+1";
        if($mac) $values .= ",mac=mac+1";
        if($iPad) $values .= ",iPad=iPad+1";
        if($iPhone) $values .= ",iPhone=iPhone+1";
        if($iPod) $values .= ",iPod=iPod+1";
        if($ios) $values .= ",ios=ios+1";
        if($android) $values .= ",android=android+1";
        if($blackberry) $values .= ",blackberry=blackberry+1";
        if($tv) $values .= ",tv=tv+1";
        if($weixin) $values .= ",weixin=weixin+1";
        if($chrome) $values .= ",chrome=chrome+1";
        if($firefox) $values .= ",firefox=firefox+1";
        if($opera) $values .= ",opera=opera+1";
        if($ie) $values .= ",ie=ie+1";
        if($ie6) $values .= ",ie6=ie6+1";
        if($ie7) $values .= ",ie7=ie7+1";
        if($ie8) $values .= ",ie8=ie8+1";
        if($ie9) $values .= ",ie9=ie9+1";
        if($ieother) $values .= ",ieother=ieother+1";
        if(strpos($values, ",") == 0)
        {
            $values = substr($values, 1);
        }

        $sql = "UPDATE `$table` SET $values WHERE (ip='$ip')";
//        echo($sql."<br>\n");
        $result=mysql_query($sql);
        if(!$result)
        {
            print_log("修改平台数据失败ip=$ip<br>\n");
        }
        else
        {
            print_log("修改平台数据成功ip=$ip<br>\n");
        }
    }


    if($_GET["type"] == 2)
    {
        $rank = getRank($score, $table);
        $total = getIPCount($table);
        $firstItem = getFirstItem($table);
        $passItem = getPassItem($score, $table);
        $defeat = floor(($total - $rank + 1) / $total * 1000);
        $defeat /= 10;
        $ajaxData["data"]["msg"] = "";
        if($passItem)
        {
            $ajaxData["data"]["passCity"] = $passItem["city"];
            $ajaxData["data"]["passScore"] = $passItem["scoreMax"];
            $ajaxData["data"]["msg"] .= "超越\"".$passItem["city"]."\"的玩家，";
        }
        else
        {
            $ajaxData["data"]["passCity"] = "";
            $ajaxData["data"]["passScore"] = -1;

        }


        $ajaxData["data"]["rank"] = $rank;
        $ajaxData["data"]["defeat"] = $defeat;
        $ajaxData["data"]["msg"] .= "目前第".$rank."名,击败$defeat%玩家，";



        if($firstItem)
        {
            $ajaxData["data"]["firstCity"] = $firstItem["city"];
            $ajaxData["data"]["firstScore"] = $firstItem["scoreMax"];
            if($firstItem["scoreMax"] > $score)
            {
                $ajaxData["data"]["msg"] .= "差".($firstItem["scoreMax"] - $score)."分就第一。";
            }
        }
        else
        {
            $ajaxData["data"]["firstCity"] = "";
            $ajaxData["data"]["firstScore"] = -1;
        }



        echo(json_encode($ajaxData));
    }

}

if($con) mysql_close($con);

?>