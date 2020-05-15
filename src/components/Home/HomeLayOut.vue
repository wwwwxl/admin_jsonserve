<template>
	<el-container>
		<!-- 头部导航栏 -->
		<el-header>
			<headnav @mytopnav="hometopnav" :menulist="toplistAll"></headnav>
		</el-header>
		<!-- 中间内容 -->
		<el-container class="sec_con">
			<!-- 左侧导航栏 -->
			<el-aside width="auto">
				<leftnav :tit_menu="leftlist" @submenu="subclick"></leftnav>
			</el-aside>
			<!-- 中间主要切换显示的内容 -->
			<el-container>
				<el-main id="main">
					<!-- 导航指示 -->
					<div class="main_top" v-if="nav_tip.leves_two">
							<div>
								<i class="iconfont icon-yijipindao"></i>
								<span>{{nav_tip.leves_one}}</span>
							</div>
							<div><i class="el-icon-arrow-right"></i></div>
							<div>
								<i class="iconfont icon-2"></i>
								<span>{{nav_tip.leves_two}}</span>
							</div>
					</div>
					<!-- 切换显示树状、表格、操作主要内容 -->
					<div class="maincon">
						<keep-alive>
							<router-view></router-view>
						</keep-alive>
					</div>
				</el-main>
				<!-- 底部链接 -->
				<el-footer>后台管理模板</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	import headnav from './HeadNav.vue'
	import leftnav from './LeftNav.vue'
	
	export default {
		data: () => {
			return {
				allmenu:[],
				toplistAll:[],
				leftlistAll:[],
				leftindex:0,
				leftlist:[],
				nav_tip:{
					leves_one:"楼层科室",
					leves_two:"楼层信息"
				}
			}
		},
		components:{
			headnav,
			leftnav
		},
		created() {
			//判断路由所在决定内容和导航指示条
			let current_route=this.$route.path;
			if(current_route!="/userinfo"){
					//获取所有菜单
					this.getAxios("/topmenu",{
					}).then((res)=>{
						this.allmenu=res;
						let newleft=[];
						let newtop=[];
						this.allmenu.forEach((val)=>{
							let obj={
								id:val.id,
								name:val.name,
								icon:val.icon
							}
							newtop.push(obj);
							newleft.push(val.leftnav);
						});
						//区分顶级菜单和左侧菜单
							this.toplistAll=newtop;
							this.leftlistAll=newleft;
							
							this.leftlist=this.leftlistAll[this.leftindex];
					}).catch((res)=>{
						console.log("error",res);
					});
			}
		},
		methods: {
			//顶级菜单点击事件
			hometopnav(val){
				//找到一级导航名称提示
				this.toplistAll.forEach((item)=>{
					if(item.id==val){
						this.nav_tip.leves_one=item.name;
					}
				});
				//找到二级导航名称
				if(val != '6-1'){
					switch (val){
						case "1001":
						this.leftindex=0;
						break;
						case "1002":
						this.leftindex=1;
						break;
						case "1003":
						this.leftindex=2;
						break;
						case "1004":
						this.leftindex=3;
						break;
						case "1005":
						this.leftindex=4;
						break;
						case "1006":
						this.leftindex=5;
						break;
					}
					this.leftlist=this.leftlistAll[this.leftindex];
					this.nav_tip.leves_two=this.leftlist[0].subtit[0].subname;
				}else{
					this.leftlist=[];
					this.nav_tip.leves_one="";
					this.nav_tip.leves_two="";
				}
				//回到首页
				this.$router.push({path:'/homelatout'});
			},
			//左侧导航栏点击事件
			subclick(subval){
				this.nav_tip.leves_two=subval.subname;
				let sub_id=subval.id;
				switch (sub_id){
					case "10010101":
					this.$router.push({path:'/sectionlayout'});
					break;
					case "10010102":
					this.$router.push({path:'/roomlayout'});
					break;
					case "10010103":
					this.$router.push({path:'/bedlayout'});
					break;
					default:
					break;
				}
				
				
			}
			
		}
	}
</script>

<style scoped>
	@import url("../../common/icon.css");
		/* 顶部导航栏提示 */
		.main_top {
			display: flex;
			flex-direction: row;
			width: 100%;
			height: 32px;
			line-height: 32px;
			border-bottom: 1px solid #909399;
			box-sizing: border-box;
		}
		.main_top div {
			padding: 0px 0px 0px 10px;
		}
		.main_top div span {
			padding: 0px 0px 0px 5px;
			cursor: pointer;
		}
	.maincon{
		position: relative;
		width: 100%;
		height: calc(100% - 32px);
		height: -moz-calc(100% - 32px);
		height: -webkit-calc(100% - 32px);
	}
	.el-header,
	.el-footer {
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-footer{
		border-top: 1px solid gainsboro;
		box-sizing: border-box;
	}
	.el-header{
		background-color: rgb(84, 92, 100);
	}
	.sec_con{
		height: calc(100vh - 60px);
		height: -moz-calc(100vh - 60px);
		height: -webkit-calc(100vh - 60px);
	}
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
	}

	.el-main {
		color: #333;
		text-align: center;
		padding: 0px;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
