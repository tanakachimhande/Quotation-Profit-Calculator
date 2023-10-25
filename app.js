 // DOM Elements Selection

// Inputs

let quantity = document.querySelector('#quantity');
let unitPrice = document.querySelector('#unitprice');
let vatPercentage = document.querySelector('#vatpercentage');
let allTotalPrice = document.querySelector('.allTotals');
const clearNumbersButton = document.querySelector('#clearNumbersButton');
let itemsCount = document.querySelector('.items-count');
let error = document.querySelector('.error');
let success = document.querySelector('.success');
const profitPercentage = document.querySelector('#profitpercentage');
const totalProfit = document.querySelector('.totalprofit');
const calculate = document.querySelector('#calculate');

// Dynamic Data-Results

let unitPriceResult = document.querySelector('.unitprice');
let totalPrice = document.querySelector('.totalprice');
const clearBtn = document.querySelector('#clearbtn');

// Event Handling for calculations
calculate.addEventListener('click',calculations)
clearBtn.addEventListener('click',clearData)
clearNumbersButton.addEventListener('click',clearNumbers)

let allTotals = [];

// Counting Number of Itmes in an array


// All Profit Totals

let allTotalProfit = [];

// Calculations

function calculations(e) {
  e.preventDefault();

  // Validations

  if (!quantity.value) {
     error.textContent = "Please enter item quantity"
     setTimeout(() => {
        error.textContent ='';
     },2000);
  } else if (!unitPrice.value) {
    error.textContent = "Please enter item uint price"
    setTimeout(() => {
       error.textContent ='';
    },2000);
  } 
  else if (profitPercentage.value === "Profit Percentage") {
    error.textContent = "Please select profit percentage"
    setTimeout(() => {
       error.textContent ='';
    },2000);
  } 
  else if (vatPercentage.value === "VAT Percentage") {
    error.textContent = "Please select VAT percentage"
    setTimeout(() => {
       error.textContent ='';
    },2000);
  } 
  else {

    // Logic

    const quantityValue = parseFloat(quantity.value);
    const unitPriceValue = parseFloat(unitPrice.value);
    const profitPercentageValue = parseFloat(profitPercentage.value);
    const vatPercentageValue = parseFloat(vatPercentage.value);

    const findingUnitPrice = unitPriceValue + (unitPriceValue * profitPercentageValue / 100);
    const findingVat = findingUnitPrice + (findingUnitPrice * vatPercentageValue / 100);
    const findingTotalPrice =  findingVat * quantityValue;

    unitPriceResult.textContent =findingUnitPrice.toFixed(2);
    totalPrice.textContent =findingTotalPrice.toFixed(2);
    const profit = unitPriceValue * (profitPercentageValue / 100);
    const totolProf = profit * quantityValue;
    totalProfit.textContent =totolProf.toFixed(2);

    // Calculating All totals for each entry

    // Initialize an array to store totals

    allTotals.push(findingTotalPrice);
    localStorage.setItem('allTotals', JSON.stringify(allTotals));

    // Calculating Total Profi

    allTotalProfit.push(totolProf);
    localStorage.setItem('allTotalProfit', JSON.stringify(allTotalProfit));

    allTotalPriceCalc();
    allTotalProfitCalc();
    disableCalculateButton();

  }
}


// Clear Button Functionality

function clearData () {

    // Form Values

    quantity.value = ''
    unitPrice.value = ''

    // Dynamic Data Display

    unitPriceResult.textContent = '$0.00'
    totalPrice.textContent = '$0.00'
    totalProfit.textContent = '$0.00'

    window.location.reload();

    
}

// Total Price Calculations

function allTotalPriceCalc() {

     // Load totals from `localStorage` on page load

     if (localStorage.getItem('allTotals')) {
        allTotals = JSON.parse(localStorage.getItem('allTotals'));

        // Calculate the total for all calculations

        const total = allTotals.reduce((acc, currentTotal) => acc + currentTotal, 0);

        // Display the total for all calculations

        const theTotalPrice = total.toFixed(2);
        allTotalPrice.textContent = theTotalPrice;
        const count = allTotals.length;
        itemsCount.textContent = `(${count})`;
    } else {
        error.textContent = "No Data Found"
        setTimeout(() => {
           error.textContent ='';
        },2000);
    }
    
}

allTotalPriceCalc();

// Total Profit Price Calculations

function allTotalProfitCalc() {

     // Load totals from `localStorage` on page load

     if (localStorage.getItem('allTotalProfit')) {
        allTotalProfit = JSON.parse(localStorage.getItem('allTotalProfit'));

        // Calculate the total for all calculations

        const total = allTotalProfit.reduce((acc, currentTotal) => acc + currentTotal, 0);

        // Display the total for all calculations

        const theTotalPrice = total.toFixed(2);
        totalProfit.textContent = theTotalPrice;
    } else {
        error.textContent = "No Data Found"
        setTimeout(() => {
           error.textContent ='';
        },2000);
    }
    
}

allTotalProfitCalc();

// Clearing the localstorage


function clearNumbers() {

    // Clear the array in localStorage

    localStorage.removeItem('allTotals');
    localStorage.removeItem('allTotalProfit');
    
    // Clear the array in your JavaScript as well

    allTotals = [];
    allTotalProfit = [];

    // Inform the user that the numbers have been cleared
    
    success.textContent = "Data Has been cleared"
    setTimeout(() => {
       success.textContent ='';
    },2000);

    window.location.reload();

}

// Caculate Button enable and disable functionality

function disableCalculateButton() {
   const value = parseFloat(unitPriceResult.textContent);

   if (value > 0) {
    
   calculate.disabled = true;
   } else {
    
   calculate.disabled = false;
   }
}



 

