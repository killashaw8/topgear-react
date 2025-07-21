import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";


/** REACT APP STATE **/
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}


/** HOMEPAGE **/
export interface HomePageState {
  trendProducts: Product[];
  popularProducts: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE **/

export interface ProductsPageState {
  showroom: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE **/

export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}