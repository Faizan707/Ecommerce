import React, { useState } from 'react';
import useCategories from '../hooks/useCategories';
import { getAuthToken } from '../utils/auth';
import { jwtDecode } from "jwt-decode";

function AddCategories() {
    const { error, loading, createCategory } = useCategories();
    const [name, setName] = useState('');
    const [formError, setFormError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const token = await getAuthToken();
            
            if (token) {
                const decodedToken = jwtDecode(token);
                
                if (decodedToken.role === "admin") {
                    if (!name.trim()) {
                        alert('Category name cannot be empty.');
                        return;
                    }
    
                    await createCategory({ name });
                    setName('');
                } else {
                    setFormError("Unauthorized: Admin access only");
                }
            } else {
                setFormError("No token provided, authorization denied");
            }
        } catch (err) {
            setFormError("An error occurred. Please try again.");
        }
    };
    

    const handleChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div className="flex justify-center items-center h-screen ">
            <form 
                onSubmit={handleSubmit} 
                className="w-[400px] bg-white shadow-lg p-6 rounded-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Add Category</h2>
                <input
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit"
                    className={`w-full bg-blue-500 text-white font-bold py-2 rounded ${loading && 'cursor-not-allowed'}`}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {formError && <p className="text-red-500 text-center mt-4">{formError}</p>}
\            </form>
        </div>
    );
}

export default AddCategories;
