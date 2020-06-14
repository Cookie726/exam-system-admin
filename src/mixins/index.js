import {
    updateStatus
} from "@/api/userManage"

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
        handleDelete(idList) {
            const data = {
                idList,
                status: 2,
            };
            updateStatus(data).then(res => {
                if (res.code === 0) {
                    window.ELEMENT.Message.success("禁用成功")
                    this.loadData(this.param)
                }
            });
        },
        startUser(idList) {
            const data = {
                idList,
                status: 1,
            };
            updateStatus(data).then(res => {
                if (res.code === 0) {
                    window.ELEMENT.Message.success("启用成功")
                    this.loadData(this.param)
                }
            });
        },
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