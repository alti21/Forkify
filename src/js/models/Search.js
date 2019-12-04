//export default 'I am an exported string';

//Search query and Search results in this file

import axios from 'axios';

export default class Search 
{
    constructor(query) 
    {
        this.query = query;
    }
    
    async getResults() {//async functions return a promise
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`); //for fetching HTTP requests, automatically returns json
            //parameter comes after the question mark, in this case the parameter is q
            //axios() returns a promise
            //console.log(res);
            /*
            {data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
            config: {url: "https://forkify-api.herokuapp.com/api/search?q=pizza", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
            data:
            count: 30
            recipes: (30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            __proto__: Object
            headers: {content-type: "application/json; charset=utf-8", content-length: "10149"}
            request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
            status: 200
            statusText: "OK"
            __proto__: Object
            */
            this.result = res.data.recipes;
            //console.log(this.result);
            /* outputs each recipie only
            (30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            */
        } catch(error)
        {
            alert(error);
        }
    }
}
//both Search and corresponding result of Search are encapsulated inside this object