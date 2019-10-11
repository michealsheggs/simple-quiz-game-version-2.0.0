
//updating
//first pull the question to be edited into the edit form
$(".contentTable").delegate('#edit', 'click', function(){
  let close =  $(this).attr('data-id');
  close.addClass('hide-content');
        $.getJSON('http://localhost:3000/questions/' + $(this).attr('data-id'), function(editQuestion){
            const questionTemp = $("#editTemplate").html()
                   
                  $(".editdisplay").append(Mustache.render(questionTemp, editQuestion));      
        });
      
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
            url: `http://localhost:3000/questions/` + id,
            data: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                added_question,
                option_one,
                option_two,
                option_three,
                option_four,
                answer,
            },
            success: function() {
              $('#display_alert').html('created question successfully');
            },
            error: function() {
                $('#display_alert').html('error updating questions');
              },
          });
        }

  //  $("#toggle_content").addClass('hide-content');;

  });
