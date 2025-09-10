// src/pages/Dashboards/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/slices/productSlice'; // Assuming updateProduct action exists
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate

const ProductForm = ({ isDarkMode, action }) => { // Accept isDarkMode and action props
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams(); // Get productId for 'edit' action

  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.list);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(''); // For image URL
  const [productCategory, setProductCategory] = useState(''); // New state for category
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Effect to load product data if in 'edit' mode
  useEffect(() => {
    if (action === 'edit' && productId) {
      const productToEdit = products.find(p => p.id === productId && p.sellerId === user?.id);
      if (productToEdit) {
        setProductName(productToEdit.name);
        setProductDescription(productToEdit.description);
        setProductPrice(productToEdit.price.toString());
        setProductImage(productToEdit.image || '');
        setProductCategory(productToEdit.category || ''); // Set category if available
      } else {
        toast.error("Product not found or you don't have permission to edit it.", { position: "top-right", autoClose: 3000 });
        navigate('/seller/dashboard/products');
      }
    } else if (action === 'add') {
      // Clear form when switching to add mode
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage('');
      setProductCategory('');
    }
  }, [action, productId, products, user, navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!user || user.accountType !== 'seller') {
      setErrorMessage('You must be logged in as a seller to add/edit products.');
      toast.error('You must be logged in as a seller to add/edit products.', { position: "top-right", autoClose: 3000 });
      return;
    }

    if (!productName || !productDescription || !productPrice || !productImage || !productCategory) {
      setErrorMessage('Please fill in all product details.');
      toast.error('Please fill in all product details.', { position: "top-right", autoClose: 3000 });
      return;
    }

    const productData = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      image: productImage,
      category: productCategory, // Include category
      sellerId: user.id, // Associate product with the current seller
    };

    if (action === 'add') {
      dispatch(addProduct(productData));
      setSuccessMessage('Product added successfully!');
      toast.success('Product added successfully!', { position: "bottom-right", autoClose: 2000 });
    } else if (action === 'edit' && productId) {
      dispatch(updateProduct({ ...productData, id: productId }));
      setSuccessMessage('Product updated successfully!');
      toast.success('Product updated successfully!', { position: "bottom-right", autoClose: 2000 });
    }

    // Clear form after submission if adding, or navigate after editing
    if (action === 'add') {
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage('');
      setProductCategory('');
    } else {
        navigate('/seller/dashboard/products'); // Go back to product listing after edit
    }
    
    setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <PlusCircle size={24} className="mr-3 text-orange-500" /> {action === 'add' ? 'Add New Product' : 'Edit Product'}
      </h2>
      <p className="text-gray-300 dark:text-gray-300 mb-6">Fill out the form below to {action === 'add' ? 'list a new product' : 'update this product'} for sale.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Product Name</label>
          <input
            type="text"
            id="productName"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Description</label>
          <textarea
            id="productDescription"
            rows="4"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Category</label>
          <input
            type="text"
            id="productCategory"
            placeholder="e.g., Electronics, Books, Apparel"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Price ($)</label>
          <input
            type="number"
            id="productPrice"
            step="0.01"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productImage" className="block text-sm font-medium text-gray-300 dark:text-gray-300 mb-1">Image URL</label>
          <input
            type="url"
            id="productImage"
            placeholder="e.g., https://example.com/product.jpg"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            required
          />
          {productImage && (
            <div className="mt-2 text-center">
              <img src={productImage} alt="Product Preview" className="max-h-32 object-contain mx-auto border dark:border-gray-600 rounded" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/CCCCCC/white?text=Invalid+URL'; }} />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Image Preview</p>
            </div>
          )}
        </div>
        
        {successMessage && <p className="text-green-400 dark:text-green-400 text-sm">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {action === 'add' ? 'Add Product' : 'Update Product'}
        </button>
      </form>
    </motion.div>
  );
};

export default ProductForm;
