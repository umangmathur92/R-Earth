$(document).ready(function () {

  setNavbarScrollAnimation();

  $('#signup-form').submit(function(event) {

    //TODO - VALIDATION
    const username =  $('#username-sign-up').val(); 
    const password = $('#password_sign_up').val();
    const name = $('#name').val();
    const confirmation = $('#repeat_password').val();
    
    const body = {
      username: username,
      password: password,
      name: name,
      password_confirmation: confirmation,
      user_type: 0,
      agency: null,
    }

    signUpPOSTRequest(body);    
    return false; 
  }); 

  var message = $( '.message' );
  if ( message.length ) {
    console.log(message)
    setTimeout( function() {
      alert(message);
    }, 5000 );
  }

  $('#signup-form').validate({
    rules:{
      password_sign_up:{
            equalTo: '#repeat_password'
       },
       repeat_password:{
            equalTo: '#password_sign_up'
        }
    },
    messages: {
      password_sign_up:{
          equalTo: 'passwords must match'
      },
  },
});

  //Toggles between login and signup forms
  $('.toggle').on('click', function() {
    $('.signin-container').stop().addClass('active');
  });
  
  $('.close').on('click', function() {
    $('.signin-container').stop().removeClass('active');
  });

});

function signUpPOSTRequest(body) {
  
  $.post( '/signup',  body  , function( response, status ) {
    if(response.user){
      alert( "Sign up was a success! Welcome, to R-Earth " + response.user.name );
      window.location.replace(response.redirect);
    } else {
      alert( response.error );
    }
})
}

function loginValidation(username,password){
  return username != "" && password != "";
}

function setNavbarScrollAnimation() {
	var scroll_start = 0;
	$(document).scroll(function () {
		scroll_start = $(this).scrollTop();
		$(".navbar").css('background-color', (scroll_start > 20) ? '#000000e0' : 'transparent');
	});
}