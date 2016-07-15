/**
 * Created by zengfeng on 14-9-18.
 */
function Rect(n, color, lightColor, width, height)
{
    createjs.Shape.call(this);
    this._rectType = 0;
    this._width = width;
    this._height = height;

    this.setRectType = function(type)
    {
        this._rectType = type;
        switch (this._rectType)
        {
            case 0:
                this.setColor(color);
                break;
            case 1:
                this.setColor(lightColor);
                break;
        }
    }

    this.getRectType = function()
    {
        return this._rectType;
    }

    this.setColor = function(color)
    {
        this.graphics.beginFill(color);
        this.graphics.drawRoundRect(0, 0, this._width, this._height, 5);
        this.graphics.endFill();
    }

    this.setRectType(0);
}

Rect.prototype = new createjs.Shape();
