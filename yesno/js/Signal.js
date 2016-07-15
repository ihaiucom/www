/**
 * Created by zengfeng on 14-9-29.
 */
this.zf = this.zf || {};

(function(){
    var Signal = function()
    {
        this._callList = [];
    };

    var p = Signal.prototype;
    p._callList = [];



    p.add = function(fun)
    {
        if (fun == null) return;
        var index = this._callList.indexOf(fun);
        if (index == -1)
        {
            this._runLength += 1;
            this._callList.push(fun);
        }
    };



    p.remove = function(fun)
    {
        if (fun == null) return;
        var index = this._callList.indexOf(fun);
        if (index != -1)
        {
            if (index <= this._runIndex)
            {
                this._runIndex -= 1;
                this._runLength -= 1;
            }
            else
            {
                this._runLength -= 1;
            }
            this._callList.splice(index, 1);
        }
    }

    p.clear = function()
    {
        while (this._callList.length > 0)
        {
            this._callList.pop();
        }
    };



    p.dispatch = function(args)
    {
        this.runCallList(args);
    };


    p._runIndex = 0;
    p._runLength = 0;
    p._runing = false;

    p.runCallList = function(args)
    {
        this._runing = true;
        this._runLength = this._callList.length;
        for (this._runIndex = 0; this._runIndex < this._runLength; this._runIndex++)
        {
            var fun = this._callList[this._runIndex];
            if(args)
            {
                fun(args);
            }
            else
            {
                fun();
            }
        }
        this._runing = false;
    };

    zf.Signal = Signal;
}());