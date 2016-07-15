/**
 * Created by zengfeng on 14-10-21.
 */

this.zf = this.zf || {};

(function(){
    var Msg = function()
    {
        this.view = null;
        this.timer = 0;
        this.fontSize = 20;
        var p = this;
        this.info = function(context, length)
        {
            if(this.view == null)
            {
                this.view = $("#msgDiv");
                this.fontSize = parseInt(zf.stageHeight * 0.05);
                this.view.css("font-size", this.fontSize + "px");
            }

            var view = this.view;
            if(!length) length =  context.length;
            var width = parseInt(this.fontSize *length * 0.8);
            if(width < 150) width = 150;
            if(width > zf.stageWidth * 0.8) width = zf.stageWidth * 0.8;
            view.width(width);
            view.css("left", parseInt((zf.stageWidth - width) * 0.5) + "px");


            view.html(context);
            view.css("top", parseInt(zf.stageHeight * 0.5) + "px");
            clearTimeout(p.timer);
//            view.stop();
            view.show();
            view.animate({top: parseInt(zf.stageHeight * 0.3) + "px"}, 500,
                function()
                {
                    p.timer = setTimeout(function()
                        {
                            view.animate({top:  "-50px"}, 300, function()
                            {
                                view.hide();
//                                view.css("top", parseInt(zf.stageHeight * 0.5) + "px");
                            })
                        },
                        1500
                    );
                }
            );
        };


    };

    zf.msg = new Msg();
}());