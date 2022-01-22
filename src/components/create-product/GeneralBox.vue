<template>
  <div
    class="generalWrapper p-mt-2 p-col-12"
    :class="InGrid"
    :style="{ minHeight: InHeight }"
  >
    <div
      class="p-d-flex p-flex-column p-jc-start p-ai-start generalBoxWrapper"
      :style="{ minHeight: InHeight }"
    >
      <p class="p-px-3 p-py-2">{{ title }}</p>
      <Divider class="p-m-0 p-p-0" type="solid" />
      <slot name="InnerHtml"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: null,
      notValidData: false,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    InHeight: {
      type: String,
      default: "40px",
    },
    InGrid: {
      type: String,
      default: "p-col-6",
    },
  },
};
</script>

<style lang="scss" scoped>
.generalWrapper {
  direction: rtl;
}
.generalBoxWrapper {
  margin: 0px 10px;
  background: #fff;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  border-radius: 8px;
  p {
    width: 100%;
    background: #dcdeea;
    border-radius: 8px 8px 0px 0px;
    color: #49527e;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    text-align: right;
  }
  .p-divider {
    width: 100%;
    border: 1px solid #e1e3e5;
    background: #e1e3e5;
  }
}
</style>
