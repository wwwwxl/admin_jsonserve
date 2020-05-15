<template>
	<div class="nav_box">
		<div class="nav_tit">
			<i class="el-icon-s-marketing"></i>
			<span>后台管理模板</span>
		</div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<!-- <el-menu-item index="0"><i class="el-icon-s-marketing"></i>楼层科室</el-menu-item>
			<el-menu-item index="1"><i class="el-icon-s-shop"></i>食堂管理</el-menu-item>
			<el-menu-item index="2"><i class="el-icon-dish"></i>订餐设置</el-menu-item>
			<el-menu-item index="3"><i class="el-icon-s-promotion"></i>配送管理</el-menu-item>
			<el-menu-item index="4"><i class="el-icon-s-order"></i>报表查询</el-menu-item>
			<el-menu-item index="5"><i class="el-icon-s-tools"></i>系统设置</el-menu-item> -->

			<el-menu-item v-for="item in menulist" :key="item.id" :index="item.id.toString()"><i :class="item.icon"></i>{{item.name}}</el-menu-item>

			<el-submenu index="6">
				<template slot="title"><i class="el-icon-user-solid"></i>用户信息</template>
				<el-menu-item index="6-1">个人信息</el-menu-item>
				<el-menu-item index="6-2">退出登录</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	export default {
		props: [
			"menulist"
		],
		watch: {
			menulist(nval) {
				this.activeIndex = this.menulist[0].id.toString();
			}
		},
		data: () => {
			return {
				activeIndex: '',
				index: ""
			}
		},
		methods: {
			//顶级菜单点击事件handleSelect(key, keyPath)
			handleSelect(key) {
				//console.log("head_nav", key);
				if (key == "6-2") {
					//退出登录事件
					this.$confirm('是否继续退出登录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$router.push({
							path: 'login'
						});
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '取消退出'
						});
					});

				} else if (key == "6-1") {
					this.index = key;
					this.$emit("mytopnav", this.index);
					this.$router.push({
						path: '/userinfo'
					});
				} else {
					this.index = key;
					this.$emit("mytopnav", this.index);
				}
			},
		}
	}
</script>

<style scoped>
	.nav_box {
		display: flex;
		flex-direction: row;
		color: #E6A23C;
	}

	.nav_tit {
		width: 20%;
	}

	.el-menu {
		width: 80%;
	}

	.el-menu-demo>.el-submenu:last-child {
		position: absolute;
		right: 0;
	}
</style>
