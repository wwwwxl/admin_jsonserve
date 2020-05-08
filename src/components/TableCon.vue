<!-- 操作、表格、页码 -->
<template>
	<div class="subcon_box">
		<tabledialog :form="formdata" :dialogFormVisible="showflag" :operaName="btnName"  @dialogSubmit="tabsubmit" @dialogCancel="tabcancel"></tabledialog>
		<el-button-group>
			<el-button @click.native="addTab" size="mini" type="primary" icon="el-icon-circle-plus-outline">增加</el-button>
			<el-button @click.native="editTab" size="mini" type="warning" icon="el-icon-edit">修改</el-button>
			<el-button @click.native="delTab" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
		</el-button-group>
		<div class="subcon_table">
			<el-table
				:data="tableData"
				@row-click="showRow"
				@row-dblclick="dbHideShow"
				@current-change="radioSelect"
				highlight-current-row
				row-class-name="bodyrow_hei"
				stripe
				header-row-class-name="eltable_bg"
				border
				style="width: 100%"
				height="100%"
				fit
			>
				<el-table-column width="36" fixed center>
					<!-- 索引从零开始 ==给vue组件绑定事件时候，必须加上native-->
					<template slot-scope="scope">
						<el-radio v-model="radioObj.radioindex" :label="scope.$index"></el-radio>
					</template>
				</el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="90px" align="center" sortable fixed prop="id" label="id"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="90px" align="center" sortable fixed prop="floorleves" label="级别"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="90px" align="center" sortable fixed prop="floorId" label="楼层id"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="110px" align="center" sortable fixed prop="floorNo" label="楼层编号"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="floorName" label="楼层名称"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="parentId" label="父级id"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="parentName" label="父级名称"></el-table-column>
				<el-table-column label="操作" align="center">
					<!-- vue组件绑定事件时候，必须加上native ，否则会认为监听的是来自Item组件自定义的事件 -->
					<template slot-scope="scope">
						<el-button size="mini" @click.prevent.stop="editRow(scope.$index, scope.row)" type="text">编辑</el-button>
						<el-button class="btn_bg" @click.native.prevent.stop="deleteRow(scope.$index, tableData)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="subtable-page">
			<el-pagination
				background
				@size-change="pageSizeChange"
				@current-change="pageCurrentChange"
				:current-page="currentPage1"
				:page-sizes="[20, 30, 50, 100]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="600"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import tabledialog from './tableDialog.vue';
export default {
	name: 'submain',
	props:['tableData'],
	data() {
		return {
			showflag: false,
			btnName:'',
			formdata: {
				id:'',
				parentname: '',
				name: ''
			},
			addLeftTree: {
				left_id: '',
				left_name: ''
			},
			radioObj: {
				radioindex: '',
				radiocont: ''
			},
			currentPage1: 1
		};
	},
	components: {
		tabledialog
	},
	methods: {
		//行数据的 Key,//通过行数据获取选中行的索引
		showRow(row) {
			this.radioObj.radioindex = this.tableData.indexOf(row);
		},
		//当表格的当前行发生变化的时候会触发该事件,变化之后的对象数据
		radioSelect(val) {
			this.radioObj.radiocont = val;
		},
		//双击行事件获取对象
		dbHideShow(row) {
			let dbrowindex = this.tableData.indexOf(row);
			if (dbrowindex == this.radioObj.radioindex) {
				this.radioObj.radioindex = '';
			}
		},
		// 页码改变事件
		pageSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		pageCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		//表格操作删除数据(索引,表格数组数据)
		deleteRow(index, rows) {
			// rows.splice(index, 1);
			let id=rows[index].id;
			console.log('id',id,index,rows);
			//删除楼层科室数据
			this.delectAxios("floorinfo/"+id,{
				
			}).then((res)=>{
				console.log(res);
				this.$notify({
					title: '提示',
					message: '删除成功',
					type: 'success',
					duration:'1000'
				});
			}).catch((error)=>{
				console.log(error);
			});
		},
		//表格操作编辑行事件
		editRow(index, rows) {
			this.formdata.id=rows.floorId;
			this.formdata.parentname=rows.parentName;
			this.formdata.name=rows.floorName;
			this.showflag = true;
		},
		//左侧树点击事件,监听子组件传递过来的对象
		leftTree() {
			this.bus.$on('leftTree', value => {
				this.addLeftTree.left_id = value.id;
				this.addLeftTree.left_name = value.label;
				
				this.formdata.id=value.id;
				this.formdata.parentname = value.label;
			});
		},
		//表格头操作事件
		addTab() {
			//组件销毁前需要解绑事件。否则会出现重复触发事件的问题
			this.bus.$off('leftTree');
			this.leftTree();
			if (this.addLeftTree.left_id == '') {
				this.$message({
					showClose: true,
					message: '请在左侧树状图选择一个父级',
					duration: '1500'
				});
			} else {
				console.log('this.addLeftTree',this.addLeftTree);
				this.formdata.parentname=this.addLeftTree.left_name;
				this.btnName="增加楼层科室信息",
				this.showflag = true;
			}
		},
		//表格头编辑事件
		editTab() {
			//0和'空'默认相等
			if (this.radioObj.radioindex === '') {
				this.$message({
					showClose: true,
					message: '请选择需要编辑的行数据',
					type: 'warning',
					duration: '1500'
				});
			} else {
				console.log('this.radioObj',this.radioObj);
				this.formdata.id=this.radioObj.radiocont.floorId;
				console.log('this.formdata.id',this.formdata.id);
				this.formdata.parentname=this.radioObj.radiocont.parentName;
				this.formdata.name=this.radioObj.radiocont.floorName;
				this.btnName="编辑楼层科室信息",
				this.showflag = true;
			}
		},
		//表格头删除事件
		delTab() {
			if (this.radioObj.radioindex == '') {
				this.$message({
					showClose: true,
					message: '请选择需要删除的行数据',
					type: 'error',
					duration: '1500'
				});
			} else {
				this.deleteRow(this.radioObj.radioindex, this.tableData);
			}
		},
		//弹出框表格提交
		tabsubmit(val) {
			//需要提交到服务器数据
			console.log('val',val);
			//往服务器写入数据
			if(this.btnName=="增加楼层科室信息"){
				let floorid=val.id+''+parseInt(Math.random(0,1)*100);
				let children_arr=[];
				
					this.postAxios("floorinfo/",{
							"id":floorid,
							"floorleves":val.id.length/2,
							"floorId": floorid,
							"floorNo": floorid,
							"label": val.name,
							"floorName":val.name,
							"parentId": val.id,
							"parentName":val.parentname,
							"children": [],
							
					}).then((res)=>{
						//console.log(res);
						this.$notify({
							title: '提示',
							message: '增加楼层信息成功',
							type: 'success',
							duration:'1500'
						});
						this.$emit("addData");
					}).catch((error)=>{
						console.log("error",error);
					})
				
	
			}else{
				let floorid=val.id+''+parseInt(Math.random(0,1)*100);
				let children_arr=[];
				//发起请求更新编辑楼层科室信息
				this.putAxios("/floorinfo/"+val.id, {
					"id":floorid,
					"floorleves":val.id.length/2,
					"floorId": floorid,
					"floorNo": floorid,
					"label": val.name,
					"floorName":val.name,
					"parentId": val.id,
					"parentName":val.parentname,
					"children": [],
				}).then((res) => {
					//console.log("userinfo",res);
					this.$notify({
						title: '提示',
						message: '更新楼层科室信息成功',
						type: 'success',
						duration:'1500'
					});
					//刷新组件
					this.$emit("addData");
				}).catch((res) => {
					console.log("error", res);
				});
			}
			this.showflag = false;
		},
		//弹出框取消提交
		tabcancel() {
			this.showflag = false;
		}
	}
};
</script>

<style>
.subcon_box {
	width: 100%;
	min-width: 630px;
	height: 100%;
	position: relative;
}
.el-button-group{
	display: block;
}
.el-button-group .el-button {
	height: 32px;
}
.eltable_bg > th {
	background-color: #fafafa;
}
.eltable_bg > th {
	padding: 0px;
}
.bodyrow_hei > td {
	padding: 0px;
}
.subcon_table {
	width: 100%;
	height: calc(100% - 64px);
	height: -moz-calc(100% - 64px);
	height: -webkit-calc(100% - 64px);
}
.subtable-page {
	width: 100%;
	height: 32px;
}
/* 删除按钮颜色 */
.btn_bg {
	color: #f56c6c;
	font-weight: bold;
}
</style>
