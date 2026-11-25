// roster/roster.js(원본 명단, git에 안 올라감) → names.js(이메일을 해시로 바꾼 명단)
// 명단을 고친 뒤 실행: node roster/build.mjs
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { teachers, students } from "./roster.js";
import { SALT } from "../salt.js";

const hash = (email) =>
  createHash("sha256").update(SALT + email.trim().toLowerCase()).digest("hex").slice(0, 16);

const rows = [
  ...Object.entries(teachers).map(([email, name]) => [hash(email), name, "t"]),
  ...Object.entries(students).map(([email, name]) => [hash(email), name, "s"]),
];

const body = rows.map(([h, name, kind]) => `  "${h}": [${JSON.stringify(name)}, "${kind}"],`).join("\n");
writeFileSync(
  new URL("../names.js", import.meta.url),
  `// 자동 생성 파일 — 직접 고치지 말고 roster/roster.js 를 고친 뒤 node roster/build.mjs\n` +
    `// 이메일 해시 → [이름, t(선생님) | s(학생)]\nexport const NAMES = {\n${body}\n};\n`,
);
console.log(`names.js: ${rows.length}명`);
