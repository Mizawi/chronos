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
        $('#query_table_schedule').hide();
        $('#query_subject_enroll').hide();

        $.ajax({
            url: "/student-profile",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('.container-profile').remove();
                var info = JSON.parse(data[0].information)
                content = '<div class="show container-profile"> ++<div class="container-profile-icon"> <h5>Informação Principal</h5><br> <div class="container-profile-icon-image"><img src="images/user.jpg" alt="User picture"> </div><div class="container-profile-icon-info"><p>Nome:' +
                    info.nome + '</p><p>Cargo:' +
                    info.cargo + '</p><p>Numero:' +
                    info.numero + '</p><p>Email:' +
                    data[0].email + '</p></div></div><div class="container-profile-maininfo"><h5> Contactos e Disponibilização de Informação </h4><br><p> Nome de Utilizador: ' +
                    info.nomeUtilizador + '</p><p> Morada[Pessoal]: ' +
                    info.morada + ' </p><p> Email[Pessoal]: ' +
                    info.emailp + ' </p><p> Email[Institucional]: ' +
                    data[0].email + '</p></div><div class="container-profile-personaldata"><h5>Dados Pessoais</h5><br><p> Nomes Próprios: ' +
                    info.nome.split(" ")[0] + ' ' + info.nome.split(" ")[1] + ' </p><p> Apelidos: ' +
                    info.nome.split(" ")[info.nome.split(" ").length - 1] + ' </p><p> Sexo: ' +
                    info.sexo + ' </p><p> Nº Documento de Identificação: ' +
                    info.documentoDeIdentificacao + ' </p><p> Local de Emissão: ' +
                    info.localdeEmissao + ' </p><p> Emitido em: ' +
                    info.emitidoEm + ' </p><p> Válido até: ' +
                    info.valido + '</p><p> Nº de Contribuinte: ' +
                    info.contribuinte + '</p><p> Profissão: ' +
                    info.profissao + ' </p><p> Estado Civil: ' +
                    info.estadoCivil + ' </p><p> Data de Nascimento: ' +
                    info.dataNascimento + ' </p><p> Nacionalidade: ' +
                    info.nacionalidade + ' </p><p> Freguesia de Nascimento: ' +
                    info.freguesiaNascimento + ' </p><p> Concelho de Nascimento: ' +
                    info.concelhoNascimento + ' </p><p> Distrito de Nascimento: ' +
                    info.distritoNascimento + '</p></div></div>'
                $('#query_table_profile').append(content);

            }
        });
    });
    $("#dashboard-button").click(() => {
        $(".container-profile").hide();
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
        $(".container-profile").hide();
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
        $(".container-profile").hide();
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
        $(".container-profile").hide();
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

$(document).ready(() => {
    $(".container-profile").hide();
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
})