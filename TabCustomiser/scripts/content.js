const originalTitle = document.title

//-- Rename using popup --
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(!request.title) {
        document.title = originalTitle;
    } else {
        document.title = request.title;
    }
})

//-- Rename using keybind --
document.addEventListener("keydown", (event) => {
    if(event.shiftKey && event.altKey && event.code == 'KeyR') {
        console.log("Keybind pressed!")
        let prompt = window.prompt('Rename Tab:')
        if(prompt) {
            document.title = prompt
        } else {
            document.title = originalTitle
        }
    }
})