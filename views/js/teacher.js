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

    $("#profile-button").click(() => {
        $(".container-profile").show();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_requests').hide();
        $('#query_table_settings').hide();

        $('#transfermsg').text('');
        $('#messagesettings').remove();

        $.ajax({
            url: "/teacher-profile",
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
                    info.email_p + ' </p><p> Email[Institucional]: ' +
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

    $("#dashboard-button").click(() => {
        $(".container-profile").hide();
        $('#query_table_dashboard').show();
        $('#query_table_subjects').hide();
        $('#query_table_requests').hide();
        $('#query_table_settings').hide();

        $('#transfermsg').text('');
        $('#messagesettings').remove();


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
        $('#query_table_settings').hide();

        $('#transfermsg').text('');
        $('#messagesettings').remove();
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
        $('#student').on('keydown', function(event){
            if (event.which == 13) {
                event.preventDefault();
            }
        });

        $(".container-profile").hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').show();
        $('#query_table_requests').hide();
        $('#query_table_settings').hide();

        $('#transfermsg').text('');
        $('#messagesettings').remove();

        $('#query_table_subjects_answer').remove();

        $.ajax({
            url: "/teacher-profile",
            type: "get",
            dataType: "json",
            success: (data) => {
                const cadeiras = Object.keys(JSON.parse(data[0].cadeiras_teacher));
                let content = '';
                cadeiras.forEach(subj => {
                    content += `<option value='${subj}'>${subj}</option>`
                });
                $('#subjectshow').html(content);
            }
        })
    });

    $("#student").keyup(() => {
        const student = $("#student").val();
        if(student.length > 3){
            $.ajax({
                url: "/teacher-fetch",
                type: "get",
                dataType: "json",
                data: {
                    student: student,
                },
                success: (data) => {
                    if(data.code == 1){
                        firstsubject = data.matched[0];
                        subjectsallowed = '';
                        data.matched.forEach(subj => {
                            subjectsallowed += `<option value="${subj}">${subj}</option>`;
                        })
                        $('#subjectsallowed').html(subjectsallowed);
                        $.ajax({
                            url: "/teacher-fetch-classes",
                            type: "get",
                            dataType: "json",
                            data: {
                                student: student,
                                subject: firstsubject
                            },
                            success: (data) => {
                                if(data.code == 1){
                                    turnosin = '';
                                    data.turnoatual.forEach(turno => {
                                        turnosin += `<option value="${turno}">${turno}</option>`;
                                    })
                                    turnosjoin = '';
                                    data.turnoscadeira.forEach(turno => {
                                        turnosjoin += `<option value="${turno}">${turno}</option>`;
                                    })
                                    $('#turnosin').html(turnosin);
                                    $('#turnosjoin').html(turnosjoin);
                                }else{
                                    $('#turnosin').html('');
                                    $('#turnosjoin').html('');
                                }
                            }
                        })
                    }else{
                        $('#subjectsallowed').html('');
                    }
                }
            })
        }
    });

    $("#subjectsallowed").change(() => {
        const student = $("#student").val();
        const subject = $("#subjectsallowed").val();
        if(student.length > 3){
            $.ajax({
                url: "/teacher-fetch-classes",
                type: "get",
                dataType: "json",
                data: {
                    student: student,
                    subject: subject
                },
                success: (data) => {
                    if(data.code == 1){
                        turnosin = '';
                        data.turnoatual.forEach(turno => {
                            turnosin += `<option value="${turno}">${turno}</option>`;
                        })
                        turnosjoin = '';
                        data.turnoscadeira.forEach(turno => {
                            turnosjoin += `<option value="${turno}">${turno}</option>`;
                        })
                        $('#turnosin').html(turnosin);
                        $('#turnosjoin').html(turnosjoin);
                    }else{
                        $('#turnosin').html('');
                        $('#turnosjoin').html('');
                    }
                }
            })
        }
    });

    $("#show-button").click(() => {
        const subject = $("#subjectshow").val();
        //$("#subjectshow").val('');
        $.ajax({
            url: "/teacher-show",
            type: "get",
            dataType: "json",
            data: {
                subject: subject
            },
            success: (data) => {
                $('#transfermsg').text('');
                $('#query_table_subjects_answer').remove();
                let content = "<table class='admin_table' id='query_table_subjects_answer'> <thead class='' > <tr><th >Number </th> <th> Email </th></tr></thead>"
                data.forEach(item => {
                    content += '<tr><td>' + item.numero_aluno  + '</td>' + '<td>' + item.email + '</td>' + '</tr>'
                });
                content += "</table>"
                $('#query_table_subjects').append(content);
            }
        })
    });

    $("#transfer-button").click(() => {
        $('#query_table_subjects_answer').remove();

        const student = $("#student").val();
        const subject = $("#subjectsallowed").val();
        const removefrom = $("#turnosin").val();
        const addto = $("#turnosjoin").val();
        $("#student").val('');
        
        $.ajax({
            url: "/teacher-transfer",
            type: "get",
            dataType: "json",
            data: {
                student: student,
                subject: subject,
                removefrom: removefrom,
                addto: addto
            },
            success: (data) => {
                if(data.code==0){
                    $('#transfermsg').text('');
                    $('#transfermsg').append(data.msg);
                }else{
                    cadeiras = data;
                    $.ajax({
                        url: "/teacher-transfer-set",
                        type: "get",
                        dataType: "json",
                        data: {
                            student: student,
                            cadeiras: cadeiras
                        },
                        success: (data) => {
                            $('#transfermsg').text('');
                            $('#transfermsg').append(data.msg);
                        }
                    })
                }
            }
        })
    });

    $("#settingsbutton").click(() => {
        $(".container-profile").hide();
        $('#query_table_dashboard').hide();
        $('#query_table_subjects').hide();
        $('#query_table_requests').hide();
        $('#query_table_settings').show();

        $('#transfermsg').text('');
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
                    $(".container-teacher100").css("background", "rgb(140, 143, 148)");
                } else {
                    $(".container-teacher100").css("background", "linear-gradient(-135deg, #e67300, #ff8c1a)");
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

    if (getCookie("theme") === "darktheme") {
        $(".container-teacher100").css("background", "rgb(140, 143, 148)");
    } else {
        $(".container-teacher100").css("background", "linear-gradient(-135deg, #e67300, #ff8c1a)");
    }

    $(".container-profile").hide();
    $('#query_table_dashboard').show();
    $('#query_table_subjects').hide();
    $('#query_table_requests').hide();
    $('#query_table_settings').hide();

    $.ajax({
        url: "/teacher-profile",
        type: "get",
        dataType: "json",
        success: (data) => {
            $('#query_table_dashboard_answer').remove();
            var info = JSON.parse(data[0].cadeiras_teacher)
            content = '<div class="card-deck">'
            for (var key in info){
                //var attrName = key; CHAVE
                //var attrValue = obj[key]; VALUE
            
                content += '<div class="card" style="width: 18rem;">'
                content += '<img class="card-img-top" src="images/base_cadeiras.png" alt="Card image cap">'
                content += '<div class="card-body">'
                content += '<h5 class="'+key+'">'+key+'</h5>'
                content += '<p class="card-text">BEM VINDO A '+key+'</p>'
                content += '<a class="btn '+key+'">Gerir Página</a>'
                content += '</div>'
                content += '</div>'
                content += '<br>'
            }
            content += '</div>'
            $('#query_table_dashboard').append(content);
        }
    })
})