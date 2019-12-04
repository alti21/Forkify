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
import * as searchView from './views/SearchView';
import { elements } from './views/base';
/*
Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping List object
 * - Liked recipes
*/
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput; //TODO
    console.log(query);

    if(query) 
    {
        // 2. new search object and add ot state
        state.search = new Search(query);

        // 3. Prepare UI for results


        // 4. Search for recipes
        await state.search.getResults();//returns a promise

        // 5. render results on UI, we want this to happen after we receive results from the api, so add await to getResults() above
        console.log(state.search.result);
        //after clicking on search button, console will display recipes for pizza!
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//const search = new Search('pizza');
//console.log(search);
//search.getResults();