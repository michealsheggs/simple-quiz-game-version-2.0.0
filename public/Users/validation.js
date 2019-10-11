
//  USER SIGN-UP
$('#sign-up-btn').on("click",function(e) {
  
    e.preventDefault();
    let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const first_name = $('#firstname').val();
    const last_name = $('#lastname').val();
    const password = $('#password').val();
    const email = $('#email').val();
    //Check if user did not fill all the field
    if (!first_name || !last_name || !password || !email) {
      $('#display_alert').html('please fill all the empty fields');
      return;
      //check if the email is valid
    }else if(!email.match(mailformat)){
      $('#display_alert').html('You have entered an invalid email address!');
      //check
    }else if(!password.match(passwordformat)){
      $('#display_alert').html('enter a password between 6 to 20 characters which contain at least one number, one uppercase and one lowercase letter');

    } 
    //ajax request to check if the user has already registered
    // $.ajax({
    //   method: 'GET',
    //   url: `http://localhost:3000/users?email=${email}`,
    //   data: {
    //     email,
    //   },
    //   success: function(response) {
    //     if (response.length) {
    //       $('#display_alert').html('User already exist');
    //       } 
    //     }
    //  }); 
        else {
          //Submit the user data if the user does not exist
          $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/users',
            data: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                first_name,
                last_name,
                email,
                password,
            },
            success: function() {
              $('#display_alert').html('your registration was Successfull');
            },
          });
        }
    
  });



  //USER SIGN-IN
  // check if user is login
$(document).ready(function() {
  //Check if there is any user data stored in the local storage
  //because user data is stored in localstorage at login
  let user = window.localStorage.getItem('email');
    // If no user data, redirect to signup/login page, anyone you like
    $('.login_btn').on('click',function(e){
      e.stopPropagation();
      if (!user) {
      $('.checkLogin').html('Kindly Log in');
      // window.location = '../forms/signup.html';
      }
    });
  
  if(user){
      $('.checkLogin').html('You are logged in');
      $(".login_btn").hide();
        // window.location = "../index.html";
  }   
});




//Login Function
$('#login-btn').on('click',function(e) {
  e.preventDefault();
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const loginPassword = $('#loginpassword').val();
  const loginEmail = $('#loginemail').val();
  if (!loginPassword || !loginEmail) {
    $('#display_alert').html('Kindly fill in all fields');
    return;
  }else if(!loginEmail.match(mailformat)){
    $("#display_alert").html('You have entered an invalid email address!');
    return;
  }
  //Check if the user is in the database
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/users?email=${loginEmail}&password=${loginPassword}`,
    data: {
      email: loginEmail,
      password: loginPassword,
    },
    success: function(response) {
      if (response.length) {
        localStorage.setItem('email', loginEmail);
        $('#display_alert').html('Login sucessful');
        $('.checkLogin').html('You are logged in');
        //redirect to home page if the login is successfull
        window.location.assign('../frontend/welcome.html');
        // $('.loginbtn, signupbtn').set('display:none');;
      } else {
        $('#display_alert').html('Username or password Incorrect');
      }
    },
  });
});

//USER LOGOUT

$('.logoutBtn').click(function() {
    //clear the localstorage and redirect to signup page
    $('.checkLogin').html('Kindly login');
    // window.location.assign('signup.html');
    localStorage.clear();
    window.location = "Users/login.html";
  });
