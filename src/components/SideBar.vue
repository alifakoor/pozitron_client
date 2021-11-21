<template>
  <div class="p-col-5 blueSideBar">
    <div class="p-d-flex p-ai-center p-jc-center">
      <p class="title">با پوزیترون سادگی در مدیریت فروش را تجربه کنید.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/variables";
.blueSideBar {
  background: $sideBarBackground;
  // min-width: 504px;
  min-height: 648px;
  font-size: 24px;
  border-radius: 32px 0px 0px 32px;
  .title {
    margin-top: 84px;
    color: $sideBarTitle;
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 180%;
    display: flex;
    align-items: center;
    text-align: center;
  }
}
</style>
