const inp = document.getElementById("enInp");
const res = document.getElementById("result");
// const canRes = document.getElementById("canRes");
// const context = canRes.getContext("2d");

// context.font = "16px seafont";

document.onkeyup = function(){
    res.innerHTML = inp.value;
    // context.strokeText(inp.value, 0, 0);
}


