const express = require('express')
const path = require('path')
const ejs = require('ejs')
const methodOverride = require('method-override');
const mongoose = require('mongoose')
const app = express();
const router = express.Router();
const Product = require('./models/product.js')
const cors = require('cors');

app.set('view engine', 'ejs');;
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(router);
app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173'
}));
mongoose.connect('mongodb+srv://lingarajs2002:ROGO5cU8ytLx9OX1@roxilersystems.x7tg5wh.mongodb.net/?retryWrites=true&w=majority&appName=RoxilerSystems', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

async function fetchAndSaveData(){
  try {
      const file = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
      const response = await fetch(file);
      const data = await response.json();
  
      // Iterate through each item in data and save it to MongoDB
      for (const item of data) {
        const { id, title, price, description, category, image, sold, dateOfSale } = item;
  
        // Create a new instance of the Product model
        const newProduct = new Product({
          id,
          title,
          price,
          description,
          category,
          image,
          sold,
          dateOfSale,
        });
  
        // Save the new product to MongoDB
        await newProduct.save();
      }
  
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error fetching or saving data:", error);
      throw error; // Propagate the error up
    }
}




app.get("/demo", async (req, res) => {
    try {
      const file = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";
      const response = await fetch(file);
      const data = await response.json();
    //   const ids = data.map(item => item.id);
      res.send(data)
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error retrieving data");
    }
  });

app.get("/",(req,res)=>{
    res.render('main')
})

app.get("/showDB",async (req,res)=>{
const item = await Product.find({})
res.send(item)
})

app.get("/createDB",async(req,res)=>{
  fetchAndSaveData();
  res.send("Data-Saved Sucessfully")
})


app.listen(3000, () => {
  console.log('Serving on port 3000');
});
