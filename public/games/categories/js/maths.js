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
      window.location = "../Users/signup.html";
      // return;
  }else{
      window.location = "../index.html";
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



    const setdata =   $.ajax({
        url: "http://localhost:3000/Maths",
        type: "GET",
        global: false,
        async: false,
        success: function(getdata){
            return getdata;
        },   
    }).responseJSON;

let totalrecord = setdata.length;
        // ajax() method to make api calls
        $.ajax({
            url: "http://localhost:3000/Maths",
            type: "GET",
            success: function(dataArr) {
                console.log(dataArr);

                if (dataArr) {
                    let fetchData = "";              
                    dataArr.forEach((item)=>{
                        fetchData += `<p class="question">question <span class="number">${item.id}</span></p>
                        <h4 class="question-no"> ${item.added_question}</h4><br/> 
                        <div class="option">
                          <div class='form-check'>
                           <label class="contain">${item.option_one}
                              <input class='form-check-input' type="radio" name="optiontype${item.id}" id="optiontype" 
                              value="A">
                                  <span class="checkmark"></span>
                            </label>                      
                          </div>
                            <div class="form-check">
                            <label class="contain">${item.option_two}
                                  <input class="form-check-input" type="radio" name="optiontype${item.id}" id="optiontype" 
                                  value="B">
                                  <span class="checkmark"></span>
                              </label>                         
                            </div>                          
                            <div class="form-check">
                               <label class="contain">${item.option_three}
                                  <input class="form-check-input" type="radio" name="optiontype${item.id}" id="optiontype" 
                                  value="C">
                                  <span class="checkmark"></span>
                              </label>                            
                            </div>
                            <div class="form-check">
                              <label class="contain">${item.option_four}
                              <input class="form-check-input" type="radio" name="optiontype${item.id}" id="optiontype" 
                              value="D">
                                <span class="checkmark"></span>
                             </label>                                                                           
                            </div>            
                        </div>`;

                    });
                    
                    $("#Thequestionsection").html(fetchData);
                }
            },
            error: function(err) {
                return err;
            }
        });


//on submit
//get the answers
//first declare the correct scores
let correctScores =0;
let answerChosen;
let correctAnswer;
console.log('outside:' + correctScores);

$("#submitAnswerButon").on('click', function(e){
  $(this).fadeOut(4000).hide();
      //answers declaration
      e.stopPropagation();    
      $.getJSON(`http://localhost:3000/Maths`, function(data){
        $.each(data, function(key, value){
        answerChosen= $(`input[name=optiontype${value.id}]:checked`).val()
        correctAnswer = value.answer;
          if(answerChosen == correctAnswer){
          correctScores++;
         }
      }) ;
    //populate the result on the ui
    let displayOutcome =`
      <li id="playagain" class="page-item"><a href="biology.html"><button class="btn prevdesign">play again</button></a></li>
      <li id="playanother" class="page-item"><a href="../index.html"><button class="btn nextdesign">play another quiz</button></a></li>
    `;
    let total = `<span> you  scored : ${correctScores}</span>`;
    let htmlscore;
    if(correctScores < 10){
      htmlscore = `<span>your high score : <stron> ${correctScores} </strong> is below average, you can do better next time. </br> click on play again button to try again!</span>`;
    }else if(correctScores <= 15){
      htmlscore = `<span>your high score : <stron> ${correctScores} </strong> is above  average, well done!. </br> click on play again button to try again! or play the next quiz</span>`;

    }else{
      htmlscore = `<span>your total score is:  <stron> ${correctScores} </strong>. bravo, play another game</span>`
    }
      $(".totalscore").append(htmlscore);
      $(".total").append(total);
      $("#outcome").append(displayOutcome);

           let totalScore = correctScores;           
            let game_played= "Mathematics";
            let today = new Date();
            let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let played_time = time +' '+ date;
            let player_email = player[0];
            let player_userName = player[1] + " " + player[2];
            $.ajax({
                type: "POST",
                url: `http://localhost:3000/players_scores`,
                data:{
                    player_email,
                    player_userName,
                    game_played,
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
})


$.getJSON('http://localhost:3000/Maths', function(quizQuestions){
    $.each(quizQuestions, function(key, value){
        const populateData = $(".tableContentTemp").html();

        $(".tableContent").append(Mustache.render(populateData, value));
    });    
});
