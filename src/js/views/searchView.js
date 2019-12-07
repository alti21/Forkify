//export const add = (a,b) => a+b;
//export const multi = (a,b) => a*b;
//export const ID = 23;

import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

//split the array into its words, then use reduce the run the callback function each time for each element in the array
/*
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 0 + 5 = 5 / newTitle = ['Pasta'] 
acc: 5 / acc + cur.length = 5 + 4 = 9 / newTitle = ['Pasta', 'with'] 
acc: 9 / acc + cur.length = 9 + 6 = 15 / newTitle = ['Pasta', 'with', 'tomato'] 
acc: 15 / acc + cur.length = 15 + 3 = 18 / newTitle = ['Pasta', 'with', 'tomato'] 
acc: 18 / acc + cur.length = 18 + 6 = 24 / newTitle = ['Pasta', 'with', 'tomato'] 
*/

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];//can add elements to const array but can't change elements of const array
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;//in reduce(), returned value will be the acc for the next iteration
        }, 0);

        //return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup =  
    `<li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};