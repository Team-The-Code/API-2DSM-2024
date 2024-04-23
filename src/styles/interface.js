function showInput() {
    var inputContainer = document.getElementById("inputContainer");
    inputContainer.style.display = "block";
}

function hideInput() {
    var inputContainer = document.getElementById("inputContainer");
    inputContainer.style.display = "none";
}

export {showInput, hideInput}