document.getElementById("buttons").addEventListener("click", event => {
    if(event.target.matches("button")) {
        let display = document.getElementById("screen");
        let element = event.target;
        let action = element.dataset.action;
        let buttonContent = element.textContent;
        let dispContent =  display.textContent;
        let btns = document.getElementById("buttons");
        let btnClear = document.getElementById("clear");

        Array.from(element.parentNode.children).forEach(item => item.classList.remove("is-pressed"));

        if(!action) {
            if(dispContent == "0" || btns.dataset.previousType == "operator" || btns.dataset.previousType == "calculate") {
                display.textContent = buttonContent;
            }
            else {
                display.textContent = dispContent + buttonContent;
            }
            btns.dataset.previousType = "number";
        }

        if(action == "add" || action == "subtract" || action == "multiply" || action == "divide") {
            let fn = btns.dataset.firstNum;
            let op = btns.dataset.operator;
            let sn = dispContent;
            if(fn && op && btns.dataset.previousType != "operator" && btns.dataset.previousType != "calculate") {
                display.textContent = calculate(fn, sn, op);
                btns.dataset.firstNum = display.textContent;
            }
            else {
                btns.dataset.firstNum = dispContent;
            }
            element.classList.add("is-pressed");
            btns.dataset.operator = action;
            btns.dataset.previousType = "operator";
        }

        if (action == "decimal") {
            if(btns.dataset.previousType == "operator" || btns.dataset.previousType == "calculate") {
                display.textContent = "0.";
            }
            else if(!dispContent.includes('.')) {
                display.textContent = dispContent + '.';
            }
            btns.dataset.previousType = "decimal";
        }

        if (action == "clear") {
            display.textContent = "0";
            if(btnClear.textContent == "AC") {
                btns.dataset.previousType = "";
                btns.dataset.firstNum = "";
                btns.dataset.operator = "";
                btns.dataset.previousNum2 = "";
            }
            else {
                btnClear.textContent = "AC";
            }
            btns.dataset.previousType = "clear";
        }

        if (action == "calculate") {
            let num1 = btns.dataset.firstNum;
            let opr = btns.dataset.operator;
            let num2 = dispContent;
            if(num1) {
                if(btns.dataset.previousType == "calculate") {
                    num1 = dispContent;
                    num2 = btns.dataset.previousNum2;
                }
                display.textContent = calculate(num1, num2, opr);
            }
            btns.dataset.previousType = "calculate";
            btns.dataset.previousNum2 = num2;
        }

        if(action != "clear") {
            btnClear.textContent = "CE";
        }
    }
});

let calculate = (n1, n2, op) => {
    let num1 = parseFloat(n1);
    let num2 = parseFloat(n2);
    if(op == "add") return num1 + num2;
    if(op == "subtract") return num1 - num2;
    if(op == "multiply") return num1 * num2;
    if(op == "divide") return num1 / num2;
}