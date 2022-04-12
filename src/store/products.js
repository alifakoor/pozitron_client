import { useCookies } from "vue3-cookies";
import axios from "axios";
import Router from "../router/index";

export default {
  namespaced: true,
  state: {
    apiURL: "https://api-dev.pozitronet.ir",
    cookies: useCookies(),
    userToken: "",
    mainProducts: [],
    products: [],
    factorProducts: [],
    produtCategories: [],
    productTags: [],
    productsSelections: [],
    priceSort: null,
    nameSort: null,
    stockSort: null,
    onlinePriceSort: null,
    onlineStockSort: null,
    loadingProductTable: true,
    notValidProductSearch: false,
    notValidSearchProductFactor: false,
    editDisplay: null,
    newProduct: {},
    creatingProduct: null,
    newProductImg: [],
  },
  mutations: {
    setUserTokenForProducts(state, data = null) {
      if (data == "") {
        state.userToken = "";
      } else {
        state.userToken = state.cookies.cookies.get("uToken");
      }
    },
    // products function
    deSelectProductItem(state, id) {
      const removeSelected = state.productsSelections.filter(
        (item) => item.id != id
      );
      state.productsSelections = removeSelected;
    },
    emptyProductSelection(state, ids) {
      ids.forEach((id) => {
        const removeSelected = state.productsSelections;
        state.productsSelections = removeSelected.filter(
          (item) => item.id != id
        );
      });
    },
    addProductSelections(state, items) {
      state.productsSelections = items;
    },
    sortProducts(state, data) {
      switch (data[0]) {
        case "name":
          {
            state.stockSort = null;
            state.priceSort = null;
            state.onlinePriceSort = null;
            state.onlineStockSort = null;
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
            state.priceSort = null;
            state.onlineStockSort = null;
            state.nameSort = null;
            state.stockSort = null;
            state.onlinePriceSort == null
              ? (state.onlinePriceSort = false)
              : (state.onlinePriceSort = !state.onlinePriceSort);
            state.products.sort((a, b) => {
              if (a.onlineDiscount > 0 && b.onlineDiscount > 0) {
                return !state.onlinePriceSort
                  ? a.onlineSalePrice - b.onlineSalePrice
                  : b.onlineSalePrice - a.onlineSalePrice;
              } else if (a.onlineDiscount > 0 && b.onlineDiscount == 0) {
                return !state.onlinePriceSort
                  ? a.onlineSalePrice - b.onlinePrice
                  : b.onlinePrice - a.onlineSalePrice;
              } else if (a.onlineDiscount == 0 && b.onlineDiscount > 0) {
                return !state.onlinePriceSort
                  ? a.onlinePrice - b.onlineSalePrice
                  : b.onlineSalePrice - a.onlinePrice;
              } else {
                return !state.onlinePriceSort
                  ? a.onlinePrice - b.onlinePrice
                  : b.onlinePrice - a.onlinePrice;
              }
            });
          }
          break;
        case "price":
          {
            state.onlinePriceSort = null;
            state.onlineStockSort = null;
            state.nameSort = null;
            state.stockSort = null;
            state.priceSort == null
              ? (state.priceSort = false)
              : (state.priceSort = !state.priceSort);
            state.products.sort((a, b) => {
              if (a.discount > 0 && b.discount > 0) {
                return !state.priceSort
                  ? a.salePrice - b.salePrice
                  : b.salePrice - a.salePrice;
              } else if (a.discount > 0 && b.discount == 0) {
                return !state.priceSort
                  ? a.salePrice - b.price
                  : b.price - a.salePrice;
              } else if (a.discount == 0 && b.discount > 0) {
                return !state.priceSort
                  ? a.price - b.salePrice
                  : b.salePrice - a.price;
              } else {
                return !state.priceSort ? a.price - b.price : b.price - a.price;
              }
            });
          }
          break;
        case "onlineStock":
          {
            state.onlinePriceSort = null;
            state.priceSort = null;
            state.nameSort = null;
            state.stockSort = null;
            state.onlineStockSort == null
              ? (state.onlineStockSort = false)
              : (state.onlineStockSort = !state.onlineStockSort);
            state.products.sort((a, b) => {
              if (a.infiniteStock) {
                return !state.onlineStockSort ? 1 : -1;
              } else if (b.infiniteStock) {
                return !state.onlineStockSort ? -1 : 1;
              } else {
                return !state.onlineStockSort
                  ? a.onlineStock - b.onlineStock
                  : b.onlineStock - a.onlineStock;
              }
            });
          }
          break;
        case "stock":
          {
            state.onlinePriceSort = null;
            state.priceSort = null;
            state.nameSort = null;
            state.onlineStockSort = null;
            state.stockSort == null
              ? (state.stockSort = false)
              : (state.stockSort = !state.stockSort);
            state.products.sort((a, b) => {
              if (a.infiniteStock) {
                return !state.stockSort ? 1 : -1;
              } else if (b.infiniteStock) {
                return !state.stockSort ? -1 : 1;
              } else {
                return !state.stockSort ? a.stock - b.stock : b.stock - a.stock;
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
          `${state.apiURL}/products/edit`,
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
              `${state.apiURL}/products/remove`,
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
                state.productsSelections = [];
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
      let deleteData = [];
      state.productsSelections.forEach((element) => {
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
          text = `${state.productsSelections.length}محصول از انبار حذف شد.`;
          axios
            .post(
              `${state.apiURL}/products/remove`,
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
                state.productsSelections = [];
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
    async editProductSelections(state, fields) {
      let editData = [];
      state.productsSelections.forEach((element) => {
        editData.push(element.id);
      });
      console.log(fields);
      await axios
        .put(
          `${state.apiURL}/products/edit`,
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
                  fields.onlineSell === false || fields.onlineSell === true
                    ? (product.onlineSell = fields.onlineSell)
                    : "";
                  // add changing for onlineStock changing
                  fields.onlineStock
                    ? (product.onlineStock = fields.onlineStock)
                    : "";
                  fields.stock ? (product.stock = fields.stock) : "";
                  // add changing for onlinePrice & onlineDiscount changing
                  fields.onlinePrice
                    ? (product.onlinePrice = fields.onlinePrice)
                    : "";
                  fields.price ? (product.price = fields.price) : "";

                  fields.onlineDiscount
                    ? (product.onlineDiscount = fields.onlineDiscount)
                    : "";
                  fields.discount ? (product.discount = fields.discount) : "";

                  fields.onlinePrice || fields.onlineDiscount
                    ? (product.onlineSalePrice = Math.floor(
                        product.onlinePrice *
                          ((100 - product.onlineDiscount) / 100)
                      ))
                    : "";
                  fields.price || fields.discount
                    ? (product.salePrice = Math.floor(
                        product.price * ((100 - product.discount) / 100)
                      ))
                    : "";
                  fields.onlineDiscount == 0
                    ? (product.onlineDiscount = 0)
                    : "";
                  fields.discount == 0 ? (product.discount = 0) : "";
                }
              });
            });
            state.mainProducts = state.products;
            state.productsSelections = [];
            state.editDisplay = false;
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
              timer: 4000,
              timerProgressBar: true,
              showCloseButton: true,
            }).then(() => {
              state.editDisplay = null;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searcProducthData(state, data) {
      let searchValue = data.searchValue;
      let type = data.searchType;
      console.log(data);
      switch (type) {
        case "product":
          {
            if (searchValue == "") {
              state.products = state.mainProducts;
              state.notValidProductSearch = false;
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
                  product.barcode
                    .toLowerCase()
                    .search(searchValue.toLowerCase()) > -1 ||
                  product.name.toLowerCase().search(searchValue.toLowerCase()) >
                    -1 ||
                  option.toLowerCase().search(searchValue.toLowerCase()) > -1
                );
              });
              state.products.length == 0
                ? (state.notValidProductSearch = true)
                : (state.notValidProductSearch = false);
            }
          }
          break;
        case "factorProduct":
          {
            if (searchValue == "") {
              state.factorProducts = state.mainProducts;
              state.notValidFactorSearch = false;
            } else {
              let searchDataProduct = state.mainProducts;
              state.factorProducts = searchDataProduct.filter((product) => {
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
                  product.barcode
                    .toLowerCase()
                    .search(searchValue.toLowerCase()) > -1 ||
                  product.name.toLowerCase().search(searchValue.toLowerCase()) >
                    -1 ||
                  option.toLowerCase().search(searchValue.toLowerCase()) > -1
                );
              });
              state.factorProducts.length == 0
                ? (state.notValidSearchProductFactor = true)
                : (state.notValidSearchProductFactor = false);
            }
          }
          break;
      }
    },

    setProducts(state) {
      axios
        .get(`${state.apiURL}/products`, {
          headers: {
            "zi-access-token": state.userToken,
          },
        })
        .then((response) => {
          if (response.status == 200 && response.data.success) {
            state.userDomain = "https://" + response.data.domain;
            setTimeout(() => {
              state.loadingProductTable = false;
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
          } else if (response.status == 200 && !response.data.success) {
            setTimeout(function () {
              state.loadingProductTable = false;
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setCategories(state) {
      axios
        .get(`${state.apiURL}/categories`, {
          headers: {
            "zi-access-token": state.userToken,
          },
        })
        .then((response) => {
          if (response.data.success && response.status) {
            state.produtCategories = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setTags(state) {
      axios
        .get(`${state.apiURL}/tags`, {
          headers: {
            "zi-access-token": state.userToken,
          },
        })
        .then((response) => {
          if (response.data.success && response.status) {
            state.productTags = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addCategory(state, cat) {
      axios
        .post(
          `${state.apiURL}/categories`,
          {
            name: cat,
          },
          {
            headers: {
              "zi-access-token": state.userToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.success && response.status) {
            const newCat = {
              name: cat,
              id: response.data.data.id,
            };
            state.produtCategories.push(newCat);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addTag(state, tag) {
      axios
        .post(
          `${state.apiURL}/tags`,
          {
            name: tag,
          },
          {
            headers: {
              "zi-access-token": state.userToken,
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data.success && response.status) {
            const newTag = {
              name: tag,
              id: response.data.data.id,
            };
            state.productTags.push(newTag);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addFeatureToNewProduct(state, feature) {
      state.newProduct[feature.name] = feature.inValue;
    },

    setImagesForProduct(state, data) {
      state.newProductImg = data;
    },

    async createProduct(state, type) {
      state.creatingProdut = false;
      state.newProduct["type"] = type;
      let Product = Object.entries(state.newProduct).reduce(
        (a, [k, v]) => (v === null ? a : ((a[k] = v), a)),
        {}
      );
      if (state.newProductImg == []) {
        state.newProduct["images"] = [];
      } else {
        state.newProduct["images"] = state.newProductImg;
      }
      await axios
        .post(
          `${state.apiURL}/products/create`,
          {
            ...Product,
          },
          { headers: { "zi-access-token": state.userToken } }
        )
        .then((response) => {
          console.log(response);
          if (response.status == 200 && response.data.success) {
            state.creatingProduct = true;
            state.products.push(response.data.data);
            state.mainProducts.push(response.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      state.creatingProduct = null;
    },

    setFactorProduct(state) {
      if (state.mainProducts.length > 0) {
        state.factorProducts = state.mainProducts;
      } else {
        axios
          .get(`${state.apiURL}/products`, {
            headers: {
              "zi-access-token": state.userToken,
            },
          })
          .then((response) => {
            if (response.status == 200 && response.data.success) {
              state.userDomain = "https://" + response.data.domain;
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
                state.factorProducts = state.mainProducts;
              }, 1000);
            } else if (response.status == 200 && !response.data.success) {
              setTimeout(function () {
                state.loadingTable = false;
              }, 1000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  actions: {},
  modules: {},
};
