const originalTitle = document.title
console.log(chrome.runtime.getURL('media/aqua.png'));
console.log('test')
//newicon_path('https://jelcraft.tk/imgs/webpage-icons/Business.png')
newicon_path(chrome.runtime.getURL('media/aqua.png'))

//-- Rename using popup --
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.id == "title") {
        if(!request.title) {
            document.title = originalTitle;
        } else {
            document.title = request.title;
        }
    } else if(request.id == "faviconApply") {
        newicon_path(request.path)
    }
})
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     newicon_path(request.path)
// })

//-- Rename using keybind --
document.addEventListener("keydown", (event) => {
    if(event.shiftKey && event.altKey){
        if(event.code == 'KeyR'){
            console.log("Keybind pressed!")
            let prompt = window.prompt('Rename Tab:')
            if(prompt) {
                document.title = prompt
            } else {
                document.title = originalTitle
            }
        } else if(event.code == 'KeyF'){
            newicon();
        }
    }
})

function newicon(){
    let picture = window.prompt("picture URL"),
        urlR = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        regexurl = new RegExp(urlR);
    let alreadylinks = document.querySelectorAll("link[rel~='icon']");
    alreadylinks.forEach(element =>{
        element.remove();
    });
    let link = document.createElement('link');
    link.rel = 'icon';
    link.type = "image/png";
    document.getElementsByTagName('head')[0].appendChild(link);
    if(!picture.match(regexurl)){
        return alert("incorrect url");
    }
    if(picture){
        console.log(picture);
        link.href = picture;
        link.mce_href = picture;
        // sommige sites hebben "mcehref" geen idee wat dat mag zijn maar het werkt in ieder geval niet.
    }
}

function newicon_path(path){
    let picture = path;
    let alreadylinks = document.querySelectorAll("link[rel~='icon']");
    alreadylinks.forEach(element =>{
        element.remove();
    });
    let link = document.createElement('link');
    link.rel = 'icon';
    link.type = "image/png";
    document.getElementsByTagName('head')[0].appendChild(link);
    if(picture){
        console.log(picture);
        link.href = picture;
        link.mce_href = picture;
        // sommige sites hebben "mcehref" geen idee wat dat mag zijn maar het werkt in ieder geval niet.
    }
}