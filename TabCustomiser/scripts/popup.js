/* 
	-----------
	cursed mode
	-----------	
*/

let switchCursedDOM = document.querySelector("#switchcursedlabel");
console.log("wat")
switchCursedDOM.addEventListener("click",()=>{
    console.log("client has geklikt on the cursed knop.");
    updateCursed();
});
function updateCursed() {
    let Switch = document.querySelector("#cursedSwitch");
    if(Switch.checked) {
        console.log("Enable cursed mode!");
        sClp = true;
        setCursify("start");
    } else {
        console.log("Disable cursed mode!");
        setCursify("stop");
    }
}
function getRandColor(){
    let rand = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
    return rand;
}
var sClp = true; // sClp = set Cursify loop parameter
function setCursify(par){
    getCurrentTab().then(tab =>{
        // hoe de hel werkt dit ??
        let array = tab.querySelectorAll("*");
        if(par == 'stop'){
            sClp = false;
            array.forEach(element => {
                element.style.transition = null;
                element.style.backgroundColor = null;
                element.style.color = null;
            });
        }
        if(par == 'start' && sClp){ 
            array.forEach(element => {
            //moet dit ook met chrome.tabs.sendMessage?
                element.style.transition = "all 0s ease 0s"
                element.style.backgroundColor = getRandColor();
                element.style.color = getRandColor();
            });
            setTimeout(() => setCursify('start'), 100);
        }
    });
}

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

// de kruisje
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

// de plusje
let buttonExtra = document.querySelector("#plussie"),
    InputURL = document.querySelector("#customurl");

// buttonExtra.addEventListener("mouseenter", () =>{
//     if(!hasToBeVisible) {
//       InputURL.style.height = "auto";
//       InputURL.style.padding = "16px"
//       InputURL.style.borderBottom = '1px solid #dcf4f3'
//     }
// });
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
    let colour = event.target.id;
	if(!colour.includes('🎨')) return;
	let path = "/media/"+ colour.substring(2,colour.length) + ".png";
	let chpath = chrome.runtime.getURL(path);

	getCurrentTab().then(tab => chrome.tabs.sendMessage(tab.id, { id: 'faviconApply', path: chpath }));
    console.log('sent message');
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