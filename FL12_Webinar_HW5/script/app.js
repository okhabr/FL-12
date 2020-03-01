const usersURL = "https://jsonplaceholder.typicode.com/users";
const postsURL = "https://jsonplaceholder.typicode.com/posts";
const commentsURL = "https://jsonplaceholder.typicode.com/comments";
const dog = "https://dog.ceo/api/breeds/image/random";

const usersUl = document.querySelector(".users-list");
const editBox = document.querySelector(".editBox");
const userNames = document.querySelectorAll('.users-list [data-content="name"]');

usersUl.addEventListener("click", unableEditingUser);
usersUl.addEventListener("click", deleteUser);
editBox.addEventListener("click", editUser);
editBox.addEventListener("click", cancelEditing);
usersUl.addEventListener("click", redirectToPosts);

//Starting point
prepareStartPage(usersURL);

//1.get userlist & 2.1 display  them as list
function prepareStartPage(url) {
  location.hash = "users";
  toggleSpinner();
  fetch(usersURL)
    .then(response => {
      if (!response.ok) throw new Error(data.error);
      return response.json();
    })
    .then(result => {
      createUsersList(result);
      toggleSpinner();
    })
    .catch(err => { 
      alert(`Sorry, error: ${err.message}`);
      toggleSpinner();
    });
}

//2.2 add posibility to edit user 
function editUser(e) {
  if (e.target.className === "save") {
    let newUserData = prepareEditedUser(e);
    putEditedUser(newUserData);
    clearEditBox();
  }
}

//3.When editining is finished update user on the server
function putEditedUser(updatedUserInfo) {
    toggleSpinner();
    fetch(`https://jsonplaceholder.typicode.com/users/${updatedUserInfo.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserInfo),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(json => {
        console.log(json);
        toggleSpinner();
      })
      .catch(err => { 
        alert(`Sorry, error: ${err.message}`);
        toggleSpinner();
      });
  }

//4.add possibility to delete user
function deleteUser(e) {
  if (e.target.className === "delete") {
    const userId = e.target.parentElement.children[1].textContent;
    deleteFromUI(e.target.parentElement);
    toggleSpinner();
    fetch(`https://jsonplaceholder.typicode.com/posts/${userId}`, {
      method: "DELETE"
    })
    .then(resp => {
      alert(`User with id ${userId} has been removed!`);
      toggleSpinner();
    })
    .catch(err => { 
      alert(`Sorry, error: ${err.message}`);
      toggleSpinner();
    });
  }
}

//6.when clicked on the username, redirect & display posts with comments
function redirectToPosts(e) {
  if (e.target.getAttribute("data-content") === "name") {
    const readyPosts = [];
    const id = e.target.previousElementSibling.textContent;
    toggleSpinner();
    fetch(`${postsURL}?userId=${id}`)
      .then(response => {
        if (!response.ok) throw new Error(data.error);
        return response.json();
      })
      .then(posts => {
        switchPage(id);
        posts.forEach(post => {
            readyPosts.push(post);
        })
      })
      .then(() => {
        readyPosts.forEach( readyPost => {
            const commentsBox = paintPost(readyPost);
            handleComments(readyPost, commentsBox);
        })
        toggleSpinner();
      })
      .catch(err => { 
        alert(`Sorry, error: ${err.message}`);
        toggleSpinner();
      });
  }
}

function handleComments(post, commentsBox) {
  let readyComments = [];
    return fetch(`${commentsURL}?postId=${post.id}`)
        .then(res => {
            if (!res.ok) throw new Error(data.error);
            return res.json();
        })
        .then(comments => {
            comments.forEach(comment => {
              readyComments.push(comment);
            });
        })
        .then (() => {
          readyComments.forEach( comment => {
            addComment(comment, commentsBox)
          })
        })
        .catch(err => err);
}

//7.Sorry, my dog did not allow me to use cats photos)
function addDogsImgs(amount) {
  return fetch(`${dog}/${amount}`)
        .then(response => {
        if (!response.ok) throw new Error();
        return response.json();
        })
        .then (response => response.message)
        .catch (error =>  { 
          return Array(amount).fill('img/pug.jpg');
        });
}

//UI supporting functions
//Userslist page
function createUsersList(usersArray) {
  addDogsImgs(usersArray.length).then (dogs => {
    usersArray.forEach( (oldUser,index) => {
        const { id, name, username, email, address: { city, zipcode }, phone, website, company: { name: Company_name, catchPhrase, bs } } = oldUser;
        let user = { id, name, username, email, city, zipcode, phone, website, Company_name, catchPhrase, bs };
        
        let currentLi = document.createElement("li");
        let dogImgContainer = document.createElement("img");
        dogImgContainer.setAttribute("src", dogs[index]);
        currentLi.append(dogImgContainer);
        
        for (prop in user) {
            let infospan = document.createElement("span");
            infospan.setAttribute("data-content", prop);
            infospan.textContent = user[prop];
            currentLi.append(infospan);
        }
        currentLi.innerHTML += `<button class = "edit">Edit</button> <button class = "delete">Delete</button>`;
        usersUl.append(currentLi);
        });
  })
}

function unableEditingUser(e) {
  if (e.target.className === "edit") {
    clearEditBox();
    const userInfo = Array.from(e.target.parentElement.children);
    userInfo.forEach(info => {
      if (info.hasAttribute("data-content")) {
        let currentInput = document.createElement("input");
        currentInput.setAttribute(
          "data-content",
          info.getAttribute("data-content")
        );
        currentInput.value = info.textContent;
        editBox.append(currentInput);
      }
    });
    let saveBtn = document.createElement("button");
    saveBtn.classList.add("save");
    saveBtn.textContent = "Save and post";

    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel");
    cancelBtn.textContent = "Cancel editing";

    editBox.append(saveBtn, cancelBtn);
  }
}

function prepareEditedUser(e) {
  const userInfo = Array.from(e.target.parentElement.children);
  let updatedUserInfo = {};
  userInfo.forEach(info => {
    if (info.hasAttribute("data-content")) {
      updatedUserInfo[info.getAttribute("data-content")] = info.value;
    }
  });
  let {
    id,
    name,
    username,
    email,
    city,
    zipcode,
    phone,
    website,
    Company_name,
    catchPhrase,
    bs
  } = updatedUserInfo;
  return {
    id,
    name,
    username,
    email,
    address: { city, zipcode },
    phone,
    website,
    company: { Company_name: name, catchPhrase, bs }
  };
}

function cancelEditing(e) {
  if (e.target.className === "cancel") {
    clearEditBox();
  }
}

function clearEditBox() {
  editBox.innerHTML = "";
}

function deleteFromUI(element) {
  element.remove();
}

function toggleSpinner() {
  const spinner = document.querySelector(`.spinner`);
  spinner.classList.toggle("hidden");
}

//Posts page
document.querySelector(".back").addEventListener("click", switchPage);

function paintPost(post) {
  let postsContainer = document.querySelector(`.posts-list`);
  let postCard = document.createElement("article");
  postCard.classList.add("post-card");
  let title = document.createElement("h2");
  title.textContent = post.title;
  let body = document.createElement("p");
  body.classList.add("post-body");
  body.textContent = post.body;
  let commentsContainer = document.createElement("div");
  commentsContainer.classList.add("comments");
  postCard.append(title, body, commentsContainer);
  postsContainer.append(postCard);
  return commentsContainer;
}

function addComment(commentObj, commentsContainer) {
  const commentBox = document.createElement("p");
  commentBox.innerHTML = `<span class="comment-author">${commentObj.email}</span>:${commentObj.body}`;
  commentsContainer.append(commentBox);
}

function switchPage(userId) {
  const currentHash = location.hash;
  const header = document.querySelector(`h1`);
  const usersPage = document.querySelector(`.users-page`);
  const postsPage = document.querySelector(`.posts-page`);
  const postsList = document.querySelector(`.posts-list`);

  location.hash = currentHash === "#users" ? "posts" : "users";
  header.innerHTML = currentHash === "#users" ? `User #${userId} posts list` : "Users list";
  postsList.innerHTML = "";
  usersPage.classList.toggle("hidden");
  postsPage.classList.toggle("hidden");
}
