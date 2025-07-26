import { SyntheticEvent, useEffect, useState } from "react";
import { useGlobals } from "../../hooks/useGlobals";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { Box, Container, Stack } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { serverApi } from "../../../lib/config";
import { useDispatch } from "react-redux";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../scss/order.scss";


/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});


export default function OrdersPage() {
  const {setPausedOrders, setProcessOrders, setFinishedOrders } = actionDispatch(useDispatch());
  const { authMember, orderBuilder } = useGlobals();
  const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE})
      .then(data => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS})
      .then(data => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH})
      .then(data => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS  **/
  
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) navigate("/");
  return (
    <div className={"order-page"}>
      <Container className={"order-container"}>
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table-list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue}/>
              <ProcessOrders setValue={setValue}/>
              <FinishedOrders/>
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={
                    authMember?.memberImage 
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon"}>
                  <img
                    src={authMember?.memberAddress 
                      ? authMember.memberAddress 
                      : "No address"
                    }
                    className={"order-user-prof-img"} 
                  />
                </div>
              </div>
              <p className={"username"}>{authMember?.memberNick}</p>
              <p className={"user-type"}>{authMember?.memberType}</p>
            </Box>
            <Box className={"user-location-box"}>
                <img src={"/icons/location.svg"} />
                <p>{authMember?.memberAddress 
                  ? authMember.memberAddress 
                  : "No address"}</p>
            </Box>
          </Box>
          <Box className={"order-payment-box"}>
            <Box className={"order-payment-info"}>
              <input className={"order-payment-input"} placeholder="Card Number"></input>
              <Box className={"order-payment-input-1"}>
                <input className={"order-payment-input-2"} placeholder="Exp"></input>
                <input className={"order-payment-input-2"} placeholder="CVV"></input>
              </Box>
              <input className={"order-payment-input"} placeholder="Enter your name"></input>
              <Box className={"order-payment-type"}>
                <img src={"/icons/western-card.svg"} />
                <img src={"/icons/master-card.svg"} />
                <img src={"/icons/paypal-card.svg"} />
                <img src={"/icons/visa-card.svg"} />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
};