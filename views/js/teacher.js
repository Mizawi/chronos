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

    $("#profile-button").click(() => {
        $(".container-profile").show();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_requests').hide();

        $.ajax({
            url: "/teacher-profile",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_profile_answer').remove();
                content = '<h1 id="query_table_profile_answer">FETCH PROFILE INFO</h1>'
                $('#query_table_profile').append(content);
            }
        })
    });

    $("#dashboard-button").click(() => {
        $(".container-profile").hide();
        $('#query_table_dashboard').show();
        $('#query_table_subjects').hide();
        $('#query_table_requests').hide();


        $.ajax({
            url: "/teacher-dashboard",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_dashboard_answer').remove();
                content = '<h1 id="query_table_dashboard_answer">FETCH DASHBOARD</h1>'
                $('#query_table_dashboard').append(content);
            }
        })
    });

    $("#requests-button").click(() => {
        $(".container-profile").hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_requests').show();

        $.ajax({
            url: "/teacher-request",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_requests_answer').remove();
                content = '<h1 id="query_table_requests_answer">FETCH REQUESTS</h1>'
                $('#query_table_requests').append(content);
            }
        })
    });

    $("#subjects-button").click(() => {
        $(".container-profile").hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').show();
        $('#query_table_requests').hide();

        $.ajax({
            url: "/teacher-subject",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_subjects_answer').remove();
                content = '<h1 id="query_table_subjects_answer">FETCH SUBJECTS</h1>'
                $('#query_table_subjects').append(content);
            }
        })
    });

});

$(document).ready( ()=>{
    $(".container-profile").hide();
    $('#query_table_dashboard').show();
    $('#query_table_subjects').hide();
    $('#query_table_requests').hide();

    $.ajax({
        url: "/teacher-subject",
        type: "get",
        dataType: "json",
        success: (data) => {
            $('#query_table_dashboard_answer').remove();
            content = '<h1 id="query_table_dashboard_answer">FETCH INITIAL DASHBOARD</h1>'
            $('#query_table_dashboard').append(content);
        }
    })
} )