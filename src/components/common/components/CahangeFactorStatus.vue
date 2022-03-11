<template>
  <div class="zi-bulk-edit">
    <Button
      v-show="factorSelections.length > 0"
      class="p-button-outlined p-button-secondary"
      label="تغییر وضعیت"
      :icon="
        !editLoading
          ? 'ri-edit-box-line zi-button-icon'
          : 'pi pi-spin pi-spinner zi-button-icon'
      "
      iconPos="left"
      @click="showEdit()"
      :class="display ? 'bgGreenDark' : ''"
    />

    <div v-show="display" class="statusBox">
      <ul class="listBox">
        <li>
          <input
            type="radio"
            class="radioBtn"
            value="0"
            name="factorStatus"
            v-model="factorStatus"
            id="status0"
          />
          <label for="status0" class="radioButton">
            <span></span>
            <p>در حال انجام</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            class="radioBtn"
            value="1"
            name="factorStatus"
            v-model="factorStatus"
            id="status1"
          />
          <label for="status1" class="radioButton">
            <span></span>
            <p>در انتظار پرداخت</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            class="radioBtn"
            value="2"
            name="factorStatus"
            v-model="factorStatus"
            id="status2"
          />
          <label for="status2" class="radioButton">
            <span></span>
            <p>تکمیل شده</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            class="radioBtn"
            value="3"
            name="factorStatus"
            v-model="factorStatus"
            id="status3"
          />
          <label for="status3" class="radioButton">
            <span></span>
            <p>لغو شده</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            class="radioBtn"
            value="4"
            name="factorStatus"
            v-model="factorStatus"
            id="status4"
          />
          <label for="status4" class="radioButton">
            <span></span>
            <p>مرجوعی</p>
          </label>
        </li>
      </ul>
      <div class="changeStatusBtn">
        <i class="ri-checkbox-circle-line"></i>
        <p>اعمال</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      display: false,
      editLoading: false,
      sendEdit: false,
      factorStatus: null,
    };
  },
  computed: {
    ...mapState("factors", ["factors", "factorSelections", "editDisplay"]),
  },
  methods: {
    showEdit() {
      if (this.factorSelections.length > 0) {
        this.display = !this.display;
      }
    },
    edit() {},
  },
  watch: {
    editDisplay: function (newVal) {
      if (!newVal) {
        this.display = false;
        this.sendEdit = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variablesOfTable";
.zi-bulk-edit {
  background: #048ba8;
  border-radius: 4px;
  text-align: center;
  position: relative;
  ::v-deep(.p-button.p-button-secondary) {
    width: 111px;
    height: 32px;
    border-radius: 4px;
    padding: 8px;
    border: none !important;
    box-shadow: none !important;

    .p-button-icon {
      order: 1;
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

.statusBox {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0px;
  width: 157.12px;
  height: 224px;
  right: 95%;
  top: 30%;
  background: #ffffff;
  box-shadow: 0px 0px 9.56px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  z-index: 999999;
  .listBox {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .listBox li {
    width: 100%;
    height: 26px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: start;
    margin: 4px 0px;
    .radioButton {
      display: flex;
      align-items: center;
      justify-content: start;
      cursor: pointer;
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 1px #7b84b2;
        position: relative;
      }
      span::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: solid 1px #7b84b2;
        transform: translate(-50%, -50%);
      }
      p {
        font-weight: normal;
        font-size: 16px;
        line-height: 164%;
        text-align: right;
        color: #5c679e;
        margin: 0px 4px;
      }
    }
    .radioBtn {
      display: none;
    }

    .radioBtn:checked + .radioButton span:after {
      background: #7b84b2;
    }
  }
}

.changeStatusBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 71px;
  height: 32px;
  margin: 0px 0px;
  background: #048ba8;
  border-radius: 4px;
  margin: 4px 0px;
  cursor: pointer;
  p,
  i {
    color: #fff;
    margin: 0px 2px;
    font-size: 14px;
    line-height: 168%;
  }
}

.changeStatusBtn:hover {
  background: #036378;
}

.bgGreenDark {
  background: #036378 !important;
}
</style>
