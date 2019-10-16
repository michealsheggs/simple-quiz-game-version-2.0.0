// toggly the user menu

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


let player = [];
let adminCacheDetail = [];
getAdmin.forEach((adminItem)=>{
  if(isloggedIn.includes(adminItem.email)){  
    adminCacheDetail.push(adminItem.email, adminItem.first_name, adminItem.last_name);      
  }
});

// console.log(adminCacheDetail);


if(isloggedIn === userCacheDetail[0]){
  //do this
  player.push(userCacheDetail[0], userCacheDetail[1], userCacheDetail[2])
  const username= `${userCacheDetail[1] + " " + userCacheDetail[2]}`
  $("#userMenu").html(username);

}else if(isloggedIn === adminCacheDetail[0]){
  //do this
//   console.log(isloggedIn);
   player.push(adminCacheDetail[0], adminCacheDetail[1], adminCacheDetail[2])
  const adminName= `${adminCacheDetail[1] + " " + adminCacheDetail[2]}`
  $("#userMenu").html(adminName)

}else{
  $("#userMenu").html('Guest');
}
console.log(player);





//first declare the correct scores
        let correctScores =0;
         let answerChosen;
         let correctAnswer;

$("#nextPage").on('click', function(e){
    //answers declaration
    e.stopPropagation(); 
    $.getJSON(`http://localhost:3000/questions`, function(data){
        $.each(data, function(key, value){
          answerChosen= $(`input[name=optiontype${value.id}]:checked`).val()
             correctAnswer = value.answer;
            if(answerChosen == correctAnswer){
                correctScores++;
            }
        }) ;

  });

}); 


        //populate the result on the ui
       $("#submitAnswerButon").on('click', function(){
        const htmlscore = `<span>The total score is:  ${correctScores}</span>`
            $("#totalScore").append(htmlscore);

            $.getJSON('http://localhost:3000/questions', function(quizQuestions){
            $.each(quizQuestions, function(key, value){
                const populateData = $("#showscore").html();
                
                $(".showAnserContent").append(Mustache.render(populateData, value));
            });

            });

            //post the player scores to database
         console.log(player);
                
            let today = new Date();
            let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let played_time = time +' '+ date;
            let player_email = player[0];
            let player_userName = player[1] + " " + player[2];
            let totalScore = correctScores;
            $.ajax({
                type: "POST",
                url: `http://localhost:3000/players_scores`,
                data:{
                    player_email,
                    player_userName,
                    played_time,
                    totalScore
                },
                success: function(data){
                    console.log(data);
                    
                },
                error:function(err){
                    console.log(err);
                    
                }
            });
       });