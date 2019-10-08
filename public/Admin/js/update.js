
 $(`.edit`).on('click',function(e){

        $.getJSON(`http://localhost:3000/questions`, function(data){
        $.each(data, function(key, value){
                const populate = 
                `

                <div class="form-group">
                        <label for="createquestion">create question</label>
                        <textarea class="form-control" name="question" id="createquestion" cols="10" rows="2" 
                        placeholder="enter your question">${value.added_question}</textarea>
                </div>
                <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">A</div>
                        </div>
                        <input type="text" class="form-control" id="option_one" name="option_one" placeholder="option one"
                        value="${value.option_one}">
                </div>
                <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">B</div>
                        </div>
                        <input type="text" class="form-control" id="option_two" name="option_two" placeholder="option two"
                        value="${value.option_two}">
                </div>
                <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">C</div>
                        </div>
                        <input type="text" class="form-control" id="option_three" name="option_three" placeholder="option three"
                        value="${value.option_three}">
                </div>
                <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                        <div class="input-group-text">D</div>
                        </div>
                        <input type="text" class="form-control" id="option_four" name="option_four" placeholder="option four"
                        value="${value.option_four}">
                </div>
                
                `
                ;
                $("#editquestion").append(populate);
        });
        
        }
        );
});
