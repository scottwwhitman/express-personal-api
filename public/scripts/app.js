console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: '/api',
    // error: handleError
    success: handleSuccess,
  });

  function handleSuccess(json) {
    console.log(json)
  }

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleSuccess,
    // error: handleError
  });

  function handleSuccess(json) {
    console.log(json)
  }


});
