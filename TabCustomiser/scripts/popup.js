function updateCursed() {
    let Switch = document.getElementById("cursedSwitch");
    if(Switch.checked) {
        console.log("Enable cursed mode!");
    } else {
        console.log("Disable cursed mode!");
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.id === "getFaviconURL") {
        sendResponse({URL: "test"}); 
      } else {
        sendResponse({ERR: "not found"});
      }
    }
  );

// let [ tab ] = await chrome.tabs.query({active:true});
//     return tab.favIconUrl;




//-- Rename using popup --
let titleInput = document.querySelector('#tabName'); //Def input elem
getCurrentTab().then(tab => titleInput.value = tab.title); //Update input value to match tab name

titleInput.addEventListener('keyup', () => {
    getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'title', title: titleInput.value }));
});

//-- Customise Icon using popup --
let colorSelector = document.querySelector('#colorSelector');
colorSelector.addEventListener('click', (event) => {
    if(!event.target.id.includes('🎨')) return;
    let path = "/colors/"+ event.target.id.substring(2,7) +".png"
    
    //getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'title', title: titleInput.value }));
})

// -- Custom Favicon using popup
let faviconApply = document.querySelector("#faviconapply")
faviconApply.addEventListener("click", ()=>{
    getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'faviconApply', path: document.querySelector('#faviconnew').value}))
})

//Utils
async function getCurrentTab(){
    let [ tab ] = await chrome.tabs.query({active:true});
    return tab;
}