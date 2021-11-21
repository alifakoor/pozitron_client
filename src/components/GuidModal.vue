<template>
  <div class="modalInfo">
    <div class="TriangleBox"></div>
    <div class="infoText">
      <div class="headerInfo">
        <h4>ساخت کلید API در صفحه ووکامرس</h4>
        <i class="ri-close-line" @click="modalHandle()"></i>
      </div>
      <p class="textInfo">از طریق مسیر زیر یک کلید API اضافه کنید.</p>
      <div class="stepGuid">
        <p class="textInfo">ووکامرس</p>
        <i class="ri-arrow-left-s-line arrowRight"></i>
        <p class="textInfo">پیکربندی</p>
        <i class="ri-arrow-left-s-line arrowRight"></i>
        <p class="textInfo">پیشرفته</p>
        <i class="ri-arrow-left-s-line arrowRight"></i>
        <p class="textInfo">Rest API</p>
        <i class="ri-arrow-left-s-line arrowRight"></i>
        <p class="textInfo">افرودن کلید</p>
      </div>
      <p class="textInfo">
        توجه کنید که در توضیحات نام دلخواه خود را برای API بنویسید و قسمت مجوزها
        را روی <span class="redInfo">"خواندن و نوشتن"</span>
        تنظیم کنید.
      </p>
      <p class="textInfo">
        و سپس <span class="blueInfo">"کلید مصرف کننده"</span> و
        <span class="blueInfo">"رمز مصرف کننده"</span>
        را در قسمت مربوطه بچسبانید.
      </p>
    </div>
    <div class="infoGallery"></div>
  </div>
</template>

<script>
export default {
  data() {},
  props: ["modalShow"],
  methods: {
    modalHandle() {
      this.modalShow = false;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/styles/variables";
.modalInfo {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  position: absolute;
  right: 105%;
  top: 0%;
  bottom: 0%;
  background: #ffffff;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  border-radius: 32px;
  transition: 0.2s ease all;
  .TriangleBox {
    background-color: transparent;
    width: 0;
    height: 0;
    border-top: 70px solid transparent;
    border-left: 70px solid #fff;
    border-bottom: 70px solid transparent;
    position: absolute;
    right: -14%;
    top: 15%;
    filter: drop-shadow(0px 0px 18.9887px rgba(23, 24, 24, 0.05));
  }
  .headerInfo {
    display: flex;
    justify-content: space-between;
    color: #2563eb;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
  }
  .stepGuid {
    display: flex;
    align-items: center;
  }
  .textInfo {
    font-weight: normal;
    font-size: 12px;
    line-height: 130%;
    margin: 7px 0;
    color: #131520;
  }
  .redInfo {
    color: $errText;
  }
  .blueInfo {
    color: #2563eb;
  }
  .arrowRight {
    color: #558b6e;
    font-size: 30px;
  }
}
</style>
