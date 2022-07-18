const topnav = `
    <div class="topnav" id="header">
        <div>
            <a class="prn" href="../index.html">Arknights</a>
            <a class="hub" href="../index.html">Tools</a>
        </div>
        <a id="navcontrol" onclick="showNav()">
            <img src="../img/nav/more.png" alt="">
        </a>
        <div class="hide">
            <a href="../index.html">Home</a>
            <a href="../pages/statistic.html">Statistic</a>
            <a href="../pages/headhunt.html">Headhunt</a>
            <a href="../pages/recruit.html">Recruit</a>
            <a href="../pages/ifOperator.html">Fun</a>
            <a href="#about" onclick="return showNav()">About</a>
        </div>
    </div>
`;

const foot = `
    <div class="footer" id="about">
    <div class="aboutsite">
        <h2>About This Site</h2>
        <p>This is open source project by 
            <a href="https://github.com/MinkuruDev" target="_blank">Mars</a>
        </p>
        <p>You can contribute to this project at
            <a href="https://github.com/MinkuruDev/ArknightsTools" target="_blank">Github</a>
        </p>
        <p>Report Bugs/Errors/Issues 
            <a href="https://github.com/MinkuruDev/ArknightsTools/issues" target="_blank">Here</a>
        </p>
    </div>

    <div class="aboutak">
        <h2>About Arknights</h2>
        <p>Arknights Official pages: 
            <a href="https://www.arknights.global" target="_blank">https://www.arknights.global</a>
        </p>
    </div>
    </div>
`;

// load the topnav
const header = document.getElementsByTagName("header")[0];
if(header != undefined && header.innerHTML == ""){
    header.innerHTML = topnav;
}

const footer = document.getElementsByTagName("footer")[0];
if(footer != undefined && footer.innerHTML == ""){
    footer.innerHTML = foot;
}

const hide = header.getElementsByClassName("hide")[0];
const btn = document.getElementById("navcontrol");

function showNav(){
    if(document.body.clientWidth > 768){
        return true;
    }
    // console.log("called");
    if(hide.style.display == ""){
        hide.style.display = "none";
    }
    if(hide.style.display == "none"){
        hide.style.display = "block";
    }else{
        hide.style.display = "none";
    }

    return true;
}
