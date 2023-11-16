
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { courseEndpoints } from "../apis";
import toast from "react-hot-toast";

export async function getAllEnrolledCourses(token){
    const response = await apiConnector("GET",profileEndpoints.GET_USER_ENROLLED_COURSES_API,null, {"Authorization": `Bearer ${token}`});
    if(response.data.success){
        toast.success("Get all courses")
    }else{
        toast.error("Failed to get courses")
    }
    return response.data.data;
}

export async function updateCourseDetails(data, token){
    const response = await apiConnector("PUT",profileEndpoints.EDIT_COURSE_API,data, {"Authorization": `Bearer ${token}`});
    if(response.data.success){
        toast.success("Course updated")
    }else{
        toast.error("Failed to update course")
    }
    return response.data.data;
}

export async function createCourse(data, token){
    const response = await apiConnector("POST", courseEndpoints.CREATE_COURSE_API, data, {"Authorization": `Bearer ${token}`});
    if(response.data.success){
        toast.success("Course created")
    }else{
        toast.error("Failed to create course")
    }
    return response.data.course;
}

export async function editCourseDetails(data, token){
    let response;
    try{
        response = await apiConnector("PUT", courseEndpoints.EDIT_COURSE_API,data, {"Authorization" : `Bearer ${token}`});
        if(response.data.success){
            toast.success("Course updated")
        }

    }catch(err){
        console.log(err);
        toast.error("Failed to update course");
    }
    
    return response.data.course;
}

export async function createSection(data, token){
    const response = await apiConnector("POST", courseEndpoints.CREATE_SECTION_API, data, {"Authorization": `Bearer ${token}`});
    if(response.data.success){
        toast.success("Section created")
    }else{
        toast.error("Failed to create section")
    }
    console.log(response);
    return response.data.course;
}

export async function updateSection(data, token){
    const response = await apiConnector("PUT", courseEndpoints.UPDATE_SECTION_API, data, {"Authorization": `Bearer ${token}`});
    if(response.data.success){
        toast.success("Section updated")
    }else{
        toast.error("Failed to update section")
    }
    return response.data.data;
}
