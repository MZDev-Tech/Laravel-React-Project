import React, { useState, useEffect } from 'react';
import './CSS/PopupModal.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AddPets = ({ setOpenPopup, refreshPets }) => {
    const [addData, setAddData] = useState({
        Pet: '',
        category: '',
        age: '',
        price: '',
        breed: '',
        gender: '',
        health: '',
        size: '',
        color: '',
        location: '',
        publish_date: '',
        energylevel: '',
        friendliness: '',
        ease_of_training: '',
        vendor: '',
        status: '',
        detail: '',
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const [sizes] = useState(['Small', 'Medium', 'Large']);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/fetchCategory'); 
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleInput = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setAddData((prevData) => ({
                ...prevData,
                [name]: files[0],
            }));
        } else {
            setAddData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('pet', addData.pet);
        formData.append('category', addData.category);
        formData.append('age', addData.age);
        formData.append('price', addData.price);
        formData.append('breed', addData.breed);
        formData.append('gender', addData.gender);
        formData.append('health', addData.health);
        formData.append('size', addData.size);
        formData.append('color', addData.color);
        formData.append('location', addData.location);
        formData.append('publish_date', addData.publish_date);
        formData.append('energylevel', addData.energylevel);
        formData.append('friendliness', addData.friendliness);
        formData.append('ease_of_training', addData.ease_of_training);
        formData.append('vendor', addData.vendor);
        formData.append('status', addData.status);
        formData.append('detail', addData.detail);
        formData.append('image', addData.image);
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/addPet', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setOpenPopup(false);
                refreshPets();
                toast.success( 'Pet added successfully.');
            } else {
                toast.error('Something went wrong while adding the pet.');
            }
        } catch (error) {
            toast.error( 'Something went wrong while adding the pet.');
        }
    };

    return (
        <div className={`popup-largerModel  ${setOpenPopup ? 'show' : ''}`}>
            <div className="popup-content">
                <span className="close-button" onClick={() => setOpenPopup(false)}>×</span>
                <h2>Add New Pet</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="Input-fields">
                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="pet"
                                value={addData.pet}
                                onChange={handleInput}
                                placeholder="Pet Name"
                            />
                        </div>

                        <div className="fieldAdd">
                            <select
                                name="category"
                                value={addData.category}
                                onChange={handleInput}
                            >
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="age"
                                value={addData.age}
                                onChange={handleInput}
                                placeholder="age"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="price"
                                value={addData.price}
                                onChange={handleInput}
                                placeholder="price"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="breed"
                                value={addData.breed}
                                onChange={handleInput}
                                placeholder="breed"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="gender"
                                value={addData.gender}
                                onChange={handleInput}
                                placeholder="gender"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="health"
                                value={addData.health}
                                onChange={handleInput}
                                placeholder="health"
                            />
                        </div>

                        <div className="fieldAdd">
                            <select
                                name="size"
                                value={addData.size}
                                onChange={handleInput}
                            >
                                <option value="">Select Size</option>
                                {sizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="color"
                                value={addData.color}
                                onChange={handleInput}
                                placeholder="color"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="location"
                                value={addData.location}
                                onChange={handleInput}
                                placeholder="location"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="date"
                                name="publish_date"
                                value={addData.publish_date}
                                onChange={handleInput}
                                placeholder="Publish Date"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="energylevel"
                                value={addData.energylevel}
                                onChange={handleInput}
                                placeholder="energylevel"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="friendliness"
                                value={addData.friendliness}
                                onChange={handleInput}
                                placeholder="friendliness"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="ease_of_training"
                                value={addData.ease_of_training}
                                onChange={handleInput}
                                placeholder="Ease of training"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="vendor"
                                value={addData.vendor}
                                onChange={handleInput}
                                placeholder="vendor"
                            />
                        </div>

                        <div className="fieldAdd">
                            <input
                                type="text"
                                name="status"
                                value={addData.status}
                                onChange={handleInput}
                                placeholder="status"
                            />
                        </div>

                        <div className='fieldAdd'>
                            <textarea
                                name="detail"
                                value={addData.detail}
                                onChange={handleInput}
                                placeholder="Description"
                                rows="3"
                            ></textarea>
                        </div>

                        <div className="img-field">
                            <label>Upload Image</label>
                            <input type="file" name="image" onChange={handleInput} />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddPets;
