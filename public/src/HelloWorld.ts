class HelloWorld extends  egret.DisplayObjectContainer{

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    private  onAddToStage(event:egret.Event){
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");

//              egret.Profiler.getInstance().run();
//        console.log("Hello World!");

//        var img:egret.Bitmap = new egret.Bitmap();
//                img.texture = RES.getRes("bgImage");
//               this.addChild(img);

    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
//        if(event.groupName=="preload"){
//            this.stage.removeChild(this.loadingView);
//            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
//            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
//
//
//        }
        this.drawText();
        var img:egret.Bitmap = new egret.Bitmap();
        img.texture = RES.getRes("bgImage");
        img.x = 100;
        img.y = 100;
        img.width = 1000;
        img.height = 1000;
        img.touchEnabled = true;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.stage.addChild(img);
//        this.texture = RES.getRes("bgImage");
//        this.stage.getc.graphics.beginFill( 0x00ff00 );
//        this.graphics.drawRect(0, 0, 100, 100);
//        this.graphics.endFill();

    }

    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
//        if(event.groupName=="preload"){
//            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
//        }
    }

    private onTouch( evt:egret.TouchEvent )
     {
        this.txt.text += "\n点击了spr1";
     }
    //绘制文本
     private  txt:egret.TextField;
     private drawText():void
     {
         this.txt = new egret.TextField();
         this.txt.size = 12;
        this.txt.x = 250;
         this.txt.width = 200;
          this.txt.height = 200;
         this.txt.text = "事件文字";
         this.addChild( this.txt );
      }
}