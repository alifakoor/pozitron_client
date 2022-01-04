<template>
  <GeneralBox title="مشخصات تکمیلی" InHeight="380px" InGrid="p-md-8">
    <template #InnerHtml>
      <h5 class="p-px-3 p-pt-4">فروش حضوری</h5>
      <div
        class="p-col-12 p-d-flex p-flex-column p-jc-center p-ai-start p-pt-0"
      >
        <div class="p-d-flex p-jc-between p-col-12">
          <InputHasIcon
            iconClass="ri-link"
            inputText="بارکد "
            InPlaceholder="تایپ بارکد یا استفاده از بارکد خوان"
            inType="text"
            InGrid="p-sm-6 p-col-8"
          ></InputHasIcon>
        </div>
        <div class="p-d-flex p-jc-start p-ai-start p-col-12">
          <InputHasInfo
            inputText="قیمت حضوری"
            InPlaceholder="تومان"
            explaination="true"
            inType="number"
            InGrid="p-col-4 p-sm-3"
            InHeight="32px"
          ></InputHasInfo>
          <InputHasInfo
            inputText="موجودی کل"
            InPlaceholder="تعداد"
            inType="number"
            InGrid="p-sm-3 p-col-4"
            InHeight="32px"
            :disabled="limitations"
            @InvertoryUpdate="totalInventoryUpdate"
          ></InputHasInfo>
          <div class="p-field-checkbox p-mt-4">
            <Checkbox
              id="limitations"
              v-model="limitations"
              :binary="true"
              class="p-mx-2"
            />
            <label class="limitLabel" for="limitations"
              >محدودیتی در موجودی ندارم.</label
            >
          </div>
        </div>
        <div class="p-d-flex p-jc-start p-col-12">
          <h5 class="p-mx-2">فروش آنلاین</h5>
          <InputSwitch v-model="checked" class="MySwitchInput"></InputSwitch>
        </div>
        <div class="p-d-flex p-jc-start p-col-12 p-pl-5">
          <InputHasInfo
            inputText="قیمت آنلاین"
            InPlaceholder="تومان"
            explaination="true"
            inType="number"
            InGrid="p-sm-3 p-col-4"
            InHeight="32px"
            :disabled="!checked"
          ></InputHasInfo>
          <InputHasInfo
            inputText="موجودی آنلاین"
            InPlaceholder="تعداد"
            inType="number"
            InGrid="p-sm-3 p-col-4"
            InHeight="32px"
            :disabled="!checked"
            @InvertoryUpdate="invertoryOnlineUpdate"
            :sameInventory="sameInventory"
            validation="true"
            validationErr="موجودی آنلاین نمی‌تواند از موجودی کل بیشتر باشد."
          ></InputHasInfo>
        </div>
      </div>
    </template>
  </GeneralBox>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  data() {
    return {
      checked: false,
      limitations: false,
      totalInventory: 0,
      onlineInvertory: 0,
      sameInventory: false,
    };
  },
  components: {
    GeneralBox: defineAsyncComponent(() => import("./GeneralBox.vue")),
  },
  methods: {
    totalInventoryUpdate(value) {
      this.totalInventory = value;
    },
    invertoryOnlineUpdate(value) {
      this.onlineInvertory = value;
    },
    isInventoryValid() {
      if (this.onlineInvertory > this.totalInventory) {
        this.sameInventory = true;
      } else {
        this.sameInventory = false;
      }
    },
  },
  watch: {
    totalInventory: function () {
      this.isInventoryValid();
    },
    onlineInvertory: function () {
      this.isInventoryValid();
    },
    limitations: function () {
      this.onlineInvertory > this.totalInventory
        ? (this.sameInventory = this.checked && this.limitations)
        : "";
    },
    checked: function () {
      this.onlineInvertory > this.totalInventory
        ? (this.sameInventory = this.checked && this.limitations)
        : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.limitLabel {
  font-size: 14px;
  font-weight: 400;
  color: #202223;
}
.MySwitchInput {
  width: 24px;
  height: 15px;
}

::v-deep(.MySwitchInput.p-inputswitch) {
  .p-inputswitch-slider {
    border: solid 2px #6c6c6c;
    background: transparent;
  }
  .p-inputswitch-slider:before {
    background: transparent;
    border: solid 2px #6c6c6c;
    width: 15px;
    height: 15px;
    left: -0.1rem;
    margin-top: -0.45rem;
    border-radius: 50%;
    transition-duration: 0.2s;
  }
  .p-inputswitch-slider:hover {
    background: transparent !important;
    border: solid 2px #6c6c6c;
  }

  .p-inputswitch-slider:focus {
    background: transparent;
    border: solid 2px #6c6c6c;
  }
}
::v-deep(.MySwitchInput.p-inputswitch-checked) {
  .p-inputswitch-slider {
    border-color: #2563eb;
    background: #2563eb;
  }
  .p-inputswitch-slider:hover {
    background: #2563eb !important;
    border-color: #2563eb;
  }
  .p-inputswitch-slider:before {
    left: 100%;
    transform: translateX(-95%) scale(0.8);
    background: #fff;
    border-color: #fff;
  }
}

::v-deep(.MySwitchInput.p-focus) {
  .p-inputswitch-slider {
    box-shadow: none;
  }
}
</style>
