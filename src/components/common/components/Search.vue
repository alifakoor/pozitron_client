<template>
  <div class="zi-search">
    <span class="p-input-icon-right">
      <i class="pi pi-search" />
      <InputText
        type="text"
        v-model="search"
        placeholder="با بارکد، نام، ویژگی، دسته و برچسب دنبالش بگرد"
        @input="searchData({ searchValue: search, searchType: searchType })"
      />
    </span>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "zi-search",
  props: {
    widthInput: {
      type: String,
      default: "282px",
    },
    mediaWidth: {
      type: String,
      default: "182px",
    },
    searchType: {
      type: String,
    },
  },
  data() {
    return {
      search: "",
      widthInput: this.$props.widthInput,
      mediaWidth: this.$props.mediaWidth,
    };
  },
  methods: {
    ...mapMutations(["searchData"]),
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
  padding-right: 2.5rem !important;
  background: #f9f9fb;
  border-radius: 16px;
  border: 0;
  width: v-bind(widthInput);
  height: 32px;
  font-size: 12px;
  margin: 0px 16px 0 8px;
}

@media (max-width: 680px) {
  .p-inputtext {
    width: v-bind(mediaWidth);
  }
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
    font-family: "Vazir";
  }

  .p-inputtext::placeholder {
    font-size: 12px;
    color: #bbc0d8;
  }
}
</style>
