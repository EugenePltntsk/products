import axios from "axios";

axios.defaults.baseURL = "https://635238bea9f3f34c37378983.mockapi.io/jaba/v1/"


export const getProducts = async () => {
    try {
        const { data } = await axios.get("/Products"); 
        console.log(data);
        return data;
        
    } catch (error) {
        console.log(error.message);
    }
  
    
}

export const postProduct = async (obj) => {

    try {
        const { data } = await axios.post("/Products", obj); 
        
        return data;
        
    } catch (error) {
        console.log(error.message);
    }

}

export const deleteProduct = async (id) => {
    try {
        const { data } = await axios.delete(`/Products/${id}`); 
        
        return data;
        
        
    } catch (error) {
        console.log(error.message);
    }
}