import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const intro = document.getElementById("intro");
const question = document.getElementById("question");
const loginBtn = document.getElementById("google-login");
const loginError = document.getElementById("login-error");

loginBtn.addEventListener("click", async () => {
  loginError.textContent = "";
  loginBtn.disabled = true;
  try {
    if (!auth.currentUser) await signInWithPopup(auth, provider);
    goToQuestion();
  } catch (err) {
    console.error(err);
    if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
      loginError.textContent = "로그인에 실패했어요. 다시 시도해 주세요.";
    }
    loginBtn.disabled = false;
  }
});

// ㅅㄴㅇ 글자가 돌면서 올라간 뒤 2페이지로 전환
function goToQuestion() {
  intro.classList.add("leaving");
  const letters = intro.querySelectorAll(".letter");
  letters[letters.length - 1].addEventListener("animationend", () => {
    intro.classList.remove("active");
    intro.setAttribute("aria-hidden", "true");
    question.classList.add("active");
    question.removeAttribute("aria-hidden");
  }, { once: true });
}

// TODO: Yes / No 를 눌렀을 때의 동작
document.getElementById("yes").addEventListener("click", () => {});
document.getElementById("no").addEventListener("click", () => {});
