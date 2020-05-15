<template>
	<div class="location">
		<transition name="alertinfo" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
			<alert v-if="alertinfo" :message="alertinfo"></alert>
		</transition>
		<div class="container well" style="width: 100%;">
			<form class="form-signin">
				<h2 class="form-signin-heading">请登录</h2>

				<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
				<label for="inputName" class="sr-only">用户名</label>
				<input type="text" id="inputName" class="form-control" placeholder="请输入用户名" required="" autofocus="" v-model="userinfo.username">


				<span class="glyphicon glyphicon-comment" aria-hidden="true"></span>
				<label for="inputEmail" class="sr-only">邮件地址</label>
				<input type="email" id="inputEmail" class="form-control" placeholder="请输入邮件地址" required="" autofocus="" v-model="userinfo.useremail">


				<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
				<label for="inputPassword" class="sr-only">密码</label>
				<input type="password" id="inputPassword" class="form-control" placeholder="请输入密码" required="" v-model="userinfo.password">

				<div class="checkbox">
					<label>
						<input type="checkbox" value="remember-me">记住我
					</label>
				</div>
				<button class="btn btn-lg btn-primary btn-block" @click="submit">登录</button>
			</form>
		</div>
	</div>
</template>

<script>
	import alert from "./alert.vue"
	export default {
		name: 'login',
		props: {
			msg: String
		},
		data: () => {
			return {
				alertinfo: "",
				userinfo: {
					username: "",
					useremail: "",
					password: ""
				}
			}
		},
		components: {
			alert
		},
		beforeCreate() {
			document.querySelector('body').setAttribute('style', 'background-color: #393D49;')
		},
		beforeDestroy() {
			document.querySelector('body').removeAttribute('style')
		},
		methods: {
			submit() {
				//console.log("登录");
				if (this.userinfo.username == "") {
					this.alertinfo = "请输入用户名";
					this.setShowTime();
				} else if (this.userinfo.useremail == "") {
					this.alertinfo = "请输入用户邮箱";
					this.setShowTime();
				} else if (this.userinfo.password == "") {
					this.alertinfo = "请输入用户密码";
					this.setShowTime();
				} else {
					
					$.ajax({
						url: "http://localhost:3000/userinfo",
						async: false, //改为同步避免运行跳过(一定要是同步不然会获取不到数据)
						dataType: 'json',
						type: "get",
						xhrFields: {
							withCredentials: true
						},
						data: "",
						beforeSend: function() {

						},
						complete: function() {

						},
						success: (res)=> {
							sessionStorage.setItem('islogin', 1);
							this.$router.push({
								path: '/homelatout'
							});
						}

					})
					
				}
			},
			setShowTime() {
				setTimeout(() => {
					this.alertinfo = "";
				}, 2000)
			}
		}
	}
</script>

<style scoped>
	.location {
		position: relative;
		top: 200px;
		width: 40%;
		height: auto;
		margin: 0 auto;
	}
</style>
