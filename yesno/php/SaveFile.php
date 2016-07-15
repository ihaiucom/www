<?php
/**
 * Created by PhpStorm.
 * User: zengfeng
 * Date: 14-10-19
 * Time: 下午12:49
 */



/**
 * 保存文件
 *
 * @param string $fileName 文件名（含相对路径）
 * @param string $text 文件内容
 * @return boolean
 */
function saveFile($fileName, $text,  $mode = "w") {
    if (!$fileName || !$text)
        return false;
    if (makeDir(dirname($fileName))) {
        if ($fp = fopen($fileName, $mode)) {
            if (@fwrite($fp, $text)) {
                fclose($fp);
                return true;
            } else {
                fclose($fp);
                return false;
            }
        }
    }
    return false;
}

/**
 * 连续创建目录
 *
 * @param string $dir 目录字符串
 * @param int $mode 权限数字
 * @return boolean
 */
function makeDir($dir, $mode = "0777") {
    if (!$dir) return false;

    if(!file_exists($dir)) {
        return mkdir($dir,$mode,true);
    } else {
        return true;
    }

}
?>