export default {
  set: (key, data) => {
    localStorage.setItem(key, data);
  },
  get: (key) => {
    return localStorage.getItem(key);
  }
}