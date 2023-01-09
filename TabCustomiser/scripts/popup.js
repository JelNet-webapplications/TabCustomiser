// function updateCursed() {
//     let Switch = document.getElementById("cursedSwitch");
//     if(Switch.checked) {
//         console.log("Enable cursed mode!");
//     } else {
//         console.log("Disable cursed mode!");
//     }
// }

// function updateTitle() {
//     let title = document.getElementById("tabName");
//     let title = "sus"
    
//     if(title){
//         document.title = title;
//         console.log("Updated title");
//     }
// }

// document.addEventListener("keydown", (event) => {
//     console.log("%cJN: %cevent keydown, code = "+event.code,"color:orange;font-size:16px;font-weight:bold","color:#f2f2f2");
//     if(event.shiftKey && event.altKey && event.code == 'KeyR') {
//         renameTab();
//     }
// })


const button = document.querySelector("button");
button.addEventListener("click", async () => {
    console.log('omg het werkt holy shit')
    getCurrentTab().then(tab => console.log(tab));
});

async function getCurrentTab(){
    console.log("functie draait.");
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}
