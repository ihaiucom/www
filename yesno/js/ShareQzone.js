/**
 * Created by zengfeng on 14-10-20.
 */
<script type="text/javascript">
(function(){
    var p = {
    url:get_share_lineLink(),
    showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
    desc:get_share_descContent(),/*默认分享理由(可选)*/
    summary:'',/*分享摘要(可选)*/
    title:get_share_shareTitle(),/*分享标题(可选)*/
    site:'微朋佳游',/*分享来源 如：腾讯网(可选)*/
    pics:get_share_imgUrl(), /*分享图片的路径(可选)*/
    style:'203',
    width:98,
    height:22
    };
var s = [];
for(var i in p){
    s.push(i + '=' + encodeURIComponent(p[i]||''));
    }
document.write(['<a version="1.0" class="qzOpenerDiv" href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',s.join('&'),'" target="_blank">分享</a>'].join(''));
})();
</script>
<script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>