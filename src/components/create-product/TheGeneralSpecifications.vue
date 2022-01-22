<template>
  <GeneralBox title="مشخصات کلی" InHeight="100%" InGrid="p-md-8">
    <template #InnerHtml>
      <div class="p-d-flex p-col-12 p-flex-column p-flex-sm-row">
        <div
          class="p-sm-6 p-col-12 p-d-flex p-flex-column p-jc-center p-ai-center"
        >
          <InputHasIcon
            iconClass="ri-link"
            inputText="نام محصول‌(ضروری)"
            InPlaceholder="نام محصول مانند:گل،تیشرت‌و...."
            inType="text"
            InGrid="p-col-12"
            validation="true"
            buttonIcon="true"
            validationErr="نام محصول نمی‌تواند خالی باشد."
            inputName="name"
            @changeInputValue="setData"
          ></InputHasIcon>
          <InputHasInfo
            inputText="توضیحات"
            inType="textarea"
            InHeight="80px"
            InGrid="p-col-12"
            inputName="description"
            @changeInputValue="setData"
          ></InputHasInfo>
        </div>
        <div class="p-sm-6 p-col-12">
          <ImageInput></ImageInput>
        </div>
      </div>
    </template>
  </GeneralBox>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapMutations } from "vuex";
export default {
  components: {
    GeneralBox: defineAsyncComponent(() => import("./GeneralBox.vue")),
  },
  methods: {
    ...mapMutations(["addFeatureToNewProduct"]),
    setData(value) {
      this.addFeatureToNewProduct(value);
    },
  },
};
</script>
