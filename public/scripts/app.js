console.log("Sanity Check: JS is working!");
var template;
var profileTemplate;
var $divesitesList;
var $profileList;
var allDivesites = [];
var allProfile;

$(document).ready(function(){

  // API call for site documentation
  $.ajax({
    method: 'GET',
    url: '/api',
    error: handleDocumentationError,
    success: handleDocumentationSuccess
  });

  function handleDocumentationSuccess(json) {
    // console.log(json)
  };

  function handleDocumentationError(e) {
    console.log('Failed to load documentation');
  }


  // Setting handlebars target variables
  $divesitesList = $('#divesiteTarget');
  $profileList = $('#profileTarget');

  // compile handlebars templates for divesites
  var source = $('#divesite-template').html();
  template = Handlebars.compile(source);

  // compile handlebars template for profile
  var profileSource = $('#profile-template').html();
  profileTemplate = Handlebars.compile(profileSource);


  // API call for all profile info
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleProfileSuccess,
    error: handleProfileError
  });

  function handleProfileSuccess(json) {
    // console.log(json);
    allProfile = json;
    renderProfile();
  }

  function handleProfileError(e) {
    console.log('Failed to load profile');
  }

  function renderProfile () {
    // pass `allProfile` into the template function
    var profileHtml = profileTemplate({
      name: allProfile.name,
      currentCity: allProfile.currentCity,
      pets: allProfile.pets,
      githubLink: allProfile.githubLink,
      personalSiteLink: allProfile.personalSiteLink
      });
    // append html to the view
    $profileList.append(profileHtml);
  }


  // API call for all divesites
  $.ajax({
    method: 'GET',
    url: '/api/divesites',
    success: handleSuccess,
    error: handleError
  });

  // helper function to render all posts to view
  // note: we empty and re-render the collection each time our post or update data changes
  function renderDivesites () {
    // empty existing posts from view
    $divesitesList.empty();

    // pass `allDivesites` into the template function
    var divesitesHtml = template({ divesites: allDivesites });

    // append html to the view
    $divesitesList.append(divesitesHtml);
  }

  function handleSuccess(json) {
    allDivesites = json;
    renderDivesites();
    console.log(allDivesites);
  }

  function handleError(e) {
    console.log('uh oh');
    $divesitesList.text('Failed to load divesites, is the server working?');
  }


  // API call to add a new divesite
  $('#newDivesiteForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new divesite serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/divesites',
      data: $(this).serializeArray(),
      success: newDivesiteSuccess,
      error: newDivesiteError
    });
  });

  function newDivesiteSuccess(json) {
    $('#newDivesiteForm input').val('');
    allDivesites.push(json);
    renderDivesites();
  }

  function newDivesiteError(e) {
    console.log('Failed to add new divesite');
  }


  // API call to delete a divesite
  $divesitesList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/divesites/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/divesites/'+$(this).attr('data-id'),
      success: deleteDivesiteSuccess,
      error: deleteDivesiteError
    });
  });

  function deleteDivesiteSuccess(json) {
    var divesite = json;
    console.log(json);
    var divesiteId = divesite._id;
    console.log('delete divesite', divesiteId);
    // find the divesite with the correct ID and remove it from our allDivesites array
    for(var index = 0; index < allDivesites.length; index++) {
      if(allDivesites[index]._id === divesiteId) {
        allDivesites.splice(index, 1);
        break;  // we found our divesite - no reason to keep searching (this is why we didn't use forEach)
      }
    }
    renderDivesites();
  }

  function deleteDivesiteError(e) {
    console.log('Failed to delete divesite');
  }


  // API call to add a new place
  $('#newPlaceForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new place serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/places',
      data: $(this).serializeArray(),
      success: newPlaceSuccess,
      error: newPlaceError
    });
  });

  function newPlaceSuccess(json) {
    $('#newPlaceForm input').val('');
    console.log(json);
  }

  function newPlaceError(e) {
    console.log('Failed to add new place');
  }


  // API call to add a new country
  $('#newCountryForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new country serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/countries',
      data: $(this).serializeArray(),
      success: newCountrySuccess,
      error: newCountryError
    });
  });

  function newCountrySuccess(json) {
    $('#newCountryForm input').val('');
    console.log(json);
  }

  function newCountryError(e) {
    console.log('Failed to add new country');
  }


  // API call to add a new animal
  $('#newAnimalForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new animal serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/animals',
      data: $(this).serializeArray(),
      success: newAnimalSuccess,
      error: newAnimalError
    });
  });

  function newAnimalSuccess(json) {
    $('#newAnimalForm input').val('');
    console.log(json);
  }

  function newAnimalError(e) {
    console.log('Failed to add new animal');
  }


  // API call to add a new animal to a divesite
  $divesitesList.on('submit', '#addAnimalForm', function(e) {
    e.preventDefault();
    console.log('new animals');
    $.ajax({
      method: 'PUT',
      url: '/api/divesites/'+$(this).attr('data-id')+'/animals',
      data: $(this).serializeArray(),
      success: newDivesiteAnimalSuccess,
      error: newDivesiteAnimalError
    });
  });

  function newDivesiteAnimalSuccess(json) {
    $('#addAnimalForm input').val('');
    console.log(json);
    var divesite = json;
    var divesiteId = divesite._id;
    console.log('update divesite', divesiteId);
    // find the divesite with the correct ID and update it in the allDivesites array
    for(var index = 0; index < allDivesites.length; index++) {
      if(allDivesites[index]._id === divesiteId) {
        allDivesites[index] = divesite;
        console.log(allDivesites);
        break;  // we found our divesite - no reason to keep searching (this is why we didn't use forEach)
      }
    }
    renderDivesites();
  }

  function newDivesiteAnimalError(e) {
    console.log('Failed to add new animal to divesite');
  }


  // API call to update the date visited a divesite
  $divesitesList.on('submit', '#updateDateForm', function(e) {
    e.preventDefault();
    console.log('new date');
    $.ajax({
      method: 'PUT',
      url: '/api/divesites/'+$(this).attr('data-id')+'/date',
      data: $(this).serializeArray(),
      success: newDivesiteDateSuccess,
      error: newDivesiteDateError
    });
  });

  function newDivesiteDateSuccess(json) {
    $('#updateDateForm input').val('');
    console.log(json);
    var divesite = json;
    var divesiteId = divesite._id;
    console.log('update divesite', divesiteId);
    // find the divesite with the correct ID and update it in the allDivesites array
    for(var index = 0; index < allDivesites.length; index++) {
      if(allDivesites[index]._id === divesiteId) {
        allDivesites[index] = divesite;
        console.log(allDivesites);
        break;  // we found our divesite - no reason to keep searching (this is why we didn't use forEach)
      }
    }
    renderDivesites();
  }

  function newDivesiteDateError(e) {
    console.log('Failed to update divesite date');
  }


  // API call to update the image for a divesite
  $divesitesList.on('submit', '#updateImageForm', function(e) {
    e.preventDefault();
    console.log('new image');
    $.ajax({
      method: 'PUT',
      url: '/api/divesites/'+$(this).attr('data-id')+'/image',
      data: $(this).serializeArray(),
      success: newDivesiteImageSuccess,
      error: newDivesiteImageError
    });
  });

  function newDivesiteImageSuccess(json) {
    $('#updateImageForm input').val('');
    console.log(json);
    var divesite = json;
    var divesiteId = divesite._id;
    console.log('update divesite', divesiteId);
    // find the divesite with the correct ID and update it in the allDivesites array
    for(var index = 0; index < allDivesites.length; index++) {
      if(allDivesites[index]._id === divesiteId) {
        allDivesites[index] = divesite;
        console.log(allDivesites);
        break;  // we found our divesite - no reason to keep searching (this is why we didn't use forEach)
      }
    }
    renderDivesites();
  }

  function newDivesiteImageError(e) {
    console.log('Failed to update divesite image');
  }


});
