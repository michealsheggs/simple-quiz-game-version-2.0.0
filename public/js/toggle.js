
  ///logic toggle for login and logout

  const isloggedIn = window.sessionStorage.getItem('email');
    if(isloggedIn){
      $("#login-link, #signup-link").hide();
      $("li.dropdown").show();
    }else{
      $("li.dropdown").hide();
    }


    //log out
    $("#logout-link").on('click',function(){
        sessionStorage.clear();
        window.location = "../index.html";

    });


    //check if logged in

    $("#playgame").on('click',function(){
  
        if(!isloggedIn){
            window.location = "Users/signup.html";
            // return;
        }else{
            window.location = "frontend/welcome.html";
 
        }  
    });

    