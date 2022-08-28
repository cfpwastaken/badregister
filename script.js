// TODO: better captchas
// TODO: cookie banners?

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

new Dialog($("#dialog-noscript")).disappear();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const newproductsdialog = new Dialog($("#dialog-newproducts-sure")).disappear();
const emailflooddialog = new Dialog($("#dialog-emailflood-sure")).disappear();
const sellingdatadialog = new Dialog($("#dialog-selling-data")).disappear();
const cookieoptionsdialog = new Dialog($("#dialog-cookies-options")).disappear();
const cookiepaydialog = new Dialog($("#dialog-cookies-pay")).disappear();
const cookiesdialog = new Dialog($("#dialog-cookies")).show();

let cookies_approved = false;

$$(".cookie-option").forEach(el => {
	el.querySelector("input").checked = true;
})

async function sellData() {
	await cookiesdialog.hide();
	await sellingdatadialog.show();
	await sleep(1000);
	$("#dialog-cookies-status").innerText = "Contacting Facebook for even more data...";
	await sleep(3000);
	$("#dialog-cookies-status").innerText = "Selling data on the dark web...";
	await sleep(4000);
	$("#dialog-cookies-status").innerText = "Shoot, you were not meant to see this.";
	await sleep(1000);
	sellingdatadialog.hide();
	cookies_approved = true;
}

$("#dialog-cookies-pay-yes").addEventListener("click", async () => {
	await cookiepaydialog.hide();
	$("#selling-data").innerHTML = "Lol, you clicked on accept all.<br>One moment please, we are selling your data";
	sellData();
})

$("#dialog-cookies-pay-purchase").addEventListener("click", async () => {
	$("#dialog-cookies-pay-purchase").innerText = "Not enough money.";
	$("#dialog-cookies-pay-purchase").disabled = true;
})

$("#dialog-cookies-pay-already-paid").addEventListener("click", async () => {
	$("#dialog-cookies-pay-already-paid").innerText = "Ok good";
	await cookiepaydialog.hide();
})

$("#dialog-cookies-options-yes").addEventListener("click", async () => {
	await cookieoptionsdialog.hide();
	$("#selling-data").innerHTML = "Lol, you clicked on accept all.<br>One moment please, we are selling your data";
	sellData();
});
$("#dialog-cookies-yes").addEventListener("click", sellData);

$("#dialog-cookies-no").addEventListener("click", async () => {
	await cookiesdialog.hide();
	cookieoptionsdialog.show();
})

$("#dialog-cookies-options-no").addEventListener("click", async () => {
	await cookieoptionsdialog.hide();
	if(!($("#co-1").checked || $("#co-2").checked || $("#co-3").checked || $("#co-4").checked)) {
		cookiepaydialog.show();
	} else {
		$("#selling-data").innerHTML = "Lol, you accepted all cookies.<br>One moment please, we are selling your data";
		sellData();
	}
})

$$(".captcha").forEach(function(el) {
  el.innerHTML = $("#captcha-tmp").innerHTML;

  el.querySelector("input").checked = false;

  el.querySelector("input").addEventListener("click", async function(e) {
		if(!el.querySelector("input").checked) {
      return;
    }
		e.preventDefault();
    el.querySelector(".progress-ring").style.display = "";
    el.querySelector("input").style.display = "none";
    await sleep(1000);
    el.querySelector(".progress-ring").style.display = "none";
    el.querySelector("input").style.display = "";
    if(randomRange(0, 2) == 2) {
      el.querySelector("input").checked = true;
    }
  });
});

$$("input").forEach(function(el) {
  if(el.type == "text" || el.type == "password" || el.type == "email") {
    el.value = "";

    el.addEventListener("keypress", async function(e) {
      if(el.classList.contains("shake")) {
        e.preventDefault();
        return;
      }
      if(randomRange(0, 5) == 3) {
        e.preventDefault();
        el.classList.add("shake");
        await sleep(820);
        el.classList.remove("shake");
      }
    });
  }
});

$("#terms-cb").checked = false;

$("#newproducts-cb").checked = true;
$("#newproducts-cb").addEventListener("click", (e) => {
  e.preventDefault();
  newproductsdialog.show();
})

$("#dialog-newproducts-sure-no").addEventListener("click", (e) => {
  newproductsdialog.hide();
  $("#newproducts-cb").checked = false;
})

$("#dialog-newproducts-sure-yes").addEventListener("click", (e) => {
  newproductsdialog.hide();
})

$("#emailflood-cb").checked = true;
$("#emailflood-cb").addEventListener("click", (e) => {
  e.preventDefault();
  emailflooddialog.show();
})

$("#dialog-emailflood-sure-no").addEventListener("click", (e) => {
  emailflooddialog.hide();
  $("#emailflood-cb").checked = false;
})

$("#dialog-emailflood-sure-yes").addEventListener("click", (e) => {
  emailflooddialog.hide();
})

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

$("#submit").addEventListener("click", (e) => {
  let error = "";

	if($("#pw").value.length < 8) {
		error = "Password must be at least 8 characters long.";
	}
	if(!$("#pw").value.match(/[0-9]/)) {
		error = "Password must contain at least one number.";
	}
	if(!$("#pw").value.match(/[A-Z]/)) {
		error = "Password must contain at least one capital.";
	}
	if(!$("#pw").value.match(/[a-z]/)) {
		error = "Password must contain at least one lowercase character.";
	}

  if(!($("#pw").value == $("#pw2").value && $("#pw2").value == $("#pw3").value)) {
    error = "Passwords dont match. Which ones dont match? Well we dont know.";
  }
  if($("#name").value.length < 3) {
    error = "Name must be at least 3 characters long.";
  }
  if(!$("#email").value.match(EMAIL_REGEX)) {
    error = "Email must be valid.";
  }
  if(!$("#terms-cb").checked) {
    error = "You must agree to the terms and conditions.";
  }
  $$(".captcha").forEach((captcha) => {
    if(!captcha.querySelector("input").checked) {
      error = "You must prove you are not a robot.";
    }
  })
  
  if(error == "") {
    clearInterval(timeinterval);
    $("#submit").disabled = true;
    $("#error").innerText = "You did it!";
		if($("#newproducts-cb").checked || $("#emailflood-cb").checked) {
			$("#error").innerText += " Prepare your email to be full within a few hours.";
		}
		if(cookies_approved) {
			$("#error").innerText += " Also thanks for your data. It made us a lot of money.";
		}
  } else {
    $("#error").innerText = error;
  }
});

let timer = 0;

let timeinterval = setInterval(() => {
  timer++;
  $("#timer").innerText = timer;
}, 1000);