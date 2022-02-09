<template>
  <GeneralBox
    title="اطلاعات مشتری"
    InHeight="525px"
    InGrid="p-md-5"
    AddClass="p-m-0 p-pl-md-0"
    innerBoxClass="p-ml-md-0"
  >
    <template #InnerHtml>
      <div class="p-d-flex p-col-12 p-flex-column p-jc-around p-ai-center">
        <InputHasInfo
          inputText="شماره موبایل(ضروری)"
          validation="true"
          validationErr="این فیلد نمی تواند خالی باشد."
          InGrid="p-col-12"
          InHeight="32px"
          inputName="customerNum"
          @changeInputValue="addDataTofactor"
        ></InputHasInfo>
        <InputHasInfo
          inputText="نام و نام خانوادگی"
          InGrid="p-col-12"
          InHeight="32px"
          inputName="customerName"
          @changeInputValue="addDataTofactor"
        ></InputHasInfo>
        <InputHasInfo
          inputText="آدرس"
          InGrid="p-col-12"
          InHeight="60px"
          inputName="customerAddress"
          inType="textarea"
          @changeInputValue="addDataTofactor"
        ></InputHasInfo>
        <InputHasInfo
          inputText="توضیحات"
          InGrid="p-col-12"
          InHeight="60px"
          inputName="customerExplainayion"
          inType="textarea"
          @changeInputValue="addDataTofactor"
        ></InputHasInfo>
      </div>
    </template>
  </GeneralBox>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  emits: ["addDataToFactor"],
  props: {
    factorIndex: {
      required: true,
    },
  },
  components: {
    GeneralBox: defineAsyncComponent(() =>
      import("../common/components/GeneralBox.vue")
    ),
  },
  methods: {
    addDataTofactor(value) {
      console.log(value);
      this.$emit("addDataToFactor", { index: this.factorIndex, data: value });
    },
  },
};
</script>
