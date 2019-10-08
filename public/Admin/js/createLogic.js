let answer = "";
$('#createbtn').on('click',function(e){
    let added_question = $('#createquestion').val();
    let option_one = $('#option_one').val();
    let option_two = $('#option_two').val();
    let option_three = $('#option_three').val();    
    let option_four = $('#option_four').val(); 
g
    e.preventDefault();
  
//check if the radio box
    
    let answerChecked = document.getElementsByName('options'); 
    for(i = 0; i < answerChecked.length; i++) { 
      if(answerChecked[i].checked){ 
      answer = answerChecked[i].value;
      // console.log(answer);  
      }
    }
    if (!added_question && !option_one && !option_two && !option_three && !option_four) {
        $('#display_alert').html('please fill all the empty fields');
        return;
      }else{
        $.ajax({
            method: 'POST',
            url: `http://localhost:3000/questions`,
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
          })
        }
  })