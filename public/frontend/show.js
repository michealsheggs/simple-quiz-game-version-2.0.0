 
    $.getJSON('http://localhost:3000/questions', function(quizQuestions){
        $.each(quizQuestions, function(key, value){
            const populateData = 
            `
            <table class="table table-border table-striped">
            <thead>
                <th>${value.id}</th><th>the correct answer</th>
            </thead>
            <tbody>
            <tr> 
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
  

