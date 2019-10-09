//display the wuestions and options in the frontpage
 
$.getJSON('http://localhost:3000/questions', function(data){
    $.each(data, function(key, value){  
      const questionTemplate = `<p class="question text-primary">question ${value.id}</p>
      <h4> ${value.added_question}</h4><br/> 
     <div class="option">
         <div class='form-check'>
         <input class='form-check-input' type="radio" name="optiontype${value.id}" id="optiontype" 
         value="A">${value.option_one}

           </div>
           <div class="form-check">
           <input class="form-check-input" type="radio" name="optiontype${value.id}" id="optiontype" 
           value="B">${value.option_two}
         
           </div>
          
           <div class="form-check">
           <input class="form-check-input" type="radio" name="optiontype${value.id}" id="optiontype" 
           value="C">${value.option_three}
               
             </div>
             <div class="form-check">
             <input class="form-check-input" type="radio" name="optiontype${value.id}" id="optiontype" value="D">${value.option_four}
               
             </div>            
          </div>
        </div>
      </div>
      `
      
        $("#Thequestionsection").append(questionTemplate);
    });
   
}
);
   

//display the questions on the admin page
$.getJSON('http://localhost:3000/questions', function(quizQuestions){
  $.each(quizQuestions, function(key,value){
    const populateData = `
    <tr>
    <th scope="row">${value.id}</th>
    <td>${value.added_question}</td>
    <td>
        <button id="edit" data-id="${value.id}" class="btn btn-xs" >pen</button>
        <button id="remove" data-id="${value.id}" class="btn btn-xs" >X</button>
    
    </td>
    </tr>
    <button id="trythis" data-id="${value.id}">${value.added_question}</button>
    
    `
        
      $(".contentTable").append(populateData, value);

    });

});


//Deleting

$(".contentTable").delegate('#remove', 'click', function(){

  $.ajax({
    type: 'DELETE',
    url : 'http://localhost:3000/questions/'+ $(this).attr('data-id'),
    success: function(){
     
      alert('working');
    },
    error: function(){
      alert('no working');
    }
  });
});


//updating

$(".contentTable").delegate('#edit', 'click', function(){
  alert('woooo');

});