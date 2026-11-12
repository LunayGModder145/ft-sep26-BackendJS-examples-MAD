const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

const createProduct = async (data) => {
   const {id, title, price, description, image, companyName} = data;

   const provider = await Provider.findOne({ companyName });
   
   if (!provider)
     return null;

   const provider_id = provider._id.toString(); // ObjectID('6af5ac5e364a8d307a0751ba')

   const product = new Product({
       id,
       title,
       price,
       description,
       image,
       provider: provider_id,
   });

   const result = await product.save();
   console.log(result);

   return result;
}

const getProduct = async (id = "") => {

    // INNER JOIN con populate()
    let products = id?
                    await Product
                            .find({ id }, '-_id -__v')
                            // .populate('provider','-_id -__v') 
                    : await Product
                            .find({}, '-_id -__v')
                            // .populate('provider','-_id -__v'); //{}

    return products;
}

// const editProduct = async ()=>{}
// const deleteProduct = async ()=>{}

module.exports = {
    createProduct,
    getProduct,
    // editProduct,
    // deleteProduct
}

/*
    getProduct()
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
*/