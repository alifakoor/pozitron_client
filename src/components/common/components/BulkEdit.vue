<template>
  <div class="zi-bulk-edit">
    <!-- <Button
      v-if="productsSelections.length == 0"
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
    /> -->
    <Button
    v-show="productsSelections.length>0"
      class="p-button-outlined p-button-secondary"
      label="ویرایش"
      :icon="
        !editLoading
          ? 'pi pi-check-circle zi-button-icon'
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
                label="ذخیره"
                :icon="sendEdit ? 'pi pi-spin pi-spinner zi-button-icon' : 'pi pi-check-circle zi-button-icon'"
                iconPos="right"
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
            :class="productsSelections.length > 15 && 'scrollItemBox itemsBox'"
          >
            <div
              class="itemBox p-d-flex p-jc-between p-ai-center"
              v-for="selectedItem in productsSelections"
              :key="selectedItem.id"
            >
            <p v-if="selectedItem.type == 'variation' && selectedItem.meta[
                  selectedItem.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue.length>0">(</p>
            <p
                v-for="(pMeta,key) in selectedItem.meta[
                  selectedItem.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue"
                 
                v-if="selectedItem.type == 'variation'"
                style="display: inline"
                v-bind="selectedItem.id"
              >
                {{  pMeta.name + ":" + pMeta.option }}
                <p v-if="key != selectedItem.meta[
                  selectedItem.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue.length-1" style="display: inline;">{{ "," }}</p>
              </p>
              <p v-if="selectedItem.type == 'variation' && selectedItem.meta[
                  selectedItem.meta
                    .map(function (e) {
                      return e.metaKey;
                    })
                    .indexOf('attributes')
                ].metaValue.length>0">)</p>
              <p>{{ selectedItem.name }}</p>

               <i
                class="svgIcon" 
                :innerHTML="closeCircleLine"
                @click="deSelectProductItem(selectedItem.id)"
              ></i>
            </div>
          </div>
        </div>
        <Divider class="p-m-0 p-p-0" type="solid" />
        <div class="p-d-flex p-flex-column">
          <div class="p-d-flex p-jc-around p-col-12 p-flex-column">
						<p class="p-text-right p-d-flex p-ai-center p-jc-end sellTxt">فروش حضوری</p>
						<div class="p-d-flex p-jc-between p-flex-wrap inputsContainer">
							<InputHasInfo
								inputText="قیمت حضوری"
								InPlaceholder="تومان"
								explaination="true"
								inType="number"
								InGrid="p-col-12 p-lg-3"
								InHeight="32px"
                @changeInputValue="setPrice"
							></InputHasInfo>
							<InputHasIcon
								:iconClass="discountIcon"
								inputText="تخفیف حضوری "
								InPlaceholder="درصد"
								inType="number"
								InGrid="p-col-12 p-lg-3"
								InHeight="32px"
                :MaxValue="100"
                @changeInputValue="setDiscountPercent"
							></InputHasIcon>

							<InputHasInfo
								inputText="موجودی کل"
								InPlaceholder="تعداد"
								inType="number"
								InGrid="p-col-12 p-lg-3"
								InHeight="32px"
                @changeInputValue="setStock"
							></InputHasInfo>
						</div>
					</div>
          <div class="p-d-flex p-jc-around p-col-12 p-flex-column">
            <p class="p-text-right  p-d-flex p-ai-center p-jc-end sellTxt">
              <InputSwitch v-model="onlineSell" class="zi-switch-input p-mr-2" :class="{'input-switch-unchecked' : onlineSell==false}" /> فروش
              آنلاین
            </p>

            <div class="p-d-flex p-jc-between p-flex-wrap inputsContainer">
              <InputHasInfo
                inputText="قیمت آنلاین"
                InPlaceholder="تومان"
                explaination="true"
                inType="number"
                InGrid="p-col-12 p-lg-3"
                InHeight="32px"
                @changeInputValue="setOnlinePrice"
              ></InputHasInfo>
              <InputHasIcon
                :iconClass="discountIcon"
                inputText="تخفیف آنلاین "
                InPlaceholder="درصد"
                inType="number"
                InGrid="p-col-12 p-lg-3"
                InHeight="32px"
                :MaxValue="100"
                @changeInputValue="setOnlineDiscountPercent"
              ></InputHasIcon>

              <InputHasInfo
                inputText="موجودی آنلاین"
                InPlaceholder="تعداد"
                inType="number"
                InGrid="p-col-12 p-lg-3"
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
      display:false,
      editLoading: false,
      sendEdit: false,
      onlinePrice: null,
      price: null,
      discountPercent: null,
      OnlineDiscountPercent: null,
      onlineStock: null,
      stock: null,
      onlineSell: null,
    };
  },
  computed: {
    ...mapState("iconSVG",["closeCircleLine","discountIcon"]),
    ...mapState("products",["products", "productsSelections","editDisplay"]),
    editData: function () {
      return {
        onlinePrice:
          this.onlinePrice == null  || this.onlinePrice=="" ? null : parseInt(this.onlinePrice),
        price:
          this.price == null  || this.price=="" ? null : parseInt(this.price),
        onlineDiscount:
          this.OnlineDiscountPercent == null || this.OnlineDiscountPercent == ""
            ? null
            : parseInt(this.OnlineDiscountPercent),
        discount:
          this.discountPercent == null || this.discountPercent == ""
            ? null
            : parseInt(this.discountPercent),
        onlineStock:
          this.onlineStock == null ||  this.onlineStock == "" ? null : parseInt(this.onlineStock),
        stock:
          this.stock == null ||  this.stock == "" ? null : parseInt(this.stock),
        onlineSell: this.onlineSell,
      };
    },
  },
  methods: {
    ...mapMutations("products",["deSelectProductItem", "editProductSelections"]),
    showEdit() {
      if (this.productsSelections.length > 0) {
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
      this.allOnlineSell=false;
      if (Object.keys(lastEdit).length != 0) {
        this.sendEdit = true;
        this.editProductSelections(lastEdit);
      }
    },
    setOnlinePrice(inputValue) {
      this.onlinePrice = inputValue;
    },
    setOnlineDiscountPercent(inputValue) {
      this.OnlineDiscountPercent = inputValue;
    },
    setOnlineStock(inputValue) {
      this.onlineStock = inputValue;
    },
    setPrice(inputValue) {
      this.price = inputValue;
    },
    setDiscountPercent(inputValue) {
      this.discountPercent = inputValue;
    },
    setStock(inputValue) {
      this.stock = inputValue;
    },
  },
  watch:{
    onlineSell:function(newVal,oldVal){
      if(newVal===true && oldVal===false){
        this.onlineSell=null
      }
    },
    editDisplay:function(newVal){
         if(!newVal){
            this.display = false;
            this.sendEdit = false;
            this.onlinePrice= null;
            this.OnlineDiscountPercent= null;
            this.onlineStock= null;
            this.onlineSell= null;
         }
    },
    productsSelections:function(){
      if(this.productsSelections.length==0){
        this.display = false;
        this.sendEdit = false;
        this.onlinePrice= null;
        this.OnlineDiscountPercent= null;
        this.onlineStock= null;
        this.onlineSell= null;
      }
    }
  }
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
  border-radius: 4px;
  text-align: center;

  ::v-deep(.p-button.p-button-secondary) {
    width: 77px;
    height: 32px;
    border-radius: 4px;
    padding: 8px;
    border: none !important;
    box-shadow: none !important;

    // .p-button-icon{
    //   order:1;
    // }

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

.sellTxt{
  font-weight: 500;
font-size: .75rem;
line-height: 150%;
text-align: right;
color: #131520;
margin: 16px 0px;
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

.inputsContainer{
  .iconicInput{
    padding:8px 0;
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
  margin: 0px 5px 5px;
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
    margin: 0px 0px 0px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// Switch input
.zi-switch-input {
  width: 30px;
  height: 18px;
  margin-right: 5px;
}
::v-deep(.zi-switch-input.p-inputswitch) {
  .p-inputswitch-slider {
    border: solid 0.125rem #90C8D4;
    background: #90C8D4;
  }
  .p-inputswitch-slider:before {
    background: #fff;
    border: solid 0.125rem #fff;
    width: 14px;
    height: 14px;
    top: 8px;
    left: 4px;
    // margin-top: -0.5rem;
    border-radius: 50%;
    transition-duration: 0.2s;
  }
  .p-inputswitch-slider:hover {
    background: #90C8D4 !important;
    border: solid 0.125rem #90C8D4;
  }

  .p-inputswitch-slider:focus {
    background: transparent;
    border: solid 0.125rem #6c6c6c;
  }
}
::v-deep(.zi-switch-input.p-inputswitch-checked) {
  .p-inputswitch-slider {
    border-color: #048ba8;
    background: #048ba8;
  }
  .p-inputswitch-slider:hover {
    background: #048ba8 !important;
    border-color: #048ba8;
  }
  .p-inputswitch-slider:before {
    left: 18px;
    transform: translateX(-50%) ;
    background: #fff;
   border: solid 0.1rem #fff;
  }
}

::v-deep(.zi-switch-input.input-switch-unchecked) {
  .p-inputswitch-slider {
    border-color: #048BA8;
    background: transparent;
  }
  .p-inputswitch-slider:hover {
    background: transparent !important;
    border-color: #048BA8;
  }
  .p-inputswitch-slider:before {
    left: -10px;
    transform: translateX(50%) ;
    background: #fff;
   border: solid 0.1rem #048BA8;
  }
}
::v-deep(.zi-switch-input.p-focus) {
  .p-inputswitch-slider {
    box-shadow: none;
  }
}

.p-divider {
  width: 100%;
  border: 1px solid #e1e3e5;
  background: #e1e3e5;
}

</style>
