let state = {
    balance:0,
    income:0,
    expense:0,
    transaction: [
        // { id:uniqueId(), name:"salary", amount:400, type:"income"},
        // {id:uniqueId(), name:"grocery", amount:600, type:"expanse"},
        // {id:uniqueId(),name:"sweet", amount:400, type:"expanse"}
    ]
}
const balanceEle= document.querySelector("#balance");
const incomeEle= document.querySelector(".income");
const expenseEle= document.querySelector("#expanse");
const transactionEle= document.querySelector("#transaction");
const incomeBtnEl= document.querySelector("#incomebtn");
const expanseBtnEl= document.querySelector("#expansebtn");
const nameInputEl= document.querySelector("#name");
const amountInputEl= document.querySelector("#amount");
function init() {
 let tracker = JSON.parse(localStorage.getItem("tracker") )  ;  
if (tracker!==null){
    state=tracker;
}

    updateState();
    initListener();
   


}

function uniqueId() {
    return Math.round(Math.random() * 10000);
    
}


function initListener() {
    incomeBtnEl.addEventListener("click", onAddIncomeClick) ;
    expanseBtnEl.addEventListener("click", onAddExpanseClick) ;
}

function onAddIncomeClick() {
// let name= nameInputEl.value;
// let amount = amountInputEl.value
onAddTransactionClick(nameInputEl.value, amountInputEl.value,"income" );

    // if (name !==""&& amount!==" ") {

    //     let transaction = {
    //         name: nameInputEl.value,
    //         amount :parseInt( amountInputEl.value),type: "income"
    //     };
    //     state.transaction.push( transaction);
    //     updateState();
        
    // }else{
    //     alert("please enter a valid code")
    // }
   
}


function onAddTransactionClick(name, amount, type) {
    
   
    if (name!=="" && amount!=="") {

        let transaction = {
            id: uniqueId(),
            name: name,
            amount :parseInt( amount),
            type: type
            
        };
        state.transaction.push( transaction);
        updateState();
        
    }else{
        alert("please enter a valid code")
    }
    nameInputEl.value=" ";
    amountInputEl.value=" ";

}



function onAddExpanseClick() {
    onAddTransactionClick(nameInputEl.value,amountInputEl.value,"expanse")
}

function  onDeleteClick(event) { 
console.log(event.target);
let id = parseInt(event.target.getAttribute("unique-id"));
let deleteX;
for (let index = 0; index < state.transaction.length; index++) {
       if (state.transaction[index].id === id) {
    deleteX= index;
       break;
    
   }
   
   }
   state.transaction.splice(deleteX,1);
  
   updateState()
}


function updateState() {
    let balance=0, income= 0, expense =0,item;
   for (let index = 0; index < state.transaction.length; index++) {
    item = state.transaction[index];
    console.log(item);
    if (item.type ==="income") {
        
        income += item.amount
    }else if (item.type === "expanse" ){
        expense += item.amount
    }
//     balance = income - expense

// state.balance= balance;
// state.income= income;
// state.expense= expense;
// console.log(balance, income, expense);

    
   }
   balance = income - expense

   console.log(balance, income, expense);
   state.balance= balance;
   state.income= income;
   state.expense= expense

   localStorage.setItem("tracker",JSON.stringify(state));
   render();



}



function render() {
    balanceEle.innerHTML= `$ ${state.balance}`;
    incomeEle.innerHTML= `$${state.income}`;
    expenseEle.innerHTML= `$${state.expense}`;

    transactionEle.innerHTML= "";
let listEl,divcontainerEl,spanEl,buttonEl ;
state.transaction.forEach(element => {
    listEl =document.createElement("li");
    listEl.append(element.name);
    transactionEle.appendChild( listEl);
    divcontainerEl= document.createElement("div");
      spanEl=document.createElement("span");
    let  one = element.type
    spanEl.classList.add(element.type ==="income" ? "income-amt":"expanse-amt");

// console.log(spanEl);
 spanEl.innerHTML= `$${element.amount}`
 divcontainerEl.appendChild(spanEl);
 buttonEl =document.createElement("button");
 buttonEl.setAttribute("unique-id", element.id);
 buttonEl.innerHTML="X";
 buttonEl.addEventListener("click", onDeleteClick )
 divcontainerEl.appendChild(buttonEl);
 listEl.appendChild( divcontainerEl);
 


});
}

init();

