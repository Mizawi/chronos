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

    $("#logoutbtn").click(() => {
        $.ajax({
            url: "/logout",
            type: "get",
        }).done(window.location.assign('/'))
    });

    $("#close-sidebar").click(function() {
        $(".page-wrapper").removeClass("toggled");
    });

    $("#show-sidebar").click(function() {
        $(".page-wrapper").addClass("toggled");
    });

    $("#dashboard-button").click(() => {
        $(".search-admin-bar").hide();
        $(".settings-admin-div").hide();

        $.ajax({
            url: "/searchAll",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                content = '<h1 id="query-table-answer">FETCH DASHBOARD</h1>'
                $('#query_table').append(content);
            }
        })
    });

    $("#settingsbutton").click(() => {
        $(".search-admin-bar").hide();
        $(".settings-admin-div").show();

        $('#query-table-answer').remove();
        $('#messagesettings').remove();
    });

    $("#savesettings-button").click(() => {
        $(".search-admin-bar").hide();
        $('#messagesettings').remove();

        $.ajax({
            url: "/adminSettings",
            type: "get",
            dataType: "json",
            success: (data) => {
                const theme = document.getElementById("themeselector").value;
                const timezone = document.getElementById("timezoneselector").value;
                document.cookie = "timezone=" + timezone + ";";
                document.cookie = "theme=" + theme + ";";

                content = "<p id='messagesettings'>" + data.status + "</p>";
                $('#query_table').append(content);

                if (theme === "darktheme") {
                    $(".container-admin100").css("background", "#444a55");
                } else {
                    $(".container-admin100").css("background", "linear-gradient(-135deg, #037009, #12bb03)");
                }

            }
        })
    });

    $("#searchAll").click(() => {
        $(".search-admin-bar").hide();
        $(".settings-admin-div").hide();

        $.ajax({
            url: "/searchAll",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th>Name </th> <th>Email</th></tr></thead>"
                data.forEach(datai => {
                    datai.forEach(item => {
                        const info = JSON.parse(item.information);
                        content += '<tr><td>' + info.nome + '</td>' + '<td>' + item.email + '<td>' + '</tr>'
                    })
                });
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });

    $("#searchStudents").click(() => {
        $(".search-admin-bar").show();
        $(".settings-admin-div").hide();

        $.ajax({
            url: "/searchStudent",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>Name </th> <th scope='col'> Email </th></tr></thead>"
                data.forEach(item => {
                    const info = JSON.parse(item.information);
                    content += '<tr><td>' + info.nome + '</td>' + '<td>' + item.email + '<td>' + '</tr>'
                });
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });



    $("#searchTeachers").click(() => {
        $(".search-admin-bar").hide();
        $(".settings-admin-div").hide();

        $.ajax({
            url: "/searchTeacher",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>Name </th> <th scope='col'> Email </th></tr></thead>"
                data.forEach(item => {
                    const info = JSON.parse(item.information);
                    content += '<tr><td>' + info.nome + '</td>' + '<td>' + item.email + '<td>' + '</tr>'
                });
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });

    const generalInput = document.getElementById("generalInput");
    // Execute a function when the user releases a key on the keyboard
    generalInput.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();

            valor_a_pesquisar = document.getElementById("generalInput").value
            $("#generalInput").val('');

            $.ajax({
                url: "/searchByEmailOrNumber",
                type: "get",
                dataType: "json",
                data: { texto_pesquisa: valor_a_pesquisar },
                success: (data) => {
                    $('#messagesettings').remove();
                    $('#query-table-answer').remove();

                    let datainfo;
                    data[0].length > 0 ? datainfo = data[0][0] : datainfo = data[1][0];

                    if (datainfo) {
                        const info = JSON.parse(datainfo.information);
                        let content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>INFORMATION </th></tr></thead>";
                        content += "<thead class='table-info' > <tr><th scope='col'>Name </th></tr></thead>"
                        content += '<tr><td>' + info.nome + '<td></tr>';
                        content += "<thead class='table-info' > <tr><th scope='col'>Birthday </th></tr></thead>"
                        content += '<tr><td>' + info.dataNascimento + '<td></tr>';
                        content += "<thead class='table-info' > <tr><th scope='col'>Id </th></tr></thead>"
                        content += '<tr><td>' + info.documentoDeIdentificacao + '<td></tr>';
                        content += "<thead class='table-info' > <tr><th scope='col'>Number </th></tr></thead>"
                        content += '<tr><td>' + info.numero + '<td></tr>';
                        content += "<thead class='table-info' > <tr><th scope='col'>Role </th></tr></thead>"
                        content += '<tr><td>' + info.cargo + '<td></tr>';
                        content += "</table>";
                        $('#query_table').append(content);
                    } else {
                        let content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>INFORMATION </th></tr></thead>";
                        content += '<tr><td>' + "There isn't such user with this information" + '<td></tr>';
                        content += "</table>";
                        $('#query_table').append(content);
                    }
                }
            })
        }
    });

    $("#getLogs").click(() => {
        $(".search-admin-bar").hide();
        $(".settings-admin-div").hide();

        $.ajax({
            url: "/getLogs",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th>User</th> <th>Timestamp</th> </tr> </thead>"
                for (key in data) {
                    content += '<tr><td>' + data[key].user + '</td>' + '<td>' + data[key].timestamp + '<td>' + '</tr>'
                }
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });
});

$(document).ready(() => {
    function getCookie(cname) {
        const name = cname + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    if (getCookie("theme") === "darktheme") {
        $(".container-admin100").css("background", "#444a55");
    } else {
        $(".container-admin100").css("background", "linear-gradient(-135deg, #037009, #12bb03)");
    }

    $(".search-admin-bar").hide();
    $(".settings-admin-div").hide();

    $.ajax({
        url: "/searchAll",
        type: "get",
        dataType: "json",
        success: (data) => {
            $('#messagesettings').remove();
            $('#query-table-answer').remove();
            content = '<h1 id="query-table-answer">FETCH INITIAL DASHBOARD</h1>'
            $('#query_table').append(content);
        }
    })
})