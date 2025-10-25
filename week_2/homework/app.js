import { members as seed } from "./data/members.js";

const STORAGE_KEY = "membersData";
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

let members = [];
const selectedIds = new Set();

function initStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  members = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

/*  DOM 참조  */
const tbody = $(".member_table tbody");
const masterCheckbox = $("#check_btn");
const deleteBtn = $(".delete_btn");
const addBtn = $(".add_btn");

const filterFields = $$(".search_filter .field");
const filterName = $("input", filterFields[0]);
const filterEnglishName = $("input", filterFields[1]);
const filterGithub = $("input", filterFields[2]);
const filterGender = $("select", filterFields[3]);
const filterRole = $("select", filterFields[4]);
const filterGroup = $("input", filterFields[5]);
const filterAge = $("input", filterFields[6]);
const applyBtn = $("#search_btn");
const resetBtn = $("#reset_btn");

const backdrop = $("#backdrop");
const modal = $("#modal");
const modalClose = $("#modal_close");
const form = $("#member_form");

function rowTemplate(m) {
  return `
    <tr>
      <td><input type="checkbox" class="row-chk" data-id="${m.id}" ${
    selectedIds.has(m.id) ? "checked" : ""
  }></td>
      <td>${m.name}</td>
      <td>${m.englishName}</td>
      <td><a href="https://github.com/${m.github}" >${m.github}</a></td>
      <td>${
        m.gender === "male" ? "남자" : m.gender === "female" ? "여자" : ""
      }</td>
      <td>${m.role}</td>
      <td>${m.codeReviewGroup}</td>
      <td>${m.age}</td>
    </tr>
  `;
}

function render(list = members) {
  tbody.innerHTML = list.map(rowTemplate).join("");

  /*체크박스 */
  $$(".row-chk", tbody).forEach((chk) => {
    chk.addEventListener("change", (e) => {
      const id = Number(e.target.dataset.id);
      e.target.checked ? selectedIds.add(id) : selectedIds.delete(id);
      syncMasterCheckbox();
    });
  });

  syncMasterCheckbox();
}

/* 전체 체크박스 */
function syncMasterCheckbox() {
  const visibleIds = $$(".row-chk", tbody).map((c) => Number(c.dataset.id));
  const allChecked =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someChecked = visibleIds.some((id) => selectedIds.has(id));
  masterCheckbox.checked = allChecked;
  masterCheckbox.indeterminate = someChecked && !allChecked;
}

masterCheckbox.addEventListener("change", (e) => {
  const on = e.target.checked;
  $$(".row-chk", tbody).forEach((c) => {
    c.checked = on;
    const id = Number(c.dataset.id);
    on ? selectedIds.add(id) : selectedIds.delete(id);
  });
  syncMasterCheckbox();
});

/* 필터 */
function getFilteredMembers() {
  const name = (filterName.value || "").trim().toLowerCase();
  const eng = (filterEnglishName.value || "").trim().toLowerCase();
  const gh = (filterGithub.value || "").trim().toLowerCase();
  const gender = filterGender.value;
  const role = filterRole.value;
  const group = (filterGroup.value || "").trim();
  const age = (filterAge.value || "").trim();

  return members.filter((m) => {
    if (name && !m.name.toLowerCase().includes(name)) return false;
    if (eng && !m.englishName.toLowerCase().includes(eng)) return false;
    if (gh && !m.github.toLowerCase().includes(gh)) return false;
    if (gender !== "all" && m.gender !== gender) return false;
    if (role !== "all" && m.role !== role) return false;
    if (group && !String(m.codeReviewGroup).includes(group)) return false;
    if (age && !String(m.age).includes(age)) return false;
    return true;
  });
}

applyBtn.addEventListener("click", () => {
  selectedIds.clear();
  render(getFilteredMembers());
});

resetBtn.addEventListener("click", () => {
  filterName.value =
    filterEnglishName.value =
    filterGithub.value =
    filterGroup.value =
    filterAge.value =
      "";
  filterGender.value = "all";
  filterRole.value = "all";
  selectedIds.clear();
  render(members);
});

/* 선택 삭제  */
deleteBtn.addEventListener("click", () => {
  if (!selectedIds.size) return;
  if (!confirm("선택한 항목을 삭제할까요?")) return;

  members = members.filter((m) => !selectedIds.has(m.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  selectedIds.clear();
  render(getFilteredMembers());
});

/* 모달 열기/닫기 */
function openModal() {
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");
  form.reset();
}
function closeModal() {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
}

addBtn.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));

  const name = (data.name || "").trim();
  const englishName = (data.english_name || "").trim();
  const github = (data.github || "").trim();
  const gender = data.gender;
  const role = data.role;
  const groupStr = (data.gold_jandi || "").trim();
  const ageStr = (data.age || "").trim();

  if (
    !name ||
    !englishName ||
    !github ||
    !groupStr ||
    !ageStr ||
    gender === "all" ||
    role === "all"
  ) {
    alert("모든 항목을 채워주세요");
    return;
  }

  const codeReviewGroup = parseInt(groupStr, 10);
  const age = parseInt(ageStr, 10);
  if (isNaN(codeReviewGroup) || codeReviewGroup < 1 || codeReviewGroup > 9) {
    alert("금잔디조는 1~9 사이 숫자여야 합니다");
    return;
  }
  if (isNaN(age) || age <= 0) {
    alert("나이는 1 이상의 숫자여야 합니다.");
    return;
  }

  const newId = members.length ? Math.max(...members.map((m) => m.id)) + 1 : 1;
  const newMember = {
    id: newId,
    name,
    englishName,
    github,
    gender,
    role,
    codeReviewGroup,
    age,
  };

  members.push(newMember);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));

  closeModal();
  render(getFilteredMembers());
});

initStorage();
render(members);
