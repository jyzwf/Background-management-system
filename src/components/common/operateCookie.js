//操作cookie

// function getCookie(cname) { //获取token
// 	var name = cname + "=";
// 	var ca = document.cookie.split(';');
// 	for (var i = 0; i < ca.length; i++) {
// 		var c = ca[i].trim();
// 		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
// 	}
// 	return "";
// }

// function setCookie(cname, cvalue, min) { //设置cookie
// 	var d = new Date();
// 	d.setTime(d.getTime() + (min * 60 * 60 * 1000));
// 	var expires = "expires=" + d.toGMTString();
// 	document.cookie = cname + "=" + cvalue + "; " + expires;
// }



class OperatorCookie {
	setCookie(name, value, expiredays) { //设置cookie
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = `${name}=${escape(value)};expires=${exdate.toGMTString()}`;

		return this;
	}

	getCookie(name) {
		//获取cookie
		let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if (arr = document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	}

	deleteCookie(name) {
		//删除cookie
		let exdate = new Date();
		exdate.setTime(exdate.getTime() - 100);

		document.cookie = `${name}=v;expires=${exdate.toGMTString()}`;
		return this;
	}
}

export default new OperatorCookie()