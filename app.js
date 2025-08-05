const projectUrl = "https://bmgpjrcjvevxihktmpbf.supabase.co";
const projectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZ3BqcmNqdmV2eGloa3RtcGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg2NDYsImV4cCI6MjA2NzAxNDY0Nn0.5M7yzgQWfqQkHPDfugavAp9zERUkj0tf40H9tSYr_0o";

const { createClient } = supabase;
const client = createClient(projectUrl, projectKey);
console.log(createClient);
console.log(client);

// // signup page

const signupBtn = document.getElementById("signupBtn");
signupBtn &&
  signupBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    console.log(email, password);

    if (email && password) {
      try {
        const { data, error } = await client.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;

        console.log(data);
        if (data) {
          Swal.fire({
            title: "Account created successfully! Redirecting to post page...",
            icon: "success",
            draggable: true,
          });
        }
        setInterval(() => {
          window.location.href = "post.html";
        }, 2000);
      } catch (error) {
        console.error("signup error: ", error);
        if (error.message.includes("invalid format")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please enter a valid email address!",
          });
        }
        if (
          error.message.includes("Password should be at least 6 characters.")
        ) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "make sure your password lenght is 6 or greater than 6 characters!",
          });
        }
        if (error.message.includes("User already registered")) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "This User is already registered. Try logging in instead.",
          });
        }
      }
    } else {
      if (email) {
        Swal.fire("please fill the Passsword field.");
      } else {
        Swal.fire("please fill the Email field.");
      }
    }
  });

// login page

const loginBtn = document.getElementById("loginBtn");
loginBtn &&
  loginBtn.addEventListener("click", async () => {
    const loginEmail = document.getElementById("login-email").value;
    const loginPassword = document.getElementById("login-password").value;

    console.log(loginEmail, loginPassword);

    if (loginEmail && loginPassword) {
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: loginEmail,
          password: loginPassword,
        });
        if (error) throw error;

        console.log(data);
        if (data) {
          Swal.fire({
            title: "Successfully Logged in! Redirecting to post page...",
            icon: "success",
            draggable: true,
          });
        }
        setInterval(() => {
          window.location.href = "post.html";
        }, 2000);
      } catch (error) {
        console.error("login error: ", error);
        if (error.message.includes("Invalid login credentials")) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid email or password. Please try again.",
          });
        }
      }
    } else {
      if (loginEmail) {
        Swal.fire("please fill the Passsword field.");
      } else {
        Swal.fire("please fill the Email field.");
      }
    }
  });

// signup/ login with google

const loginWithGoogle = document.getElementById("loginWithGoogle");
loginWithGoogle &&
  loginWithGoogle.addEventListener("click", async () => {
    try {
      localStorage.setItem("googleLoginSuccess", "true");

const redirectTo = window.location.hostname === '127.0.0.1'
? window.location.origin + '/post.html' : window.location.origin + '/supabase-auth-app/post.html'

      const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
           redirectTo,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });
      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.error("google login error: ", error);
      alert(error.message || "google login failed");
    }
  });

// signup/login with linked in

const loginWithLinkedIn = document.getElementById("loginWithLinkedIn");

loginWithLinkedIn &&
  loginWithLinkedIn.addEventListener("click", async () => {
    try {
      localStorage.setItem("linkedinLoginSuccess", "true");

const redirectTo = window.location.hostname === '127.0.0.1'
? window.location.origin + '/post.html' : window.location.origin + '/supabase-auth-app/post.html'


      const { data, error } = await client.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: {
          redirectTo:
           redirectTo,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });

      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.error("LinkedIn login error: ", error);
      alert(error.message || "LinkedIn login failed");
    }
  });

// signup/login with github

const loginWithGithub = document.getElementById("loginWithGithub");

loginWithGithub &&
  loginWithGithub.addEventListener("click", async () => {
    try {
      localStorage.setItem("GithubLoginSuccess", "true");


const redirectTo = window.location.hostname === '127.0.0.1'
? window.location.origin + '/post.html' : window.location.origin + '/supabase-auth-app/post.html'

      const { data, error } = await client.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo:
           redirectTo,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      });

      if (error) throw error;
      console.log(data);
    } catch (error) {
      console.error("github login error: ", error);
      alert(error.message || "Github login failed");
    }
  });

//   toggle eye icon signup

const togglePassword = document.getElementById("togglePassword");
const signupPassword = document.getElementById("signup-password");
const eyeIcon = document.getElementById("eyeIcon");

if (togglePassword && signupPassword && eyeIcon) {
  togglePassword.addEventListener("click", () => {
    const type =
      signupPassword.getAttribute("type") === "password" ? "text" : "password";
    signupPassword.setAttribute("type", type);
    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
  });
}

//   toggle eye icon login

const toggleLoginPassword = document.getElementById("toggleLoginPassword");
const loginPassword = document.getElementById("login-password");
const loginEyeIcon = document.getElementById("loginEyeIcon");

if (toggleLoginPassword && loginPassword && loginEyeIcon) {
  toggleLoginPassword.addEventListener("click", () => {
    const type =
      loginPassword.getAttribute("type") === "password" ? "text" : "password";
    loginPassword.setAttribute("type", type);
    loginEyeIcon.classList.toggle("fa-eye");
    loginEyeIcon.classList.toggle("fa-eye-slash");
  });
}

// logout functionality

const logoutBtn = document.getElementById("logoutBtn");
logoutBtn &&
  logoutBtn.addEventListener("click", async () => {
    try {
      const { error } = await client.auth.signOut();
      window.location.href = "index.html";
      if (error) throw error;
    } catch (error) {
      console.log("logout error", error);
      alert("Logout Failed.");
    }
  });

// post page

async function displayUserProfile() {
  try {
    const {
      data: { user },
      error,
    } = await client.auth.getUser();
    if (error) throw error;

    if (user) {
      console.log("User Metadata:", user);
      if (document.getElementById("profile-avatar")) {
        document.getElementById("profile-avatar").src =
          user.user_metadata?.avatar_url ||
          user.user_metadata?.picture ||
          "https://www.gravatar.com/avatar/?d=mp";
        document.getElementById("profile-name").textContent =
          user.user_metadata?.full_name || user.user_metadata?.given_name || user.email;
        document.getElementById("profile-email").textContent = user.email;
      }

      if (window.location.pathname.includes("index.html")) {
        window.location.href = "post.html";
      }
    } else if (
      !window.location.pathname.includes("index.html") &&
      !window.location.pathname.includes("login.html")
    ) {
      window.location.href = "index.html";
    }
  } catch (error) {
    console.error("Error:", error);
    if (
      !window.location.pathname.includes("index.html") &&
      !window.location.pathname.includes("login.html")
    ) {
      window.location.href = "index.html";
    }
  }
}

// Check for returning Google OAuth redirect

document.addEventListener("DOMContentLoaded", async () => {
  const success = localStorage.getItem("googleLoginSuccess");
  const successLinkedIn = localStorage.getItem("linkedinLoginSuccess");
  const successGithub = localStorage.getItem("GithubLoginSuccess");

  if (success === "true") {
    Swal.fire({
      title: "Successfully logged in with Google!",
      icon: "success",
    });
    localStorage.removeItem("googleLoginSuccess");
  }

  // Check if user logged in with LinkedIn
  if (successLinkedIn === "true") {
    Swal.fire({
      title: "Successfully logged in with LinkedIn!",
      icon: "success",
    });
    localStorage.removeItem("linkedinLoginSuccess");
  }

  // Check if user logged in with github
  if (successGithub === "true") {
    Swal.fire({
      title: "Successfully logged in with github!",
      icon: "success",
    });
    localStorage.removeItem("GithubLoginSuccess");
  }

  const {
    data: { session },
  } = await client.auth.getSession();

  //  If on post.html and not logged in → redirect to login
  if (window.location.pathname.includes("post.html") && !session) {
    window.location.href = "login.html";
  }

  //  If logged in → show profile
  if (session) {
    displayUserProfile();
  }
});

// add post functionality
const submitPost = document.getElementById("submitPost");
const loaderOverlay = document.getElementById("loader-overlay");

function showLoader() {
  loaderOverlay.style.display = "flex";
}

function hideLoader() {
  loaderOverlay.style.display = "none";
}

submitPost &&
  submitPost.addEventListener("click", async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    const postTitle = document.getElementById("post-title").value.trim();
    const postdescrib = document.getElementById("postdescrib").value.trim();

    if (!postTitle || !postdescrib) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both a title and a description.",
        confirmButtonColor: "#125b9a",
      });
      return;
    }
    showLoader();
    submitPost.disable = true;

    try {
      const {
        data: { user },
        error: authError,
      } = await client.auth.getUser();
      if (authError || !user) throw authError || new Error("user not found.");

      const { data, error } = await client
        .from("users")
        .insert([
          {
            user_id: user.id,
            Title: postTitle,
            Description: postdescrib,
          },
        ])
        .select();

      if (error) {
        console.error(error.message);
        Swal.fire({
          icon: "error",
          title: "Post Failed",
          text: "There was a problem creating the post.",
          confirmButtonColor: "#125b9a",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Post Created",
          text: "Your post has been successfully created!",
          timer: 1500,
          showConfirmButton: false,
        });

        document.getElementById("post-title").value = "";
        document.getElementById("postdescrib").value = "";
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#125b9a",
      });
    } finally {
      hideLoader();
      submitPost.disable = "false";
    }
  });
// read all posts

if (window.location.pathname.includes("all-blogs.html")) {

  try {
    const readAllPosts = async () => {
      const { data, error } = await client
        .from('users')
        .select()
      console.log(data);
      if (data) {
        const readPostBox = document.getElementById('readPostBox')
        console.log(readPostBox);
        readPostBox.innerHTML = data.map(({ id, Title, Description }) => `
  <div class="card bg-white border-danger mb-3 container justify-content-center align-items-start" id='${id}'" style="width: 40rem; height:auto;">
  <div class="card-body py-3 px-0">
  <div class="user-profile">
                  <img
                    id="profile-avatar"
                    src="https://lh3.googleusercontent.com/a/ACg8ocLYkBCY1aScXhz6IEjyOIyaYJF-o1p-JDvFsb6bRLKE0hiYpXY=s96-c"
                    alt="Profile Picture"
                    class="avatar"
                  />
                  <div class="user-details">
                    <h3 id="profile-name" class="text-black" style="font-family:'myFont';">Insharah</h3>
                    <p id="profile-email" class="text-black" style="font-family:'myFont';">insharahdev47@gmail.com</p>
                  </div>
                </div>
                 <hr/>
    <h5 class="card-title " style="font-family:'myFont'; font-size: 25px;">${Title}</h5>
    <p class="card-text" style="font-family:'Libertinus Serif';">${Description}</p>  
    <hr/>
    <div class="d-flex " style="font-family:'myFont';">
   <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-thumbs-up pe-2" style="color: #000000ff;"></i> Like </button>
   <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-comment fa-flip-horizontal ps-2" style="color: #000000ff;"></i> Comment </button>
   <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-share pe-2" style="color: #000000ff;"></i> share </button>
   <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-bookmark pe-2" style="color: #000000ff;"></i> Save </button>
    </div>
  </div>
</div>`)
          .join("");
      }
    }
    readAllPosts();
  }
  catch (error) {
    console.log(error);
  }
}
// read my posts 

const readMyPosts = async () => {
  const { data: { user } } = await client.auth.getUser();

  const { data, error } = await client
    .from('users')
    .select()
    .eq('user_id', user.id);

  if (data) {
    const readMyPostBox = document.getElementById('readMyPostBox');

    readMyPostBox.innerHTML = data.map(({ id, Title, Description }) => {
      // Correctly encode JSON and escape it for HTML
      const postData = JSON.stringify({ Title, Description })
        .replace(/"/g, "&quot;"); // Escape quotes

      return `
<div class="card bg-white border-danger mb-3 container justify-content-center align-items-start" style="width: 40rem; height:auto; overflow-X:hidden;">
  <div class="card-body py-3 px-0">
    <div class="user-profile">
      <img
        src="https://lh3.googleusercontent.com/a/ACg8ocLYkBCY1aScXhz6IEjyOIyaYJF-o1p-JDvFsb6bRLKE0hiYpXY=s96-c"
        alt="Profile Picture"
        class="avatar"
      />
      <div class="user-details">
        <h3 class="text-black" style="font-family:'myFont';">Insharah</h3>
        <p class="text-black" style="font-family:'myFont';">insharahdev47@gmail.com</p>
      </div>
    </div>

    <h5 class="card-title mt-4" style="font-family:'myFont'; font-size: 25px;">${Title}</h5>
    <p class="card-text" style="font-family:'Libertinus Serif';">${Description}</p>
  </div>
  <hr style="width:490px; border: 1px solid black; margin-left: 12px; margin-top:2px; margin-bottom:4px;">

  <div class="d-flex" style="font-family:'myFont';">
    <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-thumbs-up pe-2"></i> Like</button>
    <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-comment fa-flip-horizontal ps-2"></i> Comment</button>
    <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-share pe-2"></i> Share</button>
    <button class="px-3 py-1 ms-3 bg-transparent border-0 rounded-2 hover"><i class="fa-solid fa-bookmark pe-2"></i> Save</button>
  </div>

  <hr style="width:490px; border: 1px solid black; margin-left: 12px; margin-top:8px; margin-bottom:4px;">
  <div class="d-flex justify-content-center pb-3 mt-2 gap-2">
 <button 
          type="button"
          class="btn ms-2 btn-outline-danger edit-post-btn"
          data-id="${id}"
          data-post="${postData}"
        >
          Edit post
        </button>
    <button class="btn btn-outline-danger delete-post-btn" data-id="${id}">Delete post</button>
  </div>
</div>`;
    }).join("");

    // edit button listeners
    document.querySelectorAll('.edit-post-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.dataset.id;
        const raw = button.dataset.post.replace(/&quot;/g, '"');
        const post = JSON.parse(raw);

        editPost(id, post.Title, post.Description);
      });
    });

    // 👇 Delete button listeners
    document.querySelectorAll('.delete-post-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        deletePost(id);
      });
    });
  } else {
    console.log(error);
  }
};
if (window.location.pathname.includes('my-blogs.html')) {
  readMyPosts()
}

// delete posts

async function deletePost(postId) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await client
          .from('users')
          .delete()
          .eq('id', postId)
        if (response) {
          console.log(response);
          readMyPosts();
        }
        else {
          console.log(error);
        }
      }
      catch (error) {
        console.log(error);
      }
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        icon: "error"
      });
    }
  });
}

// edit post

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;") // escape "
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function editPost(postid, posttitle, postdescribtion) {
  console.log(postid, posttitle, postdescribtion);
  const title = escapeHtml(decodeURIComponent(posttitle));
  const description = escapeHtml(decodeURIComponent(postdescribtion));

  const { value: formValues } = await Swal.fire({
    title: "Update Post",
    html: `
     
<div class="d-flex mt-3 flex-column flex-md-row align-items-start align-items-md-center gap-2">
  <label style="min-width: 100px;"><strong>Title</strong></label>
  <input id="swal-input1" class="swal2-input mt-0 " value="${title}">
</div>

<div class="d-flex mt-3 flex-column flex-md-row align-items-start align-items-md-center  gap-2">
  <label class="ps-3" style="min-width: 100px;"><strong >Description</strong></label>
  <input id="swal-input2" class="swal2-input mt-0" value="${description}">
</div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value,
      ];
    },
  });

  try {
    if (formValues) {
      showLoader();
      const [newTitle, newDescription] = formValues;

      const { error } = await client
        .from("users")
        .update({ Title: newTitle, Description: newDescription })
        .eq("id", postid);

      if (error) {
        console.log(error);
      } else {
        hideLoader();
        Swal.fire({
          title: "Your post has been updated.",
          icon: "success",
        });
        readMyPosts();
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}


