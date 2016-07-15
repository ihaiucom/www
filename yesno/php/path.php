<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-19
 * Time: 下午2:55
 */

$WEB_DIR_NAME = "/yesno_dev-v1.1/";
if(!strpos(__FILE__, "yesno"))
{

    $WEB_DIR_NAME = "/";
}

$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$WEB_ROOT = $DOCUMENT_ROOT.$WEB_DIR_NAME;
$ASSETS =$WEB_ROOT."assets/";
$ASSETS_FLAUNT =$ASSETS."flaunt/";
$ASSETS_HEAD =$ASSETS."head/";
$ASSETS_FONT = $ASSETS."font/";

$FONT_STXINGKA = $ASSETS_FONT."STXINGKA.ttf";
$FONT_Yuanti = $ASSETS_FONT."Yuanti.ttc";

$HOST =  $_SERVER['HTTP_HOST'];
$URL_ROOT = "http://" . $HOST .$WEB_DIR_NAME;
$URL_ASSETS = $URL_ROOT."assets/";
$URL_ASSETS_FLAUNT = $URL_ASSETS."flaunt/";



?>