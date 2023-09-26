// columns and row
let col = 26;
let row = 100;

//table component
const tableHead = document.getElementsByClassName("table-row")[0];
const tBody = document.getElementsByTagName("tbody")[0];
const selectedBox = document.getElementsByClassName("selected-box")[0];

// Cache
let currentCell;
let previousCell;
let cellData;
let matrix = new Array(row);

//font-weight and font style icons
const boldBtn = document.getElementsByClassName("bold")[0];
const italicBtn = document.getElementsByClassName("italic")[0];
const underlineBtn = document.getElementsByClassName("underline")[0];

//text-align tools
const leftAlign = document.getElementsByClassName("left-align")[0];
const centerAlign = document.getElementsByClassName("center-align")[0];
const rightAlign = document.getElementsByClassName("right-align")[0];


//save and upload button
const saveBtn = document.getElementsByClassName("fa-download")[0];
const uploadBtn = document.getElementsByClassName("fa-upload")[0];
const uploadInput = document.getElementById("upload-input");

//font-style and font-size
const fontFamily = document.getElementsByClassName("font-style")[0];
const fontSize = document.getElementsByClassName("font-size")[0];
fontSize.value = "14px";

//color
const fontColor = document.getElementById("font-color");
const boxColor = document.getElementById("boxBg-color");



//cut copy paste
const copyBtn = document.getElementsByClassName("copy")[0];
const cutBtn = document.getElementsByClassName("cut")[0];
const pasteBtn = document.getElementsByClassName("paste")[0];


for(let r=0;r<row;r++)
{
    matrix[r] = new Array(col);

    for(let c=0;c<col;c++)
    {
        matrix[r][c] = {};
    }
}

function createVirtualStorage()
{
  let id = currentCell.id; // A1
  let c = id[0].charCodeAt(0)-65;  // A -> 0;
  let r = id.substring(1)-1;

  matrix[r][c] = {
    text: currentCell.innerText,
    style: currentCell.style.cssText,
    id: id
  }
  
}

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

            cell.addEventListener("input", createVirtualStorage);
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
    currentCell.style.outline = "1px solid #218C74";

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
        btnType.style.backgroundColor = "rgba(128, 128, 128, 0.342)";
        currentCell.style[styleProperty] = styleValue;
    }
    
    createVirtualStorage();
}

leftAlign.addEventListener("click", () => {
    currentCell.style.textAlign = "left";
    alignToolHighlighter();
    createVirtualStorage();
})

centerAlign.addEventListener("click", () => {
    currentCell.style.textAlign = "center";
    alignToolHighlighter();
    createVirtualStorage();
})

rightAlign.addEventListener("click", () => {
    currentCell.style.textAlign = "right";
    alignToolHighlighter();
    createVirtualStorage();
})


saveBtn.addEventListener("click", () => {
    saveBtn.classList.add("fa-bounce");
    setTimeout(() => {
        saveBtn.classList.remove("fa-bounce");
    }, 1000)

    const sheetNo = document.getElementsByClassName("sheets")[0];

    const matrixStringify = JSON.stringify(matrix);

    const blob = new Blob([matrixStringify], {type: 'application/json'});
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${sheetNo.innerText}.json`;
    link.click();
})

uploadBtn.addEventListener("click", () => {
    uploadBtn.classList.add("fa-bounce");
    setTimeout(() => {
        uploadBtn.classList.remove("fa-bounce");
    }, 1000)

    const brouseItem = document.createElement("input");
    brouseItem.type = "file";
    brouseItem.accept = ".json";
    brouseItem.id = "uploadItem";

    brouseItem.addEventListener("input", (e) => {
        const file = e.target.files[0];

        if(file)
        {
            const reader = new FileReader();
            reader.readAsText(file);

            reader.onload = function(event){
                const fileContent = JSON.parse(event.target.result);
                
                row = fileContent.length;
                col = fileContent[0].length;
                
                for(let r=0;r<row;r++)
                {
                    for(let c=0;c<col;c++)
                    {
                        const obj = fileContent[r][c];

                        if(obj.text || obj.style)
                        {
                            const id = obj.id;
                            const tableCell = document.getElementById(id);
                            tableCell.innerText = obj.text;
                            tableCell.style = obj.style;
                            tableCell.style.outline = "none";
                        }
                    }
                }
            }
        }
    })

     brouseItem.click();
})



fontSize.addEventListener("change", () => {
    currentCell.style.fontSize = fontSize.value;
    createVirtualStorage();
})

fontFamily.addEventListener("change", () => {
    currentCell.style.fontFamily = fontFamily.value;
    createVirtualStorage();
})


fontColor.addEventListener("input", () => {
    currentCell.style.color = fontColor.value;
    createVirtualStorage();
})

boxColor.addEventListener("input", () => {
    currentCell.style.backgroundColor = boxColor.value;
    createVirtualStorage();
})


cutBtn.addEventListener("click", () => {
    cutBtn.classList.add("fa-bounce");
    setTimeout((() => {
        cutBtn.classList.remove("fa-bounce");
    }), 1000)

    cellData = {
        text: currentCell.innerText,
        style: currentCell.style.cssText,
        type: "cut"
    }
    currentCell.innerText = '';
    currentCell.style.cssText = '';
    createVirtualStorage();
})


copyBtn.addEventListener("click", () => {
    copyBtn.classList.add("fa-bounce");
    setTimeout((() => {
        copyBtn.classList.remove("fa-bounce");
    }), 1000)

    cellData = {
        text: currentCell.innerText,
        style: currentCell.style.cssText,
        type: "copy"
    } 
    createVirtualStorage();
})

pasteBtn.addEventListener("click", () => {
    pasteBtn.classList.add("fa-bounce");
    setTimeout((() => {
        pasteBtn.classList.remove("fa-bounce");
    }), 1000)

    currentCell.innerText = cellData.text;
    currentCell.style = cellData.style;

    if (cellData.type === "cut") {
        cellData = undefined;
    }
    createVirtualStorage();
})