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

    $("#searchAll").click(() => {
        $.ajax({
            url: "/searchAll",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query-table-answer').remove();
                var text = "";
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th>Name </th> <th>Email</th></tr></thead>"
                for (key in data) {
                    console.log(data[key]);
                    
                    for (item in data[key]) {
                        var info = JSON.parse(item.information);
                        content += '<tr><td>' + info.nome  + '</td>' + '<td>' + data[key][item].email + '<td>' + '</tr>'
                    }
                }
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });

    $("#searchStudents").click(() => {
        $.ajax({
            url: "/searchStudent",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query-table-answer').remove();
                var text = "";
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>Name </th> <th scope='col'> Email </th></tr></thead>"
                for (key in data) {
                    content += '<tr><td>' + data[key].name  + '</td>' + '<td>' + data[key].email + '<td>' + '</tr>'
                }
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });

    $("#searchTeachers").click(() => {
        $.ajax({
            url: "/searchTeacher",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query-table-answer').remove();
                var text = "";
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>Name </th> <th scope='col'> Email </th></tr></thead>"
                for (key in data) {
                    content += '<tr><td>' + data[key].name  + '</td>' + '<td>' + data[key].email + '<td>' + '</tr>'
                }
                content += "</table>"
                $('#query_table').append(content);
            }
        })
    });

    $("#btnBusca").click(() => {

        valor_a_pesquisar = document.getElementById("txtBusca").value

        $.ajax({
            url: "/searchStudentsByEmailOrNumber",
            type: "get",
            dataType: "json",
            data: {texto_pesquisa:valor_a_pesquisar},
            success: (data) => {
                $('#query-table-answer').remove();
                var text = "";
                var info = JSON.parse(data[0].information);
                var content = "<table class='table table-sm table-dark' id='query-table-answer'> <thead class='table-info' > <tr><th scope='col'>INFORMAÇAO </th></tr></thead>";
                console.log(info);
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
            }
        })
    });
});