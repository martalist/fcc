export const titleToUrl = (title) => encodeURI(
  ( title.toLowerCase().split(' ') ).join('-')
);

export const urlToTitle = (url) => decodeURI(url).split('-').map(
  word => word[0].toUpperCase() + word.slice(1)
).join(' ');


export const findRecipe = (arr, urlParam) => arr.reduce(
  (a,b) => titleToUrl(b.name) === urlParam ? b : a,
  null
);
