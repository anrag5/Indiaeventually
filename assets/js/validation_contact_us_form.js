AOS.init({
    offset:120,
    delay:0
});

// -----------------------------
// Contact Forms
// -----------------------------

$(document).ready(function () {

    function initializeForm(formId) {

        if (!$(formId).length) return;

        $(formId).validate({

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
                    minlength: "Please enter a valid 10 digit mobile number",
                    maxlength: "Please enter a valid 10 digit mobile number"
                },
                email: {
                    required: "Please enter your email",
                    email: "Please enter a valid email address"
                },
                enquiry: {
                    required: "Please enter your enquiry",
                    minlength: "Please enter at least 10 characters"
                }
            },

            errorPlacement: function (error, element) {

                var errorId = element.attr("id") + "_err";

                $(element)
                    .closest("form")
                    .find("#" + errorId)
                    .html(error);

            },

            highlight: function (element) {

                $(element).addClass("invalid").removeClass("valid");

            },

            unhighlight: function (element) {

                $(element).addClass("valid").removeClass("invalid");

            },

            submitHandler: function (form) {

                var $form = $(form);

                var submitButton = $form.find("#submit-button");
                var buttonText = $form.find("#button-text");
                var loader = $form.find("#loader");
                var responseBox = $form.find("#response-message");
                var inputButtonDiv = $form.find("#input_button_div");

                submitButton.prop("disabled", true);
                buttonText.hide();

                if (inputButtonDiv.length) {
                    inputButtonDiv.hide();
                }

                loader.show();

                var formData = {
                    name: $form.find('[name="name"]').val().trim(),
                    email: $form.find('[name="email"]').val().trim(),
                    mobile: $form.find('[name="mobile"]').val().trim(),
                    enquiry: $form.find('[name="enquiry"]').val().trim()
                };

                fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })

                .then(async function (response) {

                    const result = await response.json();

                    loader.hide();
                    submitButton.prop("disabled", false);
                    buttonText.show();

                    if (inputButtonDiv.length) {
                        inputButtonDiv.show();
                    }

                    if (result.success) {

                        responseBox.html(
                            '<div class="alert alert-success">' +
                            result.message +
                            '</div>'
                        );

                        form.reset();

                        $form.find(".valid").removeClass("valid");

                    } else {

                        responseBox.html(
                            '<div class="alert alert-danger">' +
                            result.message +
                            '</div>'
                        );

                    }

                    setTimeout(function () {
                        responseBox.html("");
                    }, 5000);

                })

                .catch(function (error) {

                    console.error(error);

                    loader.hide();

                    submitButton.prop("disabled", false);

                    buttonText.show();

                    if (inputButtonDiv.length) {
                        inputButtonDiv.show();
                    }

                    responseBox.html(
                        '<div class="alert alert-danger">Unable to send enquiry. Please try again.</div>'
                    );

                });

            }

        });

        $(formId)
            .find("#name,#mobile,#email,#enquiry")
            .on("keyup blur", function () {
                $(this).valid();
            });

    }

    initializeForm("#contact-us-form");
    initializeForm("#get-in-touch-form");

});