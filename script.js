var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


// Function to handle form submission
function addRecipe(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Get form input values
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const imageUrl = document.getElementById('image').value;

    // Create recipe object
    const recipe = {
        name: recipeName,
        ingredients: ingredients,
        instructions: instructions,
        image: imageUrl
    };

    // Save recipe to local storage
    saveRecipe(recipe);

    // Clear form fields
    document.getElementById('recipeForm').reset();

    // Display updated recipe list
    displayRecipes();
}

// Function to save recipe to local storage
function saveRecipe(recipe) {
    // Retrieve existing recipes or initialize empty array
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    // Add new recipe to the array
    recipes.push(recipe);
    // Save updated array back to local storage
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to display recipes
function displayRecipes() {
    // Clear previous recipes displayed
    const recipesList = document.getElementById('recipesList');
    recipesList.innerHTML = '';

    // Retrieve recipes from local storage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Iterate through recipes and display them
    recipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe');

        // Create HTML content for recipe
        recipeItem.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        `;

        // Append recipe to the recipes list
        recipesList.appendChild(recipeItem);
    });
}

// Event listener for form submission
document.getElementById('recipeForm').addEventListener('submit', addRecipe);

// Display recipes on page load
displayRecipes();
