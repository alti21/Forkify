export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id, 
            title,
            author,
            img
        }
        this.likes.push(like);

        // Persist daata in localStorage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        //splices changes the original array
        // [2,4,8] splice(1,1) (splice at index 1, splice 1 element) --> returns 4, original array is now [2,8]
        // [2,4,8] splice(1,2) (splice at index 1, splice 2 elements) --> returns [4,8], original array is now 2
        // [2,4,8] slice(1,2) (slice from index 1 to index 2) --> returns 4, original array is still [2,4,8]
        this.likes.splice(index, 1);
        //returns these elements and deletes them from the original array

         // Persist daata in localStorage
         this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restoring likes from the localStorage to global state
        if (storage) this.likes = storage;
    }
}