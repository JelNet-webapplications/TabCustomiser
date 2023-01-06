document.addEventListener("keydown", (event) => {
    //console.log("pressed a key");
    //console.log(event.code)
    if(event.shiftKey && event.altKey && event.code == 'KeyR') {
        renameTab();
    }
})

function renameTab() {
    let title = window.prompt("Tab name: ")
    if(title == null) return;
    document.title = title
    console.log("Updated tile")
}