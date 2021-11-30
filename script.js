/*
Recipe App

Step 1: Define several variable with the selection of each HTML elements by their Id name on which the contents will be 
displayeded.
Step 2: Create an <img> element on which the image of the meal will be displayed. This <img> element
will not be displayed for now.
Step 3: Create a function called getRecipes that fetches the API using axios. If there are no errors, the response
for the "get" request will call a function called displayRecipe. This function will take in as its parameter the "meals" array
from the response data. This function will get executed on page load and everytime the "New Recipe" button at the top of the page
gets clicked.
Step 5: Create the function called displayRecipe that will take in a recipe as its parameter. This recipe refers to the "meals"
array from the response data that we got in the previous function. This function will select the data that we need from the "meals" 
array for the content of the page including the name of the meal, an image of the meal (that will be displayed in the <img> element that
had been previously created), a YouTube video of the recipe that will be accessed by clicking a button, the list of ingredients, and the 
instructions. Everytime this function gets called, it will display on the page a new random recipe from the API with the data we selected.
*/


const mealName = document.getElementById("mealName");
const images = document.getElementById("imgContainer");
const videoGuide = document.getElementById("videoGuide");
const videoBtn = document.getElementById("linkBtn");
const ingredients = document.getElementById("ingrList");
const instructions = document.getElementById("instructions");
const newRecipeBtn = document.getElementById("newRecipeBtn");

const mealImg = document.createElement("img");
mealImg.className = "meal-img";
mealImg.style.display = "none";

function getRecipes() {
	axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
	    .then(response => {
	        const recipe = response.data;
	        displayRecipe(recipe.meals[0]);
        })
        .catch(error => console.error(error));
};

getRecipes();

function displayRecipe(recipe) {
	mealName.innerHTML = recipe.strMeal;
	displayImage(recipe);
	displayVideo(recipe);
	displayIngrInstruc(recipe);	
};

const displayImage = recipe => {
	mealImg.style.display = "block";
	mealImg.src = recipe.strMealThumb;
	images.appendChild(mealImg);
};

const displayVideo = recipe => {
	const recipeVid = recipe.strYoutube;
	videoGuide.innerHTML = `Click on the button to watch how to make ${recipe.strMeal}:`
	videoBtn.addEventListener("click", function() {window.open(recipeVid, "new_window")});
};

const displayIngrInstruc = recipe => {
	let arrayOfIngredients = [];

	for(let i = 0; i < 20; i++) {		
		const individualIngredients = recipe["strIngredient" + i];
		const individualMeasures = recipe["strMeasure" + i];
		if(individualIngredients) {
			arrayOfIngredients.push(individualMeasures + " " + individualIngredients);
		};
	}
	ingredients.innerHTML = "<li>" + arrayOfIngredients.join("</li><li>"); + "</li>";

	instructions.innerHTML = recipe.strInstructions;
};


