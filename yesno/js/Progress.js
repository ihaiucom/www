/**
 * Created by zengfeng on 14-10-3.
 */
this.zf = this.zf || {};

(function(){
    //扇形
    CanvasRenderingContext2D.prototype.sector = CanvasRenderingContext2D.prototype.sector || function (x, y, radius, sDeg, eDeg) {
        // 初始保存
        this.save();
        // 位移到目标点
        this.translate(x, y);
        this.beginPath();
        // 画出圆弧
        this.arc(0,0,radius,sDeg, eDeg);
        // 再次保存以备旋转
        this.save();
        // 旋转至起始角度
        this.rotate(eDeg);
        // 移动到终点，准备连接终点与圆心
        this.moveTo(radius,0);
        // 连接到圆心
        this.lineTo(0,0);
        // 还原
        this.restore();
        // 旋转至起点角度
        this.rotate(sDeg);
        // 从圆心连接到起点
        this.lineTo(radius,0);
        this.closePath();
        // 还原到最初保存的状态
        this.restore();
        return this;
    }


    var Progress = function(canvasName, radius, fillColor)
    {

        this.radius = radius;
        this.fillColor = fillColor;
        var canvas =  document.getElementById(canvasName);
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.color0 = new zf.Color(0xff8400FF);
        this.color1 = new zf.Color(0xff840033);
        var p = this;

        this.setProgress = function(val)
        {
//            var color = zf.Color.Lerp(p.color0, p.color1, val);
            var ctx = p.ctx;
            ctx.clearRect(0,0, p.width ,p.height);
//            ctx.shadowBlur=20;
//            ctx.shadowColor="black";
            ctx.fillStyle= p.fillColor;
            ctx.sector(p.width * 0.5,p.width * 0.5, p.radius,Math.PI * 2 * (1-val), 0 );
            ctx.fill();
        }
    };








    zf.Progress = Progress;
}());