<template>
	<div class="footer-info">		
		<section class="footer-top"><h1 class="news-common-footer">INCREDIBLE</h1></section>
  		<div class="wraper">
	  		<div class="footer-link news-common-footer">	  			
	  			<ul class="more-info">
	  				<h3 class="link-title">客户服务</h3>
	  				<li class="more-info-item"><a href="http://inkzhou.com">关于我</a></li>
	  				<li class="more-info-item">联系我</li>
	  				<li class="more-info-item">加入我们</li>
  				</ul>  				
  				<ul class="more-info">
	  				<h3 class="link-title">友情链接</h3>
	  				<li v-for="link in links" class="more-info-item"><a :href="link.url">{{link.name}}</a></li> 
	  			</ul> 
			
				<ul class="more-info">
	  				<h3 class="news-common-footer link-title">广告</h3>
	  			</ul>
	  		</div >
  		</div>
  		<footer>
  			<div class="info news-common-footer">
  			<li class="copyright">本网站文字内容均归理工大学周颖所有，任何单位及个人未经许可，不得擅自转载使用</li>
  			<li class="copyright">Copyright©2017/ 哈尔滨理工大学/ TEL:13836034581 /周颖 /</li></div>
  		</footer>
  	</div>
</template>
<script>
import API from '../../api/api.js'
export default{
	data(){
		return {
			links:[]
		}
	},
	props:['showAccess'],
	methods:{
		access(){
			this.show = !this.show
		},
		showLists(){
			this.showList = !this.showList
		},
		hideAccess(){
			let res = this.$emit("hideAccess");
		}
	},
	components:{
	},
	mounted(){
		API.FIND(`admin/config`).then(res=> {	
			this.links = res.data.data.filter((item,index)=> { 
				if(item.type==1){
					return item
				}
			})
		})
	}
}
</script>
<style lang="less" scoped>
@import url('../../assets/less/CV.less');
.news-common-footer{
	width: 960px;
	margin: 0 auto;
}
.footer-info {
	background:@DeepGary;
}
.footer-top {
	background: @DeepGary;
	padding: 5px 0;
}

.info {
	padding-top: 10px;
	text-align: center;
}
.copyright {
	font-size: 12px;
	line-height: 24px;
}
.link-title{
	font-size: 12px;
	font-weight: 600;
	padding:5px 0;
}
.wraper {
	padding: 10px 0;
	background: #f4f4f4;
	overflow: hidden;
}
.more-info {
	width: 33.3%;
	float: left;
	padding-left: 20px;
	border-left: 1px solid @Gray;
	.more-info-item{
		font-size: 12px;
		line-height:18px;
	}
}
</style>