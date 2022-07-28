const res = document.getElementById("statisticResult");
const form = document.getElementById("statisticForm");

function resetResult(alter){
    res.innerHTML = `
        <p><b><i>Data from playable operators in server EN</i></b></p>
        <p><b><i>Data ${alter?"INCLUDE":"EXCLUDE"} Alternative operators</i></b></p>
        <br>
    `;
}

function sortObject(obj, comp){
    let sortable = [];
    for(let key in obj){
        sortable.push([key, obj[key]]);
    }
    if(comp == undefined){
        comp = (a, b) => b[1].length - a[1].length;
    }
    sortable.sort(comp);
    return sortable;
}

function raceStatistic(){
    let raceCnt = {};
    
    Object.keys(operators).forEach(key => {
        let op = operators[key];
        if(op["alter"].toLowerCase() == 'true') return;
        if(raceCnt[op["race"]] == undefined){
            raceCnt[op["race"]] = [];
        }
        raceCnt[op["race"]].push(op["codeName"]);
        
    });
    let unk = raceCnt["Unknown"].length + raceCnt["Undisclosed"].length;
    let p = `<p>There are ${unk} operators Unknown/Undisclosed their race: 
            <i>${raceCnt["Unknown"].join(", ")}, ${raceCnt["Undisclosed"].join(", ")}</i></p>`;
    delete raceCnt["Unknown"];
    delete raceCnt["Undisclosed"];
    
    raceCnt = sortObject(raceCnt);
    resetResult(alter=false);
    // console.log(raceCnt);
    max = raceCnt[0][1].length;
    most = [];
    for(let i in raceCnt){
        if(raceCnt[i][1].length == max){
            most.push(raceCnt[i][0]);
        }else{
            break;
        }
    }

    if(most.length > 1){
        res.innerHTML += `<p>There are ${most.length} races have ${max} operators, it is: <b><i>${most.join(", ")}</i></b></p>`;
    }else{
        res.innerHTML += `<p><b><i>${most[0]}</i></b> with ${max} operators is the race have most operators</p>`;
    }
    res.innerHTML += p;
    res.innerHTML += `<br><h2>LIST OF RACES AND OPERATORS OF THAT RACE:</h2>`;
    raceCnt.forEach((item, index) => {
        res.innerHTML += `<p>${index+1}. <b>${item[0]}</b> (${item[1].length}): <i>${item[1].join(", ")}</i></p>`;
    });
}

const months = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12,
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}

function prevDay(date){
    let month = months[date.split(" ")[0]];
    let day = parseInt(date.split(" ")[1]);
    if(day == 1){
        month--;
        if(month == 0){
            month = 12;
        }
        day = 31;
        if(month == 2){
            day = 28;
        }
        if(month == 4 || month == 6 || month == 9 || month == 11){
            day = 30;
        }
        return `${months[month]} ${day}`;
    }
    return `${months[month]} ${day-1}`;
}

function nextDay(date){
    let month = months[date.split(" ")[0]];
    let day = parseInt(date.split(" ")[1]);
    day++;
    if(day == 32){
        day = 1;
        month++;
        if(month == 13){
            month = 1;
        }
    }
    if(day == 29 && month == 2){
        day = 1;
        month++;
    }
    if(day == 31 && (month == 4 || month == 6 || month == 9 || month == 11)){
        day = 1;
        month++;
    }

    return `${months[month]} ${day}`;
}

function dayCount(from, to){
    let _m1 = from.split(" ")[0];
    let _d1 = parseInt(from.split(" ")[1]);
    let _m2 = to.split(" ")[0];
    let _d2 = parseInt(to.split(" ")[1]);

    if(_m1 == _m2){
        return _d2 - _d1 + 1;
    }

    return dayCount(from, prevDay(`${_m2} 1`)) + dayCount(`${_m2} 1`, to);
}

function birthdayStatistic(){
    let birthdayCnt = {};
    let alterCount = 0;
    Object.keys(operators).forEach(key => {
        let op = operators[key];
        if(op["alter"].toLowerCase() == 'true'){
            alterCount++;
            return;
        }
        if(birthdayCnt[op["dateOfBirth"]] == undefined){
            birthdayCnt[op["dateOfBirth"]] = [];
        }
        birthdayCnt[op["dateOfBirth"]].push(op["codeName"]);
    });
    let unk = birthdayCnt["Unknown"].length + birthdayCnt["Undisclosed"].length;
    let p = `<p>There are ${unk} operators Unknown/Undisclosed birthday: 
    <i>${birthdayCnt["Unknown"].join(", ")}, ${birthdayCnt["Undisclosed"].join(", ")}</i></p>`;
    delete birthdayCnt["Unknown"];
    delete birthdayCnt["Undisclosed"];

    birthdayCnt = sortObject(birthdayCnt, (a, b) => {
        let _a = a[0].split(" ");
        let _b = b[0].split(" ");
        if(_a[0] != _b[0]){
            return months[_a[0]] - months[_b[0]];
        }
        return parseInt(_a[1]) - parseInt(_b[1]);
    });

    resetResult(alter=false);
    // get current date
    let today = new Date();
    today = `${months[today.getMonth() + 1]} ${today.getDate()}`;
    let idx = birthdayCnt.findIndex(item => item[0] == today);
    if(idx != -1){
        res.innerHTML += `<p>Today is the birthday of ${birthdayCnt[idx][1].length} operator(s): 
        <i>${birthdayCnt[idx][1].join(", ")}</i></p>`;
    }else{
        res.innerHTML += `<p>Today is not the birthday of any operator</p>`;
    }
    res.innerHTML += 
        `There are <b><i>${Object.keys(birthdayCnt).length} days</i></b> 
        is the birthday of <b><i>${Object.keys(operators).length - unk - alterCount}</i><b> operators`;

    // find longest continuous birthday
    let prev = birthdayCnt[0][0];
    let start = birthdayCnt[0][0];
    let end = birthdayCnt[0][0];
    let cnt = 1;
    let max = 0;
    let maxStart = birthdayCnt[0][0];
    let maxEnd = birthdayCnt[0][0];
    for(let i = 1; i < birthdayCnt.length; i++){
        let cur = birthdayCnt[i][0];
        if(prevDay(cur) == prev){
            end = cur;
            cnt++;
        }else{
            if(cnt > max){
                max = cnt;
                maxStart = start;
                maxEnd = end;
            }
            start = cur;
            end = cur;
            cnt = 1;
        }
        prev = cur;
    }
    if(cnt > max){
        max = cnt;
        maxStart = start;
        maxEnd = end;
    }
    res.innerHTML += `<p>Longest continuous birthday: <b><i>${maxStart} to ${maxEnd}</i></b> with ${max} days have birthday</p>`;

    // find longest continuous days without birthday
    start = birthdayCnt[0][0];
    end = birthdayCnt[0][0];
    max = 0;
    for(let i = 1; i < birthdayCnt.length; i++){
        let cur = birthdayCnt[i][0];
        let pre = birthdayCnt[i-1][0];
        cnt = dayCount(pre, cur);
        if(cnt > max){
            max = cnt;
            start = pre;
            end = cur;
        }
    }
    res.innerHTML += `<p>Longest continuous days without birthday: <b><i>${nextDay(start)} to ${prevDay(end)}</i></b> 
    with ${max-2} days don't have birthday</p>`;
    res.innerHTML += p;
    res.innerHTML += `<br><h2>LIST OF BIRTHDAY WITH OPERATORS:</h2>`;
    birthdayCnt.forEach((item, index) => {
        res.innerHTML += `<p>${index+1}. <b>${item[0]}</b> (${item[1].length}): <i>${item[1].join(", ")}</i></p>`;
    });

}

function classStatistic(){
    let classes = {};
    let branches = {};
    for(let operator in operators){
        let op = operators[operator];
        if(classes[op["classs"]] == undefined){
            classes[op["classs"]] = {};
        }
        if(classes[op["classs"]]["count"] == undefined){
            classes[op["classs"]]["count"] = 0;
        }
        classes[op["classs"]]["count"]++;
        if(classes[op["classs"]][op["branch"]] == undefined){
            classes[op["classs"]][op["branch"]] = [];
        }
        classes[op["classs"]][op["branch"]].push(op["codeName"]);
        if(branches[op["branch"]] == undefined){
            branches[op["branch"]] = [];
        }
        branches[op["branch"]].push(op["codeName"]);
    }

    resetResult(alter=true);
    res.innerHTML += `<h2>LIST OF CLASSES AND BRANCHES:</h2>`;

    for(let classs in classes){
        res.innerHTML += `<h2>${classs} (${classes[classs].count}):</h2>`;
        for(let branch in classes[classs]){
            if(branch == "count"){
                continue;
            }
            res.innerHTML += `<p><b>${branch}</b> (${classes[classs][branch].length}): <i>${classes[classs][branch].join(", ")}</i></p>`;
        }
    }
}

function placeStatistic(){
    let places = {};
    let alterCount = 0;
    for(let operator in operators){
        let op = operators[operator];
        if(op["alter"].toLowerCase() == 'true'){
            alterCount++;
            continue;
        }
        if(places[op["placeOfBirth"]] == undefined){
            places[op["placeOfBirth"]] = [];
        }
        places[op["placeOfBirth"]].push(op["codeName"]);
    }
    let unk = [];
    unk.push(places["Unknown"]);
    unk.push(places["Undisclosed"]);
    delete places["Unknown"];
    delete places["Undisclosed"];

    places = sortObject(places);

    resetResult(alter=false);
    res.innerHTML += `<p>There are ${Object.keys(places).length} places is place of birth of 
    ${Object.keys(operators).length - alterCount - unk[0].length - unk[1].length} operators</p>`;
    res.innerHTML += `<p>There are ${unk[0].length + unk[1].length} operators Unknown/Undisclosed place of birth: <i>${unk[0].join(", ")}, ${unk[1].join(", ")}</i></p>`;
    res.innerHTML += `<br><h2>LIST OF PLACES OF BIRTH:</h2>`;
    places.forEach((item, index) => {
        res.innerHTML += `<p>${index+1}. <b>${item[0]}</b> (${item[1].length}): <i>${item[1].join(", ")}</i></p>`;
    });
}

form.addEventListener("submit", function(e){
    let category = form.elements["category"].value;

    let actions = {
        "birthday": birthdayStatistic,
        "class": classStatistic,
        "place": placeStatistic,
        "race": raceStatistic,
    };

    actions[category]();
    e.preventDefault();
});
