jQuery(function($) {
    $(".sidebar-dropdown > a").click(function() {
        $(".sidebar-submenu").slideUp(200);
        if (
            $(this)
            .parent()
            .hasClass("active")
        ) {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .parent()
                .removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this)
                .next(".sidebar-submenu")
                .slideDown(200);
            $(this)
                .parent()
                .addClass("active");
        }
    });

    $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
    });

    $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
    });

    $("#profile-button").click(function() {
        var x = $(".container-profile");
        if (x.hasClass('hidden')) {
            x.removeClass('hidden');
            x.toggleClass('show');
        } else {
            x.removeClass('show');
            x.toggleClass('hidden');

        }
    });

    $("#subjects-button").click(function() {
        var x = $(".container-subjects");
        if (x.hasClass('hidden')) {
            x.removeClass('hidden');
            x.toggleClass('show');
        } else {
            x.removeClass('show');
            x.toggleClass('hidden');

        }
    });



});