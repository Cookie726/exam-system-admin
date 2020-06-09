export const userManageMixin = {
    data() {
        return {
            total: 0,
            userList: [],
            param: {
                currentPage: 1,
                limit: 10,
                status: 1
            },
        }
    },
    mounted() {
        this.initList()
    },
    methods: {
        initList() {
            this.loadData(this.param)
        },
        loadData() {},
        handleCurrentChange(val) {
            this.param.currentPage = val;
            this.loadData(this.param)
        },
        handleSizeChange(val) {
            this.param.limit = val;
            this.loadData(this.param)
        },
        handleSearch() {
            if (!(this.param.userName || this.param.sno)) {
                window.ELEMENT.Message.warning("查询条件不能为空");
                return;
            }
            this.loadData(this.param)
        },
        resetForm() {
            this.param.userName = "";
            this.param.sno = "";
            this.loadData(this.param)
        },
    }
}