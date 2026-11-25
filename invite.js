import { NAMES } from "./names.js";
import { SALT } from "./salt.js";

// 사은회 정보 — 확정되면 여기만 고치면 됩니다
export const EVENT = {
  date: "12월 ○일 (○)",
  time: "오후 ○시",
  place: "○○○",
};

// 명단은 이메일 대신 해시로 저장 (원본: roster/roster.js, 만들기: node roster/build.mjs)
async function hash(email) {
  const bytes = new TextEncoder().encode(SALT + email.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

const TITLES = { t: " 선생님", s: " 학생" };

// 로그인한 계정 → { name, title }  예) { name: "김빛나", title: " 선생님" }
// 명단에 없는 계정은 구글 프로필 이름(없으면 이메일 앞부분) + "님"
export async function invitee(user) {
  const email = user?.email ?? "";
  const found = email && NAMES[await hash(email)];
  if (found) return { name: found[0], title: TITLES[found[1]] };
  return { name: user?.displayName ?? email.split("@")[0], title: "님" };
}
