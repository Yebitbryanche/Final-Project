import { api } from "../../API/Registration";

export const getCartItems = async (user_id:number) => {
    const res = await api.get(`cart/${user_id}/view`)
    return res.data
}