<template>
	<el-dialog :title="operaName" :visible.sync="dialogFormVisible" :before-close="dialogCancel">
		<el-form :model="form" ref="form">
			<el-form-item :label="labelName[0].label" :label-width="formLabelWidth" prop="parentname" :rules="[{ required: true, message: '父级名称不能为空', trigger: 'blur' }]">
				<el-input v-model="form.parentname" autocomplete="off" disabled></el-input>
			</el-form-item>
			<el-form-item :label="labelName[1].label" :label-width="formLabelWidth" prop="name" :rules="[{ required: true, message: '名称不能为空', trigger: 'blur' }]">
				<el-input v-model="form.name" autocomplete="off" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="订餐时间" :label-width="formLabelWidth">
				<el-col :span="11">
					<el-time-picker placeholder="开始时间" v-model="form.startdate" style="width: 100%;"></el-time-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker placeholder="结束时间" v-model="form.stopdate" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="菜谱发布" :label-width="formLabelWidth">
					<div class="menu_pub">
						<el-radio label="按周循环发布" class="publish_radio"></el-radio>
						<span>配制一周的菜谱，并且每周按照该菜谱进行周循环</span>
					</div>
					<div class="menu_pub">
						<el-radio label="按周单独发布" class="publish_radio"></el-radio>
						<span>仅可以在菜谱中配制本周的菜谱以及下周的菜谱，不循环</span>
					</div>
			</el-form-item>
			<el-form-item label="是否可订餐" :label-width="formLabelWidth">
				<el-radio-group v-model="form.whetherOrder" class="radio_box">
					<el-radio label="是"></el-radio>
					<el-radio label="否"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="是否可退餐" :label-width="formLabelWidth">
				<el-radio-group v-model="form.backOrder" class="radio_box">
					<el-radio label="是"></el-radio>
					<el-radio label="否"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="退餐截止时间" :label-width="formLabelWidth">
				<el-col :span="11">
					<el-time-picker placeholder="截止时间" v-model="form.valtime" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogCancel">取 消</el-button>
			<el-button type="primary" @click="dialogSubmit('form')">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		// 提交内容\是否显示\操作标题名\输入标题名
		props: ['form', 'dialogFormVisible', 'operaName', 'labelName'],
		data() {
			return {
				formLabelWidth: '120px'
			};
		},
		methods: {
			//提交事件
			dialogSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('this.form', this.form);
						this.$emit("dialogSubmit", this.form);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//取消事件
			dialogCancel() {
				this.$emit("dialogCancel");
			}
		}
	};
</script>

<style scoped lang="scss">
	.radioSty {
		position: absolute;
		left: 0px;
		top: 13px;
	}
	.menu_pub{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.publish_radio{
			position: relative;
			top: 13px;
		}
	}
	.distribu {
		position: absolute;
		left: 0;
	}
	.radio_box{
		position: absolute;
		left: 0;
		top: 13px;
	}
</style>
