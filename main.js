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
	uid: true,
	fname: true,
	lname: true,
	bday: true,
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
function check_length(str, min, max) {
	if (str.length < min || uid.length > max) {
		return false
	} else {
		return true
	}
}
function validateUser(value) {
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
		errors["uid"] = true
		return false
	} else {
		delete errors["uid"]
		return true
	}
}
function dateDiff(birthday) {
	const today = new Date()
	const bday = new Date(birthday)
	return Math.floor((today - bday) / 86400000)
}
function displayError(element, element_id, message, error) {
	if (error) {
		element.classList.add("error")
		document.querySelector(`#${element_id} + strong`).innerHTML = message
	} else {
		element.classList.remove("error")
		document.querySelector(`#${element_id} + strong`).innerHTML = null
	}
}
function blurAction(element, min, max, element_id, input_label) {
	if (!check_length(element.value, min, max)) {
		errors[element_id] = true
		displayError(element, element_id, `${input_label} must be between ${min} and ${max} characters`, true)
	} else {
		delete errors[element_id]
		displayError(element, element_id, null, false)
	}
}

fname.addEventListener("blur", () => {
	blurAction(fname, 2, 12, "fname", "First Name")
})
lname.addEventListener("blur", () => {
	blurAction(lname, 2, 12, "lname", "Last Name")
})
uid.addEventListener("blur", () => {
	blurAction(uid, 8, 12, "uid", "User ID")
})
bday.addEventListener("blur", () => {
	if (!bday.value) {
		errors["bday"] = true
		displayError(bday, "bday", "Must enter birthday", true)
	} else {
		delete errors["bday"]
		displayError(bday, "bday", null, false)
	}
})
form1.addEventListener("submit", (e) => {
	e.preventDefault()
	if (!validateUser(uid.value)) {
		errors["uid"] = true
		displayError(uid, "uid", "Invalid User ID", true)
	} else {
		delete errors["uid"]
		displayError(uid, "uid", null, false)
	}
	errors["fname"] ? displayError(fname, "fname", "Must enter first name", true) : displayError(fname, "fname", null, false)
	errors["lname"] ? displayError(lname, "lname", "Must enter last name", true) : displayError(lname, "lname", null, false)
	errors["bday"] ? displayError(bday, "bday", "Must enter birthday", true) : displayError(bday, "bday", null, false)

	if (Object.keys(errors).length === 0) {
		message.innerHTML = `Congrats! You've been breathing for ${dateDiff(bday.value)} days! `
		if (dateDiff(bday.value) < 6570) {
			message.innerHTML += `You're probably not old enough to take this class...`
		}
	}
})

// //testing the length
// function test_check_length() {
// //Arrange
//     const uid = "Danboy53"
//     const expected = true
// //Act
//     const result = check_length(uid)
// //Assert
//     if (result !== expected){
//         console.log (`check_length failed - expected: ${expected} -> actual: ${result}`)
//     }
//  }
// test_check_length()
// //user id validated by loop that has conditions to check variables uppercase, lowercase, and number--> had to use continue
// //to make loop move passed the number bc numbers were passing uppercase/lowercase condition. HOW???
//

// function test_Validate_User(){
//     //Arrange
//     const username = "sally"
//     const expected = true

//     //Act
//     const result = validate_User(username)

//     //Assert
//     if (result !== expected){
//         console.log(`Validate_User failed - expected: ${expected} -> actual: ${result}`)
//     }
// }
// test_Validate_User()

//
//
// console.log (dateDiff("1989-08-23"))

// //86400000 milliseconds in a day

// function test_dateDiff() {
// //Arrange
//     const bday = "1989-09-23"
//     const expected = 11953
// //Act
//     const result = dateDiff(bday)
// //Assert
//     if (result !== expected) {
//         console.log(`This aint work bro! We wanted ${expected}, but we got ${result}.`)
//     }
// }
