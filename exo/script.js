
const user = {
  id: 1,
  username: "moussa",
  email: "moussa@example.com"
};

const items = [
  { id: 1, name: "Article 1", price: 10 },
  { id: 2, name: "Article 2", price: 25 },
  { id: 3, name: "Article 3", price: 30 },
  { id: 4, name: "Article 4", price: 15 }
];


const criteria = { key: 'price', value: 20 };

function runAuthExample() {
  const token = generateToken(user);
  console.log("Token généré : ", token);

  const decodedUser = verifyToken(token);
  console.log("Utilisateur décodé : ", decodedUser);
}

function runFilterExample() {
  const filteredItems = filterArray(items, criteria);
  console.log("Articles filtrés : ", filteredItems);
}
