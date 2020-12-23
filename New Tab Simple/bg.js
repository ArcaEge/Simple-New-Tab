var d;
var dt;

// Loader

$('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
$(window).on('load', function(){
  setTimeout(removeLoader, 0);
});

function removeLoader(){
    $("#loadingDiv").fadeOut(500, function() {
      $("#loadingDiv").remove();
  });
}

/* --------Background-------- */
// Set Background

function get_set(){
  chrome.storage.sync.get(['sync'], function(data) {
    if (data.sync) {
      console.log('hi')
      chrome.storage.sync.get(['img_type', 'url_img', 'description', 'download_url', 'html_url', 'user', 'username', 'expires_date', 'expires_month', 'expires_year', 'quotes'], get_set_sync);
    } else {
      chrome.storage.local.get(['img_type', 'url_img', 'description', 'download_url', 'html_url', 'user', 'username', 'expires_date', 'expires_month', 'expires_year', 'quotes'], get_set_local);
    }
  });
}

function get_set_local(data) {
  var url = 'https://api.unsplash.com/photos/random?client_id=b-CX8HO3iHzUXewY5dAkVv0WE4pYJHzyGaZwEbvk5TM&content_filter=high&query=' + data.img_type;
  console.log(url);
  $.getJSON(url, function (result) {
    d = new Date()
    chrome.storage.local.set({'url_img': result.urls.full})
    chrome.storage.local.set({'description': result.alt_description})
    chrome.storage.local.set({'download_url': result.links.download})
    chrome.storage.local.set({'html_url': result.links.html})
    chrome.storage.local.set({'user': result.user.links.html})
    chrome.storage.local.set({'username': result.user.name})
    chrome.storage.local.set({'expires_date': d.getDate()})
    chrome.storage.local.set({'expires_month': d.getMonth()})
    chrome.storage.local.set({'expires_year': d.getFullYear()})
    var body = document.querySelector("body");
    body.style.backgroundImage = "url('" + result.urls.full + "')";
    body.style.height = document.documentElement.clientHeight + "px"
    document.querySelector('#attribution').innerHTML = "<a class='text-light' id='photo' href='" + result.links.html + "'>Photo</a> by <a href='" + result.user.links.html + "' class='text-light'>" + result.user.name + "</a> on <a href='https://unsplash.com' class='text-light'>Unsplash</a>";
    console.log(result.description)
  });
}
function get_set_sync(data) {
  var url = 'https://api.unsplash.com/photos/random?client_id=b-CX8HO3iHzUXewY5dAkVv0WE4pYJHzyGaZwEbvk5TM&content_filter=high&query=' + data.img_type;
  console.log(url);
  console.log(data);
  $.getJSON(url, function (result) {
    d = new Date()
    chrome.storage.sync.set({'url_img': result.urls.full})
    chrome.storage.sync.set({'description': result.alt_description})
    chrome.storage.sync.set({'download_url': result.links.download})
    chrome.storage.sync.set({'html_url': result.links.html})
    chrome.storage.sync.set({'user': result.user.links.html})
    chrome.storage.sync.set({'username': result.user.name})
    chrome.storage.sync.set({'expires_date': d.getDate()})
    chrome.storage.sync.set({'expires_month': d.getMonth()})
    chrome.storage.sync.set({'expires_year': d.getFullYear()})
    var body = document.querySelector("body");
    body.style.backgroundImage = "url('" + result.urls.full + "')";
    body.style.height = document.documentElement.clientHeight + "px"
    document.querySelector('#attribution').innerHTML = "<a class='text-light' id='photo' href='" + result.links.html + "'>Photo</a> by <a href='" + result.user.links.html + "' class='text-light'>" + result.user.name + "</a> on <a href='https://unsplash.com' class='text-light'>Unsplash</a>";
    console.log(result.description)
  });
}

// Get Background

$(document).ready(function() {
  dt = new Date();
  chrome.storage.sync.get(['sync'], function (data) {
    if (data.sync) {
      chrome.storage.sync.get(['url_img', 'description', 'download_url', 'html_url', 'user', 'username', 'expires_date', 'expires_month', 'expires_year', 'quotes'], checkStuff)
    } else {
      chrome.storage.local.get(['url_img', 'description', 'download_url', 'html_url', 'user', 'username', 'expires_date', 'expires_month', 'expires_year', 'quotes'], checkStuff)
    }
  })
});

function checkStuff(data) {
  var body = document.querySelector("body");
  dt = new Date();
  if (data.expires_date != dt.getDate() || data.expires_month != dt.getMonth() || data.expires_year != dt.getFullYear()) {
    get_set()
    if (data.quotes){
      body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url('" + data.url_img + "')";
    } else {
      body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1)), url('" + data.url_img + "')";
    }
    if (data.description != null){
      $('#photo').tooltip({title: data.description, animation: true});
    }
  } else{
    document.querySelector('#attribution').innerHTML = "<a class='text-light' id='photo' href='" + data.html_url + "'>Photo</a> by <a href='" + data.user + "' class='text-light'>" + data.username + "</a> on <a href='https://unsplash.com' class='text-light'>Unsplash</a>";
    if (data.description != null){
      $('#photo').tooltip({title: data.description, animation: true});
    }
    if (data.quotes){
      body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url('" + data.url_img + "')";
    } else {
      body.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1)), url('" + data.url_img + "')";
    }
    body.style.height = document.documentElement.clientHeight + "px"
  }
}

// Background Resize

document.querySelector("body").addEventListener("onresize", function(){
  document.querySelector("body").style.height = document.documentElement.clientHeight + "px";
  document.querySelector("body").style.width = document.documentElement.clientWidth + "px";
  body.style.backgroundImage = body.style.backgroundImage
});

// Buttons and Attribution

document.querySelector('#settings').addEventListener("click", function() {
  window.open(chrome.runtime.getURL('options.html'));
});

document.querySelector('#download').addEventListener('click', function () {
  chrome.storage.local.get(['download_url'], function(data){
    chrome.downloads.download({
      url: data.download_url
    });
  })
})

// Refresh when Save & Go Back button pressed on options page

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.msg == "refresh")
      sendResponse({status: "OK"});
      location.reload();
  }
);

// Search Box

$('#searcher').click(function() {
  var query = $('#query').value
});

const q = $('#query');

  $("#form").submit(function(e) {
      e.preventDefault();
      console.log(q.value)
      chrome.search.query({text: q.val()});
  });
