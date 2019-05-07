function urlParse(location, {
  toNumber = false,
  transform = false,
} = {}) {
  const type = Object.prototype.toString.call(location);
  let query = null;
  if (type === '[object Location]') {
    query = location.search.slice(1);
  } else if (type === '[object String]') {
    const index = location.indexOf('?');
    if (~index) {
      query = location.slice(index + 1);
    } else {
      return {};
    }
  } else {
    return location;
  }
  let params = {};
  if (!query) return params;
  let paramsList = [];
  paramsList = query.split('&');
  paramsList.forEach(item => {
    const paramsMap = item.split('=');
    if (paramsMap.length < 2) return;
    let [key, value] = paramsMap;
    transform && (value = decodeURIComponent(value));
    toNumber && !isNaN(Number(value)) && !isNaN(parseInt(value)) && (value = parseInt(value));
    params[key] = value;
  });
  return params;
}

export default urlParse;
