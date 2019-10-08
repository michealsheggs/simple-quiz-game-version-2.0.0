//first declare the correct scores
let correctScores =0;
$("#submitAnswerButon").on('click', function(e){
    // window.location = 'frontend/showscores.html';
    //answers declaration
    e.stopPropagation(); 
    $.getJSON(`http://localhost:3000/questions`, function(data){
        $.each(data, function(key, value){
         let answerChosen= $(`input[name=optiontype${value.id}]:checked`).val()
            let correctAnswer = value.answer;
            if(answerChosen == correctAnswer){
                correctScores++;
            }
        }) ;
        //populate the result on the ui
        const htmlscore = `<span>The total score is:  ${correctScores}</span>`
                $("#totalScore").append(htmlscore);

                $.getJSON('http://localhost:3000/questions', function(quizQuestions){
        $.each(quizQuestions, function(key, value){
            const populateData = 
            `
            <table class="table table-border table-striped">
            <thead>
            <tr>
                <th>no</th<th></th><th>the correct answer</th>
                </tr>
            </thead>
            <tbody>
            <tr> 
                <td class="">${value.id}</td> 
              
                <td class="bg-success">${value.answer}</td>         
            
            </tr>                        
            </tbody>
        </table>
            `
            ;
            $(".tableContent").append(populateData);
        });
    
    }
    );
  

        });

}); 
