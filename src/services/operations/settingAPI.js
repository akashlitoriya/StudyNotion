import { settingsEndpoints } from "../apis";
import {toast} from 'react-hot-toast';
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";


export function deleteProfile (token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API,{}, {"Authorization" : `Bearer ${token}`});
            console.log("DELETE PROFILE API RESPONSE............", response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Profile Deleted Successfully");
            dispatch(setToken(null));
            dispatch(setUser(null));
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            //navigate('/');
            window.location.href = '/';
        }catch(error){
            console.log("DELETE PROFILE API ERROR............", error);
            toast.error("Profile Deletion Failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}