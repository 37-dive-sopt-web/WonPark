export function getFilteredMembers(filters, members) {
  const {
    name: nameValue,
    englishName: englishNameValue,
    github: githubValue,
    gender: genderValue,
    role: roleValue,
    codeReviewGroup: groupValue,
    age: ageValue,
  } = filters;

  const name = (nameValue || "").trim().toLowerCase();
  const eng = (englishNameValue || "").trim().toLowerCase();
  const gh = (githubValue || "").trim().toLowerCase();
  const gender = genderValue;
  const role = roleValue;
  const group = (groupValue || "").trim();
  const age = (ageValue || "").trim();

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
