const mealName = document.getElementById("mealName");
const images = document.getElementById("imgContainer");
const videoGuide = document.getElementById("videoGuide");
const videoBtn = document.getElementById("linkBtn");
const ingredients = document.getElementById("ingrList");
const instructions = document.getElementById("instructions");
const newRecipeBtn = document.getElementById("newRecipeBtn");

const mealImg = document.createElement("img");
mealImg.className = " meal-img";
mealImg.style.display = "none";

function displayRecipe(recipe) {
	console.log(recipe);

	mealName.innerHTML = recipe.strMeal;

	mealImg.style.display = "block";
	mealImg.src = recipe.strMealThumb;
	images.appendChild(mealImg);
	
	const recipeVid = recipe.strYoutube;
	videoGuide.innerHTML = `Click on the button to watch how to make ${recipe.strMeal}:`
	videoBtn.addEventListener("click", function() {window.open(recipeVid, 'new_window')});
	
	let arrayOfIngredients = [];
	for(let i = 0; i < 20; i++) {		
		console.log(recipe.strIngredient1);
		const individualIngredients = recipe[`strIngredient${i}`];
		const individualMeasures = recipe[`strMeasure${i}`];
		if(individualIngredients) {
			arrayOfIngredients.push(individualMeasures + " " + individualIngredients);
			console.log(arrayOfIngredients);
		};
	}
	ingredients.innerHTML = '<li>' + arrayOfIngredients.join("</li><li>"); + '</li>';

	instructions.innerHTML = recipe.strInstructions;
};

function getRecipes() {
	axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
	    .then(response => {
	        console.log(response);
	        const recipe = response.data;
	        console.log(`GET list recipe`, recipe);
	        displayRecipe(recipe.meals[0]);

        })
        .catch(error => console.error(error));
};

getRecipes();

function getNewRecipes() {
	axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
	    .then(response => {
	        console.log(response);
	        const recipe = response.data;
	        console.log(`GET list recipe`, recipe);
	        mealImg.remove();
	        ingredients.innerHTML = "";
	        displayRecipe(recipe.meals[0]);	      
        })
          
        .catch(error => console.error(error));
};




