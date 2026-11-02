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
const letter = document.getElementById("letter");
const envelope = document.getElementById("envelope");
const question = document.getElementById("question");
const loginBtn = document.getElementById("google-login");
const loginError = document.getElementById("login-error");

loginBtn.addEventListener("click", async () => {
  loginError.textContent = "";
  loginBtn.disabled = true;
  try {
    if (!auth.currentUser) await signInWithPopup(auth, provider);
    goToLetter();
  } catch (err) {
    console.error(err);
    if (err.code !== "auth/popup-closed-by-user" && err.code !== "auth/cancelled-popup-request") {
      loginError.textContent = "로그인에 실패했어요. 다시 시도해 주세요.";
    }
    loginBtn.disabled = false;
  }
});

function show(from, to) {
  from.classList.remove("active");
  from.setAttribute("aria-hidden", "true");
  to.classList.add("active");
  to.removeAttribute("aria-hidden");
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ㅅㄴㅇ 글자가 돌면서 올라간 뒤 편지 화면으로 전환
function goToLetter() {
  intro.classList.add("leaving");
  const letters = intro.querySelectorAll(".letter");
  letters[letters.length - 1].addEventListener("animationend", () => {
    show(intro, letter);
    envelope.focus({ preventScroll: true });
  }, { once: true });
}

// 편지지가 질문 카드 자리까지 커지며 이어짐
function growPaperIntoCard() {
  const from = envelope.querySelector(".env-paper").getBoundingClientRect();
  const to = question.querySelector(".q-card").getBoundingClientRect();
  const flyer = document.createElement("div");
  flyer.className = "flyer frame";
  document.body.append(flyer);
  const box = (r) => ({ left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  return flyer.animate([box(from), box(to)], {
    duration: reduce ? 1 : 1000,
    easing: "cubic-bezier(.6, 0, .2, 1)",
    fill: "forwards",
  }).finished.then(() => flyer);
}

// 편지를 열면 편지지가 커지며 질문이 슈욱 튀어나옴
envelope.addEventListener("click", async () => {
  if (envelope.classList.contains("open")) return;
  envelope.classList.add("open");
  letter.classList.add("opened");
  await wait(1150);
  const growing = growPaperIntoCard();
  letter.classList.add("whoosh");
  const flyer = await growing;
  show(letter, question);
  requestAnimationFrame(() => flyer.remove());
});

// TODO: Yes / No 를 눌렀을 때의 동작
document.getElementById("yes").addEventListener("click", () => {});
document.getElementById("no").addEventListener("click", () => {});
