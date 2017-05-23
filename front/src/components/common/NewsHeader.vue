<template>
</template>

<script>
export default {
  name: 'header',
  data() {
  	return {
  		show:false,
  	}
  },
  methods:{
    showMenus: function() {
      this.show = !this.show;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
	.fix-header{
		width: 100%;
		height: 50px;
    position: fixed;
		background: @ColorF;
    box-shadow: rgba(0, 0, 0, 0.247059) 0px 0px 4px;
    z-index: 6;
    transition: all 0.3s ease;
	}
  .el-icon-menu{
    font-size: 1.5rem;
    vertical-align: middle;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translateY(-50%);
  }
</style>