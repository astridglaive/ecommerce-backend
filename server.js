const express = require('express');
const cors = require('cors');
const products = require('./data/products');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://react-ecommerce-mu-pearl.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Grand Piece Store API',
        version: '1.0.0',
        status: 'Running',
        endpoints: {
            products: '/api/products',
            categories: '/api/categories',
            productById: '/api/products/:id'
        }
    });
});

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Get all categories
app.get('/api/categories', (req, res) => {
    const categories = [...new Set(products.map(p => p.category))];
    res.json(categories);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/products`);
});