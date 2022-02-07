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
        ></InputHasInfo>
        <InputHasInfo
          inputText="نام و نام خانوادگی"
          InGrid="p-col-12"
          InHeight="32px"
          inputName="customerNum"
        ></InputHasInfo>
        <InputHasInfo
          inputText="آدرس"
          InGrid="p-col-12"
          InHeight="60px"
          inputName="customerAddress"
          inType="textarea"
        ></InputHasInfo>
        <InputHasInfo
          inputText="توضیحات"
          InGrid="p-col-12"
          InHeight="60px"
          inputName="customerExplainayion"
          inType="textarea"
        ></InputHasInfo>
      </div>
    </template>
  </GeneralBox>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    GeneralBox: defineAsyncComponent(() =>
      import("../common/components/GeneralBox.vue")
    ),
  },
};
</script>
