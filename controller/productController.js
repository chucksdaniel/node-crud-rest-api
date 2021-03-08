const Product = require("../models/productModel");
const { getData } = require("../utils/helper");

//@desc     Get All product
//@route    GET /api/products

async function getAllProducts(req, res) {
	try {
		const products = await Product.findAll();

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(products));
	} catch (error) {
		console.log(error);
	}
}

//@desc     Get a particular product
//@route    GET /api/products/:id

async function getProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					message: "Product is not available at the moment",
				})
			);
		} else {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(product));
		}
	} catch (error) {
		console.log(error);
	}
}

//@desc     Create a Product
//@route    POST /api/products

async function createProduct(req, res) {
	try {
		const body = await getData(req);

		const { name, description, price } = JSON.parse(body);

		const product = {
			name,
			description,
			price,
		};

		const newProduct = await Product.create(product);

		res.writeHead(201, { "Content-Type": "application/json" });
		return res.end(JSON.stringify(newProduct));
	} catch (error) {
		console.log(error);
	}
}
//@desc     Update a Product
//@route    Put /api/products/:id

async function updateProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: "Product Not Found" }));
		} else {
			const body = await getData(req);

			const { name, description, price } = JSON.parse(body);

			const productData = {
				name: name || product.name,
				description: description || product.description,
				price: price || product.price,
			};

			const updatedProduct = await Product.update(id, productData);

			res.writeHead(200, { "Content-Type": "application/json" });
			return res.end(JSON.stringify(updatedProduct));
		}
	} catch (error) {
		console.log(error);
	}
}

//@desc     Delete a particular product
//@route    DELETE /api/products/:id

async function deleteProduct(req, res, id) {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(
				JSON.stringify({
					message: "Product Not Found",
				})
			);
		} else {
			await Product.remove(id);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ message: `Product ${id} removed` }));
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getAllProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
};
