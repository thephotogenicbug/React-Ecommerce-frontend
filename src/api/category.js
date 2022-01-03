import axios from "axios";

export const createCategory = async (formData) => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const response = await axios.post("http://localhost:5000/api/category", formData, config);

    return response
};
