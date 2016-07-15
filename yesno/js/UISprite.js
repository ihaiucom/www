/**
 * Created by zengfeng on 14-9-30.
 */
var UISprite = {};
UISprite.names = {};
UISprite.NAME_BTN_PLAY = "btn_play";
UISprite.spriteSheet = null;

UISprite.data = {
    "framerate":24,
    "images":["./assets/ui/ui.png"],
    "frames":[
        // x, y, width, height, imageIndex, regX, regY
        //btn_play
        [0, 0, 407, 172, 0, 0, 0]
    ],
    "animations":{
        btn_play:[0]
    }
};
