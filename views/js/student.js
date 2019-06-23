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
        $("#query_table_profile").show();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_table_subject_enroll').hide();
        $('#query_table_settings').hide();
        $('#query_table_pedido').hide();

        $('#messagesettings').remove();

        $.ajax({
            url: "/student-profile",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('.container-profile').remove();
                $('.container-profile-2').remove();

                var info = JSON.parse(data[0].information)
                content = '<div class="show container-profile">'

                content += '<div class="container-profile-icon"><h5>Informação Principal</h5><br>'
                content += '<div class="container-profile-icon-image"><img src="images/user.jpg" alt="User picture"> </div><div class="container-profile-icon-info"><p>Nome:    <p class="text-info-2">' +
                    info.nome + '</p></p><br><p>Cargo: <p class="text-info-2">' +
                    info.cargo + '</p></p><br><p>Numero: <p class="text-info-2">' +
                    info.numero + '</p></p><br><p>Email: <p class="text-info-2">' +
                    data[0].email + '</p></div></div>'

                content += '<div class="container-profile-maininfo"><h5> Contactos e Disponibilização de Informação </h4><br><p> Nome de Utilizador: <p class="text-info-2">' +
                    info.nomeUtilizador + '</p></p><br><p> Morada[Pessoal]: <p class="text-info-2">' +
                    info.morada + ' </p></p><br><p> Email[Pessoal]: <p class="text-info-2">' +
                    info.emailp + ' </p></p><br><p> Email[Institucional]: <p class="text-info-2">' +
                    data[0].email + '</p></p></div>'
                content += '</div>'

                content += '<div class="show container-profile-2">'
                content += '<div class="container-profile-personaldata"><h5>Dados Pessoais</h5><br><p> Nomes Próprios: <p class="text-info-2">' +
                    info.nome.split(" ")[0] + ' ' + info.nome.split(" ")[1] + '</p></p> <br><p> Apelidos: <p class="text-info-2">' +
                    info.nome.split(" ")[info.nome.split(" ").length - 1] + '</p> </p><br><p> Sexo: <p class="text-info-2">' +
                    info.sexo + '</p></p><br><p> Nº Documento de Identificação: <p class="text-info-2">' +
                    info.documentoDeIdentificacao + '</p></p><br><p> Local de Emissão: <p class="text-info-2">' +
                    info.localdeEmissao + '</p></p><br><p> Emitido em: <p class="text-info-2">' +
                    info.emitidoEm + '</p></p><br><p> Válido até: <p class="text-info-2">' +
                    info.valido + '</p></p><br><p> Nº de Contribuinte: <p class="text-info-2">' +
                    info.contribuinte + '</p></p><br><p> Profissão: <p class="text-info-2">' +
                    info.profissao + '</p></p><br><p> Estado Civil: <p class="text-info-2">' +
                    info.estadoCivil + '</p></p><br><p> Data de Nascimento: <p class="text-info-2">' +
                    info.dataNascimento + '</p></p><br><p> Nacionalidade: <p class="text-info-2">' +
                    info.nacionalidade + '</p></p><br><p> Freguesia de Nascimento: <p class="text-info-2">' +
                    info.freguesiaNascimento + '</p></p><br><p> Concelho de Nascimento: <p class="text-info-2">' +
                    info.concelhoNascimento + '</p></p><br><p> Distrito de Nascimento: <p class="text-info-2">' +
                    info.distritoNascimento + '</p></p></div>'
                content += '</div>'

                $('#query_table_profile').append(content);

            }
        });
    });


    $("#dashboard-button").click(() => {
        $(".container-profile").hide();
        $('.container-profile-2').hide();
        $('#query_table_dashboard').show();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_table_subject_enroll').hide();
        $('#query_table_settings').hide();
        $('#query_table_pedido').hide();


        $("#requestmsg").text('');
        $('#messagesettings').remove();

        initialFetch(0);

    });

    $("#logoutbtn").click(() => {
        $.ajax({
            url: "/logout",
            type: "get",
        }).done(window.location.assign('/'))
    });

    $("#schedule-button").click(() => {
        $(".container-profile").hide();
        $('.container-profile-2').hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').show();
        $('#query_table_subject_enroll').hide();
        $('#query_table_settings').hide();
        $('#query_table_pedido').hide();
        $('#messagesettings').remove();


        $.ajax({
            url: "/student-schedule",
            type: "get",
            dataType: "json",
            success: (data) => {
                var table = $('#schedule')
                for (subject in data) {
                    var i = 0
                    while (i != Object.keys(data[subject]).length) {
                        horario_subject = data[subject]
                        if (horario_subject[i].includes('T')) {

                            turno = horario_subject[i]
                            diaSemana = numberToDay(horario_subject[parseInt(i) + 1][0])
                            horaInicial = horario_subject[parseInt(i) + 1][1]
                            horaFinal = addHours(horaInicial, '0' + horario_subject[parseInt(i) + 1][2] + ':00')

                            console.log('Informacao: ' + turno, diaSemana, horaInicial, horaFinal)


                            $(document.getElementById(horaInicial)).find('td').each((x, el) => {
                                if (parseInt(el.id) == parseInt(horario_subject[parseInt(i) + 1][0])) {
                                    console.log(el)
                                    if (el.classList.contains('empty')) {
                                        el.classList.remove('empty')
                                        el.classList.add('full')
                                        el.append(subject + '   ' + '[' + turno + ']')
                                    }
                                }
                            })

                        } else if ((horario_subject[i][0]).includes('TP')) {

                            turno = horario_subject[i][0]
                            diaSemana = numberToDay(horario_subject[parseInt(i) + 1][0])
                            horaInicial = horario_subject[parseInt(i) + 1][1]
                            horaFinal = addHours(horaInicial, '0' + horario_subject[parseInt(i) + 1][2] + ':00')

                            console.log('Informacao: ' + turno, diaSemana, horaInicial, horaFinal)

                            $(document.getElementById(horaInicial)).find('td').each((x, el) => {
                                if (parseInt(el.id) == parseInt(horario_subject[parseInt(i) + 1][0])) {
                                    if (el.classList.contains('empty')) {
                                        el.classList.remove('empty')
                                        el.classList.add('full')
                                        el.append(subject + '   ' + '[' + turno + ']')
                                    }
                                }
                            })
                        }
                        i = i + 2
                    }
                }
            }


        })
    });

    $("#subject-enroll-button").click(() => {
        $(".container-profile").hide();
        $('.container-profile-2').hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_table_subject_enroll').show();
        $('#query_table_settings').hide();
        $('#query_table_pedido').hide();

        $('#messagesettings').remove();

        $.ajax({
            url: "/subject-enroll",
            type: "get",
            dataType: "json",
            success: (data) => {
                $('#query_table_subject_enroll_answer').remove();
                content = '<div class="card-deck" id="query_table_subject_enroll_answer">'
                for (i = 0; i < data.length; i++) {
                    turnos = JSON.parse(data[i].value)
                    content += '<div class="card card-enroll" id=' + data[i].key + ' style="width: 20rem;">'
                    content += '<div class="card-body">'
                    content += '<h3 class="w3-center">' + data[i].key + '</h3> <br>'
                    for (var t in turnos) {
                        content += '<a class="selectTurn" id=' + t + "_" + data[i].key + '>'
                        content += '<br><h3 class="w3-center" id="card-text">[' + t + '] </h3><h5 class="w3-center">' + numberToDay(turnos[t][0]) + '</h5>'
                        content += '<h5 class="card-text w3-center">' + turnos[t][1] + ' - ' + addHours(turnos[t][1], '0' + turnos[t][2] + ':00') + '</h5> <br>'
                        content += '<input class="btnTurn" id="btn' + t + "_" + data[i].key + '" type="button" onclick="changeClass(' + t + "_" + data[i].key + ')" value="Select"> </>'
                        content += '</a>'
                        content += '<br>'
                    }
                    content += '</div>'
                    content += '<input class="subject-enroll-submit-btn" id="submit-btn' + t + "_" + data[i].key + '" type="button" onclick="enroll(' + data[i].key + ')" value="Submit"> </>'
                    content += '</div>'
                    content += '<br>'

                }

                content += '</div>'
                $('#query_table_subject_enroll').append(content);
            }
        })

    });

    $("#settingsbutton").click(() => {
        $(".container-profile").hide();
        $('.container-profile-2').hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_table_subject_enroll').hide();
        $('#query_table_settings').show();
        $('#query_table_pedido').hide();

        $('#messagesettings').remove();
    });

    $("#savesettings-button").click(() => {
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
                $('#query_table_settings').append(content);

                if (theme === "darktheme") {
                    $(".container-student100").css("background", "rgb(140, 143, 148)");
                } else {
                    $(".container-student100").css("background", "linear-gradient(-135deg, #014483, #1B9CE5)");
                }

            }
        })
    });

    $("#changeButton").click(() => {
        $(".container-profile").hide();
        $('.container-profile-2').hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_schedule').hide();
        $('#query_table_subject_enroll').hide();
        $('#query_table_settings').hide();
        $('#query_table_pedido').show();
        $('#container-profile-2').hide();
        $("#requestmsg").text('');
        $('#messagesettings').remove();


        initialFetch(0);
    });

    $("#requestChange").click(() => {
        const cadeira = $("#mySubjects").val();
        const turnoin = $("#myClasses").val();
        const turnojoin = $("#joinClasses").val();

        $.ajax({
            url: "/studentRequest",
            type: "get",
            dataType: "json",
            data: {
                cadeira: cadeira,
                turnoin: turnoin,
                turnojoin: turnojoin
            },
            success: (data) => {
                if (data.code == 1) {
                    $("#requestmsg").text(data.msg);
                }
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

    $("#mySubjects").change(() => {
        initialFetch(1);
    });

    if (getCookie("theme") === "darktheme") {
        $(".container-student100").css("background", "rgb(140, 143, 148)");
    } else {
        $(".container-student100").css("background", "linear-gradient(-135deg, #014483, #1B9CE5)");
    }

    $(".container-profile").hide();
    $('#query_table_dashboard').show();
    $('#query_table_subjects').hide();
    $('#query_table_schedule').hide();
    $('#query_table_subject_enroll').hide();
    $('#query_table_settings').hide();
    $('#query_table_pedido').hide();
    $('.container-profile-2').hide();


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
                content += '<a class="btn ' + key + '">Página Inicial</a>'
                content += '</div>'
                content += '</div>'
                content += '<br>'
            }
            content += '</div>'
            $('#query_table_dashboard').append(content);
        }
    })

    initialFetch(0);
})

function addHours(t, i) {
    h = parseInt(t[0] + t[1]);
    m = parseInt(t[3] + t[4]);
    i_h = parseInt(i[0] + i[1]);
    i_m = parseInt(i[3] + i[4]);

    f_h = h + i_h;
    f_m = m + i_m;

    if (f_m == 30) {
        return f_h + ':' + f_m;
    } else {
        return f_h + ':' + f_m + '0';
    }

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
        case 7:
            return 'Sabado'
    }


}

function changeClass(s) {
    if (s.classList.contains('selectTurn')) {
        s.classList.remove('selectTurn');
        s.classList.add('selectedTurn');
        document.getElementById('btn' + s.id).value = "Unselect"

    } else if (s.classList.contains('selectedTurn')) {
        s.classList.remove('selectedTurn');
        s.classList.add('selectTurn');
        document.getElementById('btn' + s.id).value = "Select"
    }


}

function enroll(s) {
    var card = document.querySelectorAll('.selectedTurn');
    Array.prototype.forEach.call(card, function(element, index) {
        subject = element.id.split("_")[1]
        turno = element.id.split("_")[0]
        if (s.id == subject) {
            if (turno.includes("TP")) {
                $.ajax({
                    url: "/subject-enroll-submit",
                    type: "POST",
                    data: { "subject": subject, "turno": turno },
                    dataType: "json",
                    success: (data) => {
                        alert(subject + " : " + data.msg + ' in ' + turno);
                        $('#' + turno + "_" + subject).remove('selectedTurn')
                        $('#' + subject).remove()
                    }
                })
            }
        }
    })
}

function initialFetch(x) {
    $.ajax({
        url: "/fetchForChange",
        type: "get",
        dataType: "json",
        success: (data) => {
            const cadeiras = Object.keys(JSON.parse(data[0].cadeiras));
            console.log(JSON.parse(data[0].cadeiras));
            let cadeiraSelected;
            let turnosCadeira;

            if (x == 0) {
                cadeiraSelected = cadeiras[0];
            } else {
                cadeiraSelected = $("#mySubjects").val();
            }

            turnosCadeira = JSON.parse(data[0].cadeiras)[cadeiraSelected];

            if (x == 0) {
                let cadeirasIn = '';
                cadeiras.forEach(cadeira => {
                    cadeirasIn += `<option value="${cadeira}">${cadeira}</option>`
                });
                $("#mySubjects").html(cadeirasIn);
            }

            let toSelectIn = '';
            turnosCadeira.forEach(turno => {
                toSelectIn += `<option value="${turno}">${turno}</option>`
            });
            $("#myClasses").html(toSelectIn);


            let toSelectJoin = '';
            $.ajax({
                url: "fetchTurnosCadeira",
                type: "get",
                dataType: "json",
                data: {
                    cadeira: cadeiraSelected
                },
                success: (data) => {
                    const turnos = Object.keys(JSON.parse(data[0].horario));
                    turnos.forEach(turno => {
                        if (turno != "T") {
                            if (!turnosCadeira.includes(turno)) {
                                toSelectJoin += `<option value="${turno}">${turno}</option>`
                            }
                        }
                    })

                    $("#joinClasses").html(toSelectJoin);
                }
            })
        }
    })
}