import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    apiURL: "https://api-dev.pozitronet.ir",
    cookies: useCookies(),
    mainFactores: [],
    factors: [],
    factorSelections: [],
    loadingFactorTable: true,
    notValidFactorSearch: false,
    userToken: "",
    userDomain: "",
    editDisplay: null,
    factorIndex: 0,
    factorId: 1,
    onHoldFactors: [],
  },
  mutations: {
    setUserTokenForFactors(state, data = null) {
      if (data == "") {
        state.userToken = "";
      } else {
        state.userToken = state.cookies.cookies.get("uToken");
      }
    },
    deSelectFactorItem(state, id) {
      const removeSelected = state.factorSelections.filter(
        (item) => item.id != id
      );
      state.factorSelections = removeSelected;
    },
    emptyFactorSelection(state, ids) {
      ids.forEach((id) => {
        const removeSelected = state.factorSelections;
        state.factorSelections = removeSelected.filter((item) => item.id != id);
      });
    },
    addFactorSelections(state, items) {
      state.factorSelections = items;
    },
    sortFactors(state, data) {
      switch (data[0]) {
        case "name":
          {
            state.stockSort = null;
            state.priceSort = null;
            state.nameSort == null
              ? (state.nameSort = false)
              : (state.nameSort = !state.nameSort);
            state.products.sort((a, b) => {
              return state.nameSort
                ? b.name.localeCompare(a.name)
                : a.name.localeCompare(b.name);
            });
          }
          break;
        case "onlinePrice":
          {
            state.stockSort = null;
            state.nameSort = null;
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
            state.nameSort = null;
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

    deleteFactor(state, data) {
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
          state.factors.forEach((element, key) => {
            if (element.id == data) {
              index = key;
              return;
            }
          });
          let text = "";
          text = `فاکتور "${state.factors[index].id}" از انبار حذف شد.`;
          axios
            .delete(
              `${state.apiURL}/orders`,
              { ids: [...data] },
              {
                headers: {
                  "Content-Type": "application/json",
                  "zi-access-token": state.userToken,
                },
              }
            )
            .then((response) => {
              console.log(response);
              if (response.status == 200 && response.data.success) {
                const removeSelected = state.factors;
                data.forEach((element) => {
                  state.factors = removeSelected.filter(
                    (item) => item.id != element
                  );
                });
                state.mainFactores = state.factors;
                state.selections = [];
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
                  timer: 3000,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    multiDeleteProduct(state) {
      // let deleteData = [];
      // state.selections.forEach((element) => {
      //   deleteData.push(element.id);
      // });
      // Swal.fire({
      //   title: "حذف محصول",
      //   text: "این فرآیند غیرقابل‌برگشت است.",
      //   showCloseButton: true,
      //   showCancelButton: true,
      //   confirmButtonColor: "#E61F10",
      //   cancelButtonColor: " ",
      //   cancelButtonText: "بازگشت",
      //   confirmButtonText: "حذف",
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     let text = "";
      //     text = `${state.selections.length}محصول از انبار حذف شد.`;
      //     axios
      //       .post(
      //         `${state.apiURL}/products/remove`,
      //         { ids: [...deleteData] },
      //         { headers: { "zi-access-token": state.userToken } }
      //       )
      //       .then((response) => {
      //         if (response.status == 200 && response.data.success) {
      //           deleteData.forEach((element) => {
      //             let removeSelected = state.products;
      //             state.products = removeSelected.filter(
      //               (item) => item.id != element
      //             );
      //           });
      //           state.mainProducts = state.products;
      //           state.selections = [];
      //         }
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //     Swal.fire({
      //       position: "center-center",
      //       showCloseButton: true,
      //       icon: "success",
      //       title: "حذف محصول",
      //       showConfirmButton: false,
      //       text: text,
      //       customClass: {
      //         htmlContainer: "bottomZero",
      //       },
      //       timer: 3000,
      //     });
      //   }
      // });
    },

    searchFactorData(state, data) {
      let searchValue = data.searchValue;
      let type = data.searchType;
      switch (type) {
        case "factors":
          {
            if (searchValue == "") {
              state.factors = state.mainFactores;
              state.notValidFactorSearch = false;
            } else {
              let searchDataFactors = state.mainFactores;
              state.factors = searchDataFactors.filter((factor) => {
                return (
                  factor.id
                    .toString()
                    .toLowerCase()
                    .search(searchValue.toLowerCase()) > -1
                );
              });
              state.factors.length == 0
                ? (state.notValidFactorSearch = true)
                : (state.notValidFactorSearch = false);
            }
          }
          break;
      }
    },

    setFactors(state) {
      axios
        .get(`${state.apiURL}/orders`, {
          headers: {
            "zi-access-token": state.userToken,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200 && response.data.success) {
            state.mainFactores = response.data.data;
            state.factors = state.mainFactores;
            state.loadingFactorTable = false;
          } else if (response.status == 200 && !response.data.success) {
            setTimeout(function () {
              state.loadingFactorTable = false;
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addProductToFactor(state, data) {
      let index = state.onHoldFactors.findIndex((factor) => {
        return factor.id === state.factorIndex;
      });
      if (index === -1) {
        state.onHoldFactors.push({ ...data });
        state.factorId++;
      } else {
        state.onHoldFactors[index] = { ...data };
      }
    },
    chageFactorIndex(state, index) {
      state.factorIndex = index;
    },
    removeAnFactor(state, index) {
      state.onHoldFactors.splice(index, 1);
    },
    changeFactorsStatus(state, statusSelection) {
      state.editDisplay = true;
      let changeData = [];
      state.factorSelections.forEach((element) => {
        changeData.push(element.id);
      });
      axios
        .put(
          `${state.apiURL}/orders`,
          {
            ids: [...changeData],
            status: statusSelection,
          },
          {
            headers: {
              "zi-access-token": state.userToken,
            },
          }
        )
        .then((response) => {
          if (response.status == 200 && response.data.success) {
            changeData.forEach((element) => {
              state.factors.map((item) => {
                if (item.id == element) {
                  item.status = statusSelection;
                }
              });
            });
            state.mainFactores = state.factors;
            state.factorSelections = [];
            Swal.fire({
              position: "center-center",
              showCloseButton: true,
              icon: "success",
              title: "تغییر فاکتور",
              showConfirmButton: false,
              text: "تغییرات با موفقیت اعمال شد.",
              customClass: {
                htmlContainer: "bottomZero",
              },
              timer: 3000,
            });
            state.editDisplay = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  actions: {},
  modules: {},
};
