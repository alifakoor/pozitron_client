<template>
  <div class="zi-search">
    <span class="p-input-icon-right">
      <i class="pi pi-search" />
      <InputText
        type="text"
        v-model="searchData"
        placeholder="با بارکد، نام، ویژگی، دسته و برچسب دنبالش بگرد"
        @input="searchProduct(searchData)"
      />
    </span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "zi-search",
  props: {
    width: {
      type: String,
      default: "50%",
    },
  },
  data() {
    return {
      searchData: "",
    };
  },
  methods: {
    ...mapMutations(["searchProduct"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variablesOfTable";
.p-input-icon-right {
  .pi-search {
    color: #7b84b2;
    margin-right: 25px;
  }
}
.p-inputtext {
  padding: 16px;
  padding-right: 40px !important;
  background: #f9f9fb;
  border-radius: 16px;
  border: 0;
  width: 282px;
  height: 32px;
  font-size: 12px;
  margin: 0px 16px 0 8px;
}

@media (max-width: 680px) {
  .p-inputtext {
    width: 182px;
  }
}
.p-inputtext::placeholder {
  font-size: 12px;
  color: #b4b4b4;
}

.p-inputtext:focus {
  border: 0;
  outline: 0;
  box-shadow: none;
}

.p-inputtext:enabled:focus {
  border: 0;
  outline: 0;
  box-shadow: none;
}

.zi-search {
  direction: ltr;
  margin-left: 8px;
  .p-button,
  .p-inputgroup-addon {
    width: 2.5rem;
    color: #b4b4b4;
    border: 1px solid $buttonBorderColor;
    background-color: #f6f6f7;
    padding-top: 1.515151515151515151515151515152%;
    padding-bottom: 1.515151515151515151515151515152%;
  }

  .p-button {
    border-radius: 4px 0px 0px 4px;
  }

  .p-inputgroup-addon {
    border-radius: 0px 4px 4px 0px;
  }

  .p-inputtext {
    text-align: right;
    font-family: Vazir;
  }
}
</style>
