var storage = {
    get: function(key){
        return JSON.parse(localStorage.getItem(key));
    },
    set: function(key, val){
        localStorage.setItem(key, JSON.stringify(val));
    },
    remove: function(key){
        localStorage.removeItem(key);
    }
}

export default storage;