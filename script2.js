const recipeNameInput = document.getElementById("recipeName");
const imageURLInput = document.getElementById("imageURL");
const recipeIngredientTextarea = document.getElementById("recipeIngredient");
const recipeInstructionTextarea = document.getElementById("recipeInstruction");
const submitButton = document.getElementById("Submit");
const updateButton = document.getElementById("Update");
const recipeContainerDiv = document.getElementById("recipeContainer");
const recipeId = document.getElementById("recipeId");

function addRecipe() {
    if (
      !recipeNameInput.value ||
      !recipeIngredientTextarea.value ||
      !recipeInstructionTextarea.value
    ) {
      alert("Please fill out all required fields");
      return;
    }
  
    // Check if the form is in update mode
    const isUpdateMode = document.getElementById("Update").style.display === "block";
  
    // Create a recipe object
    const recipe = {
      id: isUpdateMode ? recipeId.value : Date.now(), // Use existing ID if in update mode, otherwise generate a new one
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


function loadRecipes() {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  recipeContainerDiv.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeElement = createRecipeElement(recipe);
    recipeContainerDiv.appendChild(recipeElement);
  });
}

function updateRecipe(recipeName) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
  
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const recipeToEdit = recipes.find((recipe) => recipe.name === recipeName);
  
    if (recipeToEdit) {
      recipeNameInput.value = recipeToEdit.name;
      recipeIngredientTextarea.value = recipeToEdit.ingredients;
      recipeInstructionTextarea.value = recipeToEdit.instructions;
      recipeId.value = recipeToEdit.id;
  
      const imageElement = document.getElementById("imageURL");
      if (imageElement) {
        imageElement.src = recipeToEdit.image;
        imageElement.alt = recipeToEdit.name;
      } else {
        console.error('Image element with ID "currentImage" not found');
      }
  
      // Assign the existing recipe's ID to the recipe object
      recipe.id = recipeToEdit.id; // Ensure the ID remains the same
    } else {
      alert("Recipe not found");
    }
  }
  

function deleteRecipe(recipeName) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const updatedRecipes = recipes.filter((recipe) => recipe.name !== recipeName);
  localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  loadRecipes();
}

function saveRecipe(recipe) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const existingRecipeIndex = recipes.findIndex((r) => r.id === recipe.id);

    if (existingRecipeIndex >= 0) {
        recipes[existingRecipeIndex] = recipe; // Replace the existing recipe with the updated one
    } else {
        recipes.push(recipe); // Add the new recipe if it doesn't already exist
    }

    localStorage.setItem("recipes", JSON.stringify(recipes));
}



document.getElementById("Update").addEventListener("click", (event) => {
  event.preventDefault();

  if (imageURLInput.files && imageURLInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const updatedRecipe = {
        id: recipeId.value,
        name: recipeNameInput.value,
        ingredients: recipeIngredientTextarea.value,
        instructions: recipeInstructionTextarea.value,
        image: e.target.result,
      };
      saveRecipe(updatedRecipe);
      loadRecipes();
      resetForm();
      document.getElementById("Update").style.display = "none";
      document.getElementById("Submit").style.display = "block";
    };
    reader.readAsDataURL(imageURLInput.files[0]);
  } else {
    const updatedRecipe = {
      id: recipeId.value,
      name: recipeNameInput.value,
      ingredients: recipeIngredientTextarea.value,
      instructions: recipeInstructionTextarea.value,
      image: imageURLInput.value,
    };
    saveRecipe(updatedRecipe);
    loadRecipes();
    resetForm();
    document.getElementById("Update").style.display = "none";
    document.getElementById("Submit").style.display = "block";
  }
});

function createRecipeElement(recipe) {
  const recipeElement = document.createElement("div");
  recipeElement.className = "recipe";
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

function resetForm() {
  recipeNameInput.value = "";
  imageURLInput.value = "";
  recipeIngredientTextarea.value = "";
  recipeInstructionTextarea.value = "";
}

loadRecipes();
