function updateCursed() {
    let Switch = document.getElementById("cursedSwitch");
    if(Switch.checked) {
        console.log("Enable cursed mode!");
    } else {
        console.log("Disable cursed mode!");
    }
}

function updateTitle() {
    let title = document.getElementById("tabName");
    if(title == null) return;
    document.title = title
    console.log("Updated tile")
}