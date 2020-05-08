<template>
	<el-tree :data="leftData" :props="defaultProps" accordion @node-click="handleNodeClick" highlight-current default-expand-all>
	</el-tree>
</template>

<script>
	export default {
		props:['leftData'],
		data() {
			return {
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			};
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
				this.bus.$emit("leftTree", data);
			}
		}
	};
</script>

<style>

</style>
