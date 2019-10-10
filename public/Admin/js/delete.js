//Deleting

$(".contentTable").delegate('#remove', 'click', function(){
    
    $.ajax({
      type: 'DELETE',
      url : 'http://localhost:3000/questions/'+ $(this).attr('data-id'),
      success: function(){
       
        alert('working');
      },
      error: function(){
        alert('no working');
      }
    });
  });
  