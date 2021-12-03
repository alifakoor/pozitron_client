<template>
  <div class="p-col-5 blueSideBar p-d-flex p-flex-column">
    <div class="p-d-flex p-ai-center p-jc-center p-flex-column">
      <p class="title">با پوزیترون سادگی در مدیریت فروش را تجربه کنید.</p>
      <p class="title2">دستیار هوشمند کسب‌وکار شما</p>
    </div>
    <div class="imgSide p-d-flex p-ai-center p-jc-center">
      <img src="../assets/images/sideBarImg.jpg" alt="" />
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
    margin-top: 70px;
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

.title2 {
  font-size: 16px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #7de6fc;
  margin: 8px 0px;
}

.imgSide {
  margin: 57px 0px;
  img {
    width: 352px;
  }
}
</style>
