$(document).ready(function () {

  $('#signup-form').submit(function(event) {

    //TODO - VALIDATION
    var request = []
    const username =  $('#username').val(); 
    const password = $('#password').val();
    const name = $('#name').val();
    const confirmation = $('#repeat-password').val();

    console.log($('#name').val());
      
      $.post('/signup',
      {
        username: username,
        password: password,
        name: name,
        password_confirmation: confirmation,
        user_type: 0,
        agency: null,
      },
      function(data, status){
          alert("Data: " + data + "\nStatus: " + status);
      });
  }); 

  var message = $( '.message' );
  if ( message.length ) {
    console.log(message)
    setTimeout( function() {
      alert(message);
    }, 5000 );
  }

  //Toggles between login and signup forms
  $('.toggle').on('click', function() {
    $('.signin-container').stop().addClass('active');
  });
  
  $('.close').on('click', function() {
    $('.signin-container').stop().removeClass('active');
  });

});