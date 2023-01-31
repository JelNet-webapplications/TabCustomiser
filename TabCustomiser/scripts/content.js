const originalTitle = document.title

//-- Message listeners --
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.id == "title") {
        if(!request.title) {
            document.title = originalTitle;
        } else {
            document.title = request.title;
        }
    } else if(request.id == "faviconApply") {
        newicon_path(request.path)
    } else if(request.id == "cursedMode") {
        console.log(request.status);
        setCursify(request.status);
        sClp = request.status;
    }
})

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

//Cursed mode
let sClp = false;
function setCursify(enable){
    let array = document.querySelectorAll("*");
    if(!enable){
        array.forEach(element => {
            element.style.transition = null;
            element.style.backgroundColor = null;
            element.style.color = null;
        });
    }
    if(sClp){ 
        array.forEach(element => {
            element.style.transition = "all 0s ease 0s"
            element.style.backgroundColor = getRandColor();
            element.style.color = getRandColor();
        });
        setTimeout(() => setCursify(true), 250);
    }
}
function getRandColor(){
    let rand = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    return rand;
}



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