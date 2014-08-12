  class MGame extends  egret.DisplayObjectContainer{
      /**
       * 加载进度界面
       */
      private loadingView:LoadingUI;
      private stageW:number;
      private  stageH:number;
      private  count:number;
      private  maxcount:number;
      private  imgw:number;
      private  imgh:number;
      private  flag:boolean;
      private  res1:String;
      private  res2:String;
      private tipstext:egret.TextField;
//      private img:egret.Bitmap;
//      private img2:egret.Bitmap;
//      private img3:egret.Bitmap;
//      private img4:egret.Bitmap;
      private piccontent:egret.DisplayObjectContainer;
      private btnontent:egret.DisplayObjectContainer;


      public constructor() {
          super();

          this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
      }

      private onAddToStage(event:egret.Event){
          //设置加载进度界面
          this.loadingView  = new LoadingUI();
          this.stage.addChild(this.loadingView);

           this.stageW = this.stage.stageWidth;
           this.stageH = this.stage.stageHeight;
          this.flag = false;
          this.count = 8;
          this.maxcount = 5;
          var topMask:egret.Shape = new egret.Shape();
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

          this.btnontent = new egret.DisplayObjectContainer();
          this.btnontent.width = this.stageW;
          this.btnontent.height = this.stageH;
          this.addChild(this.btnontent);


          this.tipstext = new egret.TextField();
          this.addChild(this.tipstext);
          this.tipstext.y = 30;
          this.tipstext.x = this.stageW/2 -40;
          this.tipstext.text = "";
          this.tipstext.textAlign = "center";

          this.imgw = this.stageW/2 - 30;
          this.imgh = this.imgw * 2;

          //初始化Resource资源加载库
          RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
          RES.loadConfig("resource/mresource.json","resource/");

      }

      /**
       * 配置文件加载完成,开始预加载preload资源组。
       */
      private onConfigComplete(event:RES.ResourceEvent):void{
          RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
          RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
          RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
//          RES.loadGroup("preload",1);
          RES.loadGroup("picload");
      }

      /**
       * preload资源组加载完成
       */
      private onResourceLoadComplete(event:RES.ResourceEvent):void {
          if(event.groupName=="picload"){
              this.stage.removeChild(this.loadingView);
              RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
              RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
              this.createGameScene();
          }
      }
      /**
       * preload资源组加载进度
       */
      private onResourceProgress(event:RES.ResourceEvent):void {
          if(event.groupName=="preload"){
//              alert(event.itemsLoaded);
//              this.loadingView.setImage("loading");
          }
          if(event.groupName=="picload"){
//              alert(event.itemsLoaded);
              this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
              this.loadingView.setImage("loading");
          }
      }
      /**
       * 创建游戏场景
       */
      private createGameScene():void{
          //绘制一个透明度为1的绿色矩形，宽高为100*80
                 var spr1:egret.Sprite = new egret.Sprite();
                 spr1.graphics.beginFill(0x00ff00, 1);
                  spr1.graphics.drawRect(0, 0, this.stageW*0.16, this.stageW*0.16* 0.4);
                 spr1.width = this.stageW*0.16;
                 spr1.height = this.stageW*0.16* 0.4;
                spr1.y = 20;
                spr1.x = this.stageW - spr1.width - this.stageW*0.1;
                 spr1.graphics.endFill();

           var label:egret.TextField = new egret.TextField();
           this.addChild( label );
          label.width = this.stageW*0.16;
          label.height = this.stageW*0.16* 0.4;
          label.y = 20;
          label.x = this.stageW - spr1.width - this.stageW*0.1;
           label.text = "重新开始";
          label.size = 14;

//          label.verticalAlign = egret.VerticalAlign.CENTER;
          label.textAlign = egret.HorizontalAlign.CENTER;
//          label.verticalAlign = egret.verticalAlign.CENTER;
          this.btnontent.addChild( spr1 );
          this.btnontent.addChild( label );




          this.tipstext.text = "开始游戏";
          this.addPic();
          spr1.touchEnabled = true;
          spr1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.restart, this);

          this.btnontent.visible = false;
//          this.res1 = "pic3";
//          this.res2 = "pic4";
//          this.count = 8;
      }

      private addPic():void{

          var temp = this.count - 3;
//         if(temp < 1)
//           return;

         //150 300
          //210 420




          this.piccontent.removeChildren();


              var img:egret.Bitmap = new egret.Bitmap();
               if(this.count - 3 >= 1)
              img.texture =RES.getRes("pic"+(this.count - 3));
              img.scaleX =  this.imgw/ img.width;
              img.scaleY  =  this.imgh/ img.height;


              img.x = (this.stageW - this.imgw*2 - 30)/2.0;
              img.y = 100;
              this.piccontent.addChild( img);
              img.touchEnabled = true;
              img .name = "c";
              img.alpha = 0;
              img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

//          if(!this.img2)
              var  img2:egret.Bitmap  = new egret.Bitmap();
          if(this.count - 2 >= 2)
              img2.texture =RES.getRes("pic"+(this.count - 2));
              img2.scaleX =  this.imgw/ img2.width;
              img2.scaleY  =  this.imgh/ img2.height;
              img2.x =  img.x+this.imgw+30;
              img2.y = 100;
              img2.alpha = 0;

              this.piccontent.addChild( img2);
              img2.touchEnabled = true;
              img2 .name = "d";
              img2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);





          //150 300
          //210 420
//          if(!this.img3)
          var    img3:egret.Bitmap = new egret.Bitmap();
           img3.texture =RES.getRes("pic"+ (this.count - 1));
           img3.scaleX =  this.imgw/ img3.width;
            img3.scaleY  =  this.imgh/ img3.height;
           img3.x = (this.stageW - this.imgw*2 - 30)/2.0;
           img3.y = 100;
          img3.name = "a";
          this.piccontent.addChild( img3);
           img3.touchEnabled = true;
           img3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

//          if(!this.img4)
          var    img4:egret.Bitmap  = new egret.Bitmap();
           img4.texture =RES.getRes("pic"+this.count);
           img4.scaleX =  this.imgw/ img4.width;
           img4.scaleY  =  this.imgh/ img4.height;
          img4.x =  img3.x+this.imgw+30;
           img4.y = 100;
          img4.name = "b";
           this.piccontent.addChild( img4);
           img4.touchEnabled = true;
           img4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

          this.count = this.count - 2;


      }

      private onTouch( evt:egret.TouchEvent)
      {
          if(this.count < 2){
//              alert("game over！");
              this.tipstext.text = "游戏结束！";
              this.count == -2
              this.btnontent.visible = true;

              return;
          }
          if(this.count == -2 || this.flag)
              return;

          this.tipstext.text = "第"+(4-this.count/2)+"关";

          var imaga:egret.DisplayObject = this.piccontent.getChildByName( "a" );
          var imagb:egret.DisplayObject = this.piccontent.getChildByName( "b" );
          var imagc:egret.DisplayObject = this.piccontent.getChildByName( "c" );
          var imagd:egret.DisplayObject = this.piccontent.getChildByName( "d" );

          var distan = (this.stageW - this.imgw*2 - 30)/2.0;

          var twa = egret.Tween.get( imaga );
          twa.to( {x:-this.imgw-distan, "alpha":0}, 600 );


          var twb = egret.Tween.get( imagb );
           twb.to( {x:imagb.x+this.imgw+distan,"alpha":0}, 600 );

          if(imagc){
              imagc.y = imagc.y + 60;
              var twc = egret.Tween.get( imagc );
              var twc2 = egret.Tween.get( imagc );
              twc .to( {y:imagc.y-60}, 400 );
              twc2 .to({ "alpha":1}, 600);

//              twc.to({"alpha":1,y:imagc.y-60}, 1000 );

          }

          if(imagd){
              imagd.y = imagd.y + 60;
              var twd = egret.Tween.get( imagd );
              var twd2 = egret.Tween.get( imagd );
              twd.to( {y:imagd.y-60}, 400);
//              twd.to({"alpha":1,y:imagd.y-60}, 1000);
              twd2.to({ "alpha":1}, 600);

          }


              twb.call(this.addPic,this) ;

          twc2.call(this.change,this);
           this.flag = true;


      }

      private  change(){
          this.flag = false;
      }
      private restart() :void{
          this.tipstext.text = "开始游戏";
          this.btnontent.visible = false;
          this.count = 8;
          this.addPic();
     }
  }