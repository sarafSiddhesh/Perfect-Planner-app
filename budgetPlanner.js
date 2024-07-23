// Get references to elements
const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const incomeList = document.getElementById('income-list');
const expenseList = document.getElementById('expense-list');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const balance = document.getElementById('balance');

// Load data from local storage (if available)
let incomes = JSON.parse(localStorage.getItem('incomes')) || [];
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Update the UI initially
updateIncomeList();
updateExpenseList();
updateSummary();

// Event listeners for form submission
incomeForm.addEventListener('submit', addIncome);
expenseForm.addEventListener('submit', addExpense);

// Function to add income
function addIncome(event) {
    event.preventDefault();
    const source = incomeForm['income-source'].value;
    const amount = parseFloat(incomeForm['income-amount'].value);
    if (source && !isNaN(amount)) {
        incomes.push({ source, amount });
        saveToLocalStorage();
        updateIncomeList();
        updateSummary();
        incomeForm.reset();
    }
}

// Function to add expense
function addExpense(event) {
    event.preventDefault();
    const name = expenseForm['expense-name'].value;
    const amount = parseFloat(expenseForm['expense-amount'].value);
    if (name && !isNaN(amount)) {
        expenses.push({ name, amount });
        saveToLocalStorage();
        updateExpenseList();
        updateSummary();
        expenseForm.reset();
    }
}

// Function to update income list display
function updateIncomeList() {
    incomeList.innerHTML = '';
    incomes.forEach(income => {
        const li = document.createElement('li');
        li.textContent = `${income.source}: $${income.amount.toFixed(2)}`;
        incomeList.appendChild(li);
    });
}

// Function to update expense list display
function updateExpenseList() {
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    });
}

// Function to update summary display
function updateSummary() {
    const totalIncomeValue = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpensesValue = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const balanceValue = totalIncomeValue - totalExpensesValue;

    totalIncome.textContent = totalIncomeValue.toFixed(2);
    totalExpenses.textContent = totalExpensesValue.toFixed(2);
    balance.textContent = balanceValue.toFixed(2);
}

// Function to save data to local storage
function saveToLocalStorage() {
    localStorage.setItem('incomes', JSON.stringify(incomes));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}
