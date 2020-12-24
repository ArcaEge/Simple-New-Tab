chrome.runtime.onInstalled.addListener(function(details){
    chrome.storage.sync.set({'img_type': 'landscapes'})
    chrome.storage.sync.set({'quotes': true})
    chrome.storage.sync.set({'changeQuote': 2})
    chrome.storage.sync.set({'sync': true})
    chrome.storage.local.set({'img_type': 'landscapes'})
    chrome.storage.local.set({'quotes': true})
    chrome.storage.local.set({'changeQuote': 2})
});
