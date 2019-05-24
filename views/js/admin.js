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
        $(".createStudent-admin-div").show();
        $(".admin_table").hide();
        $('#messagesettings').remove();
    });

    $("#settingsbutton").click(() => {
        $(".search-admin-bar").hide();
        $(".settings-admin-div").show();
        $(".createStudent-admin-div").hide();

        $('#query-table-answer').remove();
        $('#messagesettings').remove();
    });

    $("#savesettings-button").click(() => {
        $(".search-admin-bar").hide();
        $('#messagesettings').remove();
        $(".createStudent-admin-div").hide();
        
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
        $(".createStudent-admin-div").hide();

        $.ajax({
            url: "/searchAll",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='admin_table' id='query-table-answer'>"
                content += "<thead class='' > <tr> <th> Name </th> <th> Email </th> </tr> </thead>"
                data.forEach(datai => {
                    datai.forEach(item => {
                        const info = JSON.parse(item.information);
                        content += '<tr><td>' + info.nome  + '</td>' + '<td>' + item.email + '</td>' + '</tr>'
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
        $(".createStudent-admin-div").hide();

        $.ajax({
            url: "/searchStudent",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='admin_table' id='query-table-answer'> <thead class='' > <tr><th >Name </th> <th> Email </th></tr></thead>"
                data.forEach(item => {
                    const info = JSON.parse(item.information);
                    content += '<tr><td>' + info.nome  + '</td>' + '<td>' + item.email + '</td>' + '</tr>'
                });
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });



    $("#searchTeachers").click(() => {
        $(".search-admin-bar").hide();
        $(".settings-admin-div").hide();
        $(".createStudent-admin-div").hide();

        $.ajax({
            url: "/searchTeacher",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='admin_table' id='query-table-answer'> <thead class='' > <tr><th >Name </th> <th> Email </th></tr></thead>"
                data.forEach(item => {
                    const info = JSON.parse(item.information);
                    content += '<tr><td>' + info.nome  + '</td>' + '<td>' + item.email + '</td>' + '</tr>'
                });
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });

    $("#criar_aluno").click(() => {
        var aluno_nome = $("#aluno_nome").val()
        var aluno_numero = $("#aluno_numero").val()
        $.ajax({
            url: "/adminCreateStudent",
            type: "post",
            data: {"aluno_nome": aluno_nome, "aluno_numero": aluno_numero },
            dataType: "json",
            success: (data) => {
                alert("ALUNO CRIADO");
                $("#aluno_numero").val(" ");
                $("#aluno_nome").val(" ");
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
            $(".createStudent-admin-div").hide();
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

                if(datainfo){
                    const info = JSON.parse(datainfo.information);
                    let content = "<table class='admin_table' id='query-table-answer'> <thead> <tr><th>INFORMATION </th></tr></thead>";
                    content += "<thead> <tr><th>Name </th></tr></thead>";
                    content += '<tr><td>' + info.nome + '</td></tr>';
                    content += "<thead> <tr><th>Birthday </th></tr></thead>";
                    content += '<tr><td>' + info.dataNascimento + '</td></tr>';
                    content += "<thead> <tr><th>Id </th></tr></thead>";
                    content += '<tr><td>' + info.documentoDeIdentificacao + '</td></tr>';
                    content += "<thead> <tr><th>Number </th></tr></thead>";
                    content += '<tr><td>' + info.numero + '</td></tr>';
                    content += "<thead> <tr><th>Role </th></tr></thead>";
                    content += '<tr><td>' + info.cargo + '</td></tr>';
                    content += "</table>";
                    $('#query_table').append(content);
                }else{
                    let content = "<table class='admin_table' id='query-table-answer'> <thead> <tr><th>INFORMATION </th></tr></thead>";
                    content += '<tr><td>' + "There isn't such user with this information" + '</td></tr>';
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
        $(".createStudent-admin-div").hide();

        $.ajax({
            url: "/getLogs",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                let content = "<table class='admin_table' id='query-table-answer'> <thead class='' > <tr><th>User</th> <th>Timestamp</th> </tr> </thead>"
                for (key in data) {                    
                    content += '<tr><td>' + data[key].user  + '</td>' + '<td>' + data[key].timestamp + '</td>' + '</tr>'
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

    $(".createStudent-admin-div").show();
    $(".admin_table").hide();
} )
