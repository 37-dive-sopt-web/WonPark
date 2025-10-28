export function syncMasterCheckbox(tbody, masterCheckbox, selectedIds) {
  const visibleIds = [...tbody.querySelectorAll(".row-chk")].map((c) =>
    Number(c.dataset.id)
  );
  const allChecked =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someChecked = visibleIds.some((id) => selectedIds.has(id));
  masterCheckbox.checked = allChecked;
  masterCheckbox.indeterminate = someChecked && !allChecked;
}

export function setupMasterCheckbox(
  tbody,
  masterCheckbox,
  selectedIds,
  syncMasterCheckboxFn
) {
  masterCheckbox.addEventListener("change", (e) => {
    const on = e.target.checked;
    [...tbody.querySelectorAll(".row-chk")].forEach((c) => {
      c.checked = on;
      const id = Number(c.dataset.id);
      on ? selectedIds.add(id) : selectedIds.delete(id);
    });
    syncMasterCheckboxFn();
  });
}
