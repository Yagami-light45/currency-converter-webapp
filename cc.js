const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        // newOption.value = currCode;
        
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = true; 
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = true; 
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
    
}

btn.addEventListener("click", async (evt) =>{
   
    // evt.preventDefault();  // Prevents the default form submission behavior when the button is clicked
    let amount = document.querySelector(".amount input");
    // Get the value entered by the user in the amount input field
    let amtVal  = amount.value;
    if (isNaN(amtVal) || amtVal <= 0) {
    amtVal = "1";
    }


   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];


    let finalAmount = parseFloat(amtVal)*rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
});



