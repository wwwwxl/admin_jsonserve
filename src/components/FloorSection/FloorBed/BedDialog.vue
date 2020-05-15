<template>
	<el-dialog :title="operaName" :visible.sync="dialogFormVisible" :before-close="dialogCancel">
		<el-form :model="form" ref="form">
			<el-form-item :label="labelName[0].label" :label-width="formLabelWidth" prop="parentname" :rules="[{ required: true, message: '父级名称不能为空', trigger: 'blur' }]">
				<el-input v-model="form.parentname" autocomplete="off" disabled></el-input>
			</el-form-item>
			<el-form-item :label="labelName[1].label" :label-width="formLabelWidth" prop="name" :rules="[{ required: true, message: '名称不能为空', trigger: 'blur' }]">
				<el-input v-model="form.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="床位性质" :label-width="formLabelWidth">
				<el-radio-group v-model="form.nature" size="small">
					<el-radio label="加编" ></el-radio>
					<el-radio label="在床" ></el-radio>
				</el-radio-group>
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

<style scoped>
	
		
</style>
