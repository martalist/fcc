const recipes = [
  {
    name: 'Guacamole',
    ingredients: [
      "3 avocados - peeled, pitted, and mashed",
      "1 lime, juiced",
      "1 teaspoon salt",
      "1/2 cup diced onion",
      "3 tablespoons chopped fresh cilantro",
      "2 roma (plum) tomatoes, diced",
      "1 teaspoon minced garlic",
      "1 pinch ground cayenne pepper (optional)"
    ],
    method: [
      "In a medium bowl, mash together the avocados, lime juice, and salt.",
      "Mix in onion, cilantro, tomatoes, and garlic.",
      "Stir in cayenne pepper.",
      "Refrigerate 1 hour for best flavor, or serve immediately."
    ]
  },
  {
    name: 'Chili Rellenos Casserole',
    ingredients: [
      '2 (7 ounce) cans whole green chile peppers, drained',
      '8 ounces Monterey Jack cheese, shredded',
      '8 ounces Longhorn or Cheddar cheese, shredded',
      '2 eggs, beaten',
      '1 (5 ounce) can evaporated milk',
      '2 tablespoons all-purpose flour',
      '1/2 cup milk',
      '1 (8 ounce) can tomato sauce'
    ],
    method: [
      'Preheat oven to 350 degrees F (175 degrees C). Spray a 9x13-inch baking dish with cooking spray.',
      'Lay half of the chilies evenly in bottom of baking dish. Sprinkle with half of the Jack and Cheddar cheeses, and cover with remaining chilies. In a bowl, mix together the eggs, milk, and flour, and pour over the top of the chilies.',
      'Bake in the preheated oven for 25 minutes. Remove from oven, pour tomato sauce evenly over the top, and continue baking another 15 minutes. Sprinkle with remaining Jack and Cheddar cheeses, and serve.'
    ]
  },
  {
    name: 'Cranberry Spinach Salad',
    ingredients: [
      '1 tablespoon butter',
      '3/4 cup almonds, blanched and slivered',
      '1 pound spinach, rinsed and torn into bite-size pieces',
      '1 cup dried cranberries',
      '2 tablespoons toasted sesame seeds',
      '1 tablespoon poppy seeds',
      '1/2 cup white sugar',
      '2 teaspoons minced onion',
      '1/4 teaspoon paprika',
      '1/4 cup white wine vinegar',
      '1/4 cup cider vinegar',
      '1/2 cup vegetable oil'
    ],
    method: [
      'In a medium saucepan, melt butter over medium heat. Cook and stir almonds in butter until lightly toasted. Remove from heat, and let cool.',
      'In a medium bowl, whisk together the sesame seeds, poppy seeds, sugar, onion, paprika, white wine vinegar, cider vinegar, and vegetable oil. Toss with spinach just before serving.',
      'In a large bowl, combine the spinach with the toasted almonds and cranberries.'
    ]
  }
];

export const titleToUrl = (title) => encodeURI(
  ( title.toLowerCase().split(' ') ).join('-')
);

export const urlToTitle = (url) => decodeURI(url).split('-').map(
  word => word[0].toUpperCase() + word.slice(1)
).join(' ');

export default recipes;
