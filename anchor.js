var mutationobserver = null
var modify = false
function refresh() {
        chrome.storage.sync.get(['parse', 'goto'], function (items) {
                var url = window.location.toString()
                var src = items["parse"]
                var dst = items["goto"]
                //console.log("==", src)
                //console.log("==", dst, typeof(dst))
                var right = url.match(src)
                if (right == null) {
                        return
                }

                var selp = /#([^\s]+)/
                var jirap = /JIRA@([^\s]+)/
                var list = document.getElementsByClassName("commit-row-message")
                for (var i = 0; i < list.length; i++) {
                        var name = list[i].innerHTML
                        var sel = selp.exec(name)
                        var jira = jirap.exec(name)
                        var url
                        if (sel)
                                url = sel[1]
                        else if (jira)
                                url = jira[1]
                        else
                                continue
                        list[i].href = dst.replace(/#ID/, url)
                }
        })
}

function listenit() {
        var project_22 = document.getElementById('project_22');
        if (project_22 == null || mutationobserver != null)
                return
        mutationobserver = window.MutationObserver || window.WebKitMutationObserver;
        var observer = new mutationobserver(function(mutations, observer) {
                console.log("listen", modify)
                if (modify == false) {
                        modify = true
                        refresh()
                } else {
                        modify = false
                }
        });
        observer.observe(project_22, {'childList':true, 'subtree':true})
        refresh()
}

chrome.extension.onMessage.addListener(function(request, sender, response) {
        listenit()
        response({status:"ok"})
})

