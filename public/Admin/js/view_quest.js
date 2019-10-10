//display the questions and options in the frontpage
 
$.getJSON('http://localhost:3000/questions', function(data){
    $.each(data, function(key, value){  
      const questionTemplate = $("#displayQuestion").html()
           
        $("#Thequestionsection").append(Mustache.render(questionTemplate, value));
    });
   
}
);
   

//display the questions on the admin page
$.getJSON('http://localhost:3000/questions', function(quizQuestions){
  $.each(quizQuestions, function(key,value){
    const populateData = $("#templatetable").html()
        
      $(".contentTable").append(Mustache.render(populateData, value));

    });

});



