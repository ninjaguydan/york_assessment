const xbox = document.getElementById("x-box")
const form2 = document.getElementById("form-2")
const message = document.getElementById("msg")
const form1 = document.getElementById("form-1")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const uid = document.getElementById("uid")
const bday = document.getElementById("bday")
const num = document.getElementById("num")
let errors = {
	uid: {
		status: true,
		message: "Invalid User ID",
	},
	fname: {
		status: true,
		message: "Invalid First Name",
	},
	lname: {
		status: true,
		message: "Invalid Last Name",
	},
	bday: {
		status: true,
		message: "Invalid Birthday",
	},
}

function displayX(num) {
	num < 0 ? (num = 0) : (num = num)
	let x = ""
	for (let i = 1; i <= num; i++) {
		x = x.padStart(i, "x")
		xbox.innerHTML += x + "<br>"
	}
}
form2.addEventListener("submit", (e) => {
	e.preventDefault()
	xbox.innerHTML = null
	displayX(num.value)
})

function checkLength(str, min = 2, max = 12) {
	if (!str.length || str.length < min || str.length > max) {
		return false
	} else {
		return true
	}
}
function dateDiff(birthday) {
	const today = new Date()
	const bday = new Date(birthday)
	const daysAlive = Math.floor((today - bday) / 86400000)
	const over18 = daysAlive > 6570
	return {
		daysAlive,
		over18,
	}
}
function validateUser(value) {
	if (!checkLength(value, 8, 12)) {
		return false
	}
	let [uppercase, lowercase, num] = [false]
	for (let i = 0; i < value.length; i++) {
		if (Number.isInteger(parseInt(value[i]))) {
			if (num !== true) {
				num = true
			}
			continue
		}
		if (value[i].toUpperCase() === value[i]) {
			if (uppercase !== true) {
				uppercase = true
			}
		}
		if (value[i].toLowerCase() === value[i]) {
			if (lowercase !== true) {
				lowercase = true
			}
		}
	}
	if (!uppercase || !lowercase || !num) {
		return false
	} else {
		return true
	}
}
function validateField(element, element_id) {
	if (element_id === "uid") {
		validateUser(element.value) ? (errors[element_id].status = false) : (errors[element_id].status = true)
		return
	}
	checkLength(element.value) ? (errors[element_id].status = false) : (errors[element_id].status = true)
}
function displayError(element, element_id, message, status) {
	if (status) {
		element.classList.add("error")
		document.querySelector(`#${element_id} + strong`).innerHTML = message
	} else {
		element.classList.remove("error")
		document.querySelector(`#${element_id} + strong`).innerHTML = null
	}
}
function displayPass(element, element_id, status) {
	if (!status) {
		document.querySelector(`#${element_id} ~ span`).style.display = "inline-block"
	} else {
		element.classList.remove("error")
		document.querySelector(`#${element_id} ~ span`).style.display = "none"
	}
}

fname.addEventListener("blur", () => {
	validateField(fname, "fname")
	displayPass(fname, "fname", errors.fname.status)
	displayError(fname, "fname", errors.fname.message, errors.fname.status)
})
lname.addEventListener("blur", () => {
	validateField(lname, "lname")
	displayPass(lname, "lname", errors.lname.status)
	displayError(lname, "lname", errors.lname.message, errors.lname.status)
})
uid.addEventListener("blur", () => {
	validateField(uid, "uid")
	displayPass(uid, "uid", errors.uid.status)
	displayError(uid, "uid", errors.uid.message, errors.uid.status)
})
bday.addEventListener("blur", () => {
	validateField(bday, "bday")
	displayError(bday, "bday", errors.bday.message, errors.bday.status)
})
form1.addEventListener("submit", (e) => {
	e.preventDefault()
	for (let key in errors) {
		if (errors[key].status) {
			displayError(document.getElementById(key), key, errors[key].message, errors[key].status)
		}
	}
	// violating DRY rule here
	for (let key in errors) {
		if (errors[key].status) {
			return
		}
	}
	message.innerHTML = `Congrats, ${fname.value}! You've been breathing for ${dateDiff(bday.value).daysAlive} days! `
	if (!dateDiff(bday.value).over18) {
		message.innerHTML += `You're probably not old enough to take this class...`
	}
})

//========== TEST FUNCTIONS ==========//
function test_check_length_pass() {
	const str = "danboy"
	const expected = true
	const result = checkLength(str)
	if (result !== expected) {
		console.log(`checkLength faild. '${str}' should return ${expected} but came back ${result}`)
	} else {
		console.log(`checkLength working. Test string passes`)
	}
}
function test_check_length_too_long() {
	const str = "danboy123456789"
	const expected = false
	const result = checkLength(str)
	if (result !== expected) {
		console.log(`checkLength faild. '${str}' should return ${expected} but came back ${result}`)
	} else {
		console.log("checkLength working. Test string too long.")
	}
}
function test_check_length_empty() {
	const str = ""
	const expected = false
	const result = checkLength(str)
	if (result !== expected) {
		console.log(`checkLength faild. '${str}' should return ${expected} but came back ${result}`)
	} else {
		console.log("checkLength working. Test string empty.")
	}
}
function test_date_diff_pass() {
	const birthday = "1989-08-23"
	const expected = {
		daysAlive: "",
		over18: true,
	}
	const result = dateDiff(birthday)
	if (expected.over18 !== result.over18) {
		console.log(`dateDiff failed. ${birthday} is older than 18 years, but returned ${result.over18}`)
	} else {
		console.log("dateDiff working. Returns true when expected.")
	}
}
function test_date_diff_fail() {
	const birthday = "2020-08-23"
	const expected = {
		daysAlive: "",
		over18: false,
	}
	const result = dateDiff(birthday)
	if (expected.over18 !== result.over18) {
		console.log(`dateDiff failed. ${birthday} is younger than 18 years, but returned ${result.over18}`)
	} else {
		console.log("dateDiff working. Returns false when expected.")
	}
}
function test_validate_user_pass() {
	const value = "Danboy0812"
	const result = true
	const expected = validateUser(value)
	if (expected !== result) {
		console.log(`validateUser failed. ${value} should pass but returns ${result}`)
	} else {
		console.log(`validateUser working. Test string passes`)
	}
}
function test_validate_user_no_num() {
	const value = "Danboyabcd"
	const result = false
	const expected = validateUser(value)
	if (expected !== result) {
		console.log(`validateUser failed. ${value} should fail but returns ${result}`)
	} else {
		console.log(`validateUser working. Test string has no numbers`)
	}
}
function test_validate_user_no_cap() {
	const value = "danboy0812"
	const result = false
	const expected = validateUser(value)
	if (expected !== result) {
		console.error(`validateUser failed. ${value} should fail but returns ${result}`)
	} else {
		console.log(`validateUser working. Test string has no capital letters`)
	}
}
function test_validate_user_no_lower() {
	const value = "DANBOY0812"
	const result = false
	const expected = validateUser(value)
	if (expected !== result) {
		console.error(`validateUser failed. ${value} should fail but returns ${result}`)
	} else {
		console.log(`validateUser working. Test string has no lowercase letters`)
	}
}
test_check_length_pass()
test_check_length_too_long()
test_check_length_empty()
test_date_diff_pass()
test_date_diff_fail()
test_validate_user_pass()
test_validate_user_no_num()
test_validate_user_no_cap()
test_validate_user_no_lower()
