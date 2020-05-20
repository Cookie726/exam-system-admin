export const validateSignupForm = function (form) {
    for (const key in form) {
        const value = form[key];
        if (value === "") {
            this.$message.error("输入值不能为空")
            return false
        }
    }
    if (!(/^\d{10}$/).test(form.sno)) {
        this.$message.error("请输入正确格式的学号")
        return false
    }
    if (form.password !== form.confirmPwd) {
        this.$message.error("两次密码不相同")
        return false
    }
    return true
};

export const validateSigninForm = function (form) {
    if (!form.sno || !form.password) {
        this.$message.error("输入值不能为空")
        return false
    } else if (!(/^\d{10}$/).test(form.sno)) {
        this.$message.error("请输入正确格式的学号")
        return false
    } else {
        return true
    }
}

export const isSetAnswer = function (answerList) {
    return answerList.some(val => val.status === 1)
}