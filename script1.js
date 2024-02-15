// Select DOM elements
const recipeNameInput = document.getElementById("recipeName");
const imageURLInput = document.getElementById("imageURL");
const recipeIngredientTextarea = document.getElementById("recipeIngredient");
const recipeInstructionTextarea = document.getElementById("recipeInstruction");
const submitButton = document.getElementById("Submit");
const updateButton = document.getElementById("Update");
const recipeContainerDiv = document.getElementById("recipeContainer");
const recipeId = document.getElementById("recipeId");

// Load recipes from local storage
function loadRecipes() {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipeContainerDiv.innerHTML = " ";
  recipes.forEach((recipe) => {
    const recipeElement = createRecipeElement(recipe);
    recipeContainerDiv.appendChild(recipeElement);
  });
}

// Create a new recipe element
function createRecipeElement(recipe) {
  const recipeElement = document.createElement("div");
  recipeElement.innerHTML = `
  <div class="recipeList" id="recipeList">
  <div class="col-6">
    <div class="details col-12">
        <h2>${recipe.name}</h2>
        <p><strong>Ingredient : </strong></p>
        <p>${recipe.ingredients}</p>
        <p><strong>Instructions : </strong></p>
        <p>${recipe.instructions}</p>
    </div>
    <div class="col-12">
        <button class="btn btn-primary" onclick="updateRecipe('${recipe.name}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteRecipe('${recipe.name}')">Delete</button>
    </div>
</div>
<div class="col-6">
    <img src="${recipe.image}" alt="${recipe.name}" />
</div>
</div>

`;
  return recipeElement;
}

// Add a new recipe
function addRecipe() {

  // Check if required fields are empty
  if (recipeName === '' || recipeIngredient === '' || recipeInstruction === '') {
    alert('Please fill in all required fields.');
    return;
  }

  // Create a recipe object
  const recipe = {
    id:recipeId.value,
    name: recipeNameInput.value,
    ingredients: recipeIngredientTextarea.value,
    instructions: recipeInstructionTextarea.value,
    image: "", // Placeholder for the image URL
  };
  // Check if a file is selected
  if (imageURLInput.files && imageURLInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Set the image URL to the result of the FileReader
      recipe.image = e.target.result;
      saveRecipe(recipe);
      loadRecipes();
      resetForm();
    };
    reader.readAsDataURL(imageURLInput.files[0]);
  } else {
    // No file selected, proceed with empty image URL
    saveRecipe(recipe);
    loadRecipes();
    resetForm();
  }
}

// Edit a recipe
function updateRecipe(recipeName) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    
    // Find the recipe to edit
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const recipeToEdit = recipes.find((recipe) => recipe.name === recipeName);

    if (recipeToEdit) {
        // Populate the form fields with the recipe data
        recipeNameInput.value = recipeToEdit.name;
        recipeIngredientTextarea.value = recipeToEdit.ingredients;
        recipeInstructionTextarea.value = recipeToEdit.instructions;

        saveRecipe();
        // Assuming you have a function to toggle the visibility of the form
         // Call this function to show the form
    } else {
        alert('Recipe not found');
    }
}

// Event listener for the form submission
document.getElementById('Update').addEventListener('click', (event) => {
    event.preventDefault();
    const updatedRecipe = {
        name: recipeNameInput.value,
        ingredients: recipeIngredientTextarea.value,
        instructions: recipeInstructionTextarea.value,
        image: imageURLInput.value // This will be the URL if the user has uploaded a new image, or an empty string if not
    };
    saveRecipe(updatedRecipe);
    loadRecipes();
    // Close the modal after updating the recipe
});

// Delete a recipe
function deleteRecipe(recipeName) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeName);
  localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  loadRecipes();
}

// Save a recipe to local storage
function saveRecipe(recipe) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const existingRecipeIndex = recipes.findIndex((r) => r.id === recipe.id);
  if (existingRecipeIndex >= 0) {
    recipes[existingRecipeIndex] = recipe;
  } else {
    recipes.push(recipe);
  }
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Reset the form fields
function resetForm() {
  recipeNameInput.value = "";
  imageURLInput.value = "";
  recipeIngredientTextarea.value = "";
  recipeInstructionTextarea.value = "";
}

// Initialize the app
loadRecipes();

// Event listeners for buttons
submitButton.addEventListener("click", addRecipe);
updateButton.addEventListener("click", updateRecipe);
