export default {
  set: (key, data) => {
    window.sessionStorage.setItem(key, data);
  },
  get: (key) =>	{
    return window.sessionStorage.getItem(key);
  },
  delete:(key)=>{
  	window.sessionStorage.removeItem(key)
  }
}