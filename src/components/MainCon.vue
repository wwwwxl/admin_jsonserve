<template>
	<el-container>
			<el-aside width="200px">
				<leftnavtree :leftData="leftData"></leftnavtree>
			</el-aside>
			<el-main>
				<tablecon :tableData="tableData" @addData="addSuccess"></tablecon>
			</el-main>
	</el-container>
</template>
<!-- 用户主内容包含树状图和主要内容 -->
<script>
	import leftnavtree from './MainConLeftTreeEle.vue'
	import tablecon from './TableCon.vue'
	export default {
		name: 'maincon',
		data: () => {
			return {
				tableData:[],
				leftData:[]
			}
		},
		components: {
			leftnavtree,
			tablecon
		},
		created() {
			this.getallFloor();
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			//获取数据方法
			getallFloor(){
				//获取楼层科室信息
				this.getAxios("/floorinfo", {
				
				}).then((res) => {
					console.log("floorinfo", res);
					//对返回的数据进行重构
					let newtableData=[];
					let newleftData=[];
					let new_left_obj={
						id:"10",
						floorId:"10",
						label:"所有楼层",
						children:[]
					}
					newleftData.push(new_left_obj);
					let morechildren=[];
					for(var i=0;i<res.length;i++){
						let left_obj={
							id:res[i].id,
							floorId:res[i].floorId,
							label:res[i].floorName,
							children:res[i].children
						}
						let table_obj={
							id:res[i].id,
							floorleves:res[i].floorleves,
							floorId:res[i].floorId,
							floorNo:res[i].floorNo,
							floorName:res[i].floorName,
							parentId:res[i].parentId,
							parentName:res[i].parentName,
						}
						newtableData.push(table_obj);
						newleftData[0].children.push(left_obj);
						let current_children=res[i].children;
						console.log('current_children',current_children);
						if(current_children !== 'undefined'&& current_children !== undefined){
							for(var j=0;j<current_children.length;j++){
								let sub_obj={
									floorleves:current_children[j].floorleves,
									floorId:current_children[j].floorId,
									floorNo:current_children[j].floorNo,
									floorName:current_children[j].floorName,
									parentId:current_children[j].parentId,
									parentName:current_children[j].parentName
								}
								newtableData.push(sub_obj);
							}
						}
						
					}
					this.tableData=newtableData;
					this.leftData=newleftData;
					
					
				}).catch((res) => {
					console.log("error", res);
				});
			},
			//增加数据\更新数据成功
			addSuccess(){
				this.getallFloor();
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
