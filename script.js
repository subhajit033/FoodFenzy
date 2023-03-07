function food_recipie() {
    let api_result = fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    api_result.then(function (api_response) {
        return api_response.json();
    }).then(function (response) {
        console.log(response);
        let meal;
        meal = response.meals[0];
        //start creating the ingridients table
        const ingredients = [];
        // Get all ingredients from the object. Up to 20
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
            } else {
                // Stop if no more ingredients
                break;
            }
        }
        console.log(ingredients)

        //meal will return only object now we can acess property by dot function

        let all_recipie = `
    <div class="mb-16">
    <!-- meal images -->
    <img class="w-10/12 outline outline-offset-4 outline-yellow-400 rounded-lg" src="${meal.strMealThumb}" alt="food">
    <!-- specification of meal -->
    <div class="space-y-2 my-5">
        <p class="font-semibold">Category: <span class="font-normal text-gray-400">${meal.strCategory}</span></p>
        <p class="font-semibold">Area: <span class="font-normal text-gray-400">${meal.strArea}</span></p>
        <p class="font-semibold class="w-10/12">Tags: <span class="font-normal text-gray-400">${meal.strTags}</span></p>
    </div>
    <!-- ingredients -->
    <div class="space-y-2 my-5">
    <p class="font-semibold text-xl text-blue-400 font-[cursive]">Ingredients:</p>
    <ul class="list-inline">
    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
    </ul>
    </div>

    <!-- how to cook dish -->
    <div class="my-6">
        <h3 class="text-xl font-semibold">${meal.strMeal}</h3>
        <p class="font-semibold text-blue-400 font-[cursive]">Instructions:</p>
        <p class="w-11/12 text-justify leading-5 pr-2">
            ${meal.strInstructions}
        </p>
    </div>
    <!-- supporting video -->
    <div class="my-4 space-y-6">
        <h3 class="text-xl text-blue-400 font-[cursive]">Video Recipe</h3>
        <div class="videoWrapper">
        <iframe width="310" height="250"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
        </iframe>
    </div>
    </div>
</div>
    `
        document.getElementById('main-container').innerHTML = all_recipie;
    }).catch(function (err) {
        console.log(err);
    });
}
document.getElementById('meal-btn').addEventListener('click', function () {
    food_recipie();
})

