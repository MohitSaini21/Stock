// Function to generate the table
function generateTable(data) {
  //   const numRows = document.getElementById("numRows").value;
  displayBlock();
  const tableNameTag = document.getElementById("currTableName");
  const uniqueIDTag = document.getElementById("uniqueID");

  //   const numCols = document.getElementById("numCols").value;
  const { numRows, numCols, tableName, uniqueID } = data;

  const table = document.getElementById("dynamicTable");
  tableNameTag.innerText = tableName;
  uniqueIDTag.textContent = uniqueID;
  table.innerHTML = ""; // Clear any previous table

  // Create table header
  let headerRow = table.insertRow(0);
  for (let i = 0; i < numCols; i++) {
    let cell = headerRow.insertCell(i);
    cell.innerHTML = `<input type="text" placeholder="Column ${i + 1}" />`;

    // Add a selector for data type in each column header
    const select = document.createElement("select");
    select.setAttribute("data-column", i); // To identify which column this selector belongs to
    select.innerHTML = `
            <option value="text">Text</option>
            <option value="password">Password</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="tel">Tel</option>
            <option value="url">URL</option>
            <option value="date">Date</option>
            <option value="time">Time</option>
            <option value="datetime-local">Datetime Local</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="range">Range</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="file">File</option>
          `;
    select.addEventListener("change", changeColumnDataType);
    cell.appendChild(document.createElement("br"));
    cell.appendChild(document.createElement("br"));
    cell.appendChild(select);
  }

  // Create table body with input fields
  for (let i = 1; i <= numRows; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < numCols; j++) {
      let cell = row.insertCell(j);
      cell.innerHTML = `<input id="tableInput" type="text" placeholder="Data" />`; // Default input type is text
    }
  }
}

// Function to change the data type for a column
function changeColumnDataType(event) {
  const columnIndex = event.target.getAttribute("data-column");
  const selectedType = event.target.value;

  const table = document.getElementById("dynamicTable");
  const rows = table.rows;

  // Loop through all rows and change the input type in the selected column
  for (let i = 1; i < rows.length; i++) {
    const cell = rows[i].cells[columnIndex];
    const input = cell.querySelector("input");

    if (selectedType == "radio" || selectedType == "checkbox") {
      input.checked = false; // Uncheck the radio or checkbox
    } else {
      input.value = "";
    }
    input.setAttribute("type", selectedType);
  }
}

// Function to save the table
function saveTable() {
  console.log("Save Table has been Called");
  const table = document.getElementById("dynamicTable");
  if (!table.innerHTML) {
    return;
  }
  const rows = table.rows;
  let data = []; // Initialize an empty array to store the table data
  let dataTypes = []; // Initialize an array to store the data types of each column

  // First, capture the data types from the first row (header)
  const headerRow = rows[0]; // The first row is the header row
  for (let i = 0; i < headerRow.cells.length; i++) {
    const cell = headerRow.cells[i];
    const select = cell.querySelector("select"); // Get the <select> element for each column

    // Push the selected data type into the dataTypes array
    if (select) {
      dataTypes.push(select.value);
    }
  }

  // Loop through each row and extract the data from each cell
  for (let i = 0; i < rows.length; i++) {
    let rowData = []; // Create a new array for each row

    for (let j = 0; j < rows[i].cells.length; j++) {
      const cell = rows[i].cells[j];
      const input = cell.querySelector("input"); // Get the input field from the cell

      // Check if the input type is radio or checkbox
      if (input.type === "radio" || input.type === "checkbox") {
        // Push the checked state (true or false) for radio or checkbox inputs
        rowData.push(input.checked ? "checked" : "unchecked");
      } else {
        // For other types, just push the value of the input
        rowData.push(input.value);
      }
    }

    // Push the rowData array into the main data array
    data.push(rowData);
  }
  const currentTime = new Date();

  // Get current date components
  const year = currentTime.getFullYear();
  const month = String(currentTime.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(currentTime.getDate()).padStart(2, "0"); // Ensure two digits for day

  // Get current time components
  const hours = String(currentTime.getHours()).padStart(2, "0"); // Ensure two digits for hours
  const minutes = String(currentTime.getMinutes()).padStart(2, "0"); // Ensure two digits for minutes

  // Combine date and time into a single string in the format: YYYY-MM-DD HH:MM
  const dateString = `${year}-${month}-${day} ${hours}:${minutes}`;

  console.log(dateString); // Example output: "2025-03-15 14:45"

  // Combine the data and dataTypes arrays into an object to store  oth
  const tableData = {
    tableName: document.getElementById("currTableName").innerText, // Assuming you have a table name field
    uniqueID: document.getElementById("uniqueID").innerText,
    data,
    dataTypes,
    lastManipulation: dateString,
  };

  // Now you can push the tableData to a stack or store it
  console.log(tableData); // Example: You can push this data to a stack or database
  pushToStack(tableData);
}

// Function to add a new row to the table
function addRow() {
  const table = document.getElementById("dynamicTable");

  const numCols = table.rows[0].cells.length;

  const newRow = table.insertRow(table.rows.length); // Insert a new row at the end

  for (let i = 0; i < numCols; i++) {
    const cell = newRow.insertCell(i);
    cell.innerHTML = `<input id="tableInput" type="text" placeholder="Data" />`; // Add a new input field to the cell
  }

  saveTable();
  listUpdate();
}

// Function to add a new column to the table
function addColumn() {
  const table = document.getElementById("dynamicTable");
  const numRows = table.rows.length;

  // Add a new column to the header
  const headerRow = table.rows[0];
  const newHeaderCell = headerRow.insertCell(headerRow.cells.length);
  newHeaderCell.innerHTML = `<input type="text" placeholder="New Column" />`;

  // Add a new select element for data type in the header
  const select = document.createElement("select");
  select.innerHTML = `
          <option value="text">Text</option>
          <option value="password">Password</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="tel">Tel</option>
          <option value="url">URL</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
          <option value="datetime-local">Datetime Local</option>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="range">Range</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="file">File</option>
        `;
  newHeaderCell.appendChild(select);

  // Loop through each row and add an input field in the new column
  for (let i = 1; i < numRows; i++) {
    const row = table.rows[i];
    const newCell = row.insertCell(row.cells.length);
    newCell.innerHTML = `<input id="tableInput" type="text" placeholder="Data" />`;
  }
  saveTable();
  listUpdate();
}

function ReplaceTable(tableObject) {
  displayBlock();
  const table = document.getElementById("dynamicTable");
  table.innerHTML = null; // Clear the table content
  document.getElementById("currTableName").innerHTML =
    tableObject.tableName ?? tableObject.tableName;
  document.getElementById("uniqueID").textContent = tableObject.uniqueID;

  // Step 2: Insert the table header
  let headerRow = table.insertRow(0);

  // Create the header for each column based on the first row's data
  for (let i = 0; i < tableObject.data[0].length; i++) {
    let cell = headerRow.insertCell(i);
    cell.innerHTML = `<input type="text" value="${
      tableObject.data[0][i]
    }" placeholder="Column ${i + 1}" />`;

    // Step 3: Add a selector for data type in each column header
    const select = document.createElement("select");
    select.setAttribute("data-column", i); // To identify which column this selector belongs to

    // Set options for different data types
    select.innerHTML = `
      <option value="text">Text</option>
      <option value="password">Password</option>
      <option value="email">Email</option>
      <option value="number">Number</option>
      <option value="tel">Tel</option>
      <option value="url">URL</option>
      <option value="date">Date</option>
      <option value="time">Time</option>
      <option value="datetime-local">Datetime Local</option>
      <option value="month">Month</option>
      <option value="week">Week</option>
      <option value="range">Range</option>
      <option value="checkbox">Checkbox</option>
      <option value="radio">Radio</option>
      <option value="file">File</option>
    `;

    // Set the selected option based on the provided dataTypes
    const options = select.querySelectorAll("option");
    options.forEach((option) => {
      if (option.value === tableObject.dataTypes[i]) {
        option.selected = true; // Set this option as selected
      }
    });

    // Add event listener for data type change (if required)
    select.addEventListener("change", changeColumnDataType);
    cell.appendChild(document.createElement("br"));

    cell.appendChild(document.createElement("br"));
    cell.appendChild(select);
  }

  // Step 4: Insert the table body (data rows)
  for (let i = 1; i < tableObject.data.length; i++) {
    let row = table.insertRow(i);

    for (let j = 0; j < tableObject.data[i].length; j++) {
      let cell = row.insertCell(j);

      // Check if the input type is radio or checkbox
      if (
        tableObject.dataTypes[j] === "radio" ||
        tableObject.dataTypes[j] === "checkbox"
      ) {
        // For radio and checkbox, we should handle the checked state instead of value
        // Assuming the data should be compared with the current value to determine if it's checked
        const isChecked = tableObject.data[i][j] === "checked"; // Example: We check if the value is 'checked'

        // Set the input type as radio or checkbox and checked state
        cell.innerHTML = `
        <input id="tableInput" type="${tableObject.dataTypes[j]}" 
          name="group${j}" 
          value="${tableObject.data[i][j]}" 
          ${isChecked ? "checked" : ""} 
          placeholder="Data" />
      `;
      } else {
        // For other types like text or date, just set the value
        cell.innerHTML = `
        <input id="tableInput" type="${tableObject.dataTypes[j]}" 
          value="${tableObject.data[i][j]}" 
          placeholder="Data" />
      `;
      }
    }
  }
}
