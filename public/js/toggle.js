
  ///logic toggle for login and logout

  const isloggedIn = window.localStorage.getItem('email');
    if(isloggedIn){
      $("#login-link, #signup-link").hide();
      $("li.dropdown").show();
    }else{
      $("li.dropdown").hide();
    }


    //log out
    $("#logout-link").on('click',function(){
        localStorage.clear();
        window.location = "../index.html";

    });