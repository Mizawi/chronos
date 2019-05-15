(function($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });

    $('.validate-form').on('submit', function() {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });



    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
            hideValidate(this);
        });
    });


    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);


/*==================================================================
[ Login ]*/

$(document).ready(function() {
    $('.login100-form-btn').click(function() {
        const data = {
            email: $('#email').val(),
            password: $('#password').val(),
            role: $('#role').val()
        }

    })
    if (window.location.pathname == !'/') {
        $.ajax({
            url: "/session-info",
            type: "get",
            dataType: "json",
            success: (data) => {
                session_info = JSON.parse(data[0].information)
                session_nome = session_info.nome.split(" ")
                session_content = '<span id="user-name">' + session_nome[0] + " " + session_nome[session_nome.length - 1] + '</span>' +
                    '<span id="user-role">' + session_info.cargo + '</span>'
                $('.user-info').append(session_content)
            }
        })
    }
});