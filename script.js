const mealName = document.getElementById("mealName");
const images = document.getElementById("imgContainer");
const videoGuide = document.getElementById("videoGuide");
const videoBtn = document.getElementById("linkBtn");
const ingredients = document.getElementById("ingrList");
const instructions = document.getElementById("instructions");
const newRecipeBtn = document.getElementById("newRecipeBtn");



function displayRecipe(recipe) {
	console.log(recipe);
	
	// const textNodeMealName = document.createTextNode(recipe.strMeal);
	mealName.innerHTML = recipe.strMeal;

	const mealImg = document.createElement("img");
	mealImg.src = recipe.strMealThumb;
	mealImg.className = "meal-img"
	images.appendChild(mealImg);
	const recipeVid = recipe.strYoutube;

	videoGuide.innerHTML = `Click on the button to watch how to make ${recipe.strMeal}:`
	videoBtn.addEventListener("click", function() {window.open(recipeVid, 'new_window')});

	
	let arrayOfIngredients = [];
	let arrayOfMeasures = [];
	for(let i = 0; i < 20; i++) {
		console.log(recipe.strIngredient1);
		const individualIngredients = recipe[`strIngredient${i}`];
		const individualMeasures = recipe[`strMeasure${i}`];
		if(individualIngredients && individualMeasures) {
			arrayOfIngredients.push(individualIngredients);
			arrayOfMeasures.push(individualMeasures.toUpperCase());
			const ingredientsList = document.createElement("li");
			ingredients.appendChild(ingredientsList);
			const ingredientsTextNode = document.createTextNode(individualMeasures + " " + individualIngredients)
			ingredientsList.appendChild(ingredientsTextNode)
		}
	}

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



