<template>
  <GeneralBox title="دسته‌بندی و برچسب‌گذاری" InHeight="100%" InGrid="p-md-4">
    <template #InnerHtml>
      <div class="p-d-flex p-col-12 p-flex-column p-jc-around p-ai-center">
        <SelectDropDown InPlaceholder="انتخاب دسته" InGrid="p-col-12">
          <template #icon>
            <i class="svgIcon" :innerHTML="groupInputIcon"></i>
          </template>
        </SelectDropDown>

        <SelectDropDown InPlaceholder="انتخاب برچسب" InGrid="p-col-12">
          <template #icon>
            <i class="svgIcon" :innerHTML="tagInputIcon"></i>
          </template>
        </SelectDropDown>
      </div>
    </template>
  </GeneralBox>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapState } from "vuex";
export default {
  components: {
    GeneralBox: defineAsyncComponent(() =>
      import("../common/components/GeneralBox.vue")
    ),
  },
  computed: {
    ...mapState("iconSVG", ["groupInputIcon", "tagInputIcon"]),
  },
};
</script>
