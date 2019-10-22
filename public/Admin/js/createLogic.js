let answer = "";
$('#createbtn').on('click',function(e){
  e.preventDefault();
  //handling selection btn 
  
    const sel = document.getElementById('gameselection');
    function getSelectedOption(sel) {
        let opt;
        let len = sel.options.length; 
        for ( let i = 0; i < len; i++ ) {
            opt = sel.options[i];
            if ( opt.selected === true ) {
                break;
            }
        }
        return opt;
    }    
   
  let  option = getSelectedOption(sel);
  let selectedOption = option.value;

    let added_question = $('#createquestion').val();
    let option_one = $('#option_one').val();
    let option_two = $('#option_two').val();
    let option_three = $('#option_three').val();    
    let option_four = $('#option_four').val(); 
  
//check if the radio box is checked
    
    let answerChecked = document.getElementsByName('options'); 
    for(i = 0; i < answerChecked.length; i++) { 
      if(answerChecked[i].checked){ 
      answer = answerChecked[i].value;
      }
    }
    if (!added_question || !option_one || !option_two || !option_three || !option_four || !answer || !selectedOption) {
        $('#display_alert').html('<li class="text-danger">please fill all the empty fields</li>');
        return;
      }else{
        $.ajax({
            method: 'POST',
            url: `http://localhost:3000/`+ selectedOption,
            data: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                added_question,
                option_one,
                option_two,
                option_three,
                option_four,
                answer,
            },
            success: function(){
              $("#display_alert").append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <strong>Congratulations!</strong> you successfully  created quiz!
              </div>
              `);
             },
             error: function(){
               $("#display_alert").append(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
               <strong>Error!</strong> error in creating quiz
               </div>
               `);
             }
          })
        }
  })