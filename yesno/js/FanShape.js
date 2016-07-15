/**
 * Created by zengfeng on 14-9-28.
 */
this.zf = this.zf || {};

(function(){

    var FanShape = function(gap,  graphics)
    {
        this.initialize(gap,  graphics);
    };

    var p = FanShape.prototype = new createjs.Shape();
    p.Shape_initialize = p.initialize;

    p.gap = Math.PI * 0.5;
    p.initialize = function(gap, color, graphics)
    {
        p.Shape_initialize(graphics);
        if(gap) this.gap = gap;

        this.doubleColor0 = zf.Color.RandomRange(0x55, 0xAA);
        this.doubleColor1 = zf.Color.RandomRange(0x55, 0xAA);
        this.doubleColor2 = zf.Color.RandomRange(0x55, 0xAA);
        this.doubleColor1.setAlpha(0.2);
        this.doubleStrokeColor0 =  this.doubleColor0.clone().addRGBA(-0x22, -0x22, -0x22, 0x66);
        this.doubleStrokeColor1 =  this.doubleColor1.clone().addRGBA(-0x22, -0x22, -0x22, 0x66);
        this.doubleStrokeColor2 =  this.doubleColor1.clone().addRGBA(-0x22, -0x22, -0x22, 0x66);
    };

    p.drawFan = function(x, y, r, sd, ed)
    {
        var g = this.graphics;
        g.lineTo(x, y);
        var gap = this.gap;
        for(var d = sd; d < ed;d += gap)
        {
            g.lineTo(zf.Math.radianPointX(d, r, x), zf.Math.radianPointY(d, r, y));
        }
        g.lineTo(zf.Math.radianPointX(ed, r, x), zf.Math.radianPointY(ed, r, y));
        g.lineTo(x, y);
    };

    p.drawFanColor = function(x, y, r, sd, ed, fillColor, thickness, caps, strokeColor)
    {
        var g = this.graphics;
        g.beginFill(fillColor);
        if(thickness > 0)
        {
            g.setStrokeStyle(thickness, caps);
            g.beginStroke(strokeColor);
        }

        this.drawFan(x, y, r, sd, ed);

        if(thickness > 0)
        {
            g.endStroke();
        }
        g.endFill();
    };

    p.doubleColor0 = null;
    p.doubleColor1 = null;
    p.doubleColor2 = null;
    p.doubleStrokeColor0 = null;
    p.doubleStrokeColor1 = null;
    p.doubleStrokeColor2 = null;
    p.doubleTag = -1;
    p.drawFanDouble = function(x, y, r, sd, ed, tag)
    {
        if(this.doubleTag != tag)
        {
            this.doubleTag = tag;
            this.doubleColor0 = this.doubleColor1.clone();
            this.doubleColor1 = this.doubleColor1.randomRange(0x22, 0xAA);
            this.doubleStrokeColor0 = this.doubleStrokeColor1;
            this.doubleStrokeColor1 =  this.doubleColor1.clone().addRGBA(-0x22, -0x22, -0x22, 0x66);
        }

        this.drawFanColor(x, y, r, 0, Math.PI * 2, this.doubleColor0.getRGBA_str(), 2, "round", this.doubleStrokeColor0.getRGBA_str());
        this.drawFanColor(x, y, r, sd, ed, this.doubleColor1.getRGBA_str(), 2, "round", this.doubleStrokeColor1.getRGBA_str());
    };

    p.drawFanDoubleLerp = function(x, y, r, sd, ed, tag)
    {
        if(this.doubleTag != tag)
        {
            this.doubleTag = tag;
            this.doubleColor2 = this.doubleColor0.clone();
            this.doubleColor0 = this.doubleColor1.clone();
            this.doubleColor1 = this.doubleColor1.randomRange(0x22, 0xAA);
            this.doubleStrokeColor2 = this.doubleStrokeColor0.clone();
            this.doubleStrokeColor0 = this.doubleStrokeColor1;
            this.doubleStrokeColor1 =  this.doubleColor1.clone().addRGBA(-0x22, -0x22, -0x22, 0x66);
        }



        if(this.doubleStrokeColor2.a > 1 || this.doubleColor2.a > 1)
        {
            this.doubleColor2.a = 51 * (Math.PI *2 -  Math.abs(ed - sd)) / ( Math.PI * 2);
            this.doubleColor2.update();

            this.doubleStrokeColor2.a = 918 * (Math.PI *2 -  Math.abs(ed - sd)) / (Math.PI * 2);
            this.doubleStrokeColor2.update();

            this.drawFanColor(x, y, r, 0, Math.PI * 2, this.doubleColor2.getRGBA_str(), 1, "round", this.doubleStrokeColor2.getRGBA_str());

        }
        this.drawFanColor(x, y, r, 0, Math.PI * 2, this.doubleColor0.getRGBA_str(), 2, "round", this.doubleStrokeColor0.getRGBA_str());
        this.drawFanColor(x, y, r, sd, ed, this.doubleColor1.getRGBA_str(), 2, "round", this.doubleStrokeColor1.getRGBA_str());
    };


    p.drawFanDoubleLerpColor = function(x, y, r, sd, ed, tag, c00, c01, s00, s01)
    {
        if(this.doubleTag != tag)
        {
            this.doubleTag = tag;
            if(tag % 2 == 0)
            {
                this.doubleColor2.setColor32(c01);
                this.doubleColor0.setColor32(c00);
                this.doubleColor1.setColor32(c01);
                this.doubleStrokeColor2.setColor32(s01);
                this.doubleStrokeColor0.setColor32(s00);
                this.doubleStrokeColor1.setColor32(s01);
            }
            else
            {
                this.doubleColor2.setColor32(c00);
                this.doubleColor0.setColor32(c01);
                this.doubleColor1.setColor32(c00);
                this.doubleStrokeColor2.setColor32(s00);
                this.doubleStrokeColor0.setColor32(s01);
                this.doubleStrokeColor1.setColor32(s00);
            }
        }



        if(this.doubleStrokeColor2.a > 1 || this.doubleColor2.a > 1)
        {
            this.doubleColor2.a = 127 * (Math.PI *2 -  Math.abs(ed - sd)) / ( Math.PI * 2);
            this.doubleColor2.update();

            this.doubleStrokeColor2.a = 255 * (Math.PI *2 -  Math.abs(ed - sd)) / (Math.PI * 2);
            this.doubleStrokeColor2.update();

            this.drawFanColor(x, y, r, 0, Math.PI * 2, this.doubleColor2.getRGBA_str(), 1, "round", this.doubleStrokeColor2.getRGBA_str());

        }
        this.drawFanColor(x, y, r, 0, Math.PI * 2, this.doubleColor0.getRGBA_str(), 2, "round", this.doubleStrokeColor0.getRGBA_str());
        this.drawFanColor(x, y, r, sd, ed, this.doubleColor1.getRGBA_str(), 2, "round", this.doubleStrokeColor1.getRGBA_str());
    };


    p.toString = function() {
        return "[FanShape (name="+  this.name +")]";
    };
    zf.FanShape = FanShape;
}());