/**
 * Created by zengfeng on 14-9-27.
 */
this.zf = this.zf || {};

this.zf.Math = {

};

(function()
{
    zf.Math.radianPointX = function(radian, length, fromX)
    {
        return Math.cos(radian) * length + fromX ;
    };

    zf.Math.radianPointY = function(radian, length, fromY)
    {
        return Math.sin(radian) * length + fromY ;
    }



}());
