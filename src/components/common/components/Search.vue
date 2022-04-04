<template>
  <div class="zi-search">
    <span class="p-input-icon-right">
      <i class="svgIcon" :innerHTML="searchIcon" />
      <InputText
        type="text"
        v-model="search"
        placeholder="با بارکد، نام، ویژگی، دسته و برچسب دنبالش بگرد"
        @input="searchingData()"
      />
    </span>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

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
    searchStore: {
      type: String,
    },
  },
  data() {
    return {
      search: "",
      inputWidth: this.$props.widthInput,
      mediaWidth: this.$props.mediaWidth,
    };
  },
  computed: {
    ...mapState("iconSVG", ["searchIcon"]),
  },
  methods: {
    ...mapMutations("products", ["searcProducthData"]),
    ...mapMutations("factors", ["searchFactorData"]),
    searchingData() {
      if (this.searchStore == "products") {
        this.searcProducthData({
          searchValue: this.search,
          searchType: this.searchType,
        });
      } else if (this.searchStore == "factors") {
        this.searchFactorData({
          searchValue: this.search,
          searchType: this.searchType,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/variablesOfTable";
.p-input-icon-right {
  .svgIcon {
    color: #7b84b2;
    margin: -10px 25px 0 0 !important;
  }
}
.p-inputtext {
  padding: 16px;
  padding-right: 2.5rem !important;
  background: #f9f9fb;
  border-radius: 16px;
  border: 0;
  width: v-bind(inputWidth);
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
    font-size: 0.75rem;
    color: #9ba2c5;
  }
}
</style>
