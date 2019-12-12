import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem (count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        //splices changes the original array
        // [2,4,8] splice(1,1) (splice at index 1, splice 1 element) --> returns 4, original array is now [2,8]
        // [2,4,8] splice(1,2) (splice at index 1, splice 2 elements) --> returns [4,8], original array is now 2
        // [2,4,8] slice(1,2) (slice from index 1 to index 2) --> returns 4, original array is still [2,4,8]
        this.items.splice(index, 1);
        //returns these elements and deletes them from the original array
    }

    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}