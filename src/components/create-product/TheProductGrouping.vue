<template>
  <GeneralBox title="دسته‌بندی و برچسب‌گذاری" InHeight="100%" InGrid="p-md-4">
    <template #InnerHtml>
      <div class="p-d-flex p-col-12 p-flex-column p-jc-around p-ai-center">
        <SelectDropDown
          InPlaceholder="انتخاب دسته"
          InGrid="p-col-12"
        ></SelectDropDown>

        <SelectDropDown
          InPlaceholder="انتخاب برچسب"
          InGrid="p-col-12"
        ></SelectDropDown>
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
