var richflag = true;
function preload() {
    if (richflag) {
        Array.prototype.remove = function (g) {
            for (var f = 0; f < this.length; f++) {
                if (this[f] == g) {
                    this.splice(f, 1)
                }
            }
        };
        function a(f, g) {
            var h = f.length;
            $(f).each(function () {
                var j = this;
                $("<img/>").attr("src", j).load(function () {
                    f.remove(j);
                    g(h, h - f.length)
                })
            })
        }

        var b = 0;
        var e = 0;
        a(["http://kenjiendo.com/testsite/wp-content/themes/kenjiendo_v2/img/kenjiendo2.png", "http://kenjiendo.com/testsite/wp-content/themes/kenjiendo_v2/img/main.jpg"], function (g, f) {
            b = Math.ceil(100 * f / g)
        });
        var d = window.setInterval(function () {
            if (e >= 100) {
                window.clearInterval(d);
                $("body").removeClass("preload");
                console.log("Images loaded");
                $(".preloadbar").fadeOut();
                /*setTimeout(function() {
                 $(".firstload").remove()
                 }, 1000);
                 setTimeout(function() {
                 setdraw_t();
                 if (getUA() === "chrome" || getUA() === "firefox") {
                 if (canvas_flag_audio) {
                 setupWebAudio();
                 draw();
                 time()
                 }
                 } else {
                 draw_roundy()
                 }
                 }, 500);
                 if (getUA() === "firefox") {
                 } else {
                 int_draw_t = setInterval(function() {
                 draw_t()
                 }, intval)
                 }
                 setupParticles()*/
            } else {
                if (e < b) {
                    e++;
                    $(".preloadbar").css({width: e + "%"})
                }
            }
        }, 10)
    } else {
        $(window).on("load", function () {
            $("body").removeClass("preload");
            $(".firstload").fadeOut("400");
            setTimeout(function () {
                setdraw_t();
                if (getUA() === "chrome" || getUA() === "firefox") {
                    if (canvas_flag_audio) {
                        setupWebAudio();
                        draw();
                        time()
                    }
                } else {
                    draw_roundy()
                }
            }, 500);
            if (getUA() === "firefox") {
            } else {
                int_draw_t = setInterval(function () {
                    draw_t()
                }, intval)
            }
            setupParticles()
        })
    }
}