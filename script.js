let isResultDisplayed = false; 

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

let numb1 ="";
let numb2 ="";

let operator = "";


function operate(operator,numb1,numb2){
  let result = 0;
    const n1 = parseFloat(numb1);
   const n2 = parseFloat(numb2);

   if (operator === "+") {
        result = add(n1, n2);
    }
    else if(operator === "-"){
        result=  subtract(n1, n2);
    }
    else if(operator === "*"){
        result = multiply(n1, n2);
    }
    else if(operator === "/"){
        if(n2 === 0){
          result = "Nice try, Einstein!"; 
        }
        else{
          result = divide(n1, n2);
        }
        
    }
     if (typeof result === "string") {
        return result;
    }

    return parseFloat(result.toFixed(3));
}


    
function updateNumber(digit){
 
    
    if (operator === "") {
        numb1 = numb1 + digit;
    } else {
        numb2 = numb2 + digit;
    }
}


function updateDisplay(){
   
   let displayScreen = document.querySelector(".current-operand"); 
    
    displayScreen.textContent = `${numb1} ${operator} ${numb2}`;  ; 
}

const buttons = document.querySelectorAll(".btn_number");

buttons.forEach((button) => {

button.addEventListener("click", ()=>{

     if (isResultDisplayed) {
        numb1 = "";                
        numb2 = "";
        operator = "";
        isResultDisplayed = false; 
    }
    
updateNumber(button.textContent);

updateDisplay();
});

});

window.addEventListener("keydown", (e) => {
    
    if (e.key === "." || e.key === ",") {
        e.preventDefault(); 
        decimal.click(); 
    }
    
    
    else if (e.key === "Backspace") {
        e.preventDefault();
        delet.click(); 
    }
    
    else if (/^[0-9]$/.test(e.key)) {
        if (isResultDisplayed) {
            numb1 = ""; 
            numb2 = "";
            operator = "";
            isResultDisplayed = false;
        }
        updateNumber(e.key); 
        updateDisplay();     
    }

    else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        e.preventDefault();

        const boutonOp = Array.from(document.querySelectorAll(".btn_operator"))
                               .find(btn => btn.textContent === e.key);

         if (boutonOp) boutonOp.click();
    }
    
      else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        const btnEqual = document.querySelector(".btn_equals"); 
        if (btnEqual) btnEqual.click();
    }
});


function addDecimal() {
    if (operator === "") {

        if (!numb1.includes(".")) {
            
            numb1 = numb1 === "" ? "0." : numb1 + ".";
        }
    } 
    
    else {
        if (!numb2.includes(".")) {
            numb2 = numb2 === "" ? "0." : numb2 + ".";
        }
    }
}


const decimal = document.querySelector(".btn_decimal");
decimal.addEventListener("click", ()=>{

      if (isResultDisplayed) {
        numb1 = "0.";
        numb2 = "";
        operator = "";
        isResultDisplayed = false;
        updateDisplay();
        return;
    }

    addDecimal();

updateDisplay();

});


function updateOperator(newOperator){
    
    if (numb1 !== "" && operator !== "" && numb2 !== "") {
        
        numb1 = operate(operator, numb1, numb2);
      
        numb2 = "";
        
    }
    
    operator = newOperator;

}

const operateButtons = document.querySelectorAll(".btn_operator");

operateButtons.forEach((button) =>{

    button.addEventListener("click", () => {

          isResultDisplayed = false;
       updateOperator(button.textContent);
        updateDisplay(); 

    });

});




const equal = document.querySelector(".btn_equals");

equal.addEventListener("click", ()=>{

     if (numb1 !== "" && operator !== "" && numb2 !== "") {

        numb1 = operate(operator, numb1, numb2);
        isResultDisplayed = true;

        operator = "";
        numb2 = "";

        updateDisplay();

     };



});


const delet= document.querySelector(".btn_delete");

delet.addEventListener("click", ()=>{
 if (numb2 !== "") {
        numb2 = numb2.slice(0, -1);
    } 

     else if (operator !== "") {
        operator = "";
    } 

     else if (numb1 !== "") {
        numb1 = numb1.slice(0, -1);
    }


     updateDisplay();

});



const clear = document.querySelector(".btn_clear");

clear.addEventListener("click", ()=>{
numb1="";
numb2="";
operator="";

updateDisplay();

});