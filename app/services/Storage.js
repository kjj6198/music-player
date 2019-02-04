const NAME_SAPCE = '__MUSIC_PLAYER__';

let store = {};

function hasOwnProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export default class Storage {
  static get(key) {
    if (hasOwnProp(store, key)) {
      return store[key];
    }

    if (localStorage && hasOwnProp(localStorage, NAME_SAPCE)) {
      const obj = JSON.parse(localStorage.getItem(NAME_SAPCE));
      if (hasOwnProp(obj, key)) {
        store[key] = obj[key];
        return store[key];
      }
    }

    return null;
  }

  static set(key, value) {
    if (localStorage) {
      store[key] = value;
      localStorage.setItem(NAME_SAPCE, JSON.stringify(store));
    }
  }

  static remove(key) {
    delete store[key];
    localStorage.setItem(JSON.stringify(store));
  }

  static removeAll() {
    store = {};
    localStorage.removeItem(NAME_SAPCE);
  }
}
