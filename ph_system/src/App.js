import { useEffect } from "react";
import Sidebarmenu from "./screens/global/Sidebarmenu";
import Header from "./screens/global/Header";
import Salespos from "./screens/sales/salesPos/Salespos";
import Newitem from "./screens/storage/newItem/Newitem";
import { Route, Routes } from "react-router-dom";
import ItemOverview from "./screens/storage/ItemOverView/ItemOverview";
import ItemType from "./screens/storage/itemsTypes/ItemType";
import PackaingType from "./screens/storage/packingTypeList/PackaingType";
import Storages from "./screens/storage/storages/Storages";
import AddNewPurhaseList from "./screens/purchases/addPurchaselist/AddNewPurhaseList";
import SalesList from "./screens/sales/salesList/SalesList";
import ReturnSaleList from "./screens/sales/returnedSales/ReturnSaleList";
import SaleDebt from "./screens/sales/saleDebt/SaleDebt";
import FullCalender from "./components/dashboard/FullCalender";
import Dashboard from "./screens/dashboard/Mainashboard";
import PurchaseList from "./screens/purchases/PurchaseList/PurchaseList";
import ReturnedPurchases from "./screens/purchases/ReturnedPurchases/ReturnedPurchases";
import ProductScreen from "./screens/storage/allProduct/ProductScreen";
import OutFittersList from "./screens/purchases/outfittersList/OutFittersList";

function App() {
  return (
    <div
      id="app"
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        minHeight: "100px",
        direction: "rtl",
      }}
    >
      <div className="w-[6%]">
        <Sidebarmenu></Sidebarmenu>
      </div>
      <main className="w-[94%] h-full flex flex-col">
        <Header></Header>
        <div className=" relative bg-[#F3F4F9] overflow-y-auto w-full h-[93%]">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />

            <Route path="sales" element={<Salespos />} />
            <Route path="/sales/:id" element={<Salespos />} />
            <Route path="purchases">
              <Route path="newpurchases" element={<AddNewPurhaseList />} />
              <Route path="list" element={<PurchaseList />} />
              <Route path="return" element={<ReturnedPurchases />} />
              <Route path="outfitters" element={<OutFittersList />} />
            </Route>
            <Route path="storage">
              <Route path="items" element={<ItemOverview />}></Route>
              <Route path="newitem" element={<Newitem />}></Route>
              <Route path="ProductScreen" element={<ProductScreen />}></Route>
              <Route path="type" element={<ItemType />}></Route>
              <Route path="packing" element={<PackaingType />}></Route>
              <Route path="storages" element={<Storages />}></Route>
            </Route>
            <Route path="dashboard">
              <Route path="sellcalender" element={<FullCalender />}></Route>
              <Route path="purchisecalender" element={<FullCalender />}></Route>
            </Route>
            <Route path="salestable" element={<SalesList />}></Route>
            <Route path="returnsalelist" element={<ReturnSaleList />}></Route>
            <Route path="salesdebt" element={<SaleDebt />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
