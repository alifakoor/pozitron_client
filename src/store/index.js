import { createStore } from "vuex";
import { useCookies } from "vue3-cookies";

import axios from "axios";

export default createStore({
  state: {
    cookies: useCookies(),
    mainProducts: [],
    products: [],
    selections: [],
    priceSort: false,
    titleSort: false,
    stockSort: false,
    loadingTable: true,
    userToken: "",
  },
  mutations: {
    deSelectItem(state, id) {
      const removeSelected = state.selections.filter((item) => item.id != id);
      state.selections = removeSelected;
    },
    addSelections(state, items) {
      state.selections = items;
    },
    changeUserToken(state) {
      state.userToken = state.cookies.cookies.get("uToken");
    },
    sortProducts(state, data) {
      switch (data[0]) {
        case "title":
          {
            state.products.sort((a, b) => {
              return state.titleSort
                ? b.title.localeCompare(a.title)
                : a.title.localeCompare(b.title);
            });
            state.titleSort = !state.titleSort;
          }
          break;
        case "price":
          {
            state.products.sort((a, b) => {
              return state.priceSort
                ? a.regularPrice - b.regularPrice
                : b.regularPrice - a.regularPrice;
            });
            state.priceSort = !state.priceSort;
          }
          break;
        case "generalStock":
          {
            state.products.sort((a, b) => {
              return state.stockSort
                ? a.generalStock - b.generalStock
                : b.generalStock - a.generalStock;
            });
            state.stockSort = !state.stockSort;
          }
          break;
      }
    },
    onlineSell(state, data) {
      let sell = null;
      data.forEach((element) => {
        state.products.map((item) => {
          if (item.id == element) {
            sell = !item.onlineSell;
            return;
          }
        });
      });
      axios
        .put(
          "https://api-dev.pozitronet.ir/products/edit",
          {
            ids: [...data],
            fields: {
              onlineSell: sell,
            },
          },
          { headers: { "zi-access-token": state.userToken } }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200 && response.data.success) {
            data.forEach((element) => {
              state.products.map((item) => {
                if (item.id == element) {
                  item.onlineSell = !item.onlineSell;
                  return;
                }
              });
            });
            state.mainProducts = state.products;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(state, data) {
      Swal.fire({
        title: "حذف محصول",
        text: "این فرآیند غیرقابل‌برگشت است.",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "#E61F10",
        cancelButtonColor: " ",
        cancelButtonText: "بازگشت",
        confirmButtonText: "حذف",
      }).then((result) => {
        if (result.isConfirmed) {
          let index = -1;
          state.products.forEach((element, key) => {
            if (element.id == data) {
              index = key;
              return;
            }
          });
          let text = "";
          text = `محصول "${state.products[index].name}" از انبار حذف شد.`;
          axios
            .delete(
              "https://api-dev.pozitronet.ir/products/remove",
              { ids: [1] },
              {
                "X-Requested-With": "XMLHttpRequest",
                headers: {
                  "zi-access-token":
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJwaG9uZSI6OTMwNzg4Nzk3OCwiZnVsbE5hbWUiOm51bGwsImVtYWlsIjpudWxsLCJyb2xlIjpudWxsLCJjb2RlIjoxMTAxLCJjb2RlQ3JlYXRlZEF0IjoiMjAyMS0xMi0xNFQwODozNTo0OS4wMDBaIiwic3RhdHVzIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIxLTEyLTE0VDA4OjA4OjE0LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTEyLTE0VDA4OjM1OjQ5LjAwMFoifSwiaWF0IjoxNjM5NDcxMzcyLCJleHAiOjE2Mzk1NTc3NzJ9.RAteh5L6PCoTIFTWl43JLnkYEpoRPd9yVlMYNCH2N4o",
                },
              }
            )
            .then((response) => {
              console.log(response);
              const removeSelected = state.products;
              data.forEach((element) => {
                state.products = removeSelected.filter(
                  (item) => item.id != element
                );
              });
              state.mainProducts = state.products;
              state.selections = [];
            })
            .catch((err) => {
              console.log(err);
            });

          Swal.fire({
            position: "center-center",
            showCloseButton: true,
            icon: "success",
            title: "حذف محصول",
            showConfirmButton: false,
            text: text,
            customClass: {
              htmlContainer: "bottomZero",
            },
            timer: 1500,
          });
        }
      });
    },
    multiDeleteProduct(state) {
      let deleteData = [];
      state.selections.forEach((element) => {
        deleteData.push(element.id);
      });
      Swal.fire({
        title: "حذف محصول",
        text: "این فرآیند غیرقابل‌برگشت است.",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "#E61F10",
        cancelButtonColor: " ",
        cancelButtonText: "بازگشت",
        confirmButtonText: "حذف",
      }).then((result) => {
        if (result.isConfirmed) {
          let text = "";
          text = `${state.selections.length}محصول از انبار حذف شد.`;
          axios
            .delete(
              "https://api-dev.pozitronet.ir/products/remove",
              { ids: [...deleteData] },
              { headers: { "zi-access-token": state.userToken } }
            )
            .then((response) => {
              console.log(response);
              let removeSelected = state.products;
              state.selections.forEach((element) => {
                state.products = removeSelected.filter(
                  (item) => item.id != element.id
                );
              });
              state.mainProducts = state.products;
              state.selections = [];
            })
            .catch((err) => {
              console.log(err);
            });

          Swal.fire({
            position: "center-center",
            showCloseButton: true,
            icon: "success",
            title: "حذف محصول",
            showConfirmButton: false,
            text: text,
            customClass: {
              htmlContainer: "bottomZero",
            },
            timer: 1500,
          });
        }
      });
    },
    editSelections(state, fields) {
      console.log(fields);
      let editData = [];
      state.selections.forEach((element) => {
        editData.push(element.id);
      });
      axios
        .put(
          "https://api-dev.pozitronet.ir/products/edit",
          {
            ids: [...editData],
            fields: fields,
          },
          { headers: { "zi-access-token": state.userToken } }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200 && response.data.success) {
            state.selections = [];
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },

    searchProduct(state, searchData) {
      console.log(searchData);
      if (searchData == "") {
        state.products = state.mainProducts;
      } else {
        let searchDataProduct = state.mainProducts;
        state.products = searchDataProduct.filter((product) => {
          let option = "";
          if (product.type == "variation") {
            option = JSON.stringify(
              product.meta[
                product.meta
                  .map(function (e) {
                    return e.metaKey;
                  })
                  .indexOf("attributes")
              ].metaValue
            );
          }
          return (
            product.barcode.toLowerCase().search(searchData.toLowerCase()) >
              -1 ||
            product.name.toLowerCase().search(searchData.toLowerCase()) > -1 ||
            option.toLowerCase().search(searchData.toLowerCase()) > -1
          );
        });
      }
    },

    setProducts(state) {
      axios
        .get("https://api-dev.pozitronet.ir/products", {
          headers: {
            "zi-access-token": state.userToken,
          },
        })
        .then((response) => {
          console.log(response);

          if (response.status == 200 && response.data.success) {
            setTimeout(() => {
              state.loadingTable = false;
              state.products = response.data.data;
              state.products.map((product) => {
                product.name = product.name.split("-")[0];
                if (product.meta.length > 0) {
                  product.meta.forEach((pMeta) => {
                    if (pMeta.metaKey == "attributes") {
                      pMeta.metaValue = JSON.parse(pMeta.metaValue);
                    }
                  });
                }
              });
              state.mainProducts = state.products;
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  actions: {},
  modules: {},
});