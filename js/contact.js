$(document).ready(function() {
  $("#contact-form").submit(function(event){
    event.preventDefault();
    var formData = $(this).serializeArray();
    var validForm = $(this).validate({
      debug: true,
      submitHandler: sendContactForm,
      invalidHandler: errorContactForm,
      rules: {
        name: {
          required: true,
          minlength: 5,
        },
        _replyto : {
          required: true,
          email: true,
          minlength: 5,
        },
        message: {
          required: true,
          minlength: 20,
        }
      }
    });
  });
});

function errorContactForm(event, validator) {
  console.log('invalid');
}

function sendContactForm(form) {
  console.log('success');
  var formData = $(form).serializeArray();
  $.ajax({
    url: "https://formspree.io/me@aaronfruth.com",
    method: "POST",
    data: formData,
    dataType: "json",
  }).done(function(data, status) {
    console.log(data, status);
    if (status === 'success') {
      $('#form-feedback')
        .addClass('alert-success')
        .html('<strong>Success!</strong> Your message has been successfully sent!')
        .removeClass('hide');
    }
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
    $('#form-feedback')
      .addClass('alert-danger')
      .html('<strong>Sorry,</strong> but we had some issues sending your email.')
      .removeClass('hide');
  });
}
  
