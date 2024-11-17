const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(express.static('static'));

const products = [
  {
    name: 'Laptop',
    price: 50000,
    category: 'Electronics',
  },
  {
    name: 'Mobile',
    price: 20000,
    category: 'Electronics',
  },
  {
    name: 'Shirt',
    price: 1500,
    category: 'Apparel',
  },
  {
    name: 'Mixer Grinder',
    price: 4000,
    category: 'Home Appliances',
  },
];

const cars = [
  {
    make: 'Maruti',
    model: 'Swift',
    mileage: 15000,
  },
  {
    make: 'Hyundai',
    model: 'i20',
    mileage: 25000,
  },
  {
    make: 'Tata',
    model: 'Nexon',
    mileage: 30000,
  },
];

const movies = [
  {
    title: '3 Idiots',
    genre: 'Comedy',
    rating: 9,
  },
  {
    title: 'Dangal',
    genre: 'Drama',
    rating: 10,
  },
  {
    title: 'Bahubali',
    genre: 'Action',
    rating: 8,
  },
];

const orders = [
  {
    orderId: 1,
    customerName: 'Rahul',
    status: 'shipped',
  },
  {
    orderId: 2,
    customerName: 'Sita',
    status: 'pending',
  },
  {
    orderId: 3,
    customerName: 'Amit',
    status: 'shipped',
  },
];

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

function filterProductByCategory(products, category) {
  console.log(products, category);
  return products.filter((ele) => ele.category === category);
}

app.get('/products/category/:productCategory', (req, res) => {
  const { productCategory } = req.params;
  console.log(req.params);
  res.json(filterProductByCategory(products, productCategory));
});

function filterCarsByMileage(cars, mileage) {
  return cars.filter((ele) => ele.mileage <= mileage);
}

app.get('/cars/mileage/:mileage', (req, res) => {
  const { mileage } = req.params;
  res.json(filterCarsByMileage(cars, parseFloat(mileage)));
});

function filterMoviesByRating(movies, rating) {
  console.log(movies, rating);
  return movies.filter((ele) => ele.rating > rating);
}

app.get('/movies/rating/:rating', (req, res) => {
  const { rating } = req.params;
  res.json(filterMoviesByRating(movies, parseFloat(rating)));
});

function filterOrderByStatus(orders, status) {
  return orders.filter((ele) => ele.status === status);
}

app.get('/orders/status/:status', (req, res) => {
  const { status } = req.params;
  res.json(filterOrderByStatus(orders, status));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
