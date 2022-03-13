<template>
  <div
    class="p-d-flex p-ai-center p-jc-center dropdownBox p-px-4"
    :class="InGrid"
  >
    <span class="dropDownIcon">
      <slot name="icon"></slot>
    </span>
    <VueMultiselect
      v-model="selected"
      :options="options"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
      tag-placeholder="افزودن"
      :placeholder="InPlaceholder"
      label="name"
      track-by="code"
      selectLabel=""
      deselectLabel=""
    >
    </VueMultiselect>
  </div>
</template>

<script>
import VueMultiselect from "vue-multiselect";
export default {
  components: { VueMultiselect },
  props: {
    iconElement: {
      type: String,
      default: "",
    },
    iconFont: {
      type: String,
      default: "",
    },
    InPlaceholder: {
      type: String,
      default: "",
    },
    InGrid: {
      type: String,
      default: "p-col-6",
    },
    InHeight: {
      type: String,
      default: "40px",
    },
  },
  data() {
    return {
      selected: null,
      options: [
        { name: "بهار", code: 1 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
        { name: "ریحانه", code: 25 },
      ],
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.selected.push(tag);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss">
.dropDownIcon {
  border: 1px solid #bbc0d8;
  border-left: 0;
  border-radius: 0 4px 4px 0;
  height: inherit;
  height: v-bind(InHeight);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px 0 5px;
}
.multiselect {
  height: v-bind(InHeight);
  border: 1px solid #bbc0d8;
  border-right: 0;
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;
  margin: 20px 0px;
  direction: rtl;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  text-align: right;
  .multiselect__select {
    position: static;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 4px;
  }
  .multiselect__select::before {
    position: static;
    color: #7b84b2;
    border-color: #7b84b2 transparent transparent transparent;
  }

  .multiselect__tags {
    width: 100%;
    border: none;
    border-radius: 0;
    text-align: right;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto;
    min-height: 0;
    .multiselect__placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      color: #7b84b2;
      font-size: 14px;
      line-height: 170%;
      padding: 0;
    }
    .multiselect__input {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
      color: #7b84b2;
      font-size: 14px;
      line-height: 170%;
      padding: 0;
    }
    .multiselect__input::placeholder {
      visibility: hidden;
    }
    .multiselect__input:focus {
      border: none;
      border-radius: 5px;
    }
    .multiselect__tags-wrap {
      .multiselect__tag {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;
        padding: 0px 4px 0px 8px;
        position: static;
        width: fit-content;
        height: 24px;
        left: 5px;
        top: 0px;
        background: #dcdeea;
        border: 1px solid #bbc0d8;
        box-sizing: border-box;
        border-radius: 4px;
        margin: 0;
        span {
          font-size: 14px;
          line-height: 170%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: right;
          color: #5c679e;
        }
      }
    }
  }

  .multiselect__content-wrapper {
    width: 100%;
    top: 100%;
    left: 0;
    max-height: 197px !important;
    margin: 4px 0px;
    background: #ffffff;
    border: 1px solid #bbc0d8;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    overflow-x: hidden;
    .multiselect__content {
      margin: 8px 0px;
      .multiselect__element {
        background: transparent;
        .multiselect__option {
          min-height: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          margin: 8px 0px;
          span {
            font-size: 14px;
            line-height: 170%;
            display: flex;
            align-items: center;
            text-align: right;
            color: #131520;
            margin: 0px 10px;
          }
        }
        .multiselect__option[data-select="افزودن"] {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
          align-items: center;
          span {
            margin: 0 2px;
            color: #048ba8;
          }
        }
        .multiselect__option[data-select="افزودن"]::after {
          order: 0;
          background: transparent;
          content: "\002B";
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          font-size: 20px;
          margin: 0;
          color: #048ba8;
          width: fit-content;
          height: fit-content;
          padding: 7px 0px 5px 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: solid 1px #048ba8;
          border-radius: 50%;
          margin: 0;
          position: static;
          line-height: 0;
        }
        .multiselect__option[data-select="افزودن"] span::before {
          background: transparent;
          content: "افزودن:";
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          margin: 2px;
          color: #048ba8;
          width: fit-content;
          height: fit-content;
          padding: 0;
          margin: 0;
          position: static;
          line-height: 0;
        }
        .multiselect__option--highlight {
          background: #f6f6f7;
          height: 24px;
        }
        .multiselect__option--selected {
          background: #bbbbd7;
          height: 24px;
        }
        .multiselect__option--selected::after {
          visibility: hidden;
        }
      }
    }
  }
}
</style>
