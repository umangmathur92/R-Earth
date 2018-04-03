$(document).ready(function () {
  $('#loginForm').submit(function(event) {
    var request = []

    var username =  $('#username').val(); 
    var password = $('#password').val()

      $.post("/login",
      {
          username: username,
          password: password
      },
      function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
      });
  }); 
});