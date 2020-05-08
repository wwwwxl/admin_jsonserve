<template>
	<div class="left_box">
		<el-menu default-active="1" class="el-menu-vertical-demo  left_nav_tit" @open="handleOpen" @close="handleClose"
	:collapse="isCollapse" :unique-opened="unique" v-if="tit_menu.length!=0" :default-openeds="subopens">
			<!-- 有子集菜单循环内容 -->
			<el-submenu class="subnav_con" :index='name.id' v-for="name in sublength" :key="name.id">
				<template slot="title">
					<i class="el-icon-menu"></i>
					<span slot="title" class="nav_text_color">{{name.tit}}</span>
				</template>
				<el-menu-item-group>
					<el-menu-item :index="subname.id" v-for="subname in name.subtit" :key="subname.id" @click="subleft(subname)" >{{subname.subname}}</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<!-- 没有子集菜单循环内容 -->
			<el-menu-item :index='item.id' v-for="item in onlylength" :key="item.id" @click="subleft(item)">
					<i class="el-icon-s-promotion"></i>
					<span slot="title" class="nav_text_color">{{item.tit}}</span>
			</el-menu-item>
		</el-menu>
		<!-- 左侧导航栏收缩事件 -->
		<div class="div_control_bot" @click="control_left">
			<span class="control_hr"></span>
			<i v-bind:class="[isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left','icon_arrow']"></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			"tit_menu"
		],
		data() {
			return {
				unique: true,
				isCollapse: false
			};
		},
		computed: {
			//计算是否有子集菜单
			sublength() {
				let newlist = JSON.parse(JSON.stringify(this.tit_menu));
				return newlist.filter(function(val) {
					if (val.subtit.length > 0) {
						return val;
					}
				})
			},
			onlylength(){
				let newlist = JSON.parse(JSON.stringify(this.tit_menu));
				return newlist.filter(function(val) {
					if (val.subtit.length == 0) {
						return val;
					}
				})
			},
			//默认展开的数组索引
			subopens(){
				let newlist = JSON.parse(JSON.stringify(this.tit_menu));
				let sublist=newlist.filter(function(val) {
					if (val.subtit.length > 0) {
						return val;
					}
				});
				let opens=[];
				opens.push(sublist[0].id);
				return opens;
			}
		},
		methods: {
			// 左侧导航栏展开和关闭事件
			handleOpen(key, keyPath) {
				console.log("EleLeftNav_handleOpen", key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log("EleLeftNav_handleClose", key, keyPath);
			},
			//左侧导航栏收缩事件
			control_left() {
				this.isCollapse = !this.isCollapse;
			},
			//左侧导航栏点击事件
			subleft(subval){
				console.log('subval',subval);
				this.$emit("submenu",subval);
			}
		}
	}
</script>

<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	.left_box {
		position: relative;
		height: 100%;
		background-color: rgb(84, 92, 100);
		overflow-x: hidden;
	}

	.left_nav_tit {
		width: 100%;
		background-color: rgb(84, 92, 100);
		border: none;
		box-sizing: border-box;
	}

	.control_bot {
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: row;
	}

	.div_control_bot {
		position: absolute;
		bottom: 10px;
		width: 100%;
		height: 20px;
		line-height: 10px;
		cursor: pointer;
	}

	.control_hr {
		display: block;
		width: 100%;
		height: 2px;
		background-color: whitesmoke;
		position: relative;
		top: 10px;
	}

	.icon_arrow {
		font-size: 20px;
		color: whitesmoke;
	}

	.el-menu,
	.subnav_con {
		width: 100%;
	}

	.nav_text_color {
		color: #E6A23C;
	}
</style>
