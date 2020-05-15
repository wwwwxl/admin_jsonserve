<template>
	<el-container>
			<el-aside width="200px">
				<roomtree :leftData="leftData" @leftTree="left_click"></roomtree>
			</el-aside>
			<el-main>
				<roomtable :tableData="tableData" :treeClickData="leftClick" @addData="addSuccess"></roomtable>
			</el-main>
	</el-container>
</template>
<!-- 用户主内容包含树状图和主要内容 -->
<script>
	import roomtree from './RoomTree.vue'
	import roomtable from './RoomTable.vue'
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
			roomtree,
			roomtable
		},
		created() {
			this.getallFloor();
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			//获取房间信息数据方法
			getallFloor(){
				this.getAxios("/roominfo", {
				}).then((res) => {
					console.log("roominfo", res);
					this.tableData=res;
					let left_list=[];
					let all_room={
						id:'10',
						label:'所有房间',
						roomName:'所有房间',
						children:[]
					}
					for(var i=0;i<res.length;i++){
						let room_obj={
							id:res[i].id,
							label:res[i].roomName,
							roomName:res[i].roomName,
							roomId:res[i].roomId,
							roomNo:res[i].roomNo,
							parentId:res[i].parentId,
							parentName:res[i].parentName,
							children:[]
						}
						all_room.children.push(room_obj);
					}
					left_list.push(all_room);
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
