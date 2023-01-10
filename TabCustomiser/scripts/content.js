document.addEventListener("keydown", (event) => {
    //console.log("pressed a key");
    //console.log(event.code)
    if(event.shiftKey && event.altKey && event.code == 'KeyR') {
        renameTab();
    }
    if(event.shiftKey && event.altKey && event.code == 'KeyI') {
        newicon();
    }
})

function renameTab() {
    let title = window.prompt("Tab name: ")
    if(title == null) return;
    document.title = title
    console.log("Updated tile")
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
    console.log("link is")
    console.log(link)
    if(picture){
        console.log(picture);
        link.href = picture;
        link.mce_href = picture;
        // sommige sites hebben "mcehref" geen idee wat dat mag zijn maar het werkt in ieder geval niet.
    }
}