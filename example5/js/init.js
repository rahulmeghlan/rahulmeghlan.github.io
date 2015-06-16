(function ($) {
    $(document).ready(function () {
        //Initialise the plugin on document-ready
        $('#tabs').easyResponsiveTabs({
            type: 'accordion', //Types: default, vertical, accordion
            activetab_bg: '#fedb00', // Active-BG-Color
            inactive_bg: '#fff', // Inactive-BG-Color
            width: 'auto', //auto or any width like 600px
            fit: true, // 100% fit in a container
            tabidentify: 'hor_1' // The tab groups identifier

        });
    });
})(jQuery);
