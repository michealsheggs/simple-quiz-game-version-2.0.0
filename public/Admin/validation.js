
//  ADMIN SIGN-UP
$('#admin_signup_btn').on("click",function(e) {
  
  e.preventDefault();
  let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const first_name = $('#admin_firstname').val();
  const last_name = $('#admin_lastname').val();
  const password = $('#admin_password').val();
  const email = $('#admin_email').val();
  
  //get user email from database
    //ajax request to check if the user has already registered
  const  checkIfUserExist = $.ajax({
    type: 'GET',
    url: `http://localhost:3000/admin`,
    global:false,
    async: false,
    success: function(adminEmail) {
      return adminEmail;
      }
  }).responseJSON; 
let adminEmails = [];
checkIfUserExist.forEach((data)=>{
  adminEmails.push(data.email);
});
console.log(adminEmails);
// console.log(email);

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
  else if(email.indexOf(adminEmails)){
    $('#display_alert').html('email address already exist');
    console.log(email);   

  }else {
        //Submit the user data if the user does not exist
        $.ajax({
          method: 'POST',
          url: 'http://localhost:3000/admin',
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
  let user = window.sessionStorage.getItem('email');
    //If no user data, redirect to signup/login page, anyone you like
    $('.loginbtn').on('click',function(e){
      e.stopPropagation();
      if (!user) {
      $('.checkLogin').html('Kindly Log in');
      // window.location = '../forms/signup.html';
      }
    });
  
  if(user){
    $(".loginbtn").hide();
      $('.checkLogin').html('You are logged in');

        // window.location = "../index.html";

  }   
});




//Login Function
$('#admin_login_btn').click(function(e) {
  e.preventDefault();
  const loginMailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const loginPassword = $('#admin_loginpassword').val();
  const loginEmail = $('#admin_loginemail').val();
  if (!loginPassword || !loginEmail) {
    $('#display_alert').html('Kindly fill in all fields');
    return;
  }else if(!loginEmail.match(loginMailformat)){
    $("#display_alert").html('You have entered an invalid email address!');
    return;
  }
  //Check if the user is in the database
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/admin?email=${loginEmail}&password=${loginPassword}`,
    data: {
      email: loginEmail,
      password: loginPassword,
    },
    success: function(response) {
      if (response.length) {
        $('#display_alert').html('Login sucessful');
        $('.checkLogin').html('You are logged in');
        sessionStorage.setItem('email', loginEmail);
        //redirect to home page if the login is successfull
        window.location.assign('dashboard.html');
        $('.loginbtn, signupbtn').set('display:none');;
      } else {
        $('#display_alert').html('Username or password Incorrect');
      }
    },
  });
});

//USER LOGOUT

$('.logoutBtn').click(function() {
    //clear the localstorage and redirect to signup page
    sessionStorage.clear();
    $('.checkLogin').html('Kindly login');
    // window.location.assign('signup.html');
    // sessionStorage.clear();
    window.location = "login.html";
  });



