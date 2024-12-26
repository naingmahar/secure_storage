import { useMutation } from "@tanstack/react-query";
import { fetchAuthUserProducts, fetchGetAllCategories, fetchGetAllProducts } from "../../apiClient/Products";

// const QUERY_KEY = ['Products'];


export const useGetAllProducts = () => {
  return useMutation(fetchGetAllProducts);
};


export const useGetAllCategories = () => {
  return useMutation(fetchGetAllCategories);
};


export const useGetAuthProducts = () => {
  return useMutation(fetchAuthUserProducts);
};


// export const useGetAllProducts = (page?:number) => {
//   return useQuery({
//     queryKey:QUERY_KEY,
//     queryFn:()=>fetchGetAllProducts(page)
//   });
// };


// export const useGetAuthProducts = (page?:number) => {
//   return useQuery({
//     queryKey:QUERY_KEY,
//     queryFn:()=>fetchAuthUserProducts(page)
//   });
// };