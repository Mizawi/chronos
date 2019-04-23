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
        var x = $(".container-profile");
        x.addClass('show');
        x.removeClass('hidden');

        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_subject_enroll').hide();

        $.ajax({
            url: "/student-profile",
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
        var x = $(".container-profile");
        x.removeClass('show');
        x.addClass('hidden');

        $('#query_table_dashboard').show();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_subject_enroll').hide();

        $.ajax({
            url: "/student-subject",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_dashboard_answer').remove();
                content = '<h1 id="query_table_dashboard_answer">FETCH DASHBOARD</h1>'
                $('#query_table_dashboard').append(content);
            }
        })
    });

    $("#subjects-button").click(() => {
        var x = $(".container-profile");
        x.removeClass('show');
        x.addClass('hidden');

        $('#query_table_dashboard').hide();
        $('#query_table_subjects').show();
        $('#query_table_schedule').hide();
        $('#query_subject_enroll').hide();

        $.ajax({
            url: "/student-subject",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_subjects_answer').remove();
                content = '<h1 id="query_table_subjects_answer">FETCH SUBJECTS</h1>'
                $('#query_table_subjects').append(content);
            }
        })
    });

    $("#schedule-button").click(() => {
        var x = $(".container-profile");
        x.removeClass('show');
        x.addClass('hidden');

        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').show();
        $('#query_subject_enroll').hide();

        $.ajax({
            url: "/student-schedule",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_schedule_answer').remove();
                content = '<h1 id="query_table_schedule_answer">FETCH SCHEDULE</h1>'
                $('#query_table_schedule').append(content);
            }
        })
    });

    $("#subject-enroll-button").click(() => {
        var x = $(".container-profile");
        x.removeClass('show');
        x.addClass('hidden');

        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_subject_enroll').show();

        $.ajax({
            url: "/subject-enroll",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_schedule_answer').remove();
                content = '<h1 id="query_table_schedule_answer">FETCH ENROLL</h1>'
                $('#query_subject_enroll').append(content);
            }
        })
    });

});

$(document).ready( ()=>{
    var x = $(".container-profile");
    x.removeClass('show');
    x.addClass('hidden');

    $('#query_table_dashboard').show();
    $('#query_table_subjects').hide();
    $('#query_table_schedule').hide();
    $('#query_subject_enroll').hide();

    $.ajax({
        url: "/student-subject",
        type: "get",
        dataType: "json",
        success: (data) => {
            $('#query_table_dashboard_answer').remove();
            content = '<h1 id="query_table_dashboard_answer">FETCH DASHBOARD</h1>'
            $('#query_table_dashboard').append(content);
        }
    })
} )