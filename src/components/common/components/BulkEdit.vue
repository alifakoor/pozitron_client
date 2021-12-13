<template>
  <div class="zi-bulk-edit">
    <Button
      v-if="selections.length == 0"
      class="p-button-outlined p-button-secondary"
      label="ویرایش"
      v-tooltip.bottom="{
        value: 'حداقل یک محصول باید انتخاب شود.',
        class: 'myTooltip',
      }"
      :icon="
        !editLoading
          ? 'ri-edit-box-line zi-button-icon'
          : 'pi pi-spin pi-spinner zi-button-icon'
      "
      iconPos="left"
      @click="showEdit()"
    />
    <Button
      v-else
      class="p-button-outlined p-button-secondary"
      label="ویرایش"
      :icon="
        !editLoading
          ? 'ri-edit-box-line zi-button-icon'
          : 'pi pi-spin pi-spinner zi-button-icon'
      "
      iconPos="left"
      @click="showEdit()"
    />
    <Dialog
      v-model:visible="display"
      :style="{
        width: '50vw',
      }"
      class="modalBox"
      :modal="true"
    >
      <template #header>
        <div class="p-d-flex p-flex-column">
          <div class="p-d-flex p-jc-between">
            <div class="zi-bulk-edit">
              <Button
                class="p-button-outlined p-button-secondary"
                label="ویرایش"
                @click="edit()"
              />
            </div>
          </div>
        </div>
      </template>

      <div class="p-d-flex p-flex-column">
        <div class="p-d-flex p-jc-between p-flex-row-reverse">
          <div
            class="p-d-flex p-flex-wrap p-jc-end"
            :class="selections.length > 15 && 'scrollItemBox itemsBox'"
          >
            <div
              class="itemBox p-d-flex p-jc-between p-ai-center"
              v-for="selectedItem in selections"
              :key="selectedItem.id"
            >
              <p>{{ selectedItem.name }}</p>
              <i
                class="ri-close-circle-line"
                @click="deSelectItem(selectedItem.id)"
              ></i>
            </div>
          </div>
        </div>
        <Divider class="p-m-0 p-p-0" type="solid" />
        <div class="p-d-flex p-flex-column">
          <!-- <div class="p-d-flex p-jc-around p-col-12 p-flex-column">
						<p class="p-text-right p-mx-5">فروش حضوری</p>
						<div class="p-d-flex p-jc-around">
							<InputHasInfo
								inputText="قیمت حضوری"
								InPlaceholder="تومان"
								explaination="true"
								inType="number"
								InGrid="p-col-3"
								InHeight="32px"
							></InputHasInfo>
							<InputHasIcon
								iconClass="ri-percent-line"
								inputText="تخفیف حضوری "
								InPlaceholder="درصد"
								inType="number"
								InGrid="p-col-3"
								InHeight="32px"
							></InputHasIcon>

							<InputHasInfo
								inputText="موجودی کل"
								InPlaceholder="تعداد"
								inType="number"
								InGrid="p-col-3"
								InHeight="32px"
							></InputHasInfo>
						</div>
					</div> -->
          <div class="p-d-flex p-jc-around p-col-12 p-flex-column">
            <p class="p-text-right p-mx-5">فروش آنلاین</p>
            <div class="p-d-flex p-jc-around">
              <InputHasInfo
                inputText="قیمت آنلاین"
                InPlaceholder="تومان"
                explaination="true"
                inType="number"
                InGrid="p-col-3"
                InHeight="32px"
                @changeInputValue="setOnlinePrice"
              ></InputHasInfo>
              <InputHasIcon
                iconClass="ri-percent-line"
                inputText="تخفیف آنلاین "
                InPlaceholder="درصد"
                inType="number"
                InGrid="p-col-3"
                InHeight="32px"
                :MaxValue="100"
                @changeInputValue="setOnlineDiscountPercent"
              ></InputHasIcon>

              <InputHasInfo
                inputText="موجودی آنلاین"
                InPlaceholder="تعداد"
                inType="number"
                InGrid="p-col-3"
                InHeight="32px"
                @changeInputValue="setOnlineStock"
              ></InputHasInfo>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      display: false,
      editLoading: false,
      onlinePrice: null,
      OnlineDiscountPercent: null,
      onlineStock: null,
      onlineSell: null,
    };
  },
  computed: {
    ...mapState(["products", "selections"]),
    editData: function () {
      return {
        onlinePrice:
          this.onlinePrice == null ? null : parseInt(this.onlinePrice),
        OnlineDiscountPercent:
          this.OnlineDiscountPercent == null
            ? null
            : parseInt(this.OnlineDiscountPercent),
        onlineStock:
          this.onlineStock == null ? null : parseInt(this.onlineStock),
      };
    },
  },
  methods: {
    ...mapMutations(["deSelectItem", "editSelections", "setProducts"]),
    showEdit() {
      if (this.selections.length > 0) {
        this.editLoading = true;
        setTimeout(() => {
          this.display = true;
          this.editLoading = false;
        }, 1500);
      }
    },
    edit() {
      let lastEdit = Object.entries(this.editData).reduce(
        (a, [k, v]) => (v === null ? a : ((a[k] = v), a)),
        {}
      );
      this.editSelections(lastEdit);
      this.setProducts();
      this.display = false;
      // console.log(this.editData);
    },
    setOnlinePrice(inputValue) {
      console.log(inputValue);
      this.onlinePrice = inputValue;
    },
    setOnlineDiscountPercent(inputValue) {
      console.log(inputValue);
      this.OnlineDiscountPercent = inputValue;
    },
    setOnlineStock(inputValue) {
      console.log(inputValue);
      this.onlineStock = inputValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variablesOfTable";
.cancelBtn {
  background: #fff !important;
}

.p-button.cancelBtn .p-button-label {
  color: #000 !important;
}
.zi-bulk-edit {
  background: #048ba8;
  border-radius: 8px;
  text-align: center;

  ::v-deep(.p-button) {
    width: 77px;
    height: 32px;
    border-radius: 8px;
    padding: 8px;
    border: none !important;

    .p-button-secondary:enabled:focus {
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }

    .p-button-label {
      font-size: 14px;
      color: #fff;
      line-height: 168%;
    }
  }
}

.zi-bulk-edit:hover {
  background: #023a46;
}

.p-dialog-mask {
  background: rgba(0, 0, 0, 0.5) !important;
}

::v-deep(.modalBox) {
  .p-dialog-header {
    border-radius: 32px 32px 0 0;
  }
  .p-dialog .p-dialog-content {
    padding: 0;
    border-radius: 0 0 32px 32px;
  }
}

.itemsBox {
  height: 100px;
  width: 100%;
}

.scrollItemBox {
  overflow-y: scroll;
}
.itemBox {
  width: fit-content;
  min-width: 64px;
  height: 24px;
  margin: 0px 10px 5px;
  padding: 4px;
  background: #dcdeea;
  border: 1px solid #9fb3fd;
  border-radius: 4px;
  p {
    font-size: 12px;
    line-height: 130%;
    text-align: right;
    color: #5c679e;
  }
  i {
    color: #7b84b2;
    cursor: pointer;
  }
}

.p-divider {
  width: 100%;
  border: 1px solid #e1e3e5;
  background: #e1e3e5;
}
// .modalBox {
// 	background: #ffffff;
// 	border-radius: 32px;
// 	width: 504px;
// 	padding: 40px 0px;
// }
</style>
