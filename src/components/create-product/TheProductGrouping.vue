<template>
  <GeneralBox title="دسته‌بندی و برچسب‌گذاری" InHeight="100%" InGrid="p-md-4">
    <template #InnerHtml>
      <div class="p-d-flex p-col-12 p-flex-column p-jc-between p-ai-center">
        <SelectOption
          iconClass="ri-apps-line"
          InPlaceholder="انتخاب یا ساخت دسته"
          InGrid="p-col-12"
        ></SelectOption>

        <SelectOption
          iconClass="pi pi-tags"
          InPlaceholder="انتخاب یا ساخت برچسب"
          InGrid="p-col-12"
        ></SelectOption>
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
