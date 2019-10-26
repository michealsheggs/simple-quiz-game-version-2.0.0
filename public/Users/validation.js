
//  USER SIGN-UP
$('#sign-up-btn').on("click",function(e) {
  
    e.preventDefault();
    let passwordformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const first_name = $('#firstname').val();
    const last_name = $('#lastname').val();
    const password = $('#password').val();
    const email = $('#email').val();

    //get user email from database
    //ajax request to check if the user has already registered
  const  checkIfUserExist = $.ajax({
    type: 'GET',
    url: `http://localhost:3000/users`,
    global:false,
    async: false,
    success: function(userEmail) {
      return userEmail;
      }
  }).responseJSON; 
  
let userEmails = "";
checkIfUserExist.forEach((data)=>{
  if(email.includes(data.email)){
    userEmails += data.email;
  }
  // console.log(userEmails);

});
// console.log(email);

    //Check if user did not fill all the field
    if (!first_name || !last_name || !password || !email) {
      $('#display_alert').html('<li class="text-danger"> please fill all the empty fields</li>');
      return;
      //check if the email is valid
    }else if(!email.match(mailformat)){
      $('#display_alert').html('<li class="text-danger">You have entered an invalid email address!</li>');
      //check
    }else if(!password.match(passwordformat)){
      $('#display_alert').html('<li class="text-danger">enter a password between 6 to 20 characters which contain at least one number, one uppercase and one lowercase letter</li>');

    } else if(email === userEmails){
      $('#display_alert').html('<li class="text-danger">email address already exist</li>');
      // console.log(email);   
  
    }
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
              // $('#display_alert').html('your registration was Successfull');
              $("#display_alert").append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Congratulations!</strong> you successfully  registered! wait after 4seconds </br> or click login. 
               </div>`);
               setTimeout(function(){
                 window.location = "login.html";
               },4000);
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
    $('#display_alert').html('<li class="text-danger">Kindly fill in all fields</li>');
    return;
  }else if(!loginEmail.match(mailformat)){
    $("#display_alert").html('<li class="text-danger">You have entered an invalid email address!</li>');
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
        sessionStorage.setItem('email', loginEmail);
        $('#display_alert').html('<li class="text-success">Login sucessful</li>');
        // $('.checkLogin').html('You are logged in');
        //redirect to home page if the login is successfull
        window.location.assign('../games/index.html');
        // $('.loginbtn, signupbtn').set('display:none');;
      } else {
        $('#display_alert').html('<li class="text-danger">Username or password Incorrect</li>');
      }
    },
  });
});

//USER LOGOUT

$('.logoutBtn').click(function() {
    $('.checkLogin').html('Kindly login');
    sessionStorage.clear();
    window.location = "Users/login.html";
  });
