import { stringify } from "querystring";
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
                content = '<div class="show container-profile">'
                content += '<div class="container-profile-icon"><h5>Informação Principal</h5><br>'
                content += '<div class="container-profile-icon-image"><img src="images/user.jpg" alt="User picture"> </div><div class="container-profile-icon-info"><p>Nome:' +
                    info.nome + '</p><p>Cargo:' +
                    info.cargo + '</p><p>Numero:' +
                    info.numero + '</p><p>Email:' +
                    data[0].email + '</p></div></div>'
                content += '<div class="container-profile-maininfo"><h5> Contactos e Disponibilização de Informação </h4><br><p> Nome de Utilizador: ' +
                    info.nomeUtilizador + '</p><p> Morada[Pessoal]: ' +
                    info.morada + ' </p><p> Email[Pessoal]: ' +
                    info.emailp + ' </p><p> Email[Institucional]: ' +
                    data[0].email + '</p></div>'
                content += '<div class="container-profile-personaldata"><h5>Dados Pessoais</h5><br><p> Nomes Próprios: ' +
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
                    info.distritoNascimento + '</p></div>'
                content += '<div class="container-profile-form-btn"><button class="profile-edit-btn" id="edit-profile-button">Edit</button></div></div>'
                $('#query_table_profile').append(content);

            }
        });
    });

    $("#edit-profile-button").on('click', function() {
        $('.container-profile').remove();
        content = '<div class="show container-profile"><form method="POST" action="/student-edit-form"> <div class="container-profile-icon"> <h5>Informação Principal</h5><br>'
        content += '<div class="container-profile-icon-image"><img src="images/user.jpg" alt="User picture"> </div>'
        content += '<div class="container-profile-icon-info"><p>Nome:</p><p>Cargo:</p><p>Numero:</p><p>Email:</p></div></div>'
        content += '<div class="container-profile-maininfo"><h5> Contactos e Disponibilização de Informação </h4><br>'
        content += '<p> Nome de Utilizador: </p>'
        content += '<p> Morada[Pessoal]: <input type="text" name="morada"/> </p>'
        content += '<p> Email[Pessoal]: <input type="text" name="emailp"/>'
        content += '</p><p> Email[Institucional]: </p></div>'
        content += '<div class="container-profile-personaldata"><h5>Dados Pessoais</h5><br><p> Nomes Próprios: </p><p> Apelidos: </p><p> Sexo: </p>'
        content += '<p> Nº Documento de Identificação:<input type="text" name="documentoDeIdentificacao" /></p>'
        content += '<p> Local de Emissão: <input type="text" name="localDeEmissao" /> </p>'
        content += '<p>Emitido em: <input type="text" name="emitidoEm" /></p><p> Válido até: <input type="text" name="validoAte"/> </p>'
        content += '<p> Nº de Contribuinte: <input type="text" name="contribuinte"/></p><p> Profissão: <input type="text" name="profissao" /> </p>'
        content += '<p> Estado Civil: <input type="text" name="estadoCivil" /> </p>'
        content += '<p> Data de Nascimento:</p><p> Nacionalidade:  </p><p> Freguesia de Nascimento:  </p><p> Concelho de Nascimento:</p><p> Distrito de Nascimento:</p></div> '
        content += '<input type="submit"/></div></form></div></div>'
        $('#query_table_profile').append(content);

    });

    $("#dashboard-button").click(() => {
        $(".container-profile").hide();
        $('#query_table_dashboard').show();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_subject_enroll').hide();


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

    $("#logoutbtn").click(() => {
        $.ajax({
            url: "/logout",
            type: "get",
        }).done(window.location.assign('/'))
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
        $('#query_table_subject_enroll').show();

        $.ajax({
            url: "/subject-enroll",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_subject_enroll_answer').remove();
                content = ''
                for (i = 0; i < data.length; i++) {
                    turnos = JSON.parse(data[i].value)
                    content += '<div class="card" style="width: 18rem;">'
                    content += '<div class="card-body">'
                    content += '<h5>' + data[i].key + '</h5>'
                    for (c = 0; c < turnos.length; c++) {
                        if (turnos[c].key == "T") {
                            content += '<p class="card-text"> Teorica </p>'
                            content += '<p class="card-text"> ' + numberToDay(turnos[key][0]) + '</p>'
                            content += '<p class="card-text"> ' + addHours(turnos[key][1], '0' + turnos[key][2] + ':00') + '</p>'
                        }

                    }
                    content += '</div>'
                    content += '</div>'
                    content += '<br>'

                }
                $('#query_table_subject_enroll').append(content);
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
            var info = JSON.parse(data[0].cadeiras)
            content = '<div class="card-deck">'
            for (var key in info) {
                //var attrName = key; CHAVE
                //var attrValue = obj[key]; VALUE

                content += '<div class="card" style="width: 18rem;">'
                content += '<img class="card-img-top" src="images/base_cadeiras.png" alt="Card image cap">'
                content += '<div class="card-body">'
                content += '<h5 class="' + key + '">' + key + '</h5>'
                content += '<p class="card-text">BEM VINDO A ' + key + '</p>'
                content += '<a href="#" class="btn ' + key + '">Página Inicial</a>'
                content += '</div>'
                content += '</div>'
                content += '<br>'
            }
            content += '</div>'
            $('#query_table_dashboard').append(content);
        }
    })
})

function addHours(t, i) {
    h = Integer.parseInt(t[0] + t[1]);
    m = Integer.parseInt(t[3] + t[4]);
    i_h = Integer.parseInt(i[0] + i[1]);
    i_m = Integer.parseInt(i[3] + i[4]);

    f_h = h + i_h;
    f_m = m + i_m;
    return stringify(f_h + ':' + f_m);
}

function numberToDay(number) {

    switch (number) {
        case 2:
            return 'Segunda Feira'

        case 3:
            return 'Terça Feira'

        case 4:
            return 'Quarta Feira'

        case 5:
            return 'Quinta-feira'
        case 6:
            return 'Sexta-feira'
    }
}