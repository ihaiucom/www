/**
 * Created by zengfeng on 14-10-3.
 */
this.zf = this.zf || {};

(function(){
    var Sound = function()
    {

    };

    zf.Sound = Sound;

}());


(function(){
    zf.Sound.sfx_time_out = "sfx_time_out";
    zf.Sound.sfx_menu_first_symbol = "sfx_menu_first_symbol";
    zf.Sound.sfx_timer_flip = "sfx_timer_flip";
    zf.Sound.sfx_go = "sfx_go";
    zf.Sound.sfx_new_record = "sfx_new_record";
    zf.Sound.sfx_menu_go = "sfx_menu_go";
    zf.Sound.sfx_menu_button = "sfx_menu_button";
    zf.Sound.sfx_fail = "sfx_fail";
    zf.Sound.sfx_correct = "sfx_correct";
    zf.Sound.sfx_symbol_tear = "sfx_symbol_tear";
    zf.Sound.sfx_correct_ten_in_a_row = "sfx_correct_ten_in_a_row";


    zf.Sound.play = function(audioID)
    {
//        if(zf.BrowserDetect.enableMusic)
//        {
//            createjs.Sound.play(audioID);
//        }


//        createjs.Sound.play(audioID, createjs.Sound.INTERRUPT_ANY);

//        createjs.Sound.play(audioID, {interrupt:createjs.Sound.INTERRUPT_NONE, loop:-1, volume:0.4});
//        createjs.Sound.play(audioID, {interrupt: createjs.Sound.INTERUPT_LATE, offset:0.8});
//        var audio =  document.getElementById(audioID);
//        audio.currentTime = 0.01;
//        audio.play();
    };

}());

