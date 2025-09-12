// src/pages/Dashboards/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/slices/productSlice';
import { motion } from 'framer-motion';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ProductForm = ({ isDarkMode, action }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.list);

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImages, setProductImages] = useState([]); // { file, preview }
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load product if editing
  useEffect(() => {
    if (action === 'edit' && productId) {
      const productToEdit = products.find(p => p.id === productId && p.sellerId === user?.id);
      if (productToEdit) {
        setProductName(productToEdit.name);
        setProductDescription(productToEdit.description);
        setProductPrice(productToEdit.price.toString());
        setProductCategory(productToEdit.category || '');
        // Load existing image URLs as previews (file=null)
        const existingImages = productToEdit.image
          ? productToEdit.image.map(url => ({ file: null, preview: url }))
          : [];
        setProductImages(existingImages);
      } else {
        toast.error("Product not found or you don't have permission to edit it.", { position: "top-right", autoClose: 3000 });
        navigate('/seller/dashboard/products');
      }
    } else if (action === 'add') {
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductCategory('');
      setProductImages([]);
    }
  }, [action, productId, products, user, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setProductImages(prev => [...prev, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(productImages);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setProductImages(reordered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!user || user.accountType !== 'seller') {
      setErrorMessage('You must be logged in as a seller to add/edit products.');
      toast.error('You must be logged in as a seller to add/edit products.', { position: "top-right", autoClose: 3000 });
      return;
    }

    if (!productName || !productDescription || !productPrice || !productCategory || productImages.length === 0) {
      setErrorMessage('Please fill in all product details and upload at least one image.');
      toast.error('Please fill in all product details and upload at least one image.', { position: "top-right", autoClose: 3000 });
      return;
    }

    // Create FormData for sending files
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', productDescription);
    formData.append('price', parseFloat(productPrice));
    formData.append('category', productCategory);
    formData.append('sellerId', user.id);

    // Append image files (skip null for existing URLs if editing)
    productImages.forEach((img, index) => {
      if (img.file) formData.append('images', img.file);
      else formData.append('existingImages', img.preview); // Send existing URLs for edit
    });

    try {
      if (action === 'add') {
        dispatch(addProduct(formData));
        setSuccessMessage('Product added successfully!');
        toast.success('Product added successfully!', { position: "bottom-right", autoClose: 2000 });
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductCategory('');
        setProductImages([]);
      } else if (action === 'edit' && productId) {
        formData.append('id', productId);
        dispatch(updateProduct(formData));
        setSuccessMessage('Product updated successfully!');
        toast.success('Product updated successfully!', { position: "bottom-right", autoClose: 2000 });
        navigate('/seller/dashboard/products');
      }
    } catch (err) {
      setErrorMessage('Error submitting product. Please try again.');
      toast.error('Error submitting product. Please try again.', { position: "top-right", autoClose: 3000 });
    }

    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'}`}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate('/seller/dashboard')}
        className="flex items-center mb-4 text-blue-600 hover:underline"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
      </button>

      <h2 className="flex items-center mb-4 text-2xl font-bold">
        <PlusCircle size={24} className="mr-3 text-blue-600" /> {action === 'add' ? 'Add New Product' : 'Edit Product'}
      </h2>
      <p className="mb-6 text-black dark:text-gray-300">
        Fill out the form below to {action === 'add' ? 'list a new product' : 'update this product'} for sale.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-gray-300">Product Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md dark:bg-black dark:border-gray-600 dark:text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-black">Description</label>
          <textarea
            rows="4"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-gray-300">Category</label>
          <input
            type="text"
            placeholder="e.g., Electronics, Books, Apparel"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-gray-300">Price ($)</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-black dark:text-gray-300">Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full mb-2"
          />

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images" direction="horizontal">
              {(provided) => (
                <div
                  className="flex space-x-2 overflow-x-auto p-1"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {productImages.map((img, index) => (
                    <Draggable key={index} draggableId={`img-${index}`} index={index}>
                      {(provided) => (
                        <div
                          className="relative border rounded"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={img.preview} alt={`Preview ${index}`} className="h-32 w-32 object-cover" />
                          <button
                            type="button"
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            onClick={() => handleDeleteImage(index)}
                          >
                            ×
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {successMessage && <p className="text-sm text-green-400 dark:text-green-400">{successMessage}</p>}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {action === 'add' ? 'Add Product' : 'Update Product'}
        </button>
      </form>
    </motion.div>
  );
};

export default ProductForm;
