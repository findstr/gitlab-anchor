console.log("===========anchor background===============")
chrome.tabs.onUpdated.addListener(function(tabid, info, tab) {
        if (info.status != 'complete') {
                return
        }
        var param = {changetab:tab.id}
        chrome.tabs.sendMessage(tab.id, param, function(response) {
                console.log(response.status);
        });
});


