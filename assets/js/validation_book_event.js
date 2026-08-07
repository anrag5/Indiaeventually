// -----------------------------
// Book Event Form
// -----------------------------

$(document).ready(function () {

    function initializeBookEventForm(formId) {

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
                eventDate: {
                    required: true
                },
                eventType: {
                    required: true
                },
                guestCount: {
                    required: true,
                    digits: true,
                    min: 1
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
                eventDate: {
                    required: "Please select event date"
                },
                eventType: {
                    required: "Please select event type"
                },
                guestCount: {
                    required: "Please enter guest count",
                    digits: "Please enter only digits",
                    min: "Guest count should be at least 1"
                },
                enquiry: {
                    required: "Please enter your message",
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

                var submitButton = $form.find("#book-submit-button");
                var buttonText = $form.find("#book-button-text");
                var loader = $form.find("#book-loader");
                var responseBox = $form.find("#book-response-message");
                var inputButtonDiv = $form.find("#input_button_div");

                if (submitButton.length) {
                    submitButton.prop("disabled", true);
                }

                if (buttonText.length) {
                    buttonText.hide();
                }

                if (loader.length) {
                    loader.show();
                }

                if (inputButtonDiv.length) {
                    inputButtonDiv.hide();
                }

                var formData = {

                    name: $form.find('[name="name"]').val().trim(),
                    email: $form.find('[name="email"]').val().trim(),
                    mobile: $form.find('[name="mobile"]').val().trim(),
                    eventDate: $form.find('[name="eventDate"]').val(),
                    eventType: $form.find('[name="eventType"]').val(),
                    guestCount: $form.find('[name="guestCount"]').val(),
                    enquiry: $form.find('[name="enquiry"]').val().trim()

                };

                fetch("/api/book-event", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)

                })

                .then(async function (response) {

                    const result = await response.json();

                    if (loader.length) loader.hide();

                    if (submitButton.length) {
                        submitButton.prop("disabled", false);
                    }

                    if (buttonText.length) {
                        buttonText.show();
                    }

                    if (inputButtonDiv.length) {
                        inputButtonDiv.show();
                    }

                    if (result.success) {

                        if (responseBox.length) {

                            responseBox.html(
                                '<div class="alert alert-success">' +
                                result.message +
                                '</div>'
                            );

                            setTimeout(function () {
                                responseBox.html("");
                            }, 5000);

                        } else {

                            alert(result.message);

                        }

                        form.reset();

                        $form.find(".valid").removeClass("valid");

                    } else {

                        if (responseBox.length) {

                            responseBox.html(
                                '<div class="alert alert-danger">' +
                                result.message +
                                '</div>'
                            );

                            setTimeout(function () {
                                responseBox.html("");
                            }, 5000);

                        } else {

                            alert(result.message);

                        }

                    }

                })

                .catch(function (error) {

                    console.error(error);

                    if (loader.length) loader.hide();

                    if (submitButton.length) {
                        submitButton.prop("disabled", false);
                    }

                    if (buttonText.length) {
                        buttonText.show();
                    }

                    if (inputButtonDiv.length) {
                        inputButtonDiv.show();
                    }

                    if (responseBox.length) {

                        responseBox.html(
                            '<div class="alert alert-danger">Unable to submit your request. Please try again.</div>'
                        );

                        setTimeout(function () {
                            responseBox.html("");
                        }, 5000);

                    } else {

                        alert("Unable to submit your request. Please try again.");

                    }

                });

            }

        });

        $(formId)
        .find("#be_name,#be_mobile,#be_email,#be_eventDate,#be_eventType,#be_guestCount,#be_enquiry")
        .on("keyup blur change", function () {
            $(this).valid();
        });

    }

    initializeBookEventForm("#bookEventForm");

});