<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-31
 * Time: 上午1:12
 */
include "./db.php";

$sql = "SELECT count(ip)".
    ", sum(loginCount), sum(requestCount)".
    ", sum(shareCount), sum(shareCountFriend), sum(shareCountTimeline) ".
    ", sum(window), sum(mac), sum(iPad), sum(iPhone), sum(iPod), sum(ios)".
    ", sum(android), sum(blackberry), sum(tv), sum(weixin)".
    ", sum(chrome), sum(firefox), sum(opera) ".
    ", sum(ie), sum(ie6), sum(ie7),sum(ie8),sum(ie9), sum(ieother) ".

    ", max(loginCount), max(requestCount)".
    ", max(shareCount), max(shareCountFriend), max(shareCountTimeline) ".
    ", max(window), max(mac), max(iPad), max(iPhone), max(iPod), max(ios)".
    ", max(android), max(blackberry), max(tv), max(weixin)".
    ", max(chrome), max(firefox), max(opera) ".
    ", max(ie), max(ie6), max(ie7),max(ie8),max(ie9), max(ieother) ".
    ", max(scoreMax)".
    " FROM $table";
//echo $sql."<br>";
$result = mysql_query($sql);

$list = mysql_fetch_array($result);
mysql_free_result($result);

$ipCount = $list["count(ip)"];
$loginCount = $list["sum(loginCount)"];
$requestCount = $list["sum(requestCount)"];
$shareCount = $list["sum(shareCount)"];
$shareCountFriend = $list["sum(shareCountFriend)"];
$shareCountTimeline = $list["sum(shareCountTimeline)"];
$window = $list["sum(window)"];
$mac = $list["sum(mac)"];
$iPad = $list["sum(iPad)"];
$iPhone = $list["sum(iPhone)"];
$iPod = $list["sum(iPod)"];
$ios = $list["sum(ios)"];
$android = $list["sum(android)"];
$blackberry = $list["sum(blackberry)"];
$tv = $list["sum(tv)"];
$weixin = $list["sum(weixin)"];
$chrome = $list["sum(chrome)"];
$firefox = $list["sum(firefox)"];
$opera = $list["sum(opera)"];
$ie = $list["sum(ie)"];
$ie6 = $list["sum(ie6)"];
$ie7 = $list["sum(ie7)"];
$ie8 = $list["sum(ie8)"];
$ie9 = $list["sum(ie9)"];
$ieother = $list["sum(ieother)"];


$loginCountMax = $list["max(loginCount)"];
$requestCountMax = $list["max(requestCount)"];
$shareCountMax = $list["max(shareCount)"];
$shareCountFriendMax = $list["max(shareCountFriend)"];
$shareCountTimelineMax = $list["max(shareCountTimeline)"];
$windowMax = $list["max(window)"];
$macMax = $list["max(mac)"];
$iPadMax = $list["max(iPad)"];
$iPhoneMax = $list["max(iPhone)"];
$iPodMax = $list["max(iPod)"];
$iosMax = $list["max(ios)"];
$androidMax = $list["max(android)"];
$blackberryMax = $list["max(blackberry)"];
$tvMax = $list["max(tv)"];
$weixinMax = $list["max(weixin)"];
$chromeMax = $list["max(chrome)"];
$firefoxMax = $list["max(firefox)"];
$operaMax = $list["max(opera)"];
$ieMax = $list["max(ie)"];
$ie6Max = $list["max(ie6)"];
$ie7Max = $list["max(ie7)"];
$ie8Max = $list["max(ie8)"];
$ie9Max = $list["max(ie9)"];
$ieotherMax = $list["max(ieother)"];
$scoreMax = $list["max(scoreMax)"];

$quitCount = getIPCountForQuit($table);

?>
<meta charset="utf-8">
<style type="text/css">
    table
    {
        border-collapse:collapse;
        border: 2px solid #DDDDDD;

    }

    table td
    {
        border: 1px solid #DDDDDD;
        padding: 10px 5px;
        color: #2893c8;
    }

    .td_left
    {
        text-align: right;
        padding-right: 20px;
        color: #004446;
    }
</style>
<table >

    <tr>
        <th class="td_left" width="200">属性</th>
        <th width="200">总计</th>
        <th width="200">最高</th>
    </tr>
    <tr>
        <td class="td_left">IP数量</td>
        <td ><?php echo $ipCount ?></td>
        <td ></td>
    </tr>
    <tr>
        <td class="td_left">进去就退的</td>
        <td ><?php echo $quitCount ?></td>
        <td ></td>
    </tr>
    <tr>
        <td class="td_left">最高得分</td>
        <td ></td>
        <td ><?php echo $scoreMax ?></td>
    </tr>
    <tr>
        <td class="td_left">登陆次数</td>
        <td><?php echo $loginCount ?></td>
        <td><?php echo $loginCountMax ?></td>
    </tr>
    <tr>
        <td class="td_left">玩了次数</td>
        <td><?php echo $requestCount ?></td>
        <td><?php echo $requestCountMax ?></td>
    </tr>
    <tr>
        <td class="td_left">分享总次数</td>
        <td><?php echo $shareCount ?></td>
        <td><?php echo $shareCountMax ?></td>
    </tr>
    <tr>
        <td class="td_left">分享微信朋友</td>
        <td><?php echo $shareCountFriend ?></td>
        <td><?php echo $shareCountFriendMax ?></td>
    </tr>
    <tr>
        <td class="td_left">分享微信朋友圈</td>
        <td><?php echo $shareCountTimeline ?></td>
        <td><?php echo $shareCountTimelineMax ?></td>
    </tr>
    <tr>
        <td class="td_left">windows</td>
        <td><?php echo $window ?></td>
        <td><?php echo $windowMax ?></td>
    </tr>
    <tr>
        <td class="td_left">mac</td>
        <td><?php echo $mac ?></td>
        <td><?php echo $macMax ?></td>
    </tr>
    <tr>
        <td class="td_left">iPad</td>
        <td><?php echo $iPad ?></td>
        <td><?php echo $iPadMax ?></td>
    </tr>
    <tr>
        <td class="td_left">iPhone</td>
        <td><?php echo $iPhone ?></td>
        <td><?php echo $iPhoneMax ?></td>
    </tr>
    <tr>
        <td class="td_left">iPod</td>
        <td><?php echo $iPod ?></td>
        <td><?php echo $iPodMax ?></td>
    </tr>
    <tr>
        <td class="td_left">ios</td>
        <td><?php echo $ios ?></td>
        <td><?php echo $iosMax ?></td>
    </tr>
    <tr>
        <td class="td_left">android</td>
        <td><?php echo $android ?></td>
        <td><?php echo $androidMax ?></td>
    </tr>
    <tr>
        <td class="td_left">blackberry</td>
        <td><?php echo $blackberry ?></td>
        <td><?php echo $blackberryMax ?></td>
    </tr>
    <tr>
        <td class="td_left">tv</td>
        <td><?php echo $tv ?></td>
        <td><?php echo $tvMax ?></td>
    </tr>
    <tr>
        <td class="td_left">微信</td>
        <td><?php echo $weixin ?></td>
        <td><?php echo $weixinMax ?></td>
    </tr>
    <tr>
        <td class="td_left">chrome</td>
        <td><?php echo $chrome ?></td>
        <td><?php echo $chromeMax ?></td>
    </tr>
    <tr>
        <td class="td_left">firefox</td>
        <td><?php echo $firefox ?></td>
        <td><?php echo $firefoxMax ?></td>
    </tr>
    <tr>
        <td class="td_left">opera</td>
        <td><?php echo $opera ?></td>
        <td><?php echo $operaMax ?></td>
    </tr>
    <tr>
        <td class="td_left">ie</td>
        <td><?php echo $ie ?></td>
        <td><?php echo $ieMax ?></td>
    </tr>
    <tr>
        <td class="td_left">ie6</td>
        <td><?php echo $ie6 ?></td>
        <td><?php echo $ie6Max ?></td>
    </tr>
    <tr>
        <td class="td_left">ie7</td>
        <td><?php echo $ie7 ?></td>
        <td><?php echo $ie7Max ?></td>
    </tr>
    <tr>
        <td class="td_left">ie8</td>
        <td><?php echo $ie8 ?></td>
        <td><?php echo $ie8Max ?></td>
    </tr>
    <tr>
        <td class="td_left">ie9</td>
        <td><?php echo $ie9 ?></td>
        <td><?php echo $ie9Max ?></td>
    </tr>
    <tr>
        <td class="td_left">ie其他</td>
        <td><?php echo $ieother ?></td>
        <td><?php echo $ieotherMax ?></td>
    </tr>

</table>