/**
 * 需要做表格
 */
export const pageMixin = {
    created() {
    },
    data() {
        return {
            params: {
              pageSize: 10, // 每页显示条目个数
              page: 1 // 当前页数
            },
            page_sizes: [10, 25, 50, 100], // 每页显示条目
            // page_sizes: [1, 2, 5, 10], // 每页显示条目
            total: 0 // 总共多少页
        }
    },
    methods: {
      // 每页显示条目改变
      handleSizeChange(val) {
        this.params.pageSize = val
      },
        // 跳转页面
        handleCurrentChange(val) {
        },
    }
}
