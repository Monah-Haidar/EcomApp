import { useQuery } from "@tanstack/react-query";
import { Product } from "../useProducts/useProducts";
import axiosInstance from "../../api/config";

export interface ProductResponse {
    success: boolean;
    data: Product;
}



const fetchProduct = async (id: string) => {
    const response = await axiosInstance.get('products/' + id);
    return response.data as ProductResponse;
}

const useProduct = (id: string) => {

    return useQuery({
        queryKey: ['product'],
        queryFn: () => fetchProduct(id),
        // staleTime: 1000 * 10 * 5, // 5 minutes
    });
}

export default useProduct;