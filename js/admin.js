function submitAdminData() {
      $(document).ready(function () {
            username = $("#userName").val();
            password = $("#userPassword").val();
            action = $("#action").val();
            username = username.trim();
            password = password.trim();
            if (username !== "" && (password !== "")) {
                  if (password.length >= 6 && password.length <= 18) {
                        $.ajax({
                              url: "adminData.php",
                              method: 'POST',
                              data: { username: username }
                        }).done(function (result) {
                              //console.log(result);
                              result = JSON.parse(result);
                              //console.log(result);
                              if (result === "success") {
                                    //console.log("This username already exist");
                                    $("#alertMessage").text("This username has already exist");
                                    $("#alertMessageDiv").removeClass();
                                    $("#alertMessageDiv").addClass('m-3 alert alert-danger');
                                    $("#alertMessageDiv").show();
                                    setTimeout(() => {
                                          $("#alertMessageDiv").hide();
                                    }, 10000);
                              }
                              if (result === "fail") {
                                    $.ajax({
                                          url: "adminData.php",
                                          method: 'POST',
                                          data: { username: username, password: password }
                                    }).done(function (result) {
                                          secondResult = result.split('"')[3];
                                          // console.log(secondResult);
                                          if (secondResult === "successfull") {
                                                //console.log("successfull");
                                                $("#alertMessageDiv").removeClass();
                                                $("#alertMessage").text("Username and password added successfully!");
                                                $("#alertMessageDiv").addClass('m-3 alert alert-success');
                                                setTimeout(() => {
                                                      $("#alertMessageDiv").hide();
                                                      location.reload();
                                                }, 3000)

                                                $("#userName").val("");
                                                $("#userPassword").val("");
                                          }
                                          else {
                                                console.log("failed")
                                          }

                                    })
                              }

                        })
                  } else {
                        $("#alertMessage").text("Password must be between 6 and 18 characters !");
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
}


//login eye icon
feather.replace({ 'aria-hidden': 'true' }); //display for eye icon
$("#togglePasswordAmin").click(function (e) {
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
//user delete code
$(".userList").click(function () {
      userId = $(this).attr('data-index');
      //console.log(userId)
      $.ajax({
            url: "adminData.php",
            method: 'POST',
            data: { userId: userId }
      }).done(function (result) {
            console.log(result);
            result = JSON.parse(result);
            if (result === "deleted") {

                  $("#alertMessage").text("User deleted successfully ");
                  $("#alertMessageDiv").removeClass();
                  $("#alertMessageDiv").addClass('m-3 alert alert-success');
                  $("#alertMessageDiv").show();
                  setTimeout(() => {
                        $("#alertMessageDiv").hide();
                        location.reload();
                  }, 500);
            }
            if (result === "not deleted") {
                  $("#alertMessage").text("User name not found ");
                  $("#alertMessageDiv").removeClass();
                  $("#alertMessageDiv").addClass('m-3 alert alert-danger');
                  $("#alertMessageDiv").show();
                  setTimeout(() => {
                        $("#alertMessageDiv").hide();
                  }, 10000);
            }
      })
})

//admin login request response
$("#btn_admin_Login").click(function () {
      adminName = $("#adminName").val();
      adminPassword = $("#adminPassword").val();

      $.ajax({
            url: "adminData.php",
            method: 'POST',
            data: { adminName: adminName, adminPassword: adminPassword }

      }).done(function (result) {
            console.log("response " + result)
            result = JSON.parse(result);
            if (result == "failed") {
                  console.log("Username or Password incorrect !")
                  //window.location.reload();
                  $("#adminMessage").text("Admin Username or Password incorrect !");
                  $("#adminMessage").addClass(" alert alert-warning")
                  $("#adminMessage").hide().delay(100).slideDown(700);
                  setTimeout(function () {
                        $("#adminMessage").slideUp();
                  }, 4000)
            }
            if (result == "successfull") {
                  window.location = 'https://ms-test-dev.com/admin/adminCrud.php';
            }
      })

})