<!-- 操作、表格、页码 -->
<template>
	<div class="subcon_box">
		<!-- 弹框 -->
		<setdialog :form="formdata" :dialogFormVisible="showflag" :operaName="btnName" :labelName="label_name"  @dialogSubmit="tabsubmit" @dialogCancel="tabcancel"></setdialog>
		<!-- 按钮操作组 -->
		<el-button-group>
			<el-button @click.native="addTab" size="mini" type="primary" icon="el-icon-circle-plus-outline">增加</el-button>
			<el-button @click.native="editTab" size="mini" type="warning" icon="el-icon-edit">修改</el-button>
			<el-button @click.native="delTab" size="mini" type="danger" icon="el-icon-delete">删除</el-button>
		</el-button-group>
		<!-- 表格内容 -->
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
				<el-table-column resizable show-overflow-tooltip min-width="120px" align="center" sortable fixed prop="canteenName" label="食堂名称"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="menuId" label="餐别id"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="menuName" label="餐别名称"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="whetherOrder" label="是否可订餐"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="120px" align="center" prop="pubMenuType" label="菜谱发布方式"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="orderStart" label="订餐开始"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="orderStop" label="订餐截止"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="whetherBack" label="是否可退"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="backStop" label="退餐截止"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="canteenId" label="食堂id"></el-table-column>
				<el-table-column resizable show-overflow-tooltip min-width="100px" align="center" prop="canteenNo" label="食堂编号"></el-table-column>
				<el-table-column label="操作" align="center" min-width="100px">
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
import setdialog from './SetDialog.vue';
export default {
	name: 'submain',
	props:['tableData','treeClickData'],
	data() {
		return {
			showflag: false,
			btnName:'',
			label_name:[
				{id:'1',label:'父级名称'},
				{id:'2',label:'餐别名称'}
			],
			formdata:{
				id:'',
				name:'',
				SchedulType:'按周循环排班',
				parentname:'',
				nameId:'',
				remark:'',
				distribuType:[]
			},
			radioObj: {
				radioindex: '',
				radiocont: ''
			},
			currentPage1: 1
		};
	},
	components: {
		setdialog
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
		//表格操作删除数据(索引,表格数组数据)\删除房间信息
		deleteRow(index, rows) {
			let id=rows[index].id;
			let url="canteeninfo/"+id;
			let params=null;
			this.delAjax(url,params).then((res)=>{
				this.$notify({
					title: '提示',
					message: '删除成功',
					type: 'success',
					duration:'1000'
				});
				this.$emit("addData");//将删除事件成功抛出，使其更新数据
			}).catch((error)=>{
				console.log('error',error);
			})
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
		//表格操作编辑行事件
		editRow(index, rows) {
			let distri_bute=[];
			if(rows.distribu=="是"){
				distri_bute.push("配送");
			}
			if(rows.inDinner=="是"){
				distri_bute.push("堂食");
			}
			if(rows.myTake=="是"){
				distri_bute.push("自取");
			}
			//设置弹框多选
			let form_data={
				id:rows.id,
				nameId:rows.id,
				name:rows.canteenName,
				parentname:rows.parentName,
				SchedulType:rows.SchedulType,
				remark:rows.remark,
				distribuType:distri_bute
			}
			this.formdata=form_data;
			this.showflag = true;
		},
		//表格头编辑事件//0和'空'默认相等
		editTab() {
			console.log('this.radioObj',this.radioObj);
			if (this.radioObj.radiocont == null||this.radioObj.radiocont=="") {
				this.$message({
					showClose: true,
					message: '请选择需要编辑的行数据',
					type: 'warning',
					duration: '1500'
				});
			} else {
				let distri_bute=[];
				if(this.radioObj.radiocont.distribu=="是"){
					distri_bute.push("配送");
				}
				if(this.radioObj.radiocont.inDinner=="是"){
					distri_bute.push("堂食");
				}
				if(this.radioObj.radiocont.myTake=="是"){
					distri_bute.push("自取");
				}
				let form_data={
					id:this.radioObj.radiocont.id,
					nameId:this.radioObj.radiocont.id,
					name:this.radioObj.radiocont.canteenName,
					parentname:this.radioObj.radiocont.parentName,
					SchedulType:this.radioObj.radiocont.SchedulType,
					remark:this.radioObj.radiocont.remark,
					distribuType:distri_bute
				}
				this.formdata=form_data;
				this.btnName="编辑餐别信息",
				this.showflag = true;
			}
		},
		//表格头操作事件
		addTab() {
				if (this.treeClickData == "") {
					this.$message({
						showClose: true,
						message: '请在左侧树状图选择一个父级',
						duration: '1500'
					});
				}else if(this.treeClickData.id !="10" ){
					this.$message({
						showClose: true,
						message: '只能添加一级餐别',
						duration: '1500'
					});
				} else {
					//传递数据给弹框并显示
					this.formdata.id=this.treeClickData.id;
					this.formdata.parentname=this.treeClickData.label;
					this.btnName="增加餐别信息",
					this.showflag = true;
				}
		},
		//弹出框表格提交往服务器写入数据
		tabsubmit(val) {
			if(this.btnName=="增加餐别信息"){
				let id=val.id+''+parseInt(Math.random(0,1)*10000);
				let children_arr=[];
					//ajax请求方法
					let url="canteeninfo";
					//弹框多选数组
					let distribu_type=val.distribuType;
					let distribu_obj={
						distribu:"否",
						myTake:"否",
						inDinner:"否"
					}
					for(var i=0;i<distribu_type.length;i++){
						if(distribu_type[i]=="配送"){
							distribu_obj.distribu="是";
						}
						if(distribu_type[i]=="堂食"){
							distribu_obj.myTake="是";
						}
						if(distribu_type[i]=="自取"){
							distribu_obj.inDinner="是";
						}
					}
					let params={
								"canteenNo": id,
								"canteenName":val.name,
								"SchedulType":val.SchedulType,
								"labelImg":"",
								"remark":val.remark,
								"id": id,
								"parentId": val.id+"01",
								"parentName":val.parentname,
								"distribu":distribu_obj.distribu,
								"myTake":distribu_obj.myTake,
								"inDinner":distribu_obj.inDinner,
								"children": []
					}
					this.pushAjax(url,params).then((res)=>{
							this.$notify({
								title: '提示',
								message: '增加餐别信息成功',
								type: 'success',
								duration:'1500'
							});
							this.$emit("addData");
					}).catch((error)=>{
						console.log('error',error);
					})
			//编辑事件更新数据库数据\axios请求方法
			}else{
				console.log('val',val);
				let distri_bute="否";
				let in_dinner="否";
				let my_take="否";
				val.distribuType.forEach((val)=>{
					if(val=="配送"){
						distri_bute="是"
					}
					if(val=="堂食"){
						in_dinner="是"
					}
					if(val=="自取"){
						my_take="是"
					}
				})
				let id=val.id+''+parseInt(Math.random(0,1)*10000);
				let children_arr=[];
				this.putAxios("/canteeninfo/"+val.id, {
					"id":id,
					"leves":'1',
					"canteenId": val.nameId,
					"canteenNo": val.nameId,
					"label": val.name,
					"canteenName":val.name,
					"canteenType":val.canteenType,
					"parentId": '1001',
					"parentName":val.parentname,
					"SchedulType":val.SchedulType,
					"distribu":distri_bute,
					"myTake":my_take,
					"inDinner":in_dinner,
					"remark":val.remark,
					"children": [],
				}).then((res) => {
					//console.log("userinfo",res);
					this.$notify({
						title: '提示',
						message: '更新餐别信息成功',
						type: 'success',
						duration:'1500'
					});
					//刷新组件
					this.radioObj.radioindex = '';
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
