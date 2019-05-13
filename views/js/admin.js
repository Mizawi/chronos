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

                content = "<p id='messagesettings'>"+data.status+"</p>";
                $('#query_table').append(content);
                
                if(theme==="darktheme"){
                    $(".container-admin100").css("background", "#444a55");
                }else{
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
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th>Name </th> <th>Email</th></tr></thead>"
                data.forEach(datai => {
                    datai.forEach(item => {
                        const info = JSON.parse(item.information);
                        content += '<tr><td>' + info.nome  + '</td>' + '<td>' + item.email + '<td>' + '</tr>'
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
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>Name </th> <th scope='col'> Email </th></tr></thead>"
                data.forEach(item => {
                    const info = JSON.parse(item.information);
                    content += '<tr><td>' + info.nome  + '</td>' + '<td>' + item.email + '<td>' + '</tr>'
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
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>Name </th> <th scope='col'> Email </th></tr></thead>"
                data.forEach(item => {
                    const info = JSON.parse(item.information);
                    content += '<tr><td>' + info.nome  + '</td>' + '<td>' + item.email + '<td>' + '</tr>'
                });
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });

    $("#btnBusca").click(() => {
        valor_a_pesquisar = document.getElementById("txtBusca").value
        $("#txtBusca").val('');

        $.ajax({
            url: "/searchStudentsByEmailOrNumber",
            type: "get",
            dataType: "json",
            data: {texto_pesquisa:valor_a_pesquisar},
            success: (data) => {
                $('#messagesettings').remove();
                $('#query-table-answer').remove();
                if(data[0]){
                    var info = JSON.parse(data[0].information);
                    var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>INFORMAÇAO </th></tr></thead>";
                    content += "<thead class='table-info' > <tr><th scope='col'>Nome </th></tr></thead>"
                    content += '<tr><td>' + info.nome + '<td></tr>';
                    content += "<thead class='table-info' > <tr><th scope='col'>Data Nascimento </th></tr></thead>"
                    content += '<tr><td>' + info.dataNascimento + '<td></tr>';
                    content += "<thead class='table-info' > <tr><th scope='col'>Documento Identificação </th></tr></thead>"
                    content += '<tr><td>' + info.documentoDeIdentificacao + '<td></tr>';
                    content += "<thead class='table-info' > <tr><th scope='col'>Numero </th></tr></thead>"
                    content += '<tr><td>' + info.numero + '<td></tr>';
                    content += "<thead class='table-info' > <tr><th scope='col'>Cargo </th></tr></thead>"
                    content += '<tr><td>' + info.cargo + '<td></tr>';
                    content += "</table>";
                    $('#query_table').append(content);
                }else{
                    var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>INFORMAÇAO </th></tr></thead>";
                    content += '<tr><td>' + "Não existe nenhum aluno que corresponda a esta pesquisa" + '<td></tr>';
                    content += "</table>";
                    $('#query_table').append(content);
                }
            }
        })
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
                var text = "";
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th>User</th> <th>Timestamp</th> </tr> </thead>"
                for (key in data) {                    
                    content += '<tr><td>' + data[key].user  + '</td>' + '<td>' + data[key].timestamp + '<td>' + '</tr>'
                }
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });
});

$(document).ready( ()=>{
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    if(getCookie("theme")==="darktheme"){
        $(".container-admin100").css("background", "#444a55");
    }else{
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
} )