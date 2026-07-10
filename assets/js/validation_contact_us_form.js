$(document).ready(function () {
    // Initialize jQuery Validation
    $("#contact-us-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 3
            },
            mobile: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 10
            },
            email: {
                required: true,
                email: true
            },
            enquiry: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must consist of at least 3 characters"
            },
            mobile: {
                required: "Please enter your contact number",
                digits: "Please enter only digits",
                minlength: "Your contact number must be exactly 10 digits",
                maxlength: "Your contact number must be exactly 10 digits"
            },
            email: {
                required: "Please enter your email",
                email: "Please enter a valid email address"
            },
            enquiry: {
                required: "Please enter your enquiry",
                minlength: "Your enquiry must consist of at least 10 characters"
            }
        },
        errorPlacement: function (error, element) {
            var id = element.attr('id') + '_err';
            $('#' + id).html(error);
        },
        highlight: function (element, errorClass, validClass) {
            console.log("Highlight called");
            $(element).addClass("invalid").removeClass("valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            console.log("Unhighlight called");
            $(element).addClass("valid").removeClass("invalid");
        },
        submitHandler: function (form) {
            var formData = $(form).serialize();

            $("#submit-button").attr("disabled", true);
            $("#button-text").hide();
            $("#loader").show();

            $.ajax({
                url: 'contact_us_enquiry_form.html',
                type: 'POST',
                data: formData,
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    $("#submit-button").attr("disabled", false);
                    $("#button-text").show();
                    $("#loader").hide();

                    setTimeout(function () {
                        $('#response-message').hide();
                    }, 5000);

                    if (response.status === 'success') {
                        $("#response-message").html('<div class="alert alert-success">' + response.message + '</div>');
                        $(form)[0].reset();
                        $(".valid").removeClass("valid");
                    } else if (response.status === 'error') {
                        $("#response-message").html('<div class="alert alert-danger">' + response.message + '</div>');
                    }
                },

            });
        }
    });

    // Live validation on input focusout and input events
    $('#name, #mobile, #email, #enquiry').on('focusout input', function () {
        $(this).valid();
    });
});