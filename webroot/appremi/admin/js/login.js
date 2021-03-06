var Login = function () {

    var handleLogin = function () {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                email: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },
            messages: {
                email: {
                    required: "Email is required."
                },
                password: {
                    required: "Password is required."
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit   
                $('.alert-danger', $('.login-form')).show();
            },
            highlight: function (element) { // hightlight error inputs
                $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },
            submitHandler: function (form) {
                form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });
    }

    var handleForgetPassword = function () {
        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "Email is required."
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit   

            },
            highlight: function (element) { // hightlight error inputs
                $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },
            submitHandler: function (form) {
                form.submit();
            }
        });

        $('.forget-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function () {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

        jQuery('#forgot_password_btn').click(function () {
            B2.blockUI({boxed: true});
            $('.alert-danger', $('.forget-form')).hide();
            $('.alert-success', $('.forget-form')).hide();
            $.ajax({
                type: "POST",
                cache: false,
                data: $('#forget-form').serializeArray(),
                url: '/users/forgotPassword/',
                dataType: 'json',
                success: function (res) {
                    if (res.status === "error") {
                        $('.alert-danger', $('.forget-form')).show();
                    } else {
                        $('.alert-success', $('.forget-form')).show();
                        $('#femail').val('');
                    }
                    B2.unblockUI();
                }
            });
        });
        jQuery('#change_password_btn').click(function () {
            $('.alert-danger', $('#cforget-form')).hide();
             $('.alert-success', $('.forget-form')).hide();
            if ($('#password').val() === $('#cpassword').val()) {
                B2.blockUI({boxed: true});
                $.ajax({
                    type: "POST",
                    cache: false,
                    data: $('#cforget-form').serializeArray(),
                    url: '/users/changepasswordWithoutLogin/',
                    dataType: 'json',
                    success: function (res) {
                        if (res.status === "error") {
                            $('.alert-danger', $('#cforget-form')).show();
                        } else {
                            $('.alert-success', $('#cforget-form')).show();
                        }
                        B2.unblockUI();
                    }
                });
            } else {
                $('.alert-danger', $('#cforget-form')).show();
            }

        });

    }

    var handleRegister = function () {

        function format(state) {
            if (!state.id)
                return state.text; // optgroup
            return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }

        if (jQuery().select2) {
            $("#select2_sample4").select2({
                placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
                allowClear: true,
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });


            $('#select2_sample4').change(function () {
                $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
        }

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                address: {
                    required: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#rpassword"
                },
                tnc: {
                    required: true
                }
            },
            messages: {// custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit   

            },
            highlight: function (element) { // hightlight error inputs
                $(element)
                        .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function (error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                $('.alert-danger', $('.register-form')).hide();
                $('.alert-success', $('.register-form')).hide();
                B2.blockUI({boxed: true});
                $.ajax({
                    type: "POST",
                    cache: false,
                    data: $('#registerForm').serializeArray(),
                    url: '/users/register/',
                    // dataType: 'json',
                    success: function (res) {
                        console.log(res.status);
                        if (res.status == "error") {
                            $('.alert-danger', $('.register-form')).show();
                        } else {
                            $('.alert-success', $('.register-form')).show();
                            $('#name').val('');
                            $('#email').val('');
                            $('#password').val('');
                            $('#rpassword').val('');


                        }
                        B2.unblockUI();
                        //  location.reload();
                        //window.location = '/products/attributes/' + res
                    }
                });
                //form.submit();
            }
        });

        $('.register-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function () {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleLogin();
            handleForgetPassword();
            handleRegister();

        }

    };

}();

function set_user_type(type_id) {
    if (type_id == 4) {
        $('.parent_section').show();
    } else {
        $('.parent_section').hide();
    }
}