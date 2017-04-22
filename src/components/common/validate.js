// 表单验证
class FormValidate {
	constructor(ValidateObj, err) {
		this.ValidateObj = ValidateObj;
		this.errObj = err;
	}
	isRequire() {

		for (let [
				key,
				value
			] of Object.entries(this.ValidateObj)) {
			// return !value.trim() ? this.errObj[key] : null
			if (!value) {
				return this.errObj[key]
			}
		}
	}
}

export default FormValidate;