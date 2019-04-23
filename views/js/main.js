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

    $("#login").click(() => {
        email = $("#email")
        pass = $("#password")
        role = email.split("@")[1]; 

        switch (role) {
            case 'email.com':
                if (email && password) {
                    console.log("aqui")
                    fetch('/authAdmin', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: {
                                email: $("#email"),
                                password: $("#password")
                            }
                        })
                    });
                        
                }
            break;

            case 'alunos.fc.ul.pt':
                if (email && password) {
                    fetch('/authStudent', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: {
                                email: $("#email"),
                                password: $("#password")
                            }
                        })
                    });
                }
                break;
    
            case 'fc.ul.pt':
                if (email && password) {
                    fetch('/auth', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: {
                                email: $("#email"),
                                password: $("#password")
                            }
                        })
                    });
                }
                break;
        }

    })

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
});