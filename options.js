function cset(param) {
        chrome.storage.sync.set(param, function() {
                console.log("write")
        })
}
var cget = chrome.storage.sync.get

function refresh() {
        var parse = document.getElementById("parse")
        var redirect = document.getElementById("goto")
        cget(['parse', 'goto'], function(items) {
                console.log(items)
                parse.value = items["parse"]
                redirect.value = items["goto"]
        })
}

function save() {
        var parse = document.getElementById("parse")
        var redirect = document.getElementById("goto")
        var name = "Anchor"
        var pv = parse.value
        var rv = redirect.value
        cset({'parse':pv, 'goto':rv})
        console.log(pv)
        console.log(rv)
}
refresh()
document.getElementById('save').addEventListener('click', save);

