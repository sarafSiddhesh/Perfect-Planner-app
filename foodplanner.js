// Get references to elements
const mealForm = document.getElementById('meal-form');
const mealNameInput = document.getElementById('meal-name');
const mealIngredientsInput = document.getElementById('meal-ingredients');
const mealList = document.getElementById('meals');
const groceryList = document.getElementById('grocery-items');

// Sample data (replace with actual storage later)
let meals = [];
let groceryItems = new Set(); // Use a Set to avoid duplicates

// Event listener for adding a meal
mealForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const mealName = mealNameInput.value.trim();
    const ingredients = mealIngredientsInput.value.split(',').map(item => item.trim());

    if (mealName && ingredients.length > 0) {
        addMeal(mealName, ingredients);
        mealNameInput.value = '';
        mealIngredientsInput.value = '';
    }
});

// Function to add a meal
function addMeal(name, ingredients) {
    meals.push({ name, ingredients });
    updateMealList();
    updateGroceryList(ingredients);
}

// Function to update the meal list display
function updateMealList() {
    mealList.innerHTML = ''; // Clear the list
    meals.forEach(meal => {
        const li = document.createElement('li');
        li.textContent = `${meal.name}: ${meal.ingredients.join(', ')}`;
        mealList.appendChild(li);
    });
}

// Function to update the grocery list display
function updateGroceryList(ingredients) {
    ingredients.forEach(item => groceryItems.add(item)); // Add unique items

    groceryList.innerHTML = ''; // Clear the list
    groceryItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        groceryList.appendChild(li);
    });
}
