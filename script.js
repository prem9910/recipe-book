// Select DOM elements
const recipeNameInput = document.getElementById("recipeName");
const imageURLInput = document.getElementById("imageURL");
const recipeIngredientTextarea = document.getElementById("recipeIngredient");
const recipeInstructionTextarea = document.getElementById("recipeInstruction");
const submitButton = document.getElementById("Submit");
const updateButton = document.getElementById("Update");
const recipeContainerDiv = document.getElementById("recipeContainer");
const recipeId = document.getElementById("recipeId");


function addRecipe() {
    // Check if all required fields are filled
    if (!recipeNameInput.value || !recipeIngredientTextarea.value || !recipeInstructionTextarea.value) {
        alert('Please fill out all required fields');
        return; // Exit the function early if any field is empty
    }

    // Create a recipe object
    const recipe = {
        id: isUpdating ? recipeId.value : Date.now(), // Use the existing ID if updating, otherwise generate a new one
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

    console.log(recipe);
}

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipeContainerDiv.innerHTML = ""; // Clear the container first
    recipes.forEach((recipe) => {
        const recipeElement = createRecipeElement(recipe);
        recipeContainerDiv.appendChild(recipeElement);
    });
}


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
        recipeId.value = recipeToEdit.id; // Set the recipe ID to the ID of the recipe to edit
        imageURLinput = recipeToEdit.imageURLinput;
        // Show the form for editing
        // Assuming you have a function to toggle the visibility of the form
        // Call this function to show the form
    } else {
        alert('Recipe not found');
    }

    console.log(recipeToEdit.id);
   
}


// Delete a recipe
function deleteRecipe(recipeName) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeName);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    loadRecipes();
  }


  function saveRecipe(recipe) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const existingRecipeIndex = recipes.findIndex((r) => r.name === recipe.name);
    console.log('Existing recipe index:', existingRecipeIndex); // Debugging statement
    console.log('Current recipes:', recipes); // Debugging statement

    if (existingRecipeIndex >=  0) {
        recipes[existingRecipeIndex] = recipe;
    } else {
        recipes.push(recipe);
    }

    console.log('Updated recipes:', recipes); // Debugging statement
    localStorage.setItem("recipes", JSON.stringify(recipes));
}
    

// Event listener for the Update button
document.getElementById('Update').addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create an updated recipe object
    const updatedRecipe = {
        id: recipeId.value,
        name: recipeNameInput.value,
        ingredients: recipeIngredientTextarea.value,
        instructions: recipeInstructionTextarea.value,
        image: imageURLInput.value // This will be the URL if the user has uploaded a new image
    };

    // Update the recipe in local storage
    saveRecipe(updatedRecipe);

    // Refresh the list of recipes in the UI
    loadRecipes();
    console.log(updatedRecipe.id)
    // Reset the form fields and hide the Update button
    resetForm();
    document.getElementById('Update').style.display = 'none';
    document.getElementById('Submit').style.display = 'block';
});

function createRecipeElement(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.className = 'recipe';
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

// Reset the form fields
function resetForm() {
    recipeNameInput.value = "";
    imageURLInput.value = "";
    recipeIngredientTextarea.value = "";
    recipeInstructionTextarea.value = "";
  }

  loadRecipes();