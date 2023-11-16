import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart(){
    const {total, totalItems} = useSelector((state) => state.cart);
    return (
        <div>
            <h1 className="font-inter text-3xl font-bold text-richblack-5">Your Cart</h1>
            <p className="font-inter text-richblack-50">{totalItems > 0 ? `${totalItems} courses in your cart` : "Your cart is Empty"}</p>
            <div>
                {
                    total > 0? (
                        <div className="flex gap-10">
                            <RenderCartCourses />
                            <RenderTotalAmount />
                        </div>
                    )
                    :
                    (<p className="text-richblack-200 font-inter font-semibold text-lg">No items in your cart</p>)
                }
            </div>
        </div>
    )
}
