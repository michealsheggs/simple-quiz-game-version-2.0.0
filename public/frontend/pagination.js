
    const setdata =   $.ajax({
        url: "http://localhost:3000/questions",
        type: "GET",
        global: false,
        async: false,
        success: function(getdata){
            return getdata;
        },   
    }).responseJSON;

let totalrecord = setdata.length;
let page = 1;
let	pagelimit = 4;

    fetchData();

    // handling the prev-btn
    $("#prevPage").on("click", function(){
        if(page==1){
            $("prevPage").addAttr('disabled');
        }else
        if (page > 1) {
            page--;
            fetchData();
        }
        // console.log("Prev Page: " + page);
    });

    // handling the next-btn
    $("#nextPage").on("click", function(){
        if (page * pagelimit < totalrecord) {
            page++;
            fetchData();
        }
        // console.log("Next Page: " + page);
    });

    function fetchData() {
        // ajax() method to make api calls
        $.ajax({
            url: "http://localhost:3000/questions",
            type: "GET",
            data: {
                _page: page,
                _limit: pagelimit
            },
            success: function(dataArr) {
                console.log(dataArr);

                if (dataArr) {
                    // const totalFetched = dataArr.length;
                    // console.log(totalFetched);
                    
                    let fetchData = "";
                 
                    dataArr.forEach((item)=>{
                      fetchData += `<p class="question text-primary">question ${item.id}</p>
                        <h4> ${item.added_question}</h4><br/> 
                        <div class="option">
                        <div class='form-check'>
                        <input class='form-check-input' type="radio" name="optiontype${item.id}" id="optiontype" 
                        value="A">${item.option_one}

                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optiontype${item.id}" id="optiontype" 
                            value="B">${item.option_two}
                        
                            </div>
                            
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optiontype${item.id}" id="optiontype" 
                            value="C">${item.option_three}
                                
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="optiontype${item.id}" id="optiontype" 
                            value="D">${item.option_four}
                                
                            </div>            
                        </div>`;

                    });
                    
                    $("#Thequestionsection").html(fetchData);
                }
            },
            error: function(err) {
                return err;
            }
        });
    }


// $("$").on('click', function(){
//     let answerChosen= $(`input[name=optiontype${value.id}]:checked`).val()

// });