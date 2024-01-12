const unorderdList = document.createElement("ul");
unorderdList.className = "users";
const form = document.querySelector("form");
const style = document.querySelector("style");
const body = document.querySelector("body");
body.insertBefore(unorderdList, style);

const localStorageKey = "User Details";
const userDetails = JSON.parse(localStorage.getItem(localStorageKey)) || [];
for (let i = 0; i < userDetails.length; i++) {
  const { username, email, phone } = userDetails[i];
  const button = document.createElement("button");
  button.className = "delete-btn";
  button.innerText = "x";
  button.addEventListener("click", handleDelete);
  const list = document.createElement("li");
  list.className = "user";
  list.innerText = `${username} ${email} ${phone} `;
  list.appendChild(button);
  unorderdList.appendChild(list);
}

function handleDelete(e) {
  e.preventDefault();
  console.log(e);
  unorderdList.removeChild(e.target.parentNode);
  const data = e.target.parentNode.textContent.split(" ");
  const userDetail = {
    username: data[0],
    email: data[1],
    phone: data[2],
  };
  const userDetails = JSON.parse(localStorage.getItem(localStorageKey));
  const indexToRemove = userDetails.findIndex(function (obj) {
    return obj.email === userDetail.email;
  });

  if (indexToRemove !== -1) {
    userDetails.splice(indexToRemove, 1);
  }
  localStorage.setItem(localStorageKey, JSON.stringify(userDetails));
}

function handleFormSubmit(e) {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const phone = e.target.phone.value;
  const existingUserIndex = userDetails.findIndex(function (obj) {
    return obj.email === email;
  });
  if (existingUserIndex !== -1) {
    console.log("user already exists");
    return;
  }
  const userDetail = {
    username: username,
    email: email,
    phone: phone,
  };

  userDetails.push(userDetail);
  localStorage.setItem(localStorageKey, JSON.stringify(userDetails));

  const button = document.createElement("button");
  button.className = "delete-btn";
  button.innerText = "x";
  button.addEventListener("click", handleDelete);
  const list = document.createElement("li");
  list.className = "user";
  list.innerText = `${username} ${email} ${phone} `;
  list.appendChild(button);
  unorderdList.appendChild(list);
  form.reset();
}
module.exports = handleFormSubmit;
module.exports = handleDelete;
