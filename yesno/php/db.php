<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-22
 * Time: 下午9:55
 */

$ajaxData = array();
$ajaxData["status"] = 1;
$ajaxData["data"] = array();
$logs = $ajaxData["log"] = array();
function print_log($msg, $status = 1)
{
//    if(!$status)
//    {
//        $ajaxData["status"] = 0;
//    }
}

$db_host = "127.0.0.1:3306";
$db_user = "zf";
$db_password = "zf123";
$db_name = "yesno";
$table = "user_score";

$con = mysql_connect($db_host, $db_user, $db_password);
if(!$con)
{
    print_log("连接数据库失败<br>\n", 0);
}
else
{
    print_log("连接数据成功<br>\n");
}
mysql_query("SET NAMES 'utf8'", $con);
mysql_select_db($db_name, $con);


/**
 * 数据库--插入
 * @param $ip
 * @param $score
 * @param $scoreMax
 * @param $requestTime
 * @param $table
 * @return resource
 */
function db_insert($ip, $score, $scoreMax,  $table)
{
    $time = time();
    $city = getCity($ip);
    $sql = "INSERT INTO `$table` ( `ip`,`city`, `score`, `scoreMax`, `requestTime`, `requestCount`, `loginTime`, `loginCount`) VALUES ( '$ip','$city', $score, $scoreMax, 0, 0, $time, 1)";
    echo($sql."<br>");
    $result = mysql_query($sql);
    if($result)
    {
        print_log( "插入数据成功<br>\n");
    }
    else
    {
        print_log("插入数据失败<br>\n", 0);
    }
    return $result;
}


//测试 db_insert
//$ip = "127.0.0.4";
//$score = 1;
//$scoreMax = 5;
//$requestTime = time();
//$requestCount = 1;
//db_insert($ip, $score, $scoreMax,  $table);


/**
 * 数据库--查找IP
 * @param $ip
 * @param $table
 * @return array
 */
function db_findIP($ip,$table)
{
    $sql="SELECT * FROM `$table` WHERE ip='$ip'";
    $result = mysql_query($sql);
    if(!$result)
    {
        print_log("查找数据失败<br>\n", 0);
    }

    $list = mysql_fetch_array($result);
    if(!$list)
    {
        print_log( "查找数据有匹配数据ip=$ip<br>\n");
    }

    mysql_free_result($result);
    return $list;
}

//测试 db_findIP
//$ip = "192.168.1.100";
//$ip = "127.0.0.4";
//$list = db_findIP($ip, $table);
//print_r($list);


/**
 * 数据库--修改积分(以IP为条件的)
 * @param $ip
 * @param $score
 * @param $requestTime
 * @param $table
 */
function db_updateScore($ip, $score, $table)
{
    $requestTime = time();
    $sql = "UPDATE `$table` SET score=$score,requestTime=$requestTime,requestCount=requestCount+1 WHERE (ip='$ip')";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("修改数据失败ip=$ip<br>\n", 0) ;
    }
    else
    {
        print_log("修改数据成功ip=$ip<br>\n");
    }

    $sql = "UPDATE `$table` SET scoreMax=$score WHERE ip='$ip' AND scoreMax<$score";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("修改数据scoreMax失败ip=$ip<br>\n", 0);
    }
    else
    {
        print_log("修改数据scoreMax成功ip=$ip<br>\n");
    }
}



/**
 * 数据库--修改登陆时间(以IP为条件的)
 * @param $ip
 * @param $score
 * @param $requestTime
 * @param $table
 */
function db_updateLoginTime($ip,$table)
{
    $loginTime = time();
    $sql = "UPDATE `$table` SET loginTime=$loginTime,loginCount=loginCount+1 WHERE (ip='$ip')";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("修改数据失败ip=$ip<br>\n", 0);
    }
    else
    {
        print_log("修改数据成功ip=$ip<br>\n");
    }
}

//$ip="127.0.0.1";
//$score=33;
//db_updateLoginTime($ip,  time(), $table);


/**
 * 修改分享次数
 * @param $ip
 * @param $shareType
 * @param $table
 */
function db_updateShareCount($ip, $shareType, $table)
{
    if($shareType == "timeline")
    {
        $sql = "UPDATE `$table` SET shareCount=shareCount+1,shareCountTimeline=shareCountTimeline+1 WHERE (ip='$ip')";
    }
    else if($shareType == "friend")
    {
        $sql = "UPDATE `$table` SET shareCount=shareCount+1,shareCountFriend=shareCountFriend+1 WHERE (ip='$ip')";
    }
    else
    {
        $sql = "UPDATE `$table` SET shareCount=shareCount+1 WHERE (ip='$ip')";
    }
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("修改数据失败ip=$ip<br>\n", 0);
    }
    else
    {
        print_log("修改数据成功ip=$ip<br>\n");
    }
}

/**
 * 获取排行
 * @param $score
 * @return int
 */
function getRank($score, $table)
{
    $sql = "SELECT count(id) + 1 as rank FROM `$table` WHERE scoreMax > $score order by scoreMax DESC";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("获取排行失败<br>\n", 0);
    }

    $list = mysql_fetch_array($result);
    mysql_free_result($result);
    return $list["rank"];
}

/**
 * 获取总数
 * @param $table
 * @return mixed
 */
function getIPCount($table)
{
    $sql = "SELECT count(id) as total  FROM `$table`";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("获取排行失败<br>\n", 0);
    }

    $list = mysql_fetch_array($result);
    mysql_free_result($result);
    return $list["total"];
}

/**
 * 获取总数
 * @param $table
 * @return mixed
 */
function getIPCountForQuit($table)
{
    $sql = "SELECT count(id) as total  FROM `$table` WHERE scoreMax < 1";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("获取排行失败<br>\n", 0);
    }

    $list = mysql_fetch_array($result);
    mysql_free_result($result);
    return $list["total"];
}

/**
 * 获取第一名
 * @return array
 */
function getFirstItem($table)
{
    $sql = "SELECT id, ip, city, scoreMax FROM `$table` ORDER BY scoreMax DESC limit 1,1";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("获取第一名失败<br>\n", 0);
    }

    $list = mysql_fetch_array($result);
    mysql_free_result($result);
    return $list;
}

/**
 * 获取超越
 * @param $score
 * @param $table
 * @return array
 */
function getPassItem($score, $table)
{
    $sql = "SELECT * FROM `$table` WHERE scoreMax < $score ORDER BY scoreMax DESC LIMIT 1,1";
    $result=mysql_query($sql);
    if(!$result)
    {
        print_log("获取超越失败<br>\n", 0);
    }

    $list = mysql_fetch_array($result);
    mysql_free_result($result);
    return $list;
}

/**
 * 获取城市名
 * @param $ip
 * @return string
 */
function getCity($ip)
{
    $url = "http://opendata.baidu.com/api.php?query=$ip&resource_id=6006&format=json&ie=utf8&oe=utf-8";
    $result = file_get_contents($url);
    $obj = json_decode($result);
    if(count($obj->data) > 0)
    {
        $city = $obj->data["0"]->location;
    }
    else
    {
        $city = "未知城市";
    }
    return $city;
}

//if($con) mysql_close($con);

?>