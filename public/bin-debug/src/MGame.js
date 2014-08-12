var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MGame = (function (_super) {
    __extends(MGame, _super);
    function MGame() {
        _super.call(this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    MGame.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.count = 8;
        this.maxcount = 5;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x808000, 0.5);
        topMask.graphics.drawRect(0, 0, this.stageW, this.stageH);
        topMask.graphics.endFill();
        topMask.width = this.stageW;
        topMask.height = this.stageH;
        this.addChild(topMask);

        this.piccontent = new egret.DisplayObjectContainer();
        this.piccontent.width = this.stageW;
        this.piccontent.height = this.stageH;
        this.addChild(this.piccontent);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/mresource.json", "resource/");
    };

    /**
    * 配置文件加载完成,开始预加载preload资源组。
    */
    MGame.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload", 1);
        RES.loadGroup("picload", 0);
    };

    /**
    * preload资源组加载完成
    */
    MGame.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "picload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };

    /**
    * preload资源组加载进度
    */
    MGame.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            //              alert(event.itemsLoaded);
            //              this.loadingView.setImage("loading");
        }
        if (event.groupName == "picload") {
            //              alert(event.itemsLoaded);
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
            this.loadingView.setImage("loading");
        }
    };

    /**
    * 创建游戏场景
    */
    MGame.prototype.createGameScene = function () {
        this.addPic();
        //          this.res1 = "pic3";
        //          this.res2 = "pic4";
        //          this.count = 8;
    };

    MGame.prototype.addPic = function () {
        var temp = this.count - 3;

        //         if(temp < 1)
        //           return;
        //150 300
        this.piccontent.removeChildren();

        var img = new egret.Bitmap();
        if (this.count - 3 >= 1)
            img.texture = RES.getRes("pic" + (this.count - 3));
        img.scaleX = 150 / img.width;
        img.scaleY = 300 / img.height;
        img.x = (this.stageW - 300 - 30) / 2.0;
        img.y = 100;
        this.piccontent.addChild(img);
        img.touchEnabled = true;
        img.name = "c";
        img.alpha = 0;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        //          if(!this.img2)
        var img2 = new egret.Bitmap();
        if (this.count - 2 >= 2)
            img2.texture = RES.getRes("pic" + (this.count - 2));
        img2.scaleX = 150 / img2.width;
        img2.scaleY = 300 / img2.height;
        img2.x = img.x + 150 + 30;
        img2.y = 100;
        img2.alpha = 0;
        this.piccontent.addChild(img2);
        img2.touchEnabled = true;
        img2.name = "d";
        img2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        //150 300
        //          if(!this.img3)
        var img3 = new egret.Bitmap();
        img3.texture = RES.getRes("pic" + (this.count - 1));
        img3.scaleX = 150 / img3.width;
        img3.scaleY = 300 / img3.height;
        img3.x = (this.stageW - 300 - 30) / 2.0;
        img3.y = 100;
        img3.name = "a";
        this.piccontent.addChild(img3);
        img3.touchEnabled = true;
        img3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        //          if(!this.img4)
        var img4 = new egret.Bitmap();
        img4.texture = RES.getRes("pic" + this.count);
        img4.scaleX = 150 / img4.width;
        img4.scaleY = 300 / img4.height;
        img4.x = img3.x + 150 + 30;
        img4.y = 100;
        img4.name = "b";
        this.piccontent.addChild(img4);
        img4.touchEnabled = true;
        img4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        this.count = this.count - 2;
    };

    MGame.prototype.onTouch = function (evt) {
        if (this.count < 2) {
            alert("game over！");
            this.count == -2;
            return;
        }
        if (this.count == -2)
            return;

        var imaga = this.piccontent.getChildByName("a");
        var imagb = this.piccontent.getChildByName("b");
        var imagc = this.piccontent.getChildByName("c");
        var imagd = this.piccontent.getChildByName("d");

        var distan = (this.stageW - 300 - 30) / 2.0;

        var twa = egret.Tween.get(imaga);
        twa.to({ x: -150 - distan, "alpha": 0 }, 1000);

        var twb = egret.Tween.get(imagb);
        twb.to({ x: imagb.x + 150 + distan, "alpha": 0 }, 1000);

        if (imagc) {
            imagc.y = imagc.y + 60;
            var twc = egret.Tween.get(imagc);
            var twc2 = egret.Tween.get(imagc);
            twc.to({ y: imagc.y - 60 }, 400);
            twc2.to({ "alpha": 1 }, 1000);
            //              twc.to({"alpha":1,y:imagc.y-60}, 1000 );
        }

        if (imagd) {
            imagd.y = imagd.y + 60;
            var twd = egret.Tween.get(imagd);
            var twd2 = egret.Tween.get(imagd);
            twd.to({ y: imagd.y - 60 }, 400);

            //              twd.to({"alpha":1,y:imagd.y-60}, 1000);
            twd2.to({ "alpha": 1 }, 1000);
        }

        twb.call(this.addPic, this);
    };
    return MGame;
})(egret.DisplayObjectContainer);
MGame.prototype.__class__ = "MGame";
