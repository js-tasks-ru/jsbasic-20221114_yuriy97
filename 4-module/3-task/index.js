function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    let tr = table.rows[i];
    if (tr.cells[3].dataset.available === "true")
      tr.classList.add("available");
    else if (tr.cells[3].dataset.available === "false")
      tr.classList.add("unavailable");
    else if (tr.cells[3].dataset.available === undefined)
      tr.setAttribute("hidden", "true");
    if (tr.cells[2].innerHTML === "m") tr.classList.add("male");
    else if (tr.cells[2].innerHTML === "f") tr.classList.add("female");
    if (+tr.cells[1].innerHTML < 18 ) tr.style.cssText = `text-decoration: line-through`
  }
}
