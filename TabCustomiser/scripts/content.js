document.addEventListener("keydown", (event) => {
    if(event.shiftKey && event.altKey && event.code == 'KeyR') {
        renameTab();
    }
})

document.addEventListener('onload', (event) => {
    console.log('test');
});

function renameTab() {
    let title = window.prompt("Tab name: ")
    if(title == null) return;
    document.title = title
    console.log("Updated tile")
}