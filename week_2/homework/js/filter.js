export function getFilteredMembers(
  filterName,
  filterEnglishName,
  filterGithub,
  filterGender,
  filterRole,
  filterGroup,
  filterAge,
  members
) {
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
