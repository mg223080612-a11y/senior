// 사은회 정보 — 확정되면 여기만 고치면 됩니다
export const EVENT = {
  date: "12월 ○일 (○)",
  time: "오후 ○시",
  place: "○○○",
};

// 로그인한 구글 계정 이메일 → 편지에 들어갈 이름
const byDomain = {
  "gvcs-mg.org": {
    joshua: "강유준", sungmi: "이성미", jicheol: "유지철",
    byungsoon: "윤병순",
    kkurug: "허완성", jieunh: "허지은", jeongha: "남정하", yumin: "김유민",
    jiyeon: "김지연", hyeonung: "하현웅", hojun: "신호준", miyung: "김미영", eunhye: "김은혜",
    // 국어
    bitna: "김빛나", miyoungbok: "복미영", jiyun: "박지윤",
    // 수학
    pilran: "김필란", seongchan: "허성찬", yunhei: "여윤혜",
    // 영어
    kyeongsik: "김경식", shannon: "Shannon Hudgens", jarrett: "Jarrett Smith", naeun: "이나은",
    minjuing: "김민정", ekaterina: "Ekaterina Grebenyuk", tyson: "Tyson Yi",
    robert: "Robert Matthew Watson",
    // 사회
    anne: "신선미", haesung: "박해성", hannakim: "김한나",
    // 과학
    yoonjung: "이윤정", jisukhan: "한지숙", edward: "Edward Jang", jihyek: "권지혜",
    // 태권도
    suin: "박수인", youngjun: "심영준", boeun: "황보은",
    // 예술
    hyemi: "정혜미", kyoungmin: "이경민", haeseong: "최해성",
    // 정보
    inhak: "김인학", hamin: "양하민",
    // 제2외국어
    jonathan: "Jonathan Badillo", seonhye: "김선혜",
    // 진로
    dongun: "진동언", chanyoung: "신찬영",
    // 영성교육부
    jinkwang: "탁진광", jaeminyang: "양재민", taehyun: "엄태현", yewon: "김예원",
    // 상담 · 입학 · 교육정보 · 학사지원 · JMA
    hyosuk: "함효숙", yunju: "황윤주", munseon: "황문선", michelle: "Michelle Kang", john: "John Kim",
    // 야구부 · 축구부
    hyukdon: "권혁돈", hyunsu: "박현수",
    sungjin: "배성진", seunggi: "최승기", faical: "Faical Sourour", sangil: "김상일",
    gunwoo: "김건우", seongguk: "우성국",
    // 행정실 · 보건실
    gijong: "유기종", keunsik: "배근식", jinsung: "박진승", soyoung: "이소영", chaerin: "임채린",
    gichoul: "박기철", giyeong: "권기영", yujah: "황유자", soralee: "이소라",
    // 백합관
    eunhee: "박은희",
  },
  "gemgem.org": { inkyung: "유인경" },
  "gvcs-es.org": { sungwoo: "김성우", changmin: "박창민" },
  "gemgvcs.org": {
    // 문경생활교육단
    seongok: "조성옥", kyehwan: "손계환", ryuntaek: "오륜택",
    // 청매관
    samuel: "김사무엘", junghyun: "우정현", hyunjinjo: "조현진", seunghwan: "추승환",
    youngsu: "박영수", daeseop: "송대섭", youngill: "김영일", seokgyu: "박석규", taehwan: "권태환",
    // 백합관
    sunhoung: "진선형", yonghee: "신용희", ina: "정인아", jiyoung: "김지영",
  },
};

// 명단에 없는 계정은 구글 프로필 이름, 그것도 없으면 이메일 앞부분
export function inviteeName(user) {
  const email = (user?.email ?? "").toLowerCase();
  const [id, domain] = email.split("@");
  return byDomain[domain]?.[id] ?? user?.displayName ?? id ?? "";
}
