
    const getPlayers =   $.ajax({
        url: "http://localhost:3000/players_scores",
        type: "GET",
        global: false,
        async: false,
        success: function(getdata){
            return getdata;
        },   
    }).responseJSON;

let totalrecord = getPlayers.length;
let page = 1;
let	pagelimit = 4;
console.log(totalrecord);

    fetchData();

    // handling the prev-page
    if(page == 1){
        $("#prev_btn").attr("disabled", true);
        
    }else if(page >1){
        $("#prev_btn").attr("disabled", false); 
    }

    
    //last page
    if(page * pagelimit >= totalrecord){
        $("#next_btn").attr("disabled", true);
     
    }

    $("#prev_Page").on("click", function(){
        if (page > 1) {
            page--;
            fetchData();
        }
        // console.log("Prev Page: " + page);
    });

    // handling the next-page
    $("#next_Page").on("click", function(){
        if (page * pagelimit < totalrecord) {
            page++;
            fetchData();
        }
    });

    //fetch data
    function fetchData() {
        // ajax() method to fetch  scores
        $.ajax({
            url: "http://localhost:3000/players_scores",
            type: "GET",
            data: {
                _page: page,
                _limit: pagelimit
            },
            success: function(dataArr) {
                console.log(dataArr);

                if (dataArr) {                
                    let fetchScores = "";
                 
                    dataArr.forEach((item)=>{
                        fetchScores +=  `
                      <tr>
                         <td>${item.id}</td>
                         <td>${item.player_userName}</td>
                         <td>${item.played_time}</td>
                         <td>${item.totalScore}</td>
                     </tr>
                                           
                     `;

                    });
                    
                    $("#appendScores").html(fetchScores);
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