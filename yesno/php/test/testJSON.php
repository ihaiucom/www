<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-31
 * Time: 上午10:04
 */

$arr = array ('a'=>1,'b'=>2,'c'=>3,'d'=>4,'e'=>5);
$arr["rank"] = 55;
$arr["rankRate"] = 0.5;
echo json_encode($arr);


?>