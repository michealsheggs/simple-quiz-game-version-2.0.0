//read the question first

const setdata =   $.ajax({
    url: "http://localhost:3000/Random",
    type: "GET",
    global: false,
    async: false,
    success: function(getdata){
        return getdata;
    },   
  }).responseJSON;
  
  let totalrecord = setdata.length;
  let page = 1;
  let	pagelimit = 4;
  
  fetchData();
  
  // handling the prev-btn
  $("#prevPage").on("click", function(){
    // if(page==1){
    //     $("prevPage").addAttr('disabled');
    // }else
    if (page > 1) {
        page--;
        fetchData();
    }
    console.log("Prev Page: " + page);
  });
  
  // handling the next-btn
  $("#nextPage").on("click", function(){
  //   if(page * pagelimit >=totalrecord){
  //     $("#submitAnswerButon").hide();
  //  }
    if (page * pagelimit < totalrecord) {
        page++;
        fetchData();
    }
    console.log("Next Page: " + page);
  });
  
  function fetchData() {
    // ajax() method to make api calls
    $.ajax({
        url: "http://localhost:3000/Random", 
        type: "GET",
        data: {
            _page: page,
            _limit: pagelimit
        },
        success: function(dataArr) {
            console.log(dataArr);
  
            if (dataArr) {
                const totalFetched = dataArr.length;
                console.log(totalFetched);
                
                let fetchData = "";           
                dataArr.forEach((item)=>{
                  fetchData += `
                  <tr>
                  <th scope="row">${item.id}</th>
                  <td>${item.added_question}</td>
                  <td data-id="to">
  
                  <button id="edit" data-id="${item.id}" class="btn btn-xs btn-secondary" ><i class="fa fa-pencil"></i></button>
                  <button id="remove" data-id="${item.id}" class="btn btn-xs btn-secondary" ><i class="fa fa-trash"></i></button>                               
                  </td>
                  </tr>
                  
                  `;
                    
                });
                
                $(".contentTable").html(fetchData);
            }
        },
        error: function(err) {
            return err;
        }
    });
  }
  
  
  
//updating
//first pull the question to be edited into the edit form
$(".contentTable").delegate('#edit', 'click', function(){
    $(".toggle_content").removeClass();

          $.getJSON('http://localhost:3000/Random/' + $(this).attr('data-id'), function(editQuestion){
              const questionTemp = $("#editTemplate").html()
                     
                    $(".editdisplay").append(Mustache.render(questionTemp, editQuestion));      
          });
        
   });

   //if the cancel button is click or update is canceled
   $("#cancelbtn").on('click',function(){
      $("#edit_form").addClass('toggle_content');
      location.reload();
   }); 
   //this one will actually update the question
  let answer = "";
  $('#editButton').on('click',function(e){
   
      let id = $("#data_id").val();
      let added_question = $('#editquestion').val();
      let option_one = $('#option_one').val();
      let option_two = $('#option_two').val();
      let option_three = $('#option_three').val();    
      let option_four = $('#option_four').val(); 
      e.preventDefault();
    
  //check if the radio box
      
      let answerChecked = document.getElementsByName('options'); 
      for(i = 0; i < answerChecked.length; i++) { 
        if(answerChecked[i].checked){ 
        answer = answerChecked[i].value;
        }
      }
      if (!added_question || !option_one || !option_two || !option_three || !option_four || !answer) {
          $('#display_alert').html('please fill all the empty fields');
          return;
        }else{
          $.ajax({
              method: 'PUT',
              url: `http://localhost:3000/Random/` + id,
              data: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                  added_question,
                  option_one,
                  option_two,
                  option_three,
                  option_four,
                  answer,
              },
              success: function() {
                $("#display_alert").append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Congratulations!</strong> you successfully  updated  quiz!
                </div>
                `);
                location.reload();
              },            
              error: function() {
                $("#display_alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <strong>Error!</strong> error in updating quizzie
                </div>
                `);  
              }       
            });
          }
  
    //  $("#toggle_content").addClass('hide-content');;
  
    });
  

    //Deleting

$(".contentTable").delegate('#remove', 'click', function(){
    
    $.ajax({
      type: 'DELETE',
      url : 'http://localhost:3000/Random/'+ $(this).attr('data-id'),
      success: function(){
        $("#display_alert").append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <strong>Congratulations!</strong> you successfully  deleted quiz!
        </div>
        `);
        location.reload();

       },
       error: function(){
         $("#display_alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
         <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         <strong>Errpor!</strong> error in deleting quizzie
         </div>
         `);
       }
    });
  });
  