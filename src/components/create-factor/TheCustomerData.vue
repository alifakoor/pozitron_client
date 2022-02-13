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
          inputText="شماره موبایل"
          InGrid="p-col-12"
          InHeight="40px"
          inputName="customerNum"
          @changeInputValue="addDataTofactor"
        ></InputHasInfo>
        <InputHasInfo
          inputText="نام و نام خانوادگی"
          InGrid="p-col-12"
          InHeight="40px"
          inputName="customerName"
          @changeInputValue="addDataTofactor"
        ></InputHasInfo>
        <CustomDatePicker
          inputText="تاریخ ارسال"
          InGrid="p-col-12"
          InHeight="40px"
          inputName="customerName"
          @changeInputValue="addDataTofactor"
        ></CustomDatePicker>
        <SelectOption
          inputText="ُساعت ارسال"
          InGrid="p-col-12"
          InHeight="40px"
          inputName="customerName"
          @changeInputValue="addDataTofactor"
          :dataOption="[
            '8-10',
            '10-12',
            '12-14',
            '14-16',
            '16-18',
            '18-20',
            '20-22',
            '22-24',
          ]"
        ></SelectOption>
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
import DatePicker from "../common/components/CustomDatePicker.vue";
import CustomDatePicker from "../common/components/CustomDatePicker.vue";
export default {
  emits: ["addDataToFactor"],
  props: {
    factorIndex: {
      required: true,
    },
  },
  data() {
    return {
      date: "",
    };
  },
  components: {
    GeneralBox: defineAsyncComponent(() =>
      import("../common/components/GeneralBox.vue")
    ),
    DatePicker,
    CustomDatePicker,
  },
  methods: {
    addDataTofactor(value) {
      console.log(value);
      this.$emit("addDataToFactor", { index: this.factorIndex, data: value });
    },
  },
};
</script>
