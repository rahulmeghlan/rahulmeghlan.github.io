/**
 * Created with JetBrains WebStorm.
 * User: rmeghl
 * Date: 1/6/15
 * Time: 9:48 PM
 * To change this template use File | Settings | File Templates.
 */
(function ($, namespace) {
    if (!$) {
        console.error(">>>>>>>>>> Running without jQuery");
    }

    console.log(namespace);
    preload();

})(typeof jQuery !== "undefined" ? jQuery : null, app);