// TODO: better captchas
// TODO: cookie banners?

function $(el) {
  return document.querySelector(el);
}

function $$(el) {
  return document.querySelectorAll(el);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const newproductsdialog = new Dialog($("#dialog-newproducts-sure")).disappear();
const emailflooddialog = new Dialog($("#dialog-emailflood-sure")).disappear();

$$(".captcha").forEach(function(el) {
  el.innerHTML = $("#captcha-tmp").innerHTML;

  el.querySelector("input").checked = false;

  el.querySelector("input").addEventListener("click", async function(e) {
    e.preventDefault();
    await sleep(1000);
    if(randomRange(0, 3) == 2) {
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

$("#submit").addEventListener("click", (e) => {
  let error = "";

  if($("#pw").value == $("#pw2").value && $("#pw2").value == $("#pw3").value) {
    
  } else {
    error = "Passwords dont match. Which ones dont match? Well we dont know.";
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
  } else {
    $("#error").innerText = error;
  }
});

let timer = 0;

let timeinterval = setInterval(() => {
  timer++;
  $("#timer").innerText = timer;
}, 1000);