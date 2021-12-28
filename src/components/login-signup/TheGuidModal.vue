<template>
  <div class="modalInfo">
    <div class="TriangleBox"></div>
    <div class="infoText">
      <div class="headerInfo">
        <h4>ساخت کلید API در صفحه ووکامرس</h4>
        <i
          class="ri-close-line"
          @click="$emit('modalHandle')"
          style="cursor: pointer"
        ></i>
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
        <span class="redInfo">*</span> توجه کنید که در توضیحات نام دلخواه خود را
        برای API بنویسید و قسمت مجوزها را روی
        <span class="redInfo">"خواندن/نوشتن"</span>
        تنظیم کنید.
      </p>
      <p class="textInfo">
        و سپس <span class="blueInfo">"کلید مصرف کننده"</span> و
        <span class="blueInfo">"رمز مصرف کننده"</span>
        را در قسمت مربوطه بچسبانید.
      </p>
    </div>
    <div class="infoGallery">
      <Galleria
        class="custom-galleria"
        :value="images"
        :responsiveOptions="responsiveOptions"
        :numVisible="5"
        :circular="true"
        containerStyle="max-width: 640px"
        :showItemNavigators="true"
        :showThumbnails="false"
        :showIndicators="true"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item.itemImageSrc"
            :alt="slotProps.item.alt"
            style="width: 100%; display: block"
          />
        </template>
        <template #indicator="{ index }">
          <span style="color: #e9ecef; cursor: pointer">
            {{ index + 1 }}
          </span>
        </template>
      </Galleria>
    </div>
    <button class="modalBtn" @click="$emit('modalHandle')">متوجه شدم</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          itemImageSrc: "../../assets/imageSlide.png",
          alt: "Description for Image 1",
          title: "Title 1",
        },
        {
          itemImageSrc: "../../assets/woocommerce2.PNG",
          alt: "Description for Image 2",
          title: "Title 2",
        },
      ],
      responsiveOptions: [
        {
          breakpoint: "1024px",
          numVisible: 5,
        },
        {
          breakpoint: "960px",
          numVisible: 4,
        },
        {
          breakpoint: "768px",
          numVisible: 3,
        },
        {
          breakpoint: "560px",
          numVisible: 1,
        },
      ],
    };
  },
  props: ["modalShow"],
  emits: ["modalHandle"],
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variablesOfLogin";
.modalInfo {
  direction: rtl;
  min-width: 537px;
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
    color: #048ba8;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
  }
  .stepGuid {
    margin-top: 20px;
    display: flex;
    align-items: center;
  }
  .textInfo {
    font-weight: normal;
    font-size: 12px;
    line-height: 130%;
    color: #131520;
    text-align: right;
    margin: 4px 0;
  }
  .redInfo {
    color: $errText;
  }
  .blueInfo {
    color: #048ba8;
  }
  .arrowRight {
    color: #048ba8;
    font-size: 30px;
  }
}
.infoGallery {
  border-radius: 15px;
  margin-top: 20px;
  width: 100%;
  height: 200px;
}

.p-galleria-indicator {
  span {
    border: 2px solid #558b6e !important;
    border-radius: 50% !important;
    color: #558b6e !important;
    font-size: 18px;
    width: 32px;
    height: 32px;
    padding: 5px;
    margin: 0px 8px;
    padding: 0px 10px;
  }
}

.p-galleria-indicator:first-child {
  span {
    padding: 0px 11.5px;
  }
}

.p-galleria-indicator.p-highlight {
  span {
    border: 2px solid #558b6e !important;
    border-radius: 50% !important;
    color: #fff !important;
    background-color: #558b6e;
  }
}

.p-galleria-item {
  height: 200px;
  img {
    height: 200px;
    border-radius: 8px;
  }
}

.custom-galleria {
  width: 428px;
  height: 200px;
}

.p-galleria .p-galleria-item-nav {
  color: #558b6e;
  width: 2rem;
  height: 2rem;
  top: 45%;
}

.p-galleria .p-galleria-item-nav.p-link {
  box-shadow: none;
  outline: none;
}

.modalBtn {
  position: absolute;
  width: 102px;
  height: 32px;
  background: #048ba8;
  border-radius: 8px;
  outline: none;
  border: none;
  text-align: center;
  bottom: 32px;
  cursor: pointer;
  color: #fff;
}
</style>
