<template>
	<el-container>
			<el-aside width="200px">
				<bedtree :leftData="leftData" @leftTree="left_click"></bedtree>
			</el-aside>
			<el-main>
				<bedtable :tableData="tableData" :treeClickData="leftClick" @addData="addSuccess"></bedtable>
			</el-main>
	</el-container>
</template>
<!-- 用户主内容包含树状图和主要内容 -->
<script>
	import bedtree from './BedTree.vue'
	import bedtable from './BedTable.vue'
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
			bedtree,
			bedtable
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
				this.getAxios("/bedinfo", {
				}).then((res) => {
					console.log("bedinfo", res);
					this.tableData=res;
					let left_list=[];
					let all_bed={
						id:'10',
						label:'所有床位',
						bedName:'所有床位',
						children:[]
					}
					for(var i=0;i<res.length;i++){
						let bed_obj={
							id:res[i].id,
							label:res[i].bedName,
							bedName:res[i].bedName,
							bedId:res[i].bedId,
							bedNo:res[i].bedNo,
							parentId:res[i].parentId,
							parentName:res[i].parentName,
							children:[]
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

<style scoped>
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
