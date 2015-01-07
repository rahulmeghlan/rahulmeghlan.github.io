/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 1/6/15
 * Time: 9:55 PM
 * To change this template use File | Settings | File Templates.
 */
(function (namespace) {
    var gridNS = {};
    gridNS.init = function () {
        this.bindEvents();
    };

    gridNS.bindEvents = function () {
        $("#mask").on("click", function () {
            toggleMenu();
        });
        $(".toggle").on("click", function () {
            toggleMenu();
        });
    };

    var toggleMenu = function () {
        var $panel = $("#panel"),
            $mask = $("#mask"),
            isVisible = parseInt($panel.css("opacity"));
        if (isVisible) {
            $panel.css({"opacity": 0, "visibility": "hidden"});
            $mask.hide();
        } else {
            $panel.css({"opacity": 1, "visibility": "visible"});
            $mask.show();
        }

    };

    namespace.grid = gridNS;

})(app)