export default interface ProductProps{
  id:number,
  title:string;
  description:string;
  price:number;
  image:string;
  category:string;
}
export interface OrderItem {
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  user_id: number;
  created_at: string;
  status: string;
  items: OrderItem[];
  total_amount:number; 
  stock:number
}