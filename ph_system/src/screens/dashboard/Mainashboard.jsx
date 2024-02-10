import { AttachMoney, CheckBox, CurrencyExchange, Money, People, Sell } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
} from "@mui/material";
import { green, purple, red, yellow } from "@mui/material/colors";
import ProfitChart from "../../components/dashboard/ProfitChart";
import OverViewSell from "../../components/dashboard/OverViewSell";

function Dashboard() {
  // change navbar title

  return (
    <div className="p-4 ">
      <Box pt={2} pb={4}>
        <div className="h-full w-full overflow-auto">
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            <Grid item lg={3} xs={6}>
              <div className=" h-36 rounded-lg flex justify-center items-center bg-white shadow-lg">
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className=" text-lg opacity-50">مجموع الزبائن</p>
                    <p className=" text-lg text-left font-bold">34</p>
                  </div>
                  <IconButton
                    sx={{ background: purple[100], width: "70px", height: "70px" }}
                  >
                    <People></People>
                  </IconButton>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} xs={6}>
              <div className=" h-36  rounded-lg flex justify-center items-center bg-white shadow-lg">
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className=" text-lg opacity-50">مجموع المبيعات</p>
                    <p className=" text-lg text-left font-bold">200</p>
                  </div>
                  <IconButton
                    sx={{ background: yellow[200], width: "70px", height: "70px" }}
                  >
                    <Sell></Sell>
                  </IconButton>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} xs={6}>
              <div className=" h-36  rounded-lg flex justify-center items-center bg-white shadow-lg">
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className=" text-lg opacity-50">مجموع الارباح</p>
                    <p className=" text-lg text-left font-bold">30000</p>
                  </div>
                  <IconButton
                    sx={{ background: green[100], width: "70px", height: "70px" }}
                  >
                    <AttachMoney></AttachMoney>
                  </IconButton>
                </div>
              </div>
            </Grid>
            <Grid item lg={3} xs={6}>
              <div className=" h-36 rounded-lg flex justify-center items-center bg-white shadow-lg">
                <div className="flex items-center justify-center gap-4">
                  <div>
                    <p className=" text-lg opacity-50">مجموع المصاريف</p>
                    <p className=" text-lg text-left font-bold">50000</p>
                  </div>
                  <IconButton
                    sx={{ background: red[100], width: "70px", height: "70px" }}
                  >
                    <CurrencyExchange></CurrencyExchange>
                  </IconButton>
                </div>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={4} pt={4}>
            <Grid item lg={4} md={5} xs={12}>
              <div className=" bg-white p-4">
                <OverViewSell></OverViewSell>
              </div>
              {/* <Analytics /> */}
            </Grid>

            <Grid item lg={8} md={7} xs={12}>
              <div className=" bg-white p-4">
                <ProfitChart></ProfitChart>
              </div>

              {/* <TotalSpent /> */}
            </Grid>

            <Grid item lg={8} md={7} xs={12}>
              <div className="bg-white"></div>
              {/* <RecentOrders /> */}
            </Grid>
            <div className="flex w-full gap-8">
              <Grid item lg={8} md={7} xs={12}>
                <div className="bg-white w-full h-96 p-4">
                  <div className="mb-4 font-bold text-lg">مراقبة النضام</div>
                  <table class="w-full text-sm text-left text-gray-500 ">
                    <thead class="text-xs overflow-auto text-gray-700 uppercase bg-gray-50 ">
                      <tr>
                        <th scope="col" class="text-center px-6 py-3">
                          الحساب
                        </th>
                        <th scope="col" class="text-center px-6 py-3">
                          التاريخ
                        </th>
                        <th scope="col" class="text-center px-6 py-3">
                          الاجراء
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b ">
                        <td class="text-center px-6 py-2">احمد ياسر</td>
                        <td class="text-center px-6 py-2">2023/2/1</td>

                        <td class="text-center px-6 py-2 flex justify-center items-center">
                          <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                            اضافة وصل
                          </div>
                        </td>
                      </tr>
                      <tr class="bg-white border-b ">
                        <td class="text-center px-6 py-2">احمد ياسر</td>
                        <td class="text-center px-6 py-2">2023/2/1</td>

                        <td class="text-center px-6 py-2 flex justify-center items-center">
                          <div class=" bg-red-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                            حذف وصل
                          </div>
                        </td>
                      </tr>
                      <tr class="bg-white border-b ">
                        <td class="text-center px-6 py-2">احمد ياسر</td>
                        <td class="text-center px-6 py-2">2023/2/1</td>

                        <td class="text-center px-6 py-2 flex justify-center items-center">
                          <div class=" bg-red-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                            تعديل اعدادات
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Grid>

              <Grid item lg={4} md={6} xs={12}>
                <div className="bg-white w-full h-96  p-4 mb-4">
                  <div className=" mb-4">
                  جدول المهام

                  </div>
                  <div class="relative overflow-x-auto">
                    <div className=" bg-white ">
                      <table class="w-full text-sm text-left ">
                        <thead class=" text-gray-700 uppercase bg-gray-100 "></thead>
                        <tbody>
                          <tr class="bg-white hover:bg-green-100 cursor-pointer  border rounded-lg">
                            <th
                              scope="row"
                              class="px-6 py-4 text-center text-lg  font-medium text-gray-900 whitespace-nowrap "
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={false}
                                    // indeterminate={checked[0] !== checked[1]}
                                  />
                                }
                              />
                            </th>

                            <th
                              scope="row"
                              class="px-6 py-4 text-center text-lg font-medium text-gray-900 whitespace-nowrap "
                            >
                              اتمام جرد المواد
                            </th>
                          </tr>
                          <tr class="bg-white hover:bg-green-100 cursor-pointer  border rounded-lg ">
                            <th
                              scope="row"
                              class="px-6 py-4 text-center text-lg  font-medium text-gray-900 whitespace-nowrap "
                            >
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={true}
                                    // indeterminate={checked[0] !== checked[1]}
                                  />
                                }
                              />
                            </th>

                            <th
                              scope="row"
                              class="px-6 py-4 text-center text-lg font-medium text-gray-900 whitespace-nowrap "
                            >
                              اتمام جرد المواد
                            </th>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* <TopSelling /> */}
              </Grid>
            </div>
            <Grid item xs={12}>
              <div className="bg-white w-full h-96">
                <table class="w-full text-sm text-left text-gray-500 ">
                  <thead class="text-xs overflow-auto text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                          />
                          <label for="checkbox-all-search" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" class="text-center px-6 py-3">
                        رقم الوصل
                      </th>
                      <th scope="col" class="text-center px-6 py-3">
                        اسم الزبون
                      </th>
                      <th scope="col" class="text-center px-6 py-3">
                        السعر الكلي
                      </th>
                      <th scope="col" class="text-center px-6 py-3">
                        الربح
                      </th>

                      <th scope="col" class="text-center px-6 py-3">
                        الحالة
                      </th>
                      <th scope="col" class="text-center px-6 py-3">
                        نوع الدفع
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                    <tr class="bg-white border-b ">
                      <td class="w-4 p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  "
                          />
                          <label for="checkbox-table-search-1" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        class="text-center px-6 py-2 font-medium text-gray-900 whitespace-nowrap "
                      >
                        1
                      </th>
                      <td class="text-center px-6 py-2">زبون عام</td>
                      <td class="text-center px-6 py-2">4000</td>
                      <td class="text-center px-6 py-2">2000</td>
                      <td class="text-center px-6 py-2 flex justify-center items-center">
                        <div class=" bg-green-200 rounded-xl w-24 text-black  h-full flex justify-center items-center">
                          مكتمل
                        </div>
                      </td>
                      <td class="text-center px-6 py-2">نقدي</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <Footer imageLink="/static/illustration/sass-dashboard.svg" /> */}
            </Grid>
          </Grid>
        </div>
      </Box>{" "}
    </div>
  );
}

export default Dashboard;
