//display the wuestions and options in the frontpage

$.getJSON('http://localhost:3000/questions', function(data){
        $.each(data, function(key, value){
            const populate = 
            `
            <p class="question text-primary">question ${value.id}</p>
            <h4> ${value.added_question}</h4><br/> 

    
                <div class="option">
                    <div class='form-check'>
                    <input class='form-check-input' type="radio" name="optiontype${value.id}" id="optiontype" value="A">${value.option_one}

                      </div>
                      <div class="form-check">
                      <input class="form-check-input" type="radio" name="optiontype${value.id}" id="optiontype" value="B">${value.option_two}
                    
                      </div>
                     
                      <div class="form-check">
                      <input class="form-check-input" type="radio" name="optiontype${value.id}" id="optiontype" value="C">${value.option_three}
                          
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="radio" name="optiontype${value.id}" id="optiontype" value="D">${value.option_four}
                          
                        </div>
                        
                </div>
              </div>
          </div>
            `
            ;
            $("#Thequestionsection").append(populate);
        });
       
    }
    );
    


    //display the questions on the admin page
    $.getJSON('http://localhost:3000/questions', function(quizQuestions){
      $.each(quizQuestions, function(key,value){
          let populateData = `
        <tr>
            <th scope="row">${value.id}</th>
            <td>${value.added_question}</td>
            <td>
                <a id="edit"href="actions.html?edit${value.id}" class="btn btn-primary btn-xs btn-default"><span class="glyphicon glyphicon-pencil"></span></a>
                 <a id="delete${value.id}" href="actions.html?delete${value.id}" class="btn btn-primary btn-xs btn-default"><span class="glyphicon glyphicon-remove"></span></a>
            </td>
        </tr>
        ` ;
          $(".questionContent").append(populateData);

      });

  });


  //updating  the questions

  $("#edit").hover(function(e){
    e.stopPropagation();
    // $.ajax({
alert('somthing');
    // })
    const editQuestion = $("#edit${value.added_question}").val();
    const edit_option_one = $("#edit${value.option_one}").val();
    const edit_option_two = $("#edit${value.two}").val();
    const edit_option_three = $("#edit${value.option_three}").val();
    const edit_option_four = $("#edit${value.option_four}").val();

console.log('working');

  })