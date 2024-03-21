const letters = {
    q: "й",
    w: "ц",
    e: "у",
    r: "к",
    t: "е",
    y: "н",
    u: "г",
    i: "ш",
    o: "щ",
    p: "з",
    "[": "х",
    "]": "ї",
    a: "ф",
    s: "і",
    d: "в",
    f: "а",
    g: "п",
    h: "р",
    j: "о",
    k: "л",
    l: "д",
    ";": "ж",
    "'": "є",
    z: "я",
    x: "ч",
    c: "с",
    v: "м",
    b: "и",
    n: "т",
    m: "ь",
    ",": "б",
    ".": "ю",
    "?": ",",
    "/": ".",
};

// function for adding exceptions to objects(in case there will be more languages in future)
function addException(object, key, value){
    return object[key] = value;
}

//create object with upper-case elements
const capitalLetters = Object.fromEntries(
    Object.entries(letters).map(([key, value]) => [
        key.toUpperCase(),
        value.toUpperCase()
    ])
);

addException(capitalLetters, "<", "Б");
addException(capitalLetters, ">", "Ю");
addException(capitalLetters, "{", "Х");
addException(capitalLetters, "}", "Ї");
addException(capitalLetters, ':', "Ж");
addException(capitalLetters, '"', "Є");

//create objects with swapped keys and values
const swappedLetters = Object.fromEntries(
    Object.entries(letters).map(([key, value]) => [value, key])
);
const swappedCapitalLetters = Object.fromEntries(
    Object.entries(capitalLetters).map(([key, value]) => [value, key])
);

//merge objects for better iteration
const initialObjects = {...capitalLetters, ...letters};
const swappedObjects = {...swappedCapitalLetters, ...swappedLetters};
//for outputting the result
const output = document.querySelector(".out");

function converter(){
    const input = document.getElementById("text").value;
    let outputArray = [];
    for (const item of input) {
        //search for a match in "input" and created objects
        if (Object.hasOwn(initialObjects, item)) { 
            outputArray.push(initialObjects[item]);
        }
        else if(Object.hasOwn(swappedObjects, item)){
            outputArray.push(swappedObjects[item]);
        }
        else {
            outputArray.push(item);
        }
    }
    output.innerHTML = outputArray.join("");
}

//function to clear input
function clear(){
    document.getElementById("text").value = "";
    output.innerHTML = "";
}

//function to copy the result
function copy(){
    const copyInput = document.querySelector(".out").innerHTML;
   if(copyInput){
        navigator.clipboard.writeText(copyInput);
        copyHint();
    }
}
//function that appears when the result is copied
function copyHint(){
    const hint = document.querySelector(".hint");
    hint.classList.add("show-hint");
    setTimeout( function(){
        hint.classList.remove("show-hint");
    }, 1200);
}

document.querySelector(".b-convert").addEventListener("click", converter);
document.querySelector(".b-clear").addEventListener("click", clear);
document.querySelector(".b-copy").addEventListener("click", copy);
