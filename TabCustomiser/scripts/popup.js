/* 
	-----------
	cursed mode
	-----------	
*/

//getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'title', title: titleInput.value }));

let checkBox = document.querySelector("#cursedSwitch");
checkBox.addEventListener("change",()=>{
    if(checkBox.checked) {
        console.log("Enable cursed mode!!",checkBox.checked);
        getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'cursedMode', status: true}));
    } else {
        console.log("Disable cursed mode!!",checkBox.checked);
        getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'cursedMode', status: false}));
    }
});
let speedUpCursed = document.querySelector("#speedupcursed");
speedUpCursed.addEventListener("click",()=>{
    if(checkBox.checked){
        console.log("speeding up cursed mode.");
        getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'cursedMode', status: true}));
    } else {
        console.log("cannot speed up cursed mode if it was not enabled in the first place.");
    }
});




/* 
	-------------
	andere dingen
	-------------
*/

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
		if (request.id === "getFaviconURL") {
			sendResponse({URL: "test"}); 
		} else {
			sendResponse({ERR: "not found"});
		}
    }
  );

//Close window (X)
let X = document.querySelector('#closeWindow')
X.addEventListener("click", () => {
  window.close();
})

let githubICON = document.querySelector("#githubrepo"),
    jelcraftICON = document.querySelector("#jelcrafthomepage");
githubICON.addEventListener("click", () =>{
    window.open("https://github.com/JelNet-webapplications/TabCustomiser");
})
jelcraftICON.addEventListener("click", () =>{
    window.open("https://jelcraft.tk/");
})

//Extra favicon settings (+)
let buttonExtra = document.querySelector("#buttonExtra"),
    InputURL = document.querySelector("#customurl");

buttonExtra.addEventListener("click", () =>{
  if(InputURL.style.borderBottom == "" || InputURL.style.borderBottom == "none") {
      console.log('Show URL input, borderBottom:',InputURL.style.borderBottom)
      InputURL.style.height = "auto";
      InputURL.style.padding = "16px"
      InputURL.style.borderBottom = '1px solid #dcf4f3'
    } else {
      console.log('Hide URL input, borderBottom:',InputURL.style.borderBottom)
      InputURL.style.height = "0px";
      InputURL.style.padding = "0px 16px"
      InputURL.style.borderBottom = "none"
    }
});

//-- Rename using popup --
let titleInput = document.querySelector('#tabName'); //Def input elem
getCurrentTab().then(tab => titleInput.value = tab.title); //Update input value to match tab name

titleInput.addEventListener('keyup', () => {
	getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'title', title: titleInput.value }));
});

//-- Customise Icon using popup --
let colorSelector = document.querySelector('#colorSelector');
colorSelector.addEventListener('click', (event) => {
    let colours = {
        "🎨gray": "#5f6368",
        "🎨blue": "#8ab4f8",
        "🎨red": "#f28b82",
        "🎨yellow": "#fdd663",
        "🎨green": "#81c995",
        "🎨magenta": "#ff8bcb",
        "🎨purple": "#c58af9",
        "🎨aqua": "#78d9ec",
        "🎨orange": "#fcad70"
    }
    let colour = event.target.className;
    console.log(colours[colour])
	if(!colour.includes('🎨')) return;
	let path = "/media/"+ colour.substring(2,colour.length) + ".png";
	let chpath = chrome.runtime.getURL(path);
    // let colourRaw = colour.slice(2);
    // document.querySelector("#dot").style.backgroundColor = colourRaw;
    document.querySelector("#dot").style.backgroundColor = colours[colour];
    // document.querySelector("#dot").className = colour;
	getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'faviconApply', path: chpath }));
    console.log('sent message');
})

// -- Custom Favicon using popup
let faviconApply = document.querySelector("#faviconapply")
faviconApply.addEventListener("click", ()=>{
	getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'faviconApply', path: document.querySelector('#faviconnew').value}))
})
let faviconnew = document.querySelector("#faviconnew");
faviconnew.addEventListener("change",()=>{
    checkFaviconInput();
});
faviconnew.addEventListener("keyup",()=>{
    checkFaviconInput();
});
function checkFaviconInput(){
    if(faviconnew.value == ""){
        faviconApply.style.display = "none";
    } else {
        faviconApply.style.display = "flex";
    }
}

//Utils
async function getCurrentTab(){
	let [ tab ] = await chrome.tabs.query({active:true});
	return tab;
}