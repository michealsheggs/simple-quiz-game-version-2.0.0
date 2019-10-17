//get random quizzies category
const setRandom =   $.ajax({
  url: "http://localhost:3000/Random",
  type: "GET",
  global: false,
  async: false,
  success: function(getRand){
      return getRand;
  },   
}).responseJSON;

let totalRandRecord = setRandom.length;
let randPage = 1;
let	randPageLimit = 4;

fetchRandom();

// handling the prev-btn
$("#randPrevPage").on("click", function(){
  // if(page==1){
  //     $("prevPage").addAttr('disabled');
  // }else
  if (randPage > 1) {
     randPage--;
      fetchRandom();
  }
});

// handling the next-btn
$("#randNextPage").on("click", function(){
  if (randPage * randPageLimit < totalRandRecord) {
      randPage++;
      fetchRandom();
  }
});

function fetchRandom() {
  // ajax() method to make api calls
  $.ajax({
      url: "http://localhost:3000/Random", 
      type: "GET",
      data: {
          _page: randPage,
          _limit: randPageLimit
      },
      success: function(dataArr) {
          if (dataArr) {
              let displayRandom= "";           
              dataArr.forEach((randItem)=>{
                displayRandom += `
                <tr>
                <th scope="row">${randItem.id}</th>
                <td>${randItem.added_question}</td>
                <td>${randItem.option_one}</td>
                <td>${randItem.option_two}</td>
                <td>${randItem.option_three}</td>
                <td>${randItem.option_four}</td>
                <td>${randItem.answer}</td>

                </tr>
                
                `;
                  
              });
              
              $(".randomTable").html(displayRandom);
          }
      },
      error: function(err) {
          return err;
      }
  });
}


//get chemistry quizzies category
const setChemistry =   $.ajax({
  url: "http://localhost:3000/Chemistry",
  type: "GET",
  global: false,
  async: false,
  success: function(getChem){
      return getChem;
  },   
}).responseJSON;

let totalChemRecord = setChemistry.length;
let chemPage = 1;
let	chemPageLimit = 4;

fetchChemistry();

// handling the prev-btn
$("#chemPrevPage").on("click", function(){
  if (chemPage > 1) {
    chemPage--;
    fetchChemistry();
  }
});

// handling the next-btn
$("#chemPextPage").on("click", function(){
  if (chemPage * chemPageLimit < totalChemRecord) {
    chemPage++;
    fetchChemistry();
  }
});

function fetchChemistry() {
  // ajax() method to make api calls
  $.ajax({
      url: "http://localhost:3000/Chemistry", 
      type: "GET",
      data: {
          _page: chemPage,
          _limit: chemPageLimit
      },
      success: function(dataArr) {
          if (dataArr) {
              let displayChem = "";           
              dataArr.forEach((chemItem)=>{
                displayChem += `
                <tr>
                <th scope="row">${chemItem.id}</th>
                <td>${chemItem.added_question}</td>
                <td>${chemItem.option_one}</td>
                <td>${chemItem.option_two}</td>
                <td>${chemItem.option_three}</td>
                <td>${chemItem.option_four}</td>
                <td>${chemItem.answer}</td>

                </tr>
                
                `;
                  
              });
              
              $(".chemistryTable").html(displayChem);
          }
      },
      error: function(err) {
          return err;
      }
  });
}


//get biology quizzies category
const setBiology =   $.ajax({
  url: "http://localhost:3000/Biology",
  type: "GET",
  global: false,
  async: false,
  success: function(getBio){
      return getBio;
  },   
}).responseJSON;

let totalBioRecord = setBiology.length;
let bioPage = 1;
let	bioPageLimit = 4;

fetchBiology();

// handling the prev-btn
$("#bioPrevPage").on("click", function(){
  if (bioPage > 1) {
    bioPage--;
    fetchBiology();
  }
});

// handling the next-btn
$("#bioNextPage").on("click", function(){
//   if(page * pagelimit >=totalrecord){
//     $("#submitAnswerButon").hide();
//  }
  if (bioPage * bioPageLimit < totalBioRecord) {
    bioPage++;
      fetchBiology();
  }
});

function fetchBiology() {
  // ajax() method to make api calls
  $.ajax({
      url: "http://localhost:3000/Biology", 
      type: "GET",
      data: {
          _page: bioPage,
          _limit: bioPageLimit
      },
      success: function(dataArr) {
          if (dataArr) {              
              let displayBio = "";           
              dataArr.forEach((bioItem)=>{
                displayBio += `
                <tr>
                <th scope="row">${bioItem.id}</th>
                <td>${bioItem.added_question}</td>
                <td>${bioItem.option_one}</td>
                <td>${bioItem.option_two}</td>
                <td>${bioItem.option_three}</td>
                <td>${bioItem.option_four}</td>
                <td>${bioItem.answer}</td>

                </tr>
                
                `;
                  
              });
              
              $(".biologyTable").html(displayBio);
          }
      },
      error: function(err) {
          return err;
      }
  });
}


//get physics quizzies category
const setPhysic =   $.ajax({
  url: "http://localhost:3000/Physics",
  type: "GET",
  global: false,
  async: false,
  success: function(getPhy){
      return getPhy;
  },   
}).responseJSON;

let totalPhyRecord = setPhysic.length;
let phyPage = 1;
let	phyPageLimit = 4;

fetchPhysics();

// handling the prev-btn
$("#phyPrevPage").on("click", function(){
  if (phyPage > 1) {
      paphyPagege--;
      fetchPhysics();
  }
});

// handling the next-btn
$("#phyNextPage").on("click", function(){
  if (phyPage * phyPageLimit < totalPhyRecord) {
    phyPage++;
      fetchPhysics();
  }
});

function fetchPhysics() {
  // ajax() method to make api calls
  $.ajax({
      url: "http://localhost:3000/Physics", 
      type: "GET",
      data: {
          _page: phyPage,
          _limit: phyPageLimit
      },
      success: function(dataArr) {
          console.log(dataArr);

          if (dataArr) {        
              let displayPhy = "";           
              dataArr.forEach((phyItem)=>{
                displayPhy += `
                <tr>
                <th scope="row">${phyItem.id}</th>
                <td>${phyItem.added_question}</td>
                <td>${phyItem.option_one}</td>
                <td>${phyItem.option_two}</td>
                <td>${phyItem.option_three}</td>
                <td>${phyItem.option_four}</td>
                <td>${phyItem.answer}</td>

                </tr>
                
                `;
                  
              });
              
              $(".physicsTable").html(displayPhy);
          }
      },
      error: function(err) {
          return err;
      }
  });
}


//get Maths quizzies category
const setMath =   $.ajax({
  url: "http://localhost:3000/Maths",
  type: "GET",
  global: false,
  async: false,
  success: function(getMath){
      return getMath;
  },   
}).responseJSON;

let totalMathRecord = setMath.length;
let mathPage = 1;
let	mathPageLimit = 4;

fetchMaths();

// handling the prev-btn
$("#mathPrevPage").on("click", function(){
  if (mathPage > 1) {
    mathPage--;
    fetchMaths();
  }
});

// handling the next-btn
$("#mathNextPage").on("click", function(){
  if (mathPage * mathPageLimit < totalMathRecord) {
    mathPage++;
    fetchMaths();
  }
});

function fetchMaths() {
  // ajax() method to make api calls
  $.ajax({
      url: "http://localhost:3000/Maths", 
      type: "GET",
      data: {
          _page: mathPage,
          _limit: mathPageLimit
      },
      success: function(dataArr) {
          if (dataArr) {
              let displayMath = "";           
              dataArr.forEach((mathItem)=>{
                displayMath += `
                <tr>
                <th scope="row">${mathItem.id}</th>
                <td>${mathItem.added_question}</td>
                <td>${mathItem.option_one}</td>
                <td>${mathItem.option_two}</td>
                <td>${mathItem.option_three}</td>
                <td>${mathItem.option_four}</td>
                <td>${mathItem.answer}</td>

                </tr>
                
                `;
                  
              });
              
              $(".mathsTable").html(displayMath);
          }
      },
      error: function(err) {
          return err;
      }
  });
}


//Sports quizzies category
//get sports quizzies category
const setSport =   $.ajax({
  url: "http://localhost:3000/Sports",
  type: "GET",
  global: false,
  async: false,
  success: function(getSport){
      return getSport;
  },   
}).responseJSON;

let totalSportRecord = setSport.length;
let sportPage = 1;
let	sportPageLimit = 4;

fetchSports();

// handling the prev-btn
$("#sportPrevPage").on("click", function(){
  if (sportPage > 1) {
    sportPage--;
    fetchSports();
  }
});

// handling the next-btn
$("#sportNextPage").on("click", function(){
  if (sportPage * sportPageLimit < totalSportRecord) {
    sportPage++;
    fetchSports();
  }
});

function fetchSports() {
  // ajax() method to make api calls
  $.ajax({
      url: "http://localhost:3000/Sports", 
      type: "GET",
      data: {
          _page: sportPage,
          _limit: sportPageLimit
      },
      success: function(dataArr) {
          if (dataArr) {
              let displaySport = "";           
              dataArr.forEach((sportItem)=>{
                displaySport += `
                <tr>
                <th scope="row">${sportItem.id}</th>
                <td>${sportItem.added_question}</td>
                <td>${sportItem.option_one}</td>
                <td>${sportItem.option_two}</td>
                <td>${sportItem.option_three}</td>
                <td>${sportItem.option_four}</td>
                <td>${sportItem.answer}</td>

                </tr>
                
                `;
                  
              });
              
              $(".sportsTable").html(displaySport);
          }
      },
      error: function(err) {
          return err;
      }
  });
}


