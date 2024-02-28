const form = document.getElementById("myForm");
const modal = document.getElementById("recipeForm");
const modalTitle = document.querySelector("#recipeForm .modal-title");
const newRecipeBtn = document.querySelector(".newRecipe");
const recipeNameInput = document.getElementById("recipeName");
const imageURLInput = document.getElementById("imageURL");
const recipeIngredientTextarea = document.getElementById("recipeIngredient");
const recipeInstructionTextarea = document.getElementById("recipeInstruction");
const submitButton = document.getElementById("Submit");
const updateButton = document.getElementById("Update");
const recipeContainerDiv = document.getElementById("recipeContainer");
const recipeId = document.getElementById("recipeId");

let getData = localStorage.getItem("recipes")
  ? JSON.parse(localStorage.getItem("recipes"))
  : [];

let isEdit = false,
  editId;
showInfo();

newRecipeBtn.addEventListener("click", () => {
  (submitButton.innerText = "Submit"), (modalTitle.innerText = "Fill the Form");
  isEdit = false;
  // imgInput.src = "./image/Profile Icon.webp";
  form.reset();
});

// file.onchange = function () {
//   if (file.files[0].size < 1000000) {
//     // 1MB = 1000000
//     var fileReader = new FileReader();

//     fileReader.onload = function (e) {
//       imgUrl = e.target.result;
//       imageURLInput.src = imgUrl;
//     };

//     fileReader.readAsDataURL(file.files[0]);
//   } else {
//     alert("This file is too large!");
//   }
// };

function showInfo() {
  document
    .querySelectorAll(".recipeList")
    .forEach((info) => info.remove());
  getData.forEach((recipe, index) => {
    let createElement = `
    <div class="recipeList" id="recipeList">
    <div class="col-6">
    <div class="details col-12">
        <h2>${recipe.recipeName}</h2>
        <p><strong>Ingredient : </strong></p>
        <p>${recipe.recipeIngredient}</p>
        <p><strong>Instructions : </strong></p>
        <p>${recipe.recipeInstruction}</p>
    </div>
    <div class="col-12">
        <button class="btn btn-primary" onclick="editRecipe('${index}','${recipe.recipeName}', '${recipe.recipeIngredient}', '${recipe.recipeInstruction}','${recipe.image}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteRecipe('${index}')">Delete</button>
    </div>
</div>
<div class="col-6">
    <img src="${recipe.image}" alt="${recipe.recipeName}" />
</div>
</div>`;




recipeContainerDiv.innerHTML += createElement;
  });
}
showInfo();


function editRecipe(index,recipeName,recipeIngredient,recipeInstruction,imageURL) {
  isEdit = true;
  editId = index;
  imageURLInput.src = imageURL;
  recipeNameInput.value = recipeName;
  recipeIngredientTextarea.value = recipeIngredient;
  recipeInstructionTextarea.value = recipeInstruction;
  submitButton.innerText = "Update";
  modalTitle.innerText = "Update The Form";

  console.log(editId);
}

function deleteRecipe(index) {
  if (confirm("Are you sure want to delete?")) {
    getData.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(getData));
    showInfo();
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const information = {
    image:
      imageURLInput.src == undefined ? "./images/img.jpeg" : imageURLInput.src,
    recipeName: recipeNameInput.value,
    recipeIngredient : recipeIngredientTextarea.value,
    recipeInstruction : recipeInstructionTextarea.value,
    recipeId : recipeId.value,

  };

  if (!isEdit) {
    getData.push(information);
  } else {
    isEdit = false;
    getData[editId] = information;
  }

  localStorage.setItem("recipes", JSON.stringify(getData));

  submitButton.innerText = "Submit";
  modalTitle.innerHTML = "Fill The Form";

  showInfo();

  form.reset();

  imageURL.src = "./images/img.jpeg";

  // modal.style.display = "none"
  // document.querySelector(".modal-backdrop").remove()
});

showInfo();
