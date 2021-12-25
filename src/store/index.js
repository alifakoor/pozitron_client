import { createStore } from "vuex";
import { useCookies } from "vue3-cookies";

import axios from "axios";

export default createStore({
  state: {
    cookies: useCookies(),
    mainProducts: [],
    products: [],
    selections: [],
    priceSort: null,
    titleSort: null,
    stockSort: null,
    loadingTable: true,
    notValidSearch: false,
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
    changeUserToken(state, data = null) {
      if (data == "") {
        state.userToken = "";
      } else {
        state.userToken = state.cookies.cookies.get("uToken");
      }
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
        case "onlinePrice":
          {
            state.stockSort = null;
            state.priceSort == null
              ? (state.priceSort = false)
              : (state.priceSort = !state.priceSort);
            state.products.sort((a, b) => {
              if (a.onlineDiscount > 0 && b.onlineDiscount > 0) {
                return !state.priceSort
                  ? a.onlineSalePrice - b.onlineSalePrice
                  : b.onlineSalePrice - a.onlineSalePrice;
              } else if (a.onlineDiscount > 0 && b.onlineDiscount == 0) {
                return !state.priceSort
                  ? a.onlineSalePrice - b.onlinePrice
                  : b.onlinePrice - a.onlineSalePrice;
              } else if (a.onlineDiscount == 0 && b.onlineDiscount > 0) {
                return !state.priceSort
                  ? a.onlinePrice - b.onlineSalePrice
                  : b.onlineSalePrice - a.onlinePrice;
              } else {
                return !state.priceSort
                  ? a.onlinePrice - b.onlinePrice
                  : b.onlinePrice - a.onlinePrice;
              }
            });
          }
          break;
        case "onlineStock":
          {
            state.priceSort = null;
            state.stockSort == null
              ? (state.stockSort = false)
              : (state.stockSort = !state.stockSort);
            state.products.sort((a, b) => {
              if (a.infiniteStock) {
                return !state.stockSort ? 1 : -1;
              } else if (b.infiniteStock) {
                return !state.stockSort ? -1 : 1;
              } else {
                return !state.stockSort
                  ? a.onlineStock - b.onlineStock
                  : b.onlineStock - a.onlineStock;
              }
            });
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
          if (response.status == 200 && response.data.success) {
            data.forEach((element) => {
              state.products.map((item) => {
                if (item.id == element) {
                  item.onlineSell = sell;
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
            .post(
              "https://api-dev.pozitronet.ir/products/remove",
              { ids: [...data] },
              {
                headers: {
                  "Content-Type": "application/json",
                  "zi-access-token": state.userToken,
                },
              }
            )
            .then((response) => {
              if (response.status == 200 && response.data.success) {
                const removeSelected = state.products;
                data.forEach((element) => {
                  state.products = removeSelected.filter(
                    (item) => item.id != element
                  );
                });
                state.mainProducts = state.products;
                state.selections = [];
              }
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
            timer: 5000,
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
            .post(
              "https://api-dev.pozitronet.ir/products/remove",
              { ids: [...deleteData] },
              { headers: { "zi-access-token": state.userToken } }
            )
            .then((response) => {
              if (response.status == 200 && response.data.success) {
                deleteData.forEach((element) => {
                  let removeSelected = state.products;
                  state.products = removeSelected.filter(
                    (item) => item.id != element
                  );
                });
                state.mainProducts = state.products;
                state.selections = [];
              }
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
            timer: 5000,
          });
        }
      });
    },
    async editSelections(state, fields) {
      let editData = [];
      state.selections.forEach((element) => {
        editData.push(element.id);
      });
      await axios
        .put(
          "https://api-dev.pozitronet.ir/products/edit",
          {
            ids: [...editData],
            fields: fields,
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "zi-access-token": state.userToken,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.status == 200 && response.data.success) {
            editData.forEach((editID) => {
              state.products.map((product) => {
                if (product.id == editID) {
                  //add changing for onlineSell changing
                  fields.onlineSell
                    ? (product.onlineSell = fields.onlineSell)
                    : "";
                  // add changing for onlineStock changing
                  fields.onlineStock
                    ? (product.onlineStock = fields.onlineStock)
                    : "";
                  // add changing for onlinePrice & onlineDiscount changing
                  fields.onlinePrice
                    ? (product.onlinePrice = fields.onlinePrice)
                    : "";

                  fields.onlineDiscount
                    ? (product.onlineDiscount = fields.onlineDiscount)
                    : "";

                  fields.onlinePrice || fields.onlineDiscount
                    ? (product.onlineSalePrice =
                        product.onlinePrice *
                        ((100 - product.onlineDiscount) / 100))
                    : "";
                  fields.onlineDiscount == 0
                    ? (product.onlineDiscount = 0)
                    : "";
                }
              });
            });
            state.mainProducts = state.products;
            state.selections = [];
            Swal.fire({
              icon: "success",
              title: "تغییرات با موفقیت اعمال شد.",
              toast: true,
              position: "top-right",
              iconColor: "#065143",
              customClass: {
                popup: "colored-toast",
                title: "toastTitle",
              },
              showConfirmButton: false,
              timer: 5000,
              timerProgressBar: true,
              showCloseButton: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searchProduct(state, searchData) {
      if (searchData == "") {
        state.products = state.mainProducts;
        state.notValidSearch = false;
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
        state.products.length == 0
          ? (state.notValidSearch = true)
          : (state.notValidSearch = false);
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
