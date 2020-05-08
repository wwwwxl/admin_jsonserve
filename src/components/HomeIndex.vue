<template>
	<el-container>
		<el-header>
			<headnav @mytopnav="hometopnav" :menulist="toplistAll"></headnav>
		</el-header>
		<el-container class="sec_con">
			<el-aside width="auto">
				<leftnav :tit_menu="leftlist" @submenu="subclick"></leftnav>
			</el-aside>
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
					<!-- 显示主要内容 -->
					<div class="maincon">
						<router-view></router-view>
					</div>
				</el-main>
				<el-footer>后台管理模板</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	import headnav from './HeadNav.vue'
	import leftnav from './EleLeftNav.vue'
	
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
			//判断路由所在
			let current_route=this.$route.path;
			if(current_route!="/userinfo"){
					//获取所有菜单
					this.getAxios("/topmenu",{
						
					}).then((res)=>{
						//console.log("topmenu",res);
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
				//console.log('hometopnav',val);
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
				this.$router.push({path:'/home'});
			},
			//左侧导航栏点击事件
			subclick(subval){
				//console.log('subval',subval);
				this.nav_tip.leves_two=subval.subname;
			}
			
		}
	}
</script>

<style scoped>
	@import url("../common/icon.css");
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
