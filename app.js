const projectUrl = "https://bmgpjrcjvevxihktmpbf.supabase.co";
const projectKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZ3BqcmNqdmV2eGloa3RtcGJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg2NDYsImV4cCI6MjA2NzAxNDY0Nn0.5M7yzgQWfqQkHPDfugavAp9zERUkj0tf40H9tSYr_0o";

const { createClient } = supabase;
const client = createClient(projectUrl, projectKey);
console.log(createClient);
console.log(client);

// signup page

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

      const { data, error } = await client.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            "https://insharahkalam.github.io/supabase-auth-app/post.html",
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

      const { data, error } = await client.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: {
          redirectTo:
            "https://insharahkalam.github.io/supabase-auth-app/post.html",
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

      const { data, error } = await client.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo:
            "https://insharahkalam.github.io/supabase-auth-app/post.html",
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
          user.user_metadata?.full_name || user.user_metadata?.given_name;
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
        console.error(error);
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

// read all post

if (window.location.pathname == "/all-blogs.html") {
  const current = document.getElementById("current");
  current.style.textDecoration = "underline red";

  // try {
  //   const readAllPosts = async () => {
  //     const { data, error } = await client.from("posts").select();
  //     if (data) {
  //       const box = document.getElementById("container");
  //       console.log(box);
  //     }
  //   };
  // } catch (error) {}
}

if (window.location.pathname == "/my-blogs.html") {
  const active = document.getElementById("active");
  active.style.textDecoration = "underline red";
}
