chrome.storage.local.get(['quotes'], function(data){
  if (data.quotes){
    // function getQuote() {
    //   fetch("https://type.fit/api/quotes")
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //     // console.log(data);
    //     var quoteId = Math.floor(Math.random() * data.length)
    //     // console.log(data[quoteId].author)
    //     // show_quote(data[quoteId].text, data[quoteId].author)
    //     var quote = data[quoteId].text;
    //     var author = data[quoteId].author;
    //     var to_return = [quote, author]
    //     console.log(to_return)
    //     return to_return;
    //   });
    // }
    chrome.storage.local.get(['quote', 'author', 'changeQuote', 'expires_date', 'expires_month', 'expires_year'], function(data){
      if (data.changeQuote == 2) {
        $(document).ready(function() {
          var dt = new Date();
          if (data.quote != undefined && data.author != undefined && data.expires_date == dt.getDate() && data.expires_month == dt.getMonth() && data.expires_year == dt.getFullYear()) {
            show_quote(data.quote, data.author)
          } else {
            fetch("https://type.fit/api/quotes")
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              // console.log(data);
              var quoteId = Math.floor(Math.random() * data.length)
              // console.log(data[quoteId].author)
              // show_quote(data[quoteId].text, data[quoteId].author)
              var quote = data[quoteId].text;
              var author = data[quoteId].author;
              var to_return = [quote, author]
              console.log(to_return)
              var qte = to_return;
            chrome.storage.local.set({'quote': qte[0]})
            chrome.storage.local.set({'author': qte[1]})
            show_quote(qte[0], qte[1])
          })
        }
      })
      } else {
        fetch("https://type.fit/api/quotes")
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // console.log(data);
          var quoteId = Math.floor(Math.random() * data.length)
          // console.log(data[quoteId].author)
          // show_quote(data[quoteId].text, data[quoteId].author)
          var quote = data[quoteId].text;
          var author = data[quoteId].author;
          var to_return = [quote, author]
          console.log(to_return)
          var qte = to_return;
          show_quote(qte[0], qte[1])
      })
    }
  })
  } else {
    document.querySelector('.quote').remove()
  }
})

function show_quote(qt, thr){
  document.getElementById('quote').innerHTML = qt
  if (thr != undefined || thr != null) {
    // document.getElementById('author-footer').innerHTML = '<footer class="blockquote-footer" id="author" style="color: #ababab"></footer>'
    document.getElementById('author').innerHTML = thr
  } else {
    document.getElementById('author').innerHTML = "Unknown"
  }
}
