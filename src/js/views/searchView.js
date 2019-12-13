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
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
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

export const limitRecipeTitle = (title, limit = 17) => {
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
//WRITE DOWN ABOUT HTML DATA ATTRIBUTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// type is 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pages > 1)
    {
        //button to go to next page shows
        button = createButton(page, 'next');
    }
    else if(page < pages)
    {
        //both buttons show 
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
    }
    else if (page === pages && pages > 1) 
    {
        // only button to go to prev page shows
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    //render resutls of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start,end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};