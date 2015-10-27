/**
 * Created by rahul.meghlan on 9/9/2015.
 */
(function () {
    var stage,
        items = {},
        lastPos = 160;

    function init() {
        createStage();
        for (var i = 3; i <= 4; i++) {
            loadImage(i);
        }
//        createImage();
//        createShape();
//        stage.update();
    }

    function updateStage(item, i) {
        var isPressedUp = false;
        lastPos += lastPos;
        item.addEventListener("pressmove", function (e) {
            console.log("b");
            e.target.x = e.stageX - 97;
            e.target.y = e.stageY - 97;
            stage.update();
        });
        item.addEventListener("pressup", function (e) {
            console.log(e.target.y + " : " + e.stageY);
//            e.target.x = e.stageX;
//            e.target.y = e.stageY;
//            stage.update();
        });
        item.x = lastPos;
//        item.y = (10 * i);
        stage.addChild(item);
        stage.update();
    }

    /*function createImage(image) {
     var bitmap = new createjs.Bitmap(image);
     bitmap.image.onload = function () {
     bitmap.on("click", function (e) {
     debugger;
     });
     stage.addChild(bitmap);
     stage.update();
     };
     }*/

    function loadImage(i) {
        items["dragger" + i] =
            items["name" + i] = new createjs.LoadQueue();
        items["name" + i].addEventListener("fileload", function (e) {
            updateStage(new createjs.Bitmap(e.result), i);
        });
        items["name" + i].loadFile("images/flat-" + i + ".jpg");
    }

    function createStage() {
        stage = new createjs.Stage("demoCanvas");
        createjs.Touch.enable(stage);
    }

    function createShape() {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
        circle.x = 100;
        circle.y = 100;
        stage.addChild(circle);
    }

    myApp.init = init;

})(myApp = {});
