function updateCursed() {
    let Switch = document.getElementById("cursedSwitch");
    if(Switch.checked) {
        console.log("Enable cursed mode!");
    } else {
        console.log("Disable cursed mode!");
    }
}

//-- Rename using popup --
let titleInput = document.querySelector('#tabName'); //Def input elem
getCurrentTab().then(tab => titleInput.value = tab.title); //Update input value to match tab name

titleInput.addEventListener('keyup', () => {
    getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { title: titleInput.value }));

});

//Utils
async function getCurrentTab(){
    let [ tab ] = await chrome.tabs.query({active:true});
    return tab;
}
