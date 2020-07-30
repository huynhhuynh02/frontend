export const LOCAL_STORAGE = {
  TOKEN: 'token',
};

export function save(key, value) {
  window.localStorage.setItem(key, value);
}

export function remove(key) {
  window.localStorage.removeItem(key);
}

export function get(key) {
  return window.localStorage.getItem(key);
}

export function getJSON(key) {
  let rs = null;
  const val = window.localStorage.getItem(key);
  if (val != null) {
    try {
      rs = JSON.parse(val);
    } catch (ignore) {
      console.log(ignore);
    }
  }
  return rs;
}

export function saveJSON(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
