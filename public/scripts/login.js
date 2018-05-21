$(document).ready(function () {

  //Login Validation 
  validateLogin = () => {
    const username =  $('#username-sign-up').val(); 
    const password = $('#password-sign-up').val();
    var message;

    if(username == "" || password == ""){
      alert("Please enter a valid username and password.");
    }

    return false; 
  }

  $('#signup-form').submit(function(event) {

    //TODO - VALIDATION
    const username =  $('#username-sign-up').val(); 
    const password = $('#password-sign-up').val();
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