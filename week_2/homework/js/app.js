import { members as seed } from "../data/members.js";
import { syncMasterCheckbox, setupMasterCheckbox } from "./checkbox.js";
import { getFilteredMembers } from "./filter.js";
import { openModal, closeModal } from "./modal.js";

const STORAGE_KEY = "membersData";

let members = [];
const selectedIds = new Set();

function initStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  members = JSON.parse(localStorage.getItem(STORAGE_KEY));
}

const tbody = document.querySelector(".member_table tbody");
const masterCheckbox = document.querySelector("#check_btn");
const deleteBtn = document.querySelector(".delete_btn");
const addBtn = document.querySelector(".add_btn");

const filterFields = [...document.querySelectorAll(".search_filter .field")];
const filterName = filterFields[0].querySelector("input");
const filterEnglishName = filterFields[1].querySelector("input");
const filterGithub = filterFields[2].querySelector("input");
const filterGender = filterFields[3].querySelector("select");
const filterRole = filterFields[4].querySelector("select");
const filterGroup = filterFields[5].querySelector("input");
const filterAge = filterFields[6].querySelector("input");
const applyBtn = document.querySelector("#search_btn");
const resetBtn = document.querySelector("#reset_btn");

const backdrop = document.querySelector("#backdrop");
const modal = document.querySelector("#modal");
const modalClose = document.querySelector("#modal_close");
const form = document.querySelector("#member_form");

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

  [...tbody.querySelectorAll(".row-chk")].forEach((chk) => {
    chk.addEventListener("change", (e) => {
      const id = Number(e.target.dataset.id);
      e.target.checked ? selectedIds.add(id) : selectedIds.delete(id);
      syncMasterCheckbox(tbody, masterCheckbox, selectedIds);
    });
  });

  syncMasterCheckbox(tbody, masterCheckbox, selectedIds);
}

setupMasterCheckbox(tbody, masterCheckbox, selectedIds, () =>
  syncMasterCheckbox(tbody, masterCheckbox, selectedIds)
);

applyBtn.addEventListener("click", () => {
  selectedIds.clear();
  const filters = {
    name: filterName.value.trim(),
    englishName: filterEnglishName.value.trim(),
    github: filterGithub.value.trim(),
    gender: filterGender.value,
    role: filterRole.value,
    codeReviewGroup: filterGroup.value.trim(),
    age: filterAge.value.trim(),
  };
  render(getFilteredMembers(filters, members));
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

deleteBtn.addEventListener("click", () => {
  if (!selectedIds.size) return;
  if (!confirm("선택한 항목을 삭제할까요?")) return;

  members = members.filter((m) => !selectedIds.has(m.id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  selectedIds.clear();
  const filters = {
    name: filterName.value.trim(),
    englishName: filterEnglishName.value.trim(),
    github: filterGithub.value.trim(),
    gender: filterGender.value,
    role: filterRole.value,
    codeReviewGroup: filterGroup.value.trim(),
    age: filterAge.value.trim(),
  };
  render(getFilteredMembers(filters, members));
});

addBtn.addEventListener("click", () => openModal(backdrop, modal, form));
modalClose.addEventListener("click", () => closeModal(backdrop, modal));
backdrop.addEventListener("click", () => closeModal(backdrop, modal));

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

  closeModal(backdrop, modal);
  const filters = {
    name: filterName.value.trim(),
    englishName: filterEnglishName.value.trim(),
    github: filterGithub.value.trim(),
    gender: filterGender.value,
    role: filterRole.value,
    codeReviewGroup: filterGroup.value.trim(),
    age: filterAge.value.trim(),
  };
  render(getFilteredMembers(filters, members));
});

initStorage();
render(members);
