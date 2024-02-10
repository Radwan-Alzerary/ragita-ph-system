import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import WarehouseOutlinedIcon from "@mui/icons-material/WarehouseOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";

import { useState } from "react";
import Sidebaritems from "../../components/Sidebar/Sidebaritems";

function Sidebarmenu() {
  const [collapsedMode, setCollapsedMode] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState("main");

  return (
    <Sidebar
      // backgroundColor="#081F4B"
      rtl
      collapsed={collapsedMode}
      style={{ height: "100vh" }}
    >
      <Menu
        className=" bg-white h-full"
        closeOnClick
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            // only apply styles on first level elements of the tree
            if (level === 0)
              return {
                color: disabled ? "#f5d9ff" : "#211E83",
                backgroundColor: active ? "#eecef9" : undefined,
              };
          },
        }}
      >
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            setCollapsedMode(!collapsedMode);
          }}
          style={{ textAlign: "center" }}
          className="pt-1 pb-4"
        >
          <h2>نضام راجيتة</h2>
        </MenuItem>
        <SubMenu
          active={activeSubmenu === "main"}
          icon={<DashboardOutlinedIcon style={{ fontSize: "28px" }} />}
          label="الرئيسي"
          className=" py-3"
        >
          <Sidebaritems
            title="الرئيسي"
            router="/dashboard"
            onClick={() => setActiveSubmenu("main")}
          ></Sidebaritems>
          <Sidebaritems
            title="جدول المبيعات"
            router="/dashboard/sellcalender"
            onClick={() => setActiveSubmenu("main")}
          ></Sidebaritems>
          <Sidebaritems
            title="جدول المشتريات"
            router="/dashboard/purchisecalender"
            onClick={() => setActiveSubmenu("main")}
          ></Sidebaritems>
        </SubMenu>

        <SubMenu
          active={activeSubmenu === "Sales"}
          icon={<PointOfSaleOutlinedIcon style={{ fontSize: "28px" }} />}
          label="المبيعات"
          className=" py-3"
        >
          <Sidebaritems
            title="نقطة بيع"
            router="/sales"
            onClick={() => setActiveSubmenu("Sales")}
          ></Sidebaritems>
          <Sidebaritems
            title="قوائم البيع"
            router="/salestable"
            onClick={() => setActiveSubmenu("Sales")}
          ></Sidebaritems>
          <Sidebaritems
            title="المبيعات المرجعة"
            router="/returnsalelist"
            onClick={() => setActiveSubmenu("Sales")}
          ></Sidebaritems>
          <Sidebaritems
            title="ديون البيع"
            router="/salesdebt"
            onClick={() => setActiveSubmenu("Sales")}
          ></Sidebaritems>
        </SubMenu>
        {/* <SubMenu
          active={activeSubmenu === "purchases"}
          icon={<ShoppingCartOutlinedIcon style={{ fontSize: "28px" }} />}
          label="المشتريات"
          className=" py-3"
        >
          <Sidebaritems
            title="اضافة قائمة شراء"
            router="/purchases/newpurchases"
            onClick={() => setActiveSubmenu("purchases")}
          ></Sidebaritems>
          <Sidebaritems
            title="قوائم الشراء"
            router="/purchases/list"
            onClick={() => setActiveSubmenu("purchases")}
          ></Sidebaritems>
          <Sidebaritems
            title="المهجزين"
            router="/purchases/outfitters"
            onClick={() => setActiveSubmenu("purchases")}
          ></Sidebaritems>
          <Sidebaritems
            title="قوائم المرجعة"
            router="/purchases/return"
            onClick={() => setActiveSubmenu("purchases")}
          ></Sidebaritems>
          <Sidebaritems
            title="قوائم الديون"
            router="/purchases/debt"
            onClick={() => setActiveSubmenu("purchases")}
          ></Sidebaritems>
        </SubMenu> */}
        <SubMenu
          icon={<WarehouseOutlinedIcon style={{ fontSize: "28px" }} />}
          label="التحزين"
          className=" py-3"
          active={activeSubmenu === "storage"}
        >
          <Sidebaritems
            title="أضافة مادة"
            router="/storage/newitem"
            onClick={() => setActiveSubmenu("storage")}
          ></Sidebaritems>
          <Sidebaritems
            title="جرد المواد"
            router="/storage/items"
            onClick={() => setActiveSubmenu("storage")}
          ></Sidebaritems>
          <Sidebaritems
            title="الانواع"
            router="/storage/type"
            onClick={() => setActiveSubmenu("storage")}
          ></Sidebaritems>
          <Sidebaritems
            title="المخازن"
            router="/storage/storages"
            onClick={() => setActiveSubmenu("storage")}
          ></Sidebaritems>

          <Sidebaritems
            title="المواد التالفة"
            router="/storage/consists"
            onClick={() => setActiveSubmenu("storage")}
          ></Sidebaritems>
          <Sidebaritems
            title="منتهية الصلاحية"
            router="/storage/expire"
            onClick={() => setActiveSubmenu("storage")}
          ></Sidebaritems>
          <Sidebaritems
            title="أنواع التعبئة"
            router="/storage/packing"
            onClick={() => setActiveSubmenu("storage")}
          ></Sidebaritems>
        </SubMenu>
        {/* <SubMenu
          icon={<ReceiptOutlinedIcon style={{ fontSize: "28px" }} />}
          label="التقارير"
          className=" py-3"
          active={activeSubmenu === "report"}
        >
          <Sidebaritems
            title="تقارير الارباح"
            router="/report/profit"
            onClick={() => setActiveSubmenu("report")}
          ></Sidebaritems>
          <Sidebaritems
            title="تقارير المبيعات"
            router="/report/sales"
            onClick={() => setActiveSubmenu("report")}
          ></Sidebaritems>
          <Sidebaritems
            title="تقارير المشتريات"
            router="/report/purchases"
            onClick={() => setActiveSubmenu("report")}
          ></Sidebaritems>
          <Sidebaritems
            title="تقارير الاسترجاع"
            router="/report/return"
            onClick={() => setActiveSubmenu("report")}
          ></Sidebaritems>
          <Sidebaritems
            title="تقارير المذاخر"
            router="/report/outfitters"
            onClick={() => setActiveSubmenu("report")}
          ></Sidebaritems>
          <Sidebaritems
            title="تقارير المستهلكين"
            router="/report/consumers"
            onClick={() => setActiveSubmenu("report")}
          ></Sidebaritems>
        </SubMenu> */}
        {/* <SubMenu
          icon={<BadgeOutlinedIcon style={{ fontSize: "28px" }} />}
          label="الموظفين"
          className=" py-3"
          active={activeSubmenu === "employees"}
        >
          <Sidebaritems
            title="قوائم الموظفين"
            router="/dashboard"
            onClick={() => setActiveSubmenu("employees")}
          ></Sidebaritems>
          <Sidebaritems
            title="قوائم الرواتب"
            router="/dashboard"
            onClick={() => setActiveSubmenu("employees")}
          ></Sidebaritems>
          <Sidebaritems
            title="الترقيات"
            router="/dashboard"
            onClick={() => setActiveSubmenu("employees")}
          ></Sidebaritems>
          <Sidebaritems
            title="المكافئات"
            router="/dashboard"
            onClick={() => setActiveSubmenu("employees")}
          ></Sidebaritems>
          <Sidebaritems
            title="المهام"
            router="/dashboard"
            onClick={() => setActiveSubmenu("employees")}
          ></Sidebaritems>
          <Sidebaritems
            title="اوقات الدوام"
            router="/dashboard"
            onClick={() => setActiveSubmenu("employees")}
          ></Sidebaritems>
        </SubMenu> */}
        {/* <SubMenu
          icon={
            <SettingsApplicationsOutlinedIcon style={{ fontSize: "28px" }} />
          }
          label="الحسابات"
          className=" py-3"
          active={activeSubmenu === "accounts"}
        >
          <Sidebaritems
            title="الارباح"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="الخسارة"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="الصندوق"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="الميزانية"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="المبلغ الافتتاحي"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="الشركاء"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="الاستلام"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
        </SubMenu> */}
        {/* <SubMenu
          icon={
            <SettingsApplicationsOutlinedIcon style={{ fontSize: "28px" }} />
          }
          label="الاعدادات"
          className=" py-3"
          active={activeSubmenu === "accounts"}
        >
          <Sidebaritems
            title="اعدادات النضام"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="اعدادات المسؤولين"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="اعدادات الصلاحيات"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="اعدادات الاجهزة"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="اعدادات التقارير"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="اعدادات الفاتورة"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="اعدادات الباركود"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
          <Sidebaritems
            title="اعدادات الخصومات"
            router="/dashboard"
            onClick={() => setActiveSubmenu("accounts")}
          ></Sidebaritems>
        </SubMenu> */}
      </Menu>
    </Sidebar>
  );
}

export default Sidebarmenu;
