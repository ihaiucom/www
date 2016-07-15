/**
 * Created by zengfeng on 14-9-27.
 */
this.zf = this.zf || {};
(function()
{
    var ViewClass = function(elementID) {
        this.initialize(elementID);
    };
    var p = ViewClass.prototype;
    p.view = null;

    p.initialize = function(elementID) {
        this.view = $("#"+elementID);
    };

    p.show = function()
    {
        this.view.show();
    };

    p.hide = function()
    {
        this.view.hide();
    };

    p.toString = function() {
        return "[View (name="+  this.name +")]";
    };

    zf.ViewClass = ViewClass;

}());