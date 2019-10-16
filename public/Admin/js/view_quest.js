
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
  // if(page==1){
  //     $("prevPage").addAttr('disabled');
  // }else
  if (page > 1) {
      page--;
      fetchData();
  }
  console.log("Prev Page: " + page);
});

// handling the next-btn
$("#nextPage").on("click", function(){
//   if(page * pagelimit >=totalrecord){
//     $("#submitAnswerButon").hide();
//  }
  if (page * pagelimit < totalrecord) {
      page++;
      fetchData();
  }
  console.log("Next Page: " + page);
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
              const totalFetched = dataArr.length;
              console.log(totalFetched);
              
              let fetchData = "";           
              dataArr.forEach((item)=>{
                fetchData += `
                <tr>
                <th scope="row">${item.id}</th>
                <td>${item.added_question}</td>
                <td data-id="to">

                    <button id="edit" data-id="${item.id}" class="btn btn-xs" >pen</button>
                    <button id="remove" data-id="${item.id}" class="btn btn-xs" >X</button>                             
                </td>
                </tr>
                
                `;
                  
              });
              
              $(".contentTable").html(fetchData);
          }
      },
      error: function(err) {
          return err;
      }
  });
}


