/**
 * Created by zengfeng on 14-9-30.
 */
this.zf = this.zf || {};

(function(){
    var Button = function(spriteSheet, frameOrAnimation)
    {
        this.initialize(spriteSheet, frameOrAnimation);
    };

    var p = Button.prototype = new createjs.Sprite();
    p.Sprite_initialize = p.initialize;
    p.sprite = null;
    p.bitmap = null;
    p.filtersNormal = [];
    p.filtersOver = [];
    p.filtersDown = [];
    p._isOver = false;
    p._isPressed = false;
    p.initialize = function(spriteSheet, frameOrAnimation)
    {
        p.Sprite_initialize(spriteSheet, frameOrAnimation);
        p.cursor = "pointer";
        p.filtersOver = [new createjs.ColorMatrixFilter(new createjs.ColorMatrix().adjustBrightness(10))];
        p.filtersDown = [new createjs.ColorMatrixFilter(new createjs.ColorMatrix().adjustBrightness(-30))];
        p.addEventListener("rollover", p.onRollover);
        p.addEventListener("rollout", p.onRollout);
        p.addEventListener("mousedown", p.onMousedown);
        p.addEventListener("pressup", p.onPressup);
    };

    p.updateRender = function()
    {
        p.cache(0, 0, p.getBounds().width, p.getBounds().height);
    };

    p.onRollover = function(event)
    {
        p._isOver = true;
        p.filters = p._isPressed ? p.filtersDown : p.filtersOver;
        p.updateRender();
    };

    p.onRollout = function(event)
    {
        p._isOver = false;
        p.filters = this._isPressed ? this.filtersDown : this.filtersNormal;
        p.updateRender();
    };

    p.onMousedown = function(event)
    {
        p._isPressed = true;
        p.filters = p.filtersDown;
        p.updateRender();
    };

    p.onPressup = function(event)
    {
        p._isPressed = false;
        p.filters = p._isOver ? p.filtersOver : p.filtersNormal;
        p.updateRender();
    };


    p.toString = function()
    {
        return "[Button (name="+  this.name +")]";
    }
    zf.Button = Button;
}());