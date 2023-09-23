$(document).ready(function () {
      $("#message").hide();
})
function submitData() {
      $(document).ready(function () {
            if (($("#userName").val() !== "") && ($("#userPassword").val() !== "")) {
                  var data = {
                        username: $("#userName").val(),
                        password: $("#userPassword").val(),
                        action: $("#action").val(),
                        remember: $('#rememberMe').is(":checked")
                  }
                  $.ajax({
                        url: "data.php",
                        method: 'POST',
                        data: data
                  }).done(function (result) {
                        result = JSON.parse(result);
                        if (result == "failed") {
                              console.log("Username or Password incorrect !")
                              //window.location.reload();
                              $("#message").text("Username or Password incorrect !");
                              $("#message").addClass(" alert alert-warning")
                              $("#message").hide().delay(100).slideDown(700);
                              setTimeout(function () {
                                    // $("#message").hide();
                                    $("#message").slideUp();
                              }, 4000)
                        }
                        if (result == "successfull") {
                              window.location = 'https://ms-test-dev.com/accueil.php';
                        }
                  })
            }
      })
}

//tooltip bootstrap initialisation
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

//login eye icon
feather.replace({ 'aria-hidden': 'true' }); //display for eye icon
$("#togglePasswordLogin").click(function (e) {
      //console.log("ecoute")
      e.preventDefault();
      var type = $(this).parent().parent().find(".passwordLogin").attr("type");
      //console.log(type);
      if (type == "password") {
            $("svg.feather.feather-eye").replaceWith(feather.icons["eye-off"].toSvg());
            $(this).parent().parent().find(".passwordLogin").attr("type", "text");
      } else if (type == "text") {
            $("svg.feather.feather-eye-off").replaceWith(feather.icons["eye"].toSvg());
            $(this).parent().parent().find(".passwordLogin").attr("type", "password");
      }
});

//change password  eye icon 
$("#togglePassword1").click(function (e) {
      //console.log("ecoute")
      e.preventDefault();
      var type = $(this).parent().parent().find(".password").attr("type");
      //console.log(type);
      if (type == "password") {
            $(".feather-eye").replaceWith(feather.icons["eye-off"].toSvg());
            $(this).parent().parent().find(".password").attr("type", "text");
      } else if (type == "text") {
            $(".feather-eye-off").replaceWith(feather.icons["eye"].toSvg());
            $(this).parent().parent().find(".password").attr("type", "password");
      }
});
$("#togglePassword2").click(function (e) {
      //console.log("ecoute")
      e.preventDefault();
      var type = $(this).parent().parent().find(".password").attr("type");
      console.log(type);
      if (type == "password") {
            $("svg.feather.feather-eye").replaceWith(feather.icons["eye-off"].toSvg());
            $(this).parent().parent().find(".password").attr("type", "text");
      } else if (type == "text") {
            $("svg.feather.feather-eye-off").replaceWith(feather.icons["eye"].toSvg());
            $(this).parent().parent().find(".password").attr("type", "password");
      }
});
$("#togglePassword3").click(function (e) {
      //console.log("ecoute")
      e.preventDefault();
      var type = $(this).parent().parent().find(".password").attr("type");
      //console.log(type);
      if (type == "password") {
            $("svg.feather.feather-eye").replaceWith(feather.icons["eye-off"].toSvg());
            $(this).parent().parent().find(".password").attr("type", "text");
      } else if (type == "text") {
            $("svg.feather.feather-eye-off").replaceWith(feather.icons["eye"].toSvg());
            $(this).parent().parent().find(".password").attr("type", "password");
      }
});
//update page send request reponse
$("#alertMessageDiv").hide();
$("#updatePassword").on('click', function () {
      password1 = $("#password1").val().trim();
      password2 = $("#password2").val().trim();
      password3 = $("#password3").val().trim();

      let result = "";

      if (password1 !== '' && password2 !== '' && password3 !== '') {
            password1 = password1.trim();
            if (password1.length >= 6 && password1.length <= 18) {
                  $.ajax({
                        url: "data.php",
                        method: 'POST',
                        data: { password1: password1 }
                  }).done(function (result) {
                        result = JSON.parse(result);
                        //console.log("first request" + result)
                        if (result == "failed") {
                              $("#alertMessage").text("Current Password is incorrect !");
                              $("#alertMessageDiv").removeClass();
                              $("#alertMessageDiv").addClass('m-3 alert alert-danger');
                              $("#alertMessageDiv").show();
                              setTimeout(() => {
                                    $("#alertMessageDiv").hide();
                              }, 6000);

                              //console.log("Current Password incorrect !");
                        }
                        if (result === "successfull") {
                              password2 = password2.trim();
                              password3 = password3.trim();
                              if ((password2.length >= 6 && password2.length <= 18) && (password3.length >= 6 && password3.length <= 18)) {
                                    if (password2 === password3) {
                                          $.ajax({
                                                url: "data.php",
                                                method: 'POST',
                                                data: { password1: password1, password2: password2 }
                                          }).done(function (result) {
                                                // console.log(result);
                                                secondResult = result.split('"')[3];
                                                //console.log(secondResult);
                                                if (secondResult === "failed") {
                                                      console.log("failed");
                                                }
                                                if (secondResult === "successfull") {
                                                      $("#alertMessageDiv").removeClass();
                                                      $("#alertMessage").text("Your password has successfully updated !");
                                                      $("#alertMessageDiv").addClass('m-3 alert alert-success');
                                                      $("#alertMessageDiv").show();
                                                      //do empty fileds
                                                      $("#password1").val('');
                                                      $("#password2").val('');
                                                      $("#password3").val('');
                                                      setTimeout(() => {
                                                            $("#alertMessageDiv").hide();
                                                      }, 6000);
                                                }
                                          })
                                    } else {
                                          $("#alertMessage").text("New Password miss match with confirm password !");
                                          $("#alertMessageDiv").removeClass();
                                          $("#alertMessageDiv").addClass('m-3 alert alert-danger');
                                          $("#alertMessageDiv").show();
                                          setTimeout(() => {
                                                $("#alertMessageDiv").hide();
                                          }, 5000);
                                    }
                              } else {
                                    $("#alertMessage").text("New password and Confirm password must be between 6 and 18 characters !");
                                    $("#alertMessageDiv").removeClass();
                                    $("#alertMessageDiv").addClass('m-3 alert alert-danger');
                                    $("#alertMessageDiv").show();
                                    setTimeout(() => {
                                          $("#alertMessageDiv").hide();
                                    }, 10000);
                              }
                        }
                  })
            } else {
                  $("#alertMessage").text("Cureent password must be between 6 and 18 characters !");
                  $("#alertMessageDiv").removeClass();
                  $("#alertMessageDiv").addClass('m-3 alert alert-danger');
                  $("#alertMessageDiv").show();
                  setTimeout(() => {
                        $("#alertMessageDiv").hide();
                  }, 10000);
            }
      } else {
            $("#alertMessage").text("All fields are required * ");
            $("#alertMessageDiv").removeClass();
            $("#alertMessageDiv").addClass('m-3 alert alert-danger');
            $("#alertMessageDiv").show();
            setTimeout(() => {
                  $("#alertMessageDiv").hide();
            }, 10000);
      }
})

