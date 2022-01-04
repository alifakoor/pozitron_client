<template>
  <div class="p-d-flex p-flex-column p-jc-center p-ai-center imageBox">
    <div
      class="innerWrapper p-d-flex p-flex-column p-jc-center p-m-3 p-ai-center"
    >
      <i class="ri-upload-cloud-2-line"></i>
      <div class="inputWrapper">
        <label for="imageInput" class="p-inputtext inputImage">
          <p>بارگذاری عکس</p>
        </label>
        <input id="imageInput" type="file" class="p-d-none" />
      </div>
      <small class="smallTxt">عکس را اینجا رها کن</small>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../../assets/styles/variablesOfCreateProduct";
.imageBox {
  position: relative;
  height: 168px;
  background-color: $iconGray;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%235D40F1FF' stroke-width='3' stroke-dasharray='6%2c 13' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 8px;
  .innerWrapper {
    cursor: url("../assets/images/cursor.png"), default;
    position: relative;
    height: 116.57px;
    left: 5px;
    top: 10px;
    .ri-upload-cloud-2-line {
      width: 15px;
      height: 15px;
      font-size: 18px;
      bottom: 8.33%;
      color: $iconColor;
      margin-bottom: 10px;
    }
    .inputWrapper {
      cursor: url("../assets/images/cursor.png"), default;
      .inputImage {
        cursor: url("../assets/images/cursor.png"), default;
        display: block;
        width: 111px;
        height: 38px;
        left: 29.5px;
        top: 43.57px;
        p {
          cursor: url("../assets/images/cursor.png"), default;
          font-size: 14px;
          color: $textBlack;
          text-align: center;
        }
      }
    }
    .smallTxt {
      margin: 8px 0px;
      color: $textMuted;
    }
  }
}
</style>
