$(document).ready(function () {

  //GET all accounts and populate the list
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: 'http://localhost:3000/accounts',
    success: function (data) {
      populateProfileCard(data);
    },
    error: function (e) {
      console.log("error");
    }
  });
  //GET the newly created profile detail
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/myProfile',
    success: function (data) {
      if (data != undefined) {
        $('#profileName').text(data.name);
        $('#profileAge').text(data.age);
        $('#profileGender').text(data.gender);
        $('#profileStatus').text(data.status);
        $('#profileCountry').text(data.country);
        $('#profileOccupation').text(data.occupation);
      }
    },
    error: function (e) {
      console.log("error");
    }
  });
});

//Populate all the profiles with like and dislike button
function populateProfileCard(profiles) {
  $("#profileList").html("");
  var html = ""
  $.each(profiles, function (index, object) {
    html += "" +
      '<div class="row">' +
      '<div class="col s4 offset-s4">' +
      '<div class="card red lighten-5">' +
      '<div class="card-content">' +
      '<span class="card-title red-text"><h4>' + object.name + '</h4></span>' +
      '<p><span class="">Gender:</span> ' + object.gender + '</p>' +
      '<p><span class="">Relationship Status:</span> ' + object.status + '</p>' +
      '<p><span class="">Country:</span> ' + object.country + '</p>' +
      '<p><span class="">Occupation:</span> ' + object.occupation + '</p>' +
      '</div>' +
      '<div class="card-action">' +
      '<button class="dislikeBtn" onclick="dislikeProfile(' + object.id + ');"><i class="material-icons">thumb_down</i></button>' +
      '<button id="likeBtn" onclick="likeProfile(' + object.id + ');"><i class="material-icons">thumb_up</i></button>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  });
  $("#profileList").append(html);
}

//this function is called when dislike button is clicked
function dislikeProfile(id) {
  $.ajax({
    type: 'POST',
    data: {
      "id": id
    },
    url: 'http://localhost:3000/dislikeProfile',
    success: function (data) {
      if (data != undefined && data.length > 0) {
        populateProfileCard(data);
      }
      else {
        $("#profileList").html("<h4 class='red-text text-lighten-2'>Sorry there are no more matches now!</h4>");
      }
    },
    error: function (e) {
      console.log("error");
    }
  });
}

//this function is called when like button is clicked
function likeProfile(id) {
  $.ajax({
    type: 'POST',
    data: {
      "id": id
    },
    url: 'http://localhost:3000/likeProfile',
    success: function (data) {
      if (data != undefined) {
        populateSideBySide(data);
      }
    },
    error: function (e) {
      console.log("error");
    }
  });
}

//show matched profiles side by side
function populateSideBySide(profile) {
  $("#matchingProfileDiv").css("display", "block");
  $("#profileList").remove();

  $('#matchedName').text(profile.name);
  $('#matchedAge').text(profile.age);
  $('#matchedGender').text(profile.gender);
  $('#matchedStatus').text(profile.status);
  $('#matchedCountry').text(profile.country);
  $('#matchedOccupation').text(profile.occupation);

}