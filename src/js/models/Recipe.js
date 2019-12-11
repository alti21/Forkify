import axios from 'axios';

export default class Recipe {
    constructor(id)
    {
        this.id = id;
    }

    async getRecipe()
    {
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(res);
        }
        catch(error)
        {
            console.log(error);
            alert(`something went wrong`);
        }
    }

    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings()
    {
        this.servings = 4;
    }

    parseIngredients()
    {
        const unitsLong = ['tablespoons','tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp','tbsp','oz','oz', 'tsp','tsp','cup','pound'];
        const units = [...unitsShort, 'kg', 'g'];//unitsShort array elements become part of units array
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });


            // 2) Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');//uses regular expression!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            // 3) Parase ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');//split an ingredient(string into an array
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));//return index of ingredient's unit's name found in arrIng

            let objIng;
            if(unitIndex > -1)
            {
                //There is a unit
                const arrCount = arrIng.slice(0, unitIndex);
                // i.e. 4 1/2 cups, arrCount is [4, 1/2], array of strings --> "4+1/2" --> eval("4+1/2") --> 4.5
                // i.e 4 cups, arrCount is [4]

                let count;
                if (arrCount.length === 1){
                    count = eval(arrIng[0].replace('-','+'));
                } else 
                {
                    count = eval(arrIng.slice(0, unitIndex).join('+')); 
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            }
            else if(parseInt(arrIng[0],10))//coerces to true if it returns a number, coerces to false if it returns NaM
            {
                // there is no unit but 1st element is number
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')//slice(1) removes 1st element of array and returns remaining array
                }//join() puts the elements back together into a string
            }
            else if (unitIndex === -1)
            {
                //There is no unit and no number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
}