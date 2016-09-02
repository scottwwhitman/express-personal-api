console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: '/api',
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess(json) {
    console.log(json)
  }


});
