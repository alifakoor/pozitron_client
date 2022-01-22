<template>
  <div
    class="smallImages"
    :class="hasImage ? 'hasImageBox' : 'p-d-none'"
    :style="{ overflowY: images.length > 8 ? 'scroll' : '' }"
    @dragover="dragover"
    @drop="drop"
  >
    <div class="topPic" v-show="topPic">
      <div class="loadingBox">
        <i class="pi pi-spin pi-spinner"></i>
      </div>
      <div class="glassBox"></div>
      <i class="pi pi-bookmark-fill"></i>
      <i class="fa fa-trash" @click="deleteImgTop()"></i>

      <img id="topPic" src="" alt="" />
    </div>
    <div class="innerAddImages">
      <div class="inputAddImages">
        <label
          for="imageInput"
          class="inputImage p-d-flex p-ai-center p-jc-center"
        >
          <i class="ri-upload-cloud-2-line"></i>
          <p>بارگذاری عکس</p>
        </label>
        <input
          @change="imageInput($event)"
          id="imageInput"
          type="file"
          class="p-d-none"
          accept="image/jpeg, image/png"
        />
        <small class="smallTxt">عکس را اینجا رها کنید.</small>
      </div>
    </div>
  </div>
  <div
    :class="!hasImage ? 'p-d-flex' : 'p-d-none'"
    class="p-flex-column p-jc-center p-ai-center imageBox"
    @dragover="dragover"
    @drop="drop"
  >
    <div
      class="innerWrapper p-d-flex p-flex-column p-jc-center p-m-3 p-ai-center"
    >
      <div class="inputWrapper">
        <label
          for="imageInput"
          class="inputImage p-d-flex p-ai-center p-jc-center"
        >
          <i class="ri-upload-cloud-2-line"></i>
          <p>بارگذاری عکس</p>
        </label>
        <input
          @change="imageInput($event)"
          id="imageInput"
          type="file"
          class="p-d-none"
          accept="image/jpeg, image/png"
        />
      </div>
      <small class="smallTxt">عکس را اینجا رها کنید.</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topPic: null,
      newPic: null,
      images: [],
      hasImage: false,
    };
  },
  methods: {
    dragover(event) {
      event.preventDefault();
    },
    drop(event) {
      event.preventDefault();
      let file = event.dataTransfer.files[0];
      this.addNewImg(file);
    },
    addNewImg(file) {
      this.hasImage = true;
      let newImg = null;
      if (this.images.length === 0) {
        this.topPic = file;
        let image = document.getElementById("topPic");
        image.src = URL.createObjectURL(this.topPic);
        setTimeout(function () {
          document
            .querySelector(".topPic .loadingBox")
            .classList.add("hiddenElement");
        }, 1000);
        newImg = { file: this.topPic, index: 0 };
      } else {
        let index = this.images.length;
        let boxImage = document.querySelector(".smallImages");
        var imageWrraper = document.createElement("div");
        imageWrraper.classList.add("smallImg");
        imageWrraper.classList.add(`smallImg${index}`);
        imageWrraper.setAttribute("data-key", index);
        imageWrraper.innerHTML = `<div class="loadingBox">
        <i class="pi pi-spin pi-spinner"></i>
      </div><div class="glassBox"></div>
      <i class="pi pi-bookmark"></i>
      <i class="fa fa-trash" ></i><img id="smImg${index}" src="" alt=""/>`;
        boxImage.appendChild(imageWrraper);
        let image = document.querySelector(`.smallImg > #smImg${index}`);
        this.newPic = file;
        image.src = URL.createObjectURL(this.newPic);
        setTimeout(function () {
          document
            .querySelector(`.smallImg${index} > .loadingBox`)
            .classList.add("hiddenElement");
        }, 1000);
        document
          .querySelector(`.smallImg${index} > .fa-trash`)
          .addEventListener("click", () => {
            Swal.fire({
              title: "حذف عکس",
              text: "این فرآیند غیرقابل‌برگشت است.",
              showCloseButton: true,
              showCancelButton: true,
              confirmButtonColor: "#E61F10",
              cancelButtonColor: " ",
              cancelButtonText: "بازگشت",
              confirmButtonText: "حذف",
            }).then((result) => {
              if (result.isConfirmed) {
                const removeImg = this.images;
                this.images = removeImg.filter((image) => {
                  return image.index !== index;
                });
                document.querySelector(`.smallImg${index}`).remove();
              }
            });
          });
        document
          .querySelector(`.smallImg${index} > .pi-bookmark`)
          .addEventListener("click", () => {
            let lastTop = this.topPic;
            this.topPic = this.images.filter((image) => {
              return image.index == index;
            })[0].file;
            this.images.map((image) => {
              if (image.index == index) {
                image.file = lastTop;
              }
            });
            let imageTop = document.getElementById("topPic");
            imageTop.src = URL.createObjectURL(this.topPic);
            let image = document.querySelector(`.smallImg${index} > img`);
            image.src = URL.createObjectURL(lastTop);
          });
        newImg = { file: this.newPic, index: index };
      }
      this.images.push(newImg);
    },
    imageInput(event) {
      let file = event.target.files[0];
      if (file) {
        this.addNewImg(file);
      }
    },
    deleteImgTop() {
      Swal.fire({
        title: "حذف عکس",
        text: "این فرآیند غیرقابل‌برگشت است.",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "#E61F10",
        cancelButtonColor: " ",
        cancelButtonText: "بازگشت",
        confirmButtonText: "حذف",
      }).then((result) => {
        if (result.isConfirmed) {
          this.images.splice(0, 1);
          if (this.images.length === 0) {
            this.topPic = null;
            this.hasImage = false;
          } else {
            console.log(this.images);
            let indexClass = document
              .querySelectorAll(".smallImg")[0]
              .getAttribute("data-key");
            console.log(indexClass);
            this.topPic = this.images.filter((image) => {
              return image.index == indexClass;
            })[0].file;
            console.log(this.topPic);
            console.log(this.images);
            let image = document.getElementById("topPic");
            image.src = URL.createObjectURL(this.topPic);
            document.querySelector(`.smallImg${indexClass}`).remove();
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/variablesOfCreateProduct";
.imageBox {
  position: relative;
  width: 100%;
  height: 168px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: $iconGray;
  padding: 41px 89px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%2349527EFF' stroke-width='1' stroke-dasharray='6%2c 9' stroke-dashoffset='9' stroke-linecap='round'/%3e%3c/svg%3e");
  .innerWrapper {
    cursor: url("../assets/images/cursor.png"), default;
    position: absolute;
    height: 123px;
    top: 50%;
    left: 50%;
    transform: translate(-60%, -50%);
    .inputWrapper {
      cursor: url("../assets/images/cursor.png"), pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #bbc0d8;
      box-sizing: border-box;
      border-radius: 4px;
      width: 123px;
      height: 40px;
      background: #dcdeea;
      .inputImage {
        cursor: url("../assets/images/cursor.png"), pointer;
        width: 100%;
        height: 100%;
        p,
        i {
          cursor: url("../assets/images/cursor.png"), pointer;
          line-height: 168%;
          text-align: right;
          margin: 0px 2px;
        }
        i {
          color: $textPurple;
          font-size: 20px;
        }
        p {
          color: #49527e;
          font-size: 14px;
        }
      }
    }
    .smallTxt {
      margin: 8px 0px;
      color: $textMuted;
      font-size: 12px;
      line-height: 130%;
      text-align: center;
    }
  }
}

.hasImageBox {
  overflow-x: hidden;
  width: 100%;
  height: 175px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: $iconGray;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%2349527EFF' stroke-width='1' stroke-dasharray='6%2c 9' stroke-dashoffset='9' stroke-linecap='round'/%3e%3c/svg%3e");
  padding: 7px 7px 5px 10px;
  display: grid;
  grid-gap: 4px;
  grid-template-columns: 19% 19% 19% 19% 19%;
  grid-template-rows: 31% 31% 31%;
  .innerAddImages {
    padding-top: 1px;
    cursor: url("../assets/images/cursor.png"), default;
    grid-column: 3/5;
    grid-row: 1/2;
    .inputAddImages {
      cursor: url("../assets/images/cursor.png"), pointer;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      .inputImage {
        cursor: url("../assets/images/cursor.png"), pointer;
        width: 100%;
        height: 100%;
        border: 1px solid #bbc0d8;
        height: 40px;
        border-radius: 4px;
        background: #dcdeea;
        p,
        i {
          cursor: url("../assets/images/cursor.png"), pointer;
          line-height: 168%;
          text-align: right;
          margin: 0px 2px;
        }
        i {
          color: $textPurple;
          font-size: 20px;
        }
        p {
          color: #49527e;
          font-size: 14px;
        }
      }
    }
    .smallTxt {
      margin: 0px;
      color: $textMuted;
      font-size: 10px;
      line-height: 130%;
      text-align: center;
    }
  }
  .topPic {
    position: relative;
    width: 100%;
    height: 160px;
    margin-left: 4px;
    border-radius: 4px;
    grid-column: 1/3;
    grid-row: 1/4;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    .pi-bookmark-fill {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #49527e;
      z-index: 999;
      visibility: hidden;
      transition: all 0.1s linear;
    }
    .fa-trash {
      position: absolute;
      top: 5px;
      left: 5px;
      border-color: #49527e;
      z-index: 999;
      visibility: hidden;
      transition: all 0.1s linear;
      cursor: pointer;
    }
    .loadingBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999999999;
      background: linear-gradient(
        160.33deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(196, 196, 196, 0.1) 97.76%
      );
      backdrop-filter: blur(4px);
      border-radius: 4px;
      i {
        position: absolute;
        top: 35%;
        left: 25%;
        font-size: 3rem;
      }
    }
    .glassBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 990;
      background: linear-gradient(
        160.33deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(196, 196, 196, 0.1) 97.76%
      );
      backdrop-filter: blur(4px);
      border-radius: 4px;
      visibility: hidden;
      transition: all 0.1s linear;
    }
  }
  .topPic:hover .glassBox,
  .topPic:hover .fa-trash,
  .topPic:hover .pi-bookmark-fill {
    visibility: visible;
  }
  .smallImg {
    width: 100%;
    height: 100%;
    margin: 2px;
    border-radius: 4px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    .pi-bookmark {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #49527e;
      z-index: 999;
      visibility: hidden;
      transition: all 0.1s linear;
      cursor: pointer;
    }
    .fa-trash {
      position: absolute;
      top: 5px;
      left: 5px;
      border-color: #49527e;
      z-index: 999;
      visibility: hidden;
      transition: all 0.1s linear;
      cursor: pointer;
    }
    .loadingBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999999999;
      background: linear-gradient(
        160.33deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(196, 196, 196, 0.1) 97.76%
      );
      backdrop-filter: blur(4px);
      border-radius: 4px;
      i {
        position: absolute;
        top: 17%;
        left: 23%;
        font-size: 2rem;
      }
    }
    .glassBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 990;
      background: linear-gradient(
        160.33deg,
        rgba(255, 255, 255, 0.6) 0%,
        rgba(196, 196, 196, 0.1) 97.76%
      );
      backdrop-filter: blur(4px);
      border-radius: 4px;
      visibility: hidden;
      transition: all 0.1s linear;
    }
  }
  .smallImg:hover .glassBox,
  .smallImg:hover .fa-trash,
  .smallImg:hover .pi-bookmark {
    visibility: visible;
  }
}

@media (min-width: 1600px) {
  .hasImageBox {
    grid-template-columns: 20% 19% 19% 19% 19%;
  }
}

@media (min-width: 2000px) {
  .hasImageBox {
    grid-template-columns: 21% 19% 19% 19% 19%;
  }
}

@media (min-width: 2600px) {
  .hasImageBox {
    grid-template-columns: 22% 19% 19% 19% 19%;
  }
}
/* Track */
.hasImageBox::-webkit-scrollbar {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 8px;
  width: 4px !important;
}

/* Handle */
.hasImageBox::-webkit-scrollbar-thumb {
  background: #5d40f1;
  border-radius: 8px;
  width: 4px;
  height: 34px;
}

/* Handle on hover */
.hasImageBox::-webkit-scrollbar-thumb:hover {
  background: #5d40f1;
  border-radius: 8px;
  width: 4px;
  height: 34px;
}

.hiddenElement {
  visibility: hidden !important;
}
</style>
