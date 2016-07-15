/**
 * Created by zengfeng on 14-9-28.
 */
this.zf = this.zf || {};

(function(){
    var Color = function(rgba)
    {
        this.initialize(rgba);
    };
    var p = Color.prototype;
    p.rgba = 0x000000FF;
    p.r = 0;
    p.g = 0;
    p.b = 0;
    p.a = 0xFF;

    p.initialize = function(rgba)
    {
        this.setColor32(rgba);
    };

    p.setColor32 = function(rgba)
    {
        this.rgba = rgba;
        this.r = (rgba >> 24) & 0XFF ;
        this.g = (rgba >> 16) & 0xFF;
        this.b = (rgba >> 8) & 0xFF;
        this.a = rgba & 0xFF;
        return this;
    };

    p.setColor = function(rgb)
    {
        this.rgba = (rgb << 8) | 0xFF;
        this.r = (rgb >> 16) & 0xFF;
        this.g = (rgb >> 8) & 0xFF;
        this.b = rgb & 0xFF;
        this.a = 0xFF;
        return this;
    };

    p.setRGBA = function(r, g, b, a)
    {

        this.r = r & 0xFF;
        this.g = g & 0xFF;
        this.b = b & 0xFF;
        this.a = a & 0xFF;
        this.rgba = (a) | (b << 8) | (g << 16) | (r << 24);
        return this;
    };

    p.setRGB = function(r, g, b)
    {
        this.r = r & 0xFF;
        this.g = g & 0xFF;
        this.b = b & 0xFF;
        this.a = 0xFF;
        if(this.r < 0) this.r = 0;
        if(this.g < 0) this.g = 0;
        if(this.b < 0) this.b = 0;
        if(this.a < 0) this.a = 0;
        this.rgba = (this.a) | (b << 8) | (g << 16) | (r << 24);
        return this;
    };

    p.addRGBA = function(r, g, b, a)
    {
        this.r += r;
        this.g += g;
        this.b += b;
        this.a += a;
        return this.update();
    };

    p.addRGB = function(r, g, b)
    {
        this.r += r;
        this.g += g;
        this.b += b;
        return this.update();
    };

    p.update = function()
    {
        return this.setRGBA(this.r, this.g, this.b, this.a);
    };


    p.setR = function(r)
    {
        this.setRGBA(r, this.g, this.b, this.a);
        return this;
    };

    p.setG = function(g)
    {
        this.setRGBA(this.r, g, this.b, this.a);
        return this;
    };

    p.setB = function(b)
    {
        this.setRGBA(this.r, this.g, b, this.a);
        return this;
    };

    p.setA = function(a)
    {
        this.setRGBA(this.r, this.g, this.b, a);
        return this;
    };

    p.setAlpha = function(alpha)
    {
        this.setRGBA(this.r, this.g, this.b, parseInt(alpha * 0xFF));
        return this;
    };


    p.getRGB = function()
    {
        return (this.rgba >> 8);
    };

    p.getRGBA = function()
    {
        return this.rgba;
    };


    p.getRGB_css = function()
    {
        this.getRGB();
        return "#" + this.getRGB().toString(16);
    };

    p.getRGBA_css = function()
    {
        return "#" + this.rgba.toString(16);
    };


    p.getRGB_str = function()
    {
        return "rgb("+this.r+", "+ this.g +", "+ this.b +")";
    };

    p.getRGBA_str = function()
    {
        return "rgba("+this.r+", "+ this.g +", "+ this.b +", "+this.getAlpha()+")";
    };

    p.getAlpha = function()
    {
        return (this.a / 0xFF);
    };


    p.random = function()
    {
        return this.setRGBA(parseInt(Math.random() * 0xFF), parseInt(Math.random() * 0xFF), parseInt(Math.random() * 0xFF), this.a);
    }


    p.randomRange = function(min, max)
    {
        var diff = max - min;
        return this.setRGBA(parseInt(Math.random() * diff + min), parseInt(Math.random() * diff + min), parseInt(Math.random() * diff + min), this.a);
    }

    p.clone = function()
    {
        return new Color(this.rgba);
    };

    p.toString = function()
    {
        return "[Color "+this.getRGBA_str()+"]";
    };

    zf.Color = Color;
}());

(function(){
    zf.Color.Random = function()
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.random() ;
        return color ;
    };


    zf.Color.RandomRange = function(min, max)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.randomRange(min, max);
        return color ;
    };

    zf.Color.Lerp = function(a, b, t)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.r = a.r + (b.r  - a.r) * t;
        color.g = a.g + (b.g  - a.g) * t;
        color.b = a.g + (b.b  - a.b) * t;
        color.a = a.a + (b.a  - a.a) * t;
        color.update();
        return color;
    };

    zf.Color.Lerp2 = function(a, b, t)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.r = a.r + (b.r * 2 - a.r) * t;
        color.g = a.g + (b.g * 2 - a.g) * t;
        color.b = a.g + (b.b * 2 - a.b) * t;
        color.a = a.a + (b.a * 2 - a.a) * t;
        color.update();
        return color;
    };

    zf.Color.Lerp3 = function(a, b, t)
    {
        var color = new zf.Color(0x7f7f7fFF);
        color.rgba = a.rgba + (b.rgba - a.rgba) * t;
        color.setColor32(color.rgba);
        return color;
    };

}());

