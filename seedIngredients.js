// seedIngredients.js - No dependencies required (Node.js 18+)

// Fixed list of 100 simple ingredient names
const INGREDIENTS = [
  "Salt",
  "Pepper",
  "Sugar",
  "Flour",
  "Rice",
  "Pasta",
  "Bread",
  "Egg",
  "Milk",
  "Butter",
  "Cheese",
  "Yogurt",
  "Cream",
  "Olive Oil",
  "Vegetable Oil",
  "Vinegar",
  "Soy Sauce",
  "Mustard",
  "Mayonnaise",
  "Ketchup",
  "Honey",
  "Garlic",
  "Onion",
  "Shallot",
  "Ginger",
  "Potato",
  "Sweet Potato",
  "Carrot",
  "Tomato",
  "Cucumber",
  "Bell Pepper",
  "Eggplant",
  "Zucchini",
  "Spinach",
  "Lettuce",
  "Kale",
  "Broccoli",
  "Cauliflower",
  "Cabbage",
  "Mushroom",
  "Avocado",
  "Lemon",
  "Lime",
  "Orange",
  "Apple",
  "Banana",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Peach",
  "Pear",
  "Grape",
  "Pineapple",
  "Mango",
  "Watermelon",
  "Cantaloupe",
  "Kiwi",
  "Cherry",
  "Plum",
  "Apricot",
  "Fig",
  "Pomegranate",
  "Coconut",
  "Almond",
  "Walnut",
  "Peanut",
  "Cashew",
  "Pistachio",
  "Hazelnut",
  "Pecan",
  "Sunflower Seed",
  "Pumpkin Seed",
  "Sesame Seed",
  "Chicken",
  "Beef",
  "Pork",
  "Lamb",
  "Turkey",
  "Duck",
  "Salmon",
  "Tuna",
  "Cod",
  "Shrimp",
  "Crab",
  "Lobster",
  "Scallop",
  "Mussel",
  "Clam",
  "Oyster",
  "Bacon",
  "Sausage",
  "Ham",
  "Chocolate",
  "Vanilla",
  "Cinnamon",
  "Nutmeg",
  "Basil",
  "Oregano",
  "Thyme",
  "Rosemary",
  "Parsley",
  "Cilantro",
  "Mint",
  "Dill",
  "Sage",
];

async function seedIngredients() {
  const baseUrl = "http://localhost:3000/ingredients";

  try {
    for (const name of INGREDIENTS) {
      const formData = new URLSearchParams();
      formData.append("name", name);

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Added ingredient: ${name}`);

      // Small delay to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    console.log("Successfully seeded 100 ingredients!");
  } catch (error) {
    console.error("Error seeding ingredients:", error.message);
  }
}

seedIngredients();
