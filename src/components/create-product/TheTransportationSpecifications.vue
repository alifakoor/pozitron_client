<template>
  <GeneralBox title="مشخصات حمل‌و‌نقل" InHeight="100%" InGrid="p-md-4">
    <template #InnerHtml>
      <div class="p-d-flex p-flex-column p-col-12">
        <div class="p-col-12 p-d-flex p-jc-between">
          <InputHasInfo
            inputText="طول"
            InPlaceholder="سانتی‌متر"
            inType="number"
            InGrid="p-col-6"
            InHeight="32px"
          ></InputHasInfo>
          <InputHasInfo
            inputText="عرض"
            InPlaceholder="سانتی‌متر"
            inType="number"
            InGrid="p-col-6"
            InHeight="32px"
          ></InputHasInfo>
        </div>
        <div class="p-col-12 p-d-flex p-jc-between">
          <InputHasInfo
            inputText="ارتفاع"
            InPlaceholder="سانتی‌متر"
            inType="number"
            InGrid="p-col-6"
            InHeight="32px"
          ></InputHasInfo>
          <InputHasInfo
            inputText="وزن"
            InPlaceholder="کیلوگرم"
            inType="number"
            InGrid="p-col-6"
            InHeight="32px"
          ></InputHasInfo>
        </div>
      </div>
    </template>
  </GeneralBox>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  components: {
    GeneralBox: defineAsyncComponent(() => import("./GeneralBox.vue")),
  },
};
</script>
