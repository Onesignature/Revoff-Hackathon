// Sample product data (in a real application, this would come from a database)
const products = [
  {
    id: '1',
    name: 'Smart Car',
    price: 35000,
    description: 'Electric smart car with AI features',
    image: '/Smart.png'
  },
  {
    id: '2',
    name: 'Lamborghini',
    price: 250000,
    description: 'High-performance luxury sports car',
    image: '/lambo.png'
  },
  {
    id: '3',
    name: 'Urus',
    price: 180000,
    description: 'Luxury SUV with outstanding performance',
    image: '/urus.jpg'
  }
];

// Get all products
const getProducts = (req, res) => {
  res.status(200).json(products);
};

// Get single product by ID
const getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  res.status(200).json(product);
};

// Create a new product (example of POST)
const createProduct = (req, res) => {
  const { name, price, description, image } = req.body;
  
  // Simple validation
  if (!name || !price) {
    res.status(400);
    throw new Error('Please provide name and price');
  }
  
  // Create new product (in a real app, this would be saved to a database)
  const newProduct = {
    id: Date.now().toString(),
    name,
    price: Number(price),
    description: description || '',
    image: image || '/default.png'
  };
  
  // For demo purposes only - in a real app we would add to a database
  products.push(newProduct);
  
  res.status(201).json(newProduct);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct
};
