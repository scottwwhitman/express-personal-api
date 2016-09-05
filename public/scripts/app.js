console.log("Sanity Check: JS is working!");
var template;
var profileTemplate;
var $divesitesList;
var $profileList;
var allDivesites = [];
var allProfile;

$(document).ready(function(){

  $.ajax({
    method: 'GET',
    url: '/api',
    // error: handleDocumentationError
    success: handleDocumentationSuccess,
  });

  function handleDocumentationSuccess(json) {
    // console.log(json)
  };

  $divesitesList = $('#divesiteTarget');
  $profileList = $('#profileTarget');

  // compile handlebars templates for divesites
  var source = $('#divesite-template').html();
  template = Handlebars.compile(source);

  // compile handlebars template for profile
  var profileSource = $('#profile-template').html();
  profileTemplate = Handlebars.compile(profileSource);

  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: handleProfileSuccess,
    // error: handleProfileError
  });

  function handleProfileSuccess(json) {
    // console.log(json);
    allProfile = json;
    renderProfile();
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

  $.ajax({
    method: 'GET',
    url: '/api/divesites',
    success: handleSuccess,
    // error: handleError
  });

  // helper function to render all posts to view
  // note: we empty and re-render the collection each time our post data changes
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

  $('#newDivesiteForm').on('submit', function(e) {
    e.preventDefault();
    console.log('new divesite serialized', $(this).serializeArray());
    $.ajax({
      method: 'POST',
      url: '/api/divesites',
      data: $(this).serializeArray(),
      success: newDivesiteSuccess,
      // error: newBookError
    });
  });

  function newDivesiteSuccess(json) {
    $('#newDivesiteForm input').val('');
    allDivesites.push(json);
    renderDivesites();
  }

  $divesitesList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/divesites/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/divesites/'+$(this).attr('data-id'),
      success: deleteDivesiteSuccess,
      // error: deleteBookError
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

  $divesitesList.on('submit', '#addAnimalForm', function(e) {
    e.preventDefault();
    console.log('new animals');
    $.ajax({
      method: 'POST',
      url: '/api/books/'+$(this).attr('data-id')+'/characters',
      data: $(this).serializeArray(),
      success: newCharacterSuccess,
      error: newCharacterError
    });
  });





});
