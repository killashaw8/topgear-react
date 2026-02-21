import React from "react";
import { Box, Stack } from "@mui/material"
import Button from "@mui/material/Button";
import { TabPanel } from "@mui/lab";
import moment from "moment";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { retrieveProcessOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";

/** REDUX SLICE & SELECTOR */
const processOrdersRetriever = createSelector(
  retrieveProcessOrders, 
  (processOrders) => ({processOrders})
);

interface ProcessOrderProps {
  setValue: (input: string) => void;
}

export default function ProcessOrders( props: ProcessOrderProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);

  /** HANDLERS **/

  const finishOrderHandler = async (e: T) => {
    try {
      if(!authMember) throw new Error(Messages.error2);
      //PAYMENT PROCESS
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId, 
        orderStatus: OrderStatus.FINISH
      };

      const confirmation = window.confirm(
        "Have you received your order?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);

        setValue("3");

        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };  


  console.log("processOrders", processOrders);
  return (
    <TabPanel value={"2"}>
      <Stack>
        {processOrders?.map((order: Order) => {
          return(
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  ) [0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img 
                        src={imagePath}
                        className={"order-dish-img"}
                      />
                      <Box className={"order-item-details"}>
                        <p className={"title-dish"}>{product.productName}</p>
                        <p><span>Price:</span> <span>${item.itemPrice}</span></p>
                        <p><span>Quantity:</span> <span>{item.itemQuantity}</span></p>
                        <p><span>Delivery:</span> <span>${order.orderDelivery}</span></p>
                        <p><span>Total:</span> <span>${order.orderTotal}</span></p>
                        <p><span>Date:</span> <span>{moment().format("YY-MM-DD HH:mm")}</span></p>
                      </Box>
                    </Box>
                  );
                })}
                <Box className={"orders-total-btn"}>
                  <Button 
                    value={order._id}
                    variant={"contained"} 
                    color="info" 
                    className={"verify-btn"}
                    onClick={finishOrderHandler}
                  >
                    Verify to Fulfil
                  </Button>
                </Box>
              </Box>
            </Box>
          )
        })}
        {!processOrders || 
          (processOrders.length === 0 && (
            <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
              <img 
                src={"/icons/noimage-list.svg"}
                style={{width:300, height:300}}
              />
            </Box>
          ))
        }
      </Stack>
    </TabPanel>
  )
}
