const htmlResult = document.getElementById("headhuntResult");

const bg_style = {
    "6" : "background-image: linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)",
    "5" : "background: orange",
    "4" : "background: #6208c2",
    "3" : "background: white",
    "2" : "background: white",
    "1" : "background: white",
}

function binarySearch(arr, target){
    let left = 0;
    let right = arr.length - 1;
    while(left <= right){
        let mid = Math.floor((left + right) / 2);
        if(arr[mid] == target)
            return mid;
        if(arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function roll(banner){
    let SIX_STARS_RATE = banner.SIX_STARS_RATE;
    let FIVE_STARS_RATE = banner.FIVE_STARS_RATE;
    let FOUR_STARS_RATE = banner.FOUR_STARS_RATE;
    let SIX_STARS_PITY = banner.SIX_STARS_PITY;
    let result = Math.floor(Math.random() * 100);

    if(result < SIX_STARS_RATE + banner.extra_six_stars_rate){
        banner.extra_six_stars_rate = 0;
        banner.non_six_stars_count = 0;
        delete banner.five_star_pity;
        return 6;
    }
    result -= SIX_STARS_RATE + banner.extra_six_stars_rate;
    banner.non_six_stars_count++;
    if(banner.non_six_stars_count > SIX_STARS_PITY)
        banner.extra_six_stars_rate += SIX_STARS_RATE;

    if(result < FIVE_STARS_RATE){
        delete banner.five_star_pity;
        return 5;
    }
    if(banner.five_star_pity != undefined){
        banner.five_star_pity--;
        if(banner.five_star_pity == 0){
            delete banner.five_star_pity;
            return 5;
        }
    }
    result -= FIVE_STARS_RATE;
    if(result < FOUR_STARS_RATE)
        return 4;
    return 3;
}

function resetResult(){
    htmlResult.innerHTML = `
        <br><br><br><br><br><br>
        <h1>Result will show here</h1>
        <br><br><br><br><br><br>
    `;
}

const isStandard = document.getElementById("standard_banner");
const isSpecial = document.getElementById("special_banner");
const bannerImg = document.getElementById("bannerImg");

isStandard.onchange = function(){
    if(headhunting){
        isSpecial.checked = true;
        return;
    }
    bannerImg.src = "../img/banner/standard.png";
    resetResult();
}
isSpecial.onchange = function(){
    if(headhunting){
        isStandard.checked = true;
        return;
    }
    bannerImg.src = "../img/banner/special.png";
    resetResult();
}

let rollHistory = document.getElementById("rollHistory");
let storage = [];
let headhunting = false;
let delay = document.getElementById("delay");

function doHeadhunt(times = 1){
    if(headhunting)
        return;
    headhunting = true;
    let banner = isStandard.checked ? banners.standard : banners.special;
    if(banner.poll == undefined){
        banner.poll = {
            "6" : [],
            "5" : [],
            "4" : [],
            "3" : [],
        }

        for(let name in operators){
            if(binarySearch(banners.notBanner, name) != -1) continue;
            let operator = operators[name];
            if(operator.rarely < 3) continue;

            banner.poll[operator.rarely].push(name);
        }

        if(banner.more5x != undefined){
            banner.more5x.forEach(name => {
                // push 5 times to the 6 star poll
                for(let i = 0; i < 5; i++)
                    banner.poll["6"].push(name);
            });
            console.log(banner);
        }
    }

    let result = [];
    for(let i = 0; i < times; i++){
        let res = "" + roll(banner);
        if(res == 6 && Math.random() < banner.RATE_UP_RATE){ 
            let ops = banner.rateup[res];
            result.push([res, ops[Math.floor(Math.random() * ops.length)], "up"]);
            continue;
        }
        if(res == 5 && Math.random() < 0.5){
            let ops = banner.rateup[res];
            result.push([res, ops[Math.floor(Math.random() * ops.length)], "up"]);
            continue;
        }
        let ops = banner.poll[res];
        result.push([res, ops[Math.floor(Math.random() * ops.length)]]);
    }

    showResult(result, banner);
}

async function showResult(result, banner){
    htmlResult.innerHTML = "";
    let delaytime = delay.value;
    for(let res in result){
        let item = result[res];
        let html = `<div class="banner" style="${bg_style[item[0]]}">`;
        html += `<div class="censored" style="animation-duration:${delaytime}s"></div>`;
        html += `<div class="vertical-center">`;
        html += `<p>${item[0]}</p>`;
        html += `<p>${item[1]}</p>`;
        html += `</div></div>`;
        htmlResult.innerHTML += html;
        await sleep(delaytime * 1000);

        let date = new Date().toLocaleString();
        storage.push([date, banner.name, item[0], item[1]]);
        let row = rollHistory.insertRow(1);
        row.style = `${bg_style[item[0]]}; color: black`;
        row.innerHTML = `
            <td>${date.toLocaleString()}</td>
            <td>${banner.name}</td>
            <td>${item[0]}</td>
            <td>${item[1]}</td>
        `;

        let del = document.getElementsByClassName("censored")[0];
        del.remove();
    }
    window.localStorage.setItem("history", JSON.stringify(storage));
    headhunting = false;
}

window.onload = function(){
    let history = window.localStorage.getItem("history");
    if(history != undefined){
        storage = JSON.parse(history);
        for(let key in storage){
            item = storage[key];
            let row = rollHistory.insertRow(1);
            row.style = `${bg_style[item[2]]}; color: black`;
            row.innerHTML = `
                <td>${item[0].toLocaleString()}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
            `;
        }
    }
}

function clearHistory(){
    if(headhunting) return;
    if(!confirm("Are you sure to clear history?")) return;
    storage = [];
    window.localStorage.setItem("history", JSON.stringify(storage));
    rollHistory.innerHTML = `
    <tr>
        <td>Time</td>
        <td>Banner</td>
        <td>Rarery</td>
        <td>Operator</td>
    </tr>
    `;
    resetResult();
    for(let name in banners){
        let banner = banners[name];
        if(typeof banner == "object"){
            banner.five_star_pity = 10;
        }
    }
}
