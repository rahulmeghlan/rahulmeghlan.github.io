/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 1/6/15
 * Time: 9:55 PM
 * To change this template use File | Settings | File Templates.
 */
(function (namespace) {
    var audioNS = {};
    audioNS.init = function () {
        this.play();
    };

    audioNS.play = function () {
//        $("#sound").play();
    };

    namespace.audio = audioNS;

})(app)