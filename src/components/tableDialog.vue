<template>
	<el-dialog :title="operaName" :visible.sync="dialogFormVisible">
		<el-form :model="form" ref="form">
			<el-form-item label="父级楼层" :label-width="formLabelWidth" prop="parentname" :rules="[{ required: true, message: '父级楼层不能为空', trigger: 'blur' }]">
				<el-input v-model="form.parentname" autocomplete="off" disabled></el-input>
			</el-form-item>
			<el-form-item label="楼层名称" :label-width="formLabelWidth" prop="name" :rules="[{ required: true, message: '楼层名称不能为空', trigger: 'blur' }]">
				<el-input v-model="form.name" autocomplete="off"></el-input>
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
		props: ['form', 'dialogFormVisible', 'operaName'],
		data() {
			return {
				formLabelWidth: '120px'
			};
		},
		methods: {
			dialogSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$emit("dialogSubmit",this.form);
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			dialogCancel() {
				this.$emit("dialogCancel");
			}
		}
	};
</script>
