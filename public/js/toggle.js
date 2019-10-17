
  // /logic toggle for login and logout

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

    
    // get users  
  //  function  getUsers(){
    const getUsers = $.ajax({
       url: `http://localhost:3000/users`,
       type:'GET',
       global: false,
       async: false,
       success: function(usersArr){
          return usersArr;
       },
       error: function(err){
         return err;
       }

     }).responseJSON;


     //cashe email 
     let userCacheDetail = [];
     getUsers.forEach((item)=>{
       if(isloggedIn.includes(item.email)){  
        userCacheDetail.push(item.email, item.first_name, item.last_name);      
       }
     });   
     if(isloggedIn.indexOf(userCacheDetail)){
      $("#submit-link, #showscore-link").hide();
     }
  

    // get admin

    const getAdmin = $.ajax({
      url: `http://localhost:3000/admin`,
      type:'GET',
      global: false,
      async: false,
      success: function(adminArr){
         return adminArr;
      },
      error: function(err){
        return err;
      }

    }).responseJSON;

    let adminCacheDetail = [];
    getAdmin.forEach((adminItem)=>{
      if(isloggedIn.includes(adminItem.email)){  
        adminCacheDetail.push(adminItem.email, adminItem.first_name, adminItem.last_name);      
      }
    });

console.log(adminCacheDetail);


    if(isloggedIn === userCacheDetail[0]){
      //do this
      const username= `${userCacheDetail[1] + " " + userCacheDetail[2]}`
      $("#userMenu").html(username);
 
    }else if(isloggedIn === adminCacheDetail[0]){
      //do this
      console.log(isloggedIn);
      
      const adminName= `${adminCacheDetail[1] + " " + adminCacheDetail[2]}`
      $("#userMenu").html(adminName)
  
    }else{
      $("#userMenu").html('Guest');
    }
   
    
 