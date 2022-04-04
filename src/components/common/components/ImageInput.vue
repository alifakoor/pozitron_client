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
        <i class="svgIcon">
          <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="25px"
            height="25px"
            viewBox="0 0 50 50"
            style="enable-background: #fff; transform: scale(2.5)"
            xml:space="preserve"
          >
            <path
              fill="#49527E"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              ></animateTransform>
            </path>
          </svg>
        </i>
      </div>
      <div class="glassBox"></div>
      <i class="svgIcon topBookMark" :innerHTML="createFactorBookMark"></i>
      <i
        class="svgIcon topTrash"
        :innerHTML="trashFill"
        @click="deleteImgTop()"
      ></i>

      <img id="topPic" src="" alt="" />
    </div>
    <div class="innerAddImages">
      <div class="inputAddImages">
        <label
          for="imageInput"
          class="inputImage p-d-flex p-ai-center p-jc-center"
        >
          <i class="svgIcon" :innerHTML="uploadIcon"></i>
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
          <i class="svgIcon" :innerHTML="uploadIcon"></i>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      topPic: null,
      newPic: null,
      images: [],
      hasImage: false,
    };
  },
  computed: {
    ...mapState("iconSVG", ["uploadIcon", "createFactorBookMark", "trashFill"]),
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
        <i class="svgIcon"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" style="enable-background:#fff;" xml:space="preserve"><path fill="#49527E" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg></i>
      </div><div class="glassBox"></div>
      <i class="svgIcon bookMark"><svg width="12" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.8.334c2.262 0 3.56 1.12 3.56 3.07v9.69c0 .407-.21.773-.562.977-.35.206-.773.21-1.128.01l-3.973-2.245-4.01 2.25a1.124 1.124 0 0 1-1.126-.011A1.12 1.12 0 0 1 0 13.096V3.281C0 1.408 1.298.334 3.561.334h4.24Zm0 1H3.562C1.862 1.334 1 1.989 1 3.281v9.816c0 .063.036.097.066.114.03.019.077.032.132.002l4.255-2.387a.502.502 0 0 1 .49 0l4.218 2.383a.125.125 0 0 0 .133 0 .128.128 0 0 0 .065-.115V3.327c-.005-.573-.116-1.993-2.558-1.993Zm.293 3.486a.5.5 0 0 1 0 1H3.215a.5.5 0 0 1 0-1h4.878Z" fill="#49527E"/></svg></i>
      <i class="svgIcon trash"><svg width="13" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.923 4.814a.5.5 0 0 1 .459.538c-.004.046-.366 4.52-.574 6.396-.129 1.165-.898 1.874-2.06 1.895a128.182 128.182 0 0 1-5.24-.004c-1.114-.022-1.885-.744-2.01-1.886-.21-1.893-.57-6.356-.574-6.4a.5.5 0 0 1 .458-.54c.272-.007.517.184.54.459.001.029.148 1.851.308 3.654l.032.36c.081.896.163 1.758.23 2.357.07.649.42.983 1.038.996 1.666.036 3.367.038 5.2.004.656-.013 1.011-.34 1.084-1.005.207-1.862.567-6.32.571-6.366a.51.51 0 0 1 .538-.458ZM7.563.334c.613 0 1.15.413 1.309 1.004l.169.84a.6.6 0 0 0 .577.482h2.187a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1h2.187l.068-.005a.601.601 0 0 0 .51-.476l.162-.811A1.362 1.362 0 0 1 4.742.334h2.822Zm0 1H4.743c-.16 0-.301.107-.342.261l-.155.78c-.02.1-.049.194-.085.285h3.986a1.59 1.59 0 0 1-.086-.285l-.162-.81c-.034-.124-.174-.231-.334-.231Z" fill="#49527E"/></svg></i><img id="smImg${index}" src="" alt=""/>`;
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
          .querySelector(`.smallImg${index} > .trash`)
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
          .querySelector(`.smallImg${index} > .bookMark`)
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
      background: #f9f9fb;
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
    .inputWrapper:hover > label > p {
      color: #9ba2c5;
    }
    .inputWrapper:hover > label > i > svg > path {
      fill: #9ba2c5;
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
        background: #f9f9fb;
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
    .inputAddImages:hover > label > p {
      color: #9ba2c5;
    }
    .inputAddImages:hover > label > i > svg > path {
      fill: #9ba2c5;
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
    .topBookMark {
      position: absolute;
      top: 2px;
      right: 5px;
      color: #49527e;
      z-index: 999;
      transition: all 0.1s linear;
      transform: scale(1.2);
    }
    .topTrash {
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
        top: 50%;
        left: 50%;
        transform: translate(-75%, -50%);
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
  .topPic:hover .topTrash {
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
    .bookMark {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #49527e;
      z-index: 999;
      visibility: hidden;
      transition: all 0.1s linear;
      cursor: pointer;
    }
    .trash {
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
        top: 50%;
        left: 40%;
        transform: translate(-40%, -50%);
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
  .smallImg:hover .trash,
  .smallImg:hover .bookMark {
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

.hiddenElement {
  visibility: hidden !important;
}
</style>
