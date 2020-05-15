<template>
	<div class="userinfo_box">
		<el-form :model="ruleForm" status-icon hide-required-asterisk :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model.trim="ruleForm.username" :disabled="btn_show"></el-input>
			</el-form-item>
			<el-form-item label="电话" prop="phone">
				<el-input v-model.number="ruleForm.phone" :disabled="btn_show"></el-input>
			</el-form-item>
			<el-form-item label="年龄" prop="age">
				<el-input v-model.number="ruleForm.age" :disabled="btn_show"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-input v-model="ruleForm.sex" :disabled="btn_show"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email" :disabled="btn_show"></el-input>
			</el-form-item>
			<el-form-item label="爱好" prop="habit">
				<el-input v-model="ruleForm.habit" :disabled="btn_show"></el-input>
			</el-form-item>
			<!-- 对用户信息进行操作事件 -->
			<el-form-item v-if="btn_show">
				<el-button type="primary" @click="editForm()">编辑</el-button>
			</el-form-item>
			<el-form-item v-else>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button type="primary" @click="cancelForm()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			var checkUsername = (rule, value, callback) => {
				console.log("checkUsername", rule, value);
				if (!value) {
					return callback(new Error('用户名不能为空'));
				} else {
					callback();
				}
			};
			var checkSex = (rule, value, callback) => {
				console.log("checkSex", rule, value);
				if (!value) {
					return callback(new Error('性别不能为空'));
				} else {
					callback();
				}
			};
			var checkAge = (rule, value, callback) => {
				console.log("checkAge", rule, value);
				if (!value) {
					return callback(new Error('年龄不能为空'));
				} else {
					callback();
				}
			};
			var checkPhone = (rule, value, callback) => {
				console.log("checkPhone", rule, value);
				if (!value) {
					return callback(new Error('电话号码不能为空'));
				} else {
					callback();
				}
			};
			var checkEmail = (rule, value, callback) => {
				console.log("checkEmail", rule, value);
				if (!value) {
					return callback(new Error('邮箱不能为空'));
				} else {
					callback();
				}
			};
			var checkHabit = (rule, value, callback) => {
				console.log("checkHabit", rule, value);
				if (!value) {
					return callback(new Error('爱好不能为空'));
				} else {
					callback();
				}
			};
			return {
				btn_show: true,
				ruleForm: {
					username: "",
					phone: "",
					age: "",
					sex: "",
					email: "",
					habit: ""
				},
				rules: {
					username: [{
							validator: checkUsername,
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						}
					],
					phone: [{
							validator: checkPhone,
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^1[34578]\d{9}$/,
							message: '目前只支持中国大陆的手机号码'
						}
					],
					age: [{
						validator: checkAge,
						trigger: 'blur'
					}, ],
					sex: [{
							validator: checkSex,
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入性别',
							trigger: 'blur'
						},
					],
					email: [{
							validator: checkEmail,
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入邮箱',
							trigger: 'blur'
						},
						{
							pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
							message: '请输入正确邮箱'
						}
					],
					habit: [{
							validator: checkHabit,
							trigger: 'blur'
						},
						{
							required: true,
							message: '请输入爱好',
							trigger: 'blur'
						},
					],
				}
			};
		},
		created() {
			//获取用户信息
			this.getAxios("/userinfo", {

			}).then((res) => {
				console.log("userinfo", res);
				this.ruleForm.username = res.name;
				this.ruleForm.phone = res.phone;
				this.ruleForm.age = res.age;
				this.ruleForm.sex = res.sex;
				this.ruleForm.email = res.email;
				this.ruleForm.habit = res.habit;
			}).catch((res) => {
				console.log("error", res);
			});
		},
		methods: {
			//提交编辑后的数据
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm);
						//发起请求更新用户数据
						this.putAxios("/userinfo", {
							name: this.ruleForm.username,
							phone: this.ruleForm.phone,
							age: this.ruleForm.age,
							sex: this.ruleForm.sex,
							email: this.ruleForm.email,
							habit: this.ruleForm.habit
						}).then((res) => {
							//console.log("userinfo",res);
							this.btn_show = true;
							this.$notify({
								title: '提示',
								message: '更新用户信息成功',
								type: 'success',
								duration:'1500'
							});
						}).catch((res) => {
							console.log("error", res);
							this.btn_show = true;
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//点击编辑用户信息
			editForm() {
				this.btn_show = false;
			},
			//取消编辑
			cancelForm() {
				this.btn_show = true;
			}
		}
	}
</script>

<style>
	.userinfo_box {
		padding: 15px;
	}
</style>
