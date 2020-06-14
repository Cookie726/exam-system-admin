export const validateSignupForm = function (form) {
    for (const key in form) {
        const value = form[key];
        if (value === "") {
            window.ELEMENT.Message.error("输入值不能为空")
            return false
        }
    }
    if (!(/^\d{10}$/).test(form.sno)) {
        window.ELEMENT.Message.error("请输入正确格式的学号")
        return false
    }
    if (form.password !== form.confirmPwd) {
        window.ELEMENT.Message.error("两次密码不相同")
        return false
    }
    return true
};

export const validateSigninForm = function (form) {
    if (!form.sno || !form.password) {
        window.ELEMENT.Message.error("输入值不能为空")
        return false
    } else if (!(/^\d{10}$/).test(form.sno)) {
        window.ELEMENT.Message.error("请输入正确格式的学号")
        return false
    } else {
        return true
    }
}

export const isSetAnswer = function (answerList) {
    return answerList.some(val => val.status === 1)
}

export const validateUpdatePaperInfo = function (updatePaperInfo) {
    try {
        if (!updatePaperInfo.paper.title || !updatePaperInfo.paper.classify || !updatePaperInfo.paper.startTime || !updatePaperInfo.paper.endTime || updatePaperInfo.studentIdList.length === 0) {
            return false
        } else {
            return true
        }
    } catch {
        return false
    }
}