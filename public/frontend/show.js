 
    $.getJSON('http://localhost:3000/questions', function(quizQuestions){
        $.each(quizQuestions, function(key, value){
            const populateData = $(".tableContentTemp").html();

            $(".tableContent").append(Mustache.render(populateData, value));
        });    
    });
  

