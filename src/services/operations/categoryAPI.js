import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";
export async function getAllCategories() {
    const response = await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API, null);
    if (response.data.success) {
        //toast.success("Get all categories");
    } else {
        //toast.error("Failed to get categories");
    }
    //console.log("CAtegory response : ", response.data.Categories);
    
    return response.data.Categories;
}