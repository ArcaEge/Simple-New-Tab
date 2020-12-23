document.querySelector('#back').addEventListener("click", function() {
  close_save();
});

function close_save() {
  save_options();
  chrome.runtime.sendMessage({msg: "refresh"}, function(response) {
    console.log(response.status);
  });
  window.close();
}

function close_discard() {
  window.close();
}

document.getElementById("alert").style.display = "none";

function save_options() {
  var type_img = document.getElementById('image_type').value;
  if (document.getElementById('syncCheckInner').checked) {
    chrome.storage.sync.get(['img_type'], function (data) {
      if (type_img != data.img_type) {
        chrome.storage.sync.remove(['expires_date', 'expires_month', 'expires_year'])
      }
    })
    if (document.getElementById('newtab').checked) {
      var quote_change = 1
    } else if (document.getElementById('day').checked) {
      var quote_change = 2
    }

    var quotes_checked = document.getElementById('quoteSwitch').checked;
    chrome.storage.sync.set({'sync': document.getElementById('syncCheckInner').checked});
    chrome.storage.sync.set({'img_type': type_img});
    chrome.storage.sync.set({'quotes': quotes_checked});
    chrome.storage.sync.set({'changeQuote': quote_change});
  } else {
    chrome.storage.local.get(['img_type'], function (data) {
      if (type_img != data.img_type) {
        chrome.storage.local.remove(['expires_date', 'expires_month', 'expires_year'])
      }
    })
    if (document.getElementById('newtab').checked) {
      var quote_change = 1
    } else if (document.getElementById('day').checked) {
      var quote_change = 2
    }

    var quotes_checked = document.getElementById('quoteSwitch').checked;
    chrome.storage.sync.set({'sync': document.getElementById('syncCheckInner').checked});
    chrome.storage.local.set({'img_type': type_img});
    chrome.storage.local.set({'quotes': quotes_checked});
    chrome.storage.local.set({'changeQuote': quote_change});
  }

  var alert = document.getElementById('alert');
  $("#alert").first().hide().slideDown(500).delay(5000).slideUp(500, function () {
       $(this).hide();
  });
}

function restore_options() {
  chrome.storage.sync.get(['sync'], function (data) {
  if (data.sync) {
    chrome.storage.sync.get({
      img_type: 'nature',
      quotes: true,
      changeQuote: 2
    }, function(items) {
      document.getElementById('image_type').value = items.img_type;
      document.getElementById('quoteSwitch').checked = items.quotes;
      if (items.changeQuote == 1) {
        document.getElementById('newtab').checked = true;
        document.getElementById('day').checked = false;
      } else {
        document.getElementById('day').checked = true;
        document.getElementById('newtab').checked = false;
      }
      if (items.quotes == false) {
        document.getElementById('newtab').disabled = true;
        document.getElementById('day').disabled = true;
        document.getElementById('disable').classList.remove("text-body");
        document.getElementById('disable').classList.add("text-muted");
      }
    });
  } else {
    chrome.storage.local.get({
      img_type: 'nature',
      quotes: true,
      changeQuote: 2
    }, function(items) {
      document.getElementById('image_type').value = items.img_type;
      document.getElementById('quoteSwitch').checked = items.quotes;
      if (items.changeQuote == 1) {
        document.getElementById('newtab').checked = true;
        document.getElementById('day').checked = false;
      } else {
        document.getElementById('day').checked = true;
        document.getElementById('newtab').checked = false;
      }
      if (items.quotes == false) {
        document.getElementById('newtab').disabled = true;
        document.getElementById('day').disabled = true;
        document.getElementById('disable').classList.remove("text-body");
        document.getElementById('disable').classList.add("text-muted");
      }
    });
  }
});
  chrome.storage.sync.get({
    sync: true,
  }, function(item) {
    document.getElementById('syncCheckInner').checked = item.sync;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('back').addEventListener('click', close_save);
document.getElementById('discard').addEventListener('click', close_discard);

var checkbox = document.querySelector("#quoteSwitch");

checkbox.addEventListener('change', function() {
  if(this.checked) {
    document.getElementById('newtab').disabled = false;
    document.getElementById('day').disabled = false;
    document.getElementById('disable').classList.remove("text-muted");
    document.getElementById('disable').classList.add("text-body");
  } else {
    document.getElementById('newtab').disabled = true;
    document.getElementById('day').disabled = true;
    document.getElementById('disable').classList.remove("text-body");
    document.getElementById('disable').classList.add("text-muted");
  }
});
