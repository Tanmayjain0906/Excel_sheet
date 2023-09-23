// columns and row
const col = 26;
const row = 100;

//table component
const tableHead = document.getElementsByClassName("table-row")[0];
const tBody = document.getElementsByTagName("tbody")[0];
const selectedBox = document.getElementsByClassName("selected-box")[0];

// Current and previous cell
let currentCell;
let previousCell;


//font-weight and font style icons
const boldBtn = document.getElementsByClassName("bold")[0];
const italicBtn = document.getElementsByClassName("italic")[0];
const underlineBtn = document.getElementsByClassName("underline")[0];

//text-align tools
const leftAlign = document.getElementsByClassName("left-align")[0];
const centerAlign = document.getElementsByClassName("center-align")[0];
const rightAlign = document.getElementsByClassName("right-align")[0];


//save and upload button
const saveBtn = document.getElementsByClassName("fa-floppy-disk")[0];
const uploadBtn = document.getElementsByClassName("fa-upload")[0];


//font-style and font-size
const fontFamily = document.getElementsByClassName("font-style")[0];
const fontSize = document.getElementsByClassName("font-size")[0];
fontSize.value = "14px";

//color
const fontColor = document.getElementById("font-color");
const boxColor = document.getElementById("boxBg-color");


function generateColumns(tableRow, cellType, condition, rowNo) {
    for (let i = 0; i < col; i++) {
        let cell = document.createElement(cellType)

        if (condition) {
            cell.innerText = String.fromCharCode(i + 65);
            cell.id = String.fromCharCode(i + 65);
        }
        else {
            cell.id = `${String.fromCharCode(i + 65)}${rowNo}`
            cell.setAttribute("contenteditable", true);

            cell.addEventListener("focus", (event) => focusHandler(event.target));
        }
        tableRow.appendChild(cell);
    }
}

generateColumns(tableHead, "th", true)

for (let i = 1; i <= row; i++) {
    const tr = document.createElement("tr");
    const th = document.createElement("th");

    th.innerText = i;
    th.className = "sno";
    tr.appendChild(th);
    generateColumns(tr, "td", false, i);
    tBody.appendChild(tr);
}

function focusHandler(event) {
    currentCell = event;
    selectedBox.innerText = currentCell.id;
    // currentCell.style.outline = "1px solid #218C74";

    if (previousCell) {
        previousCell.style.outline = "none";
    }

    buttonHighlighter(boldBtn, "fontWeight", "bold");
    buttonHighlighter(italicBtn, "fontStyle", "italic");
    buttonHighlighter(underlineBtn, "textDecoration", "underline");

    alignToolHighlighter();

    if (currentCell.style.fontSize == "") {
        currentCell.style.fontSize = "14px";
    }
    fontSize.value = currentCell.style.fontSize;

    if (currentCell.style.fontFamily == "") {
        currentCell.style.fontFamily = "Rubik";
    }

    fontFamily.value = currentCell.style.fontFamily;
    previousCell = currentCell;
}


function buttonHighlighter(btn, styleProperty, styleValue) {
    if (currentCell.style[styleProperty] == styleValue) {
        btn.style.backgroundColor = "rgba(128, 128, 128, 0.342)";
    }
    else {
        btn.style.backgroundColor = "transparent";
    }
}

function alignToolHighlighter() {
    const whichAlign = currentCell.style.textAlign;

    if (whichAlign == "" || whichAlign == "left") {
        currentCell.style.textAlign = "left";
        leftAlign.style.backgroundColor = "rgba(128, 128, 128, 0.342)";
        centerAlign.style.backgroundColor = "transparent";
        rightAlign.style.backgroundColor = "transparent";
    }
    else if (whichAlign == "center") {
        centerAlign.style.backgroundColor = "rgba(128, 128, 128, 0.342)";
        rightAlign.style.backgroundColor = "transparent";
        leftAlign.style.backgroundColor = "transparent";
    }
    else {
        rightAlign.style.backgroundColor = "rgba(128, 128, 128, 0.342)";
        centerAlign.style.backgroundColor = "transparent";
        leftAlign.style.backgroundColor = "transparent";
    }
}


boldBtn.addEventListener("click", () => {
    eventHandler(boldBtn, "fontWeight", "normal", "bold");
    
})

italicBtn.addEventListener("click", () => {
    eventHandler(italicBtn, "fontStyle", "normal", "italic");
})

underlineBtn.addEventListener("click", () => {
    eventHandler(underlineBtn, "textDecoration", "none", "underline");
})


function eventHandler(btnType, styleProperty, ifTypeStyleValue, styleValue) {

    
    if (currentCell.style[styleProperty] === styleValue) {
        btnType.style.backgroundColor = "transparent";
        currentCell.style[styleProperty] = ifTypeStyleValue;
    }
    else {
        btnType.style.backgroundColor =  "rgba(128, 128, 128, 0.342)";
        currentCell.style[styleProperty] = styleValue;
    }
 
}

leftAlign.addEventListener("click", () => {
    currentCell.style.textAlign = "left";
    alignToolHighlighter();
})

centerAlign.addEventListener("click", () => {
    currentCell.style.textAlign = "center";
    alignToolHighlighter();
})

rightAlign.addEventListener("click", () => {
    currentCell.style.textAlign = "right";
    alignToolHighlighter();
})


saveBtn.addEventListener("click", () => {
    saveBtn.classList.add("fa-bounce");
    setTimeout(() => {
        saveBtn.classList.remove("fa-bounce");
    }, 1500)
})

uploadBtn.addEventListener("click", () => {
    uploadBtn.classList.add("fa-bounce");
    setTimeout(() => {
        uploadBtn.classList.remove("fa-bounce");
    }, 1500)
})

fontSize.addEventListener("change", () => {
    currentCell.style.fontSize = fontSize.value;
})

fontFamily.addEventListener("change", () => {
    currentCell.style.fontFamily = fontFamily.value;
})


fontColor.addEventListener("input", () => {
    currentCell.style.color = fontColor.value;
})

boxColor.addEventListener("input", () => {
    currentCell.style.backgroundColor = boxColor.value;
})


