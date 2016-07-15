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
<table>
    <tr>
        <th width="200">ip</th>
        <th width="200">city</th>
    </tr>
<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-31
 * Time: 上午8:29
 */

include "./db.php";



$sql = "SELECT ip, city FROM $table";
$result = mysql_query($sql);
while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {

    $ip = $row["ip"];
    $city = $row["city"];
    if(empty($city))
    {
        $city = getCity($ip);
        $sql = "UPDATE $table SET `city` = '$city' WHERE ip = '$ip'";
        $resultUpdate = mysql_query($sql);

    }

    echo("<tr>\n");
    echo("<td class='td_left'>\n");
    echo $ip;
    echo("</td>\n");

    echo("<td>\n");
    echo $city;
    echo("</td>\n");
    echo("</tr>\n");
}

mysql_free_result($result);

?>
</table>