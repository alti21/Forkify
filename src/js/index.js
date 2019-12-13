// Global app controller
//import str from './models/Search';

//import { add, multi, ID } from './views/searchView';
//for different names: import { add as a, multi as m, ID } from './views/searchView';
//console.log(`using imported functions! ${add(ID, 2)} and ${multi(3,5)}. ${str}`);
//using imported functions! 25 and 15. I am an exported string

//another way:
//import * as searchView from './views/searchView';
//console.log(`using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multi(3,5)}. ${str}`);
//using imported functions! 25 and 15. I am an exported string

//import axios from 'axios';

//getResults('broccoli');

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/SearchView';
import * as recipeView from './views/RecipeView';
import * as listView from './views/ListView';
import { elements, renderLoader, clearLoader } from './views/base';
import Likes from './models/Likes';
/*
Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping List object
 * - Liked recipes
*/
const state = {};
window.state = state;

/// SEARCH CONTROLLER ///////////////////////////////////////
const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput(); //TODO

    if(query) 
    {
        // 2. new search object and add ot state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes)

        try {

            // 4. Search for recipes
            await state.search.getResults();//returns a promise

            // 5. render results on UI, we want this to happen after we receive results from the api, so add await to getResults() above
            clearLoader();
            searchView.renderResults(state.search.result);
            //console.log(state.search.result);//array with recipes
            //after clicking on search button, console will display recipes for pizza!
        }
        catch(error)
        {
            alert('Something wrong with the search...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//closest() returns the closest ancestor of the current element (or current element itself) which matches the selectors givin in parameter
elements.searchResPages.addEventListener('click', e => {
    ///////////////////////////////////////////////////WRITE DOWN///////////////////////////////////////
    const btn = e.target.closest('.btn-inline');//we can click on the span or icon (both are inside btn-inline), 
    //and closest() will return .btn-inline, which is parent element of span and icon
    //so by clicking on any part of the button, we will get btn-inline in return
    //console.log(btn);//.btn-inline
    if (btn) 
    {
        const goToPage = parseInt(btn.dataset.goto, 10);//retrive data stored in HTML data attribute!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //value fron data attribute is stored as string, so parseInt to get an int!!!!!!!!!!
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        console.log(goToPage);//returns page number that button will take you to
    }
});



//const r = new Recipe(47746);///////////////////////////////////////////////////WRITE DOWN///////////////////////////////////////
//r.getRecipe();
//console.log(r);

/// RECIPE CONTROLLER ///////////////////////////////////////
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#','');
    console.log(id);

    if (id) 
    {
        //Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if(state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {

            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();//returns a promise
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        }
        catch(error)
        {
            alert('Error processing recipe!');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event,controlRecipe));

// LIST CONTROLLER
const controlList = () => {
    // Make new list if there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });

}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;// click on any child of element with class="shopping__item"
    // this will go to the closest element with class="shopping__item" and read the id from that 
    // (id is in the data attribute of element with class="shopping__item")

    // Handle the delete button
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleItem(id);
    } //handle the count update
    else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value,10);
        state.list.updateCount(id, val);
    }
});

// LIKE CONTROLLER
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // User has not yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        // Toggle the like button

        // Add like to UI list
        console.log(state.likes);

    }// User has yet liked current recipe
    else {
        // Remove like to the state
        state.likes.deleteLike(currentID);

        // Toggle the like button

        // Remove like to UI list
        console.log(state.likes);
    }
}

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {//all the elements that we select here are not yet on the DOM
    //so we add the event listener to element with class="recipe" (elements.recipe)
    ///////////////////////////////////////////////////WRITE DOWN///////////////////////////////////////
    //use event delegation since the elements are not currently loaded onto the page
    if(e.target.matches('.btn-decrease, .btn-decrease *'))//true if target element matches btn-decrease or any of btn-decrease's children ( * selector)
    {
        //decrease button is clicked
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    else if(e.target.matches('.btn-increase, .btn-increase *'))//true if target element matches btn-increase or any of btn-increase's children ( * selector)
    {
        //increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like conroller
        controlLike();
    }
    //console.log(state.recipe);
});

window.l = new List();


//const search = new Search('pizza');
//console.log(search);
//search.getResults();

