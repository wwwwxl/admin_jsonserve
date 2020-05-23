<template>
	<el-container>
			<el-aside width="200px">
				<settree :leftData="leftData" @leftTree="left_click"></settree>
			</el-aside>
			<el-main>
				<settable :tableData="tableData" :treeClickData="leftClick" @addData="addSuccess"></settable>
			</el-main>
	</el-container>
</template>
<!-- 用户主内容包含树状图和主要内容 -->
<script>
	import settree from './SetTree.vue'
	import settable from './SetTable.vue'
	export default {
		name: 'maincon',
		data: () => {
			return {
				tableData:[],
				leftData:[],
				leftClick:''
			}
		},
		components: {
			settree,
			settable
		},
		created() {
			this.getallFloor();
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			//获取床位信息数据方法
			getallFloor(){
				this.getAxios("/foodinfo", {
				}).then((res) => {
					console.log("foodinfo", res);
					this.tableData=res;
					let left_list=[];
					let all_bed={
						id:'10',
						label:'所有食堂',
						name:'所有食堂',
						num:"10",
						children:[]
					}
					for(var i=0;i<res.length;i++){
						let bed_obj={
							id:res[i].id,
							label:res[i].canteenName,
							canteenId:res[i].canteenId,
							canteenName:res[i].canteenName,
							canteenNo:res[i].canteenNo,
							menuId:res[i].menuId,
							menuName:res[i].menuName,
							whetherOrder:res[i].whetherOrder,
							pubMenuType: res[i].pubMenuType,
							orderStart: res[i].orderStart,
							orderStop: res[i].orderStop,
							whetherBack:res[i].whetherBack,
							backStop: res[i].backStop
						}
						all_bed.children.push(bed_obj);
					}
					left_list.push(all_bed);
					this.leftData=left_list;
				}).catch((res) => {
					console.log("error", res);
				});
			},
			//增加数据\更新数据成功
			addSuccess(){
				this.getallFloor();
			},
			//左侧树点击事件
			left_click(val){
				console.log('val',val);
				this.leftClick=val;
			}
		}

	}
</script>

<style  scoped>
	.el-container {
		height: 100%;
	}

	.el-aside {
		color: #333;
		text-align: center;
		border-right: 1px solid gainsboro;
		box-sizing: border-box;
	}

	.el-main {
		color: #333;
		text-align: center;
		padding:0px;
	}

	/* 树状 */
	.el-tree-node__content {
		display: flex;
		flex-direction: row;
	}
</style>
