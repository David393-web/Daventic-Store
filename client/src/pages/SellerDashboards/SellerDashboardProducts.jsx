    // src/components/Dashboards/SellerDashboardProducts.jsx
    import React, { useState, useEffect } from 'react';
    import { Package, PlusCircle, Edit, Trash2, Loader2, Save } from 'lucide-react';
    import { toast } from 'react-toastify';
    import { useNavigate, useParams } from 'react-router-dom';
    import { useSelector } from 'react-redux';

    // ✅ Import the new API functions
    import { createProduct, fetchSellerProducts, getProductById, updateProduct, deleteProduct } from '../../utils/ProductApi';

    const craftCategoriesList = [
      "Art & Sculptures", "Beauty and Wellness", "Books and Poetry",
      "Fashion Clothing and Fabrics", "Jewelry and Gemstones", "Vintage and Antique Jewelry",
      "Home Décor and Accessories", "Vintage Stocks", "Plant and Seeds",
      "Spices, Condiments and Seasonings", "Local & Traditional Foods",
      "Traditional and Religious Items", "Local Food and Drink Products",
    ];

    const SellerDashboardProducts = ({ isDarkMode, action }) => {
      const navigate = useNavigate();
      const { productId } = useParams();
      const { token } = useSelector((state) => state.auth);

      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [isAdding, setIsAdding] = useState(action === 'add');
      const [isEditing, setIsEditing] = useState(action === 'edit');
      const [currentProduct, setCurrentProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        images: [] // Placeholder for images
      });

      // Effect to load products when component mounts or action changes
      useEffect(() => {
        const loadProducts = async () => {
          if (!token) {
            toast.error("Authentication required to fetch products.");
            setLoading(false);
            return;
          }
          setLoading(true);
          try {
            // ✅ Use fetchSellerProducts API call
            const fetchedProducts = await fetchSellerProducts(token);
            setProducts(fetchedProducts);
            toast.success("Products loaded!");
          } catch (error) {
            toast.error(error.message || "Failed to load products.");
            console.error("Error fetching products:", error);
          } finally {
            setLoading(false);
          }
        };

        if (!action || action === 'list') {
          loadProducts();
        }
      }, [action, token]);

      // Effect to set up form for editing when action is 'edit'
      useEffect(() => {
        const loadProductForEdit = async () => {
          if (!token) {
            toast.error("Authentication required to edit product.");
            navigate('/seller/dashboard/products');
            return;
          }
          setLoading(true);
          try {
            // ✅ Use getProductById API call
            const fetchedProduct = await getProductById(productId); // Assuming getProductById doesn't need token for public view
            if (fetchedProduct) {
              setIsEditing(true);
              setIsAdding(false);
              setCurrentProduct({
                name: fetchedProduct.name || '',
                description: fetchedProduct.description || '',
                price: fetchedProduct.price || '',
                stock: fetchedProduct.stock || '',
                category: fetchedProduct.category || '',
                images: fetchedProduct.images || []
              });
            } else {
              toast.error("Product not found for editing.");
              navigate('/seller/dashboard/products');
            }
          } catch (error) {
            toast.error(error.message || "Failed to load product for editing.");
            console.error("Error loading product for edit:", error);
            navigate('/seller/dashboard/products');
          } finally {
            setLoading(false);
          }
        };

        if (action === 'add') {
          setIsAdding(true);
          setIsEditing(false);
          setCurrentProduct({ name: '', description: '', price: '', stock: '', category: '', images: [] });
        } else if (action === 'edit' && productId) {
          loadProductForEdit();
        } else { // Default to list view
          setIsAdding(false);
          setIsEditing(false);
          setCurrentProduct(null);
        }
      }, [action, productId, token, navigate]);

      const handleFormChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({ ...prev, [name]: value }));
      };

      const handleSaveProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!token) {
          toast.error("Authentication required to save product.");
          setLoading(false);
          return;
        }

        try {
          // Prepare product data (e.g., if you had image files, you'd use FormData here)
          const productPayload = {
            ...currentProduct,
            // Convert price and stock to numbers as they might be strings from input
            price: Number(currentProduct.price),
            stock: Number(currentProduct.stock)
          };

          if (isAdding) {
            // ✅ Use createProduct API call
            await createProduct(token, productPayload);
            toast.success("Product added successfully!");
          } else if (isEditing) {
            // ✅ Use updateProduct API call
            await updateProduct(token, productId, productPayload);
            toast.success("Product updated successfully!");
          }
          setLoading(false);
          navigate('/seller/dashboard/products'); // Redirect back to product list
        } catch (error) {
          toast.error(error.message || "Failed to save product.");
          console.error("Error saving product:", error);
          setLoading(false);
        }
      };

      const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          setLoading(true);
          if (!token) {
            toast.error("Authentication required to delete product.");
            setLoading(false);
            return;
          }
          try {
            // ✅ Use deleteProduct API call
            await deleteProduct(token, id);
            setProducts(products.filter(p => p.id !== id));
            toast.success("Product deleted successfully!");
          } catch (error) {
            toast.error(error.message || "Failed to delete product.");
            console.error("Error deleting product:", error);
          } finally {
            setLoading(false);
          }
        }
      };

      const renderProductForm = () => (
        <form onSubmit={handleSaveProduct} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={currentProduct.name}
              onChange={handleFormChange}
              className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={currentProduct.description}
              onChange={handleFormChange}
              rows="4"
              className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={currentProduct.price}
              onChange={handleFormChange}
              className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={currentProduct.stock}
              onChange={handleFormChange}
              className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              name="category"
              value={currentProduct.category}
              onChange={handleFormChange}
              className={`w-full p-2 border rounded-md ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            >
              <option value="">Select a category</option>
              {craftCategoriesList.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {/* TODO: Add image upload functionality here */}
          {/* For file uploads, you'd need to convert currentProduct to FormData before sending
              and set headers appropriately */}
          {/* <div>
            <label className="block mb-1 text-sm font-medium">Product Images</label>
            <input type="file" multiple onChange={(e) => {
              // Handle file selection, add to currentProduct.images
              // This will require more complex state management for file objects
            }} />
          </div> */}

          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="button"
              onClick={() => navigate('/seller/dashboard/products')}
              className="px-5 py-2 text-gray-700 transition-colors duration-200 border border-gray-300 rounded-md dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center px-5 py-2 text-white transition-colors duration-200 bg-orange-600 rounded-md hover:bg-orange-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" /> {isAdding ? 'Add Product' : 'Update Product'}
                </>
              )}
            </button>
          </div>
        </form>
      );

      if (isAdding || isEditing) {
        return (
          <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <h2 className="flex items-center mb-4 text-2xl font-semibold">
              {isAdding ? <PlusCircle className="w-6 h-6 mr-2" /> : <Edit className="w-6 h-6 mr-2" />}
              {isAdding ? 'Add New Product' : `Edit Product: ${currentProduct?.name || ''}`}
            </h2>
            {renderProductForm()}
          </div>
        );
      }

      // Default view: Product List
      return (
        <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
          <h2 className="flex items-center justify-between mb-4 text-2xl font-semibold">
            <span className="flex items-center">
              <Package className="w-6 h-6 mr-2" />
              My Products
            </span>
            <button
              onClick={() => navigate('/seller/dashboard/add-product')}
              className="flex items-center px-4 py-2 text-white transition-colors duration-200 bg-green-600 rounded-md hover:bg-green-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" /> Add New
            </button>
          </h2>
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : products.length === 0 ? (
            <p className="py-8 text-lg text-center">No products found. Add your first product!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Product Name</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Category</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Price</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Stock</th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/seller/dashboard/products/edit/${product.id}`)}
                          className="mr-4 text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="inline-block w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="inline-block w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    };

    export default SellerDashboardProducts;
    