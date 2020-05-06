export const userManageMixin = {
    data() {
        return {
            tableData: {
                list: [],
                total: 0,
            },
            multipleSelection: [],
            param: {
                page: 1,
                limit: 10,
            },
        }
    },
    watch: {
        param: {
            deep: true,
            handler: "loadData"
        }
    },
    created() {
        this.initList()
    },
    methods: {
        initList() {
            this.loadData()
        },
        loadData() {},
        handleSelectionChange(val) {
            this.multipleSelection = val.map(stu => stu.sno);
            console.log(this.multipleSelection)
        },
    }
}