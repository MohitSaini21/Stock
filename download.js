document.addEventListener("keydown", function (event) {
  // Check if the Control key is pressed
  if (event.ctrlKey) {
    // Detect Ctrl + Q
    if (event.key === "Q" || event.key === "q") {
      console.log("Ctrl + Q was pressed");
      downloadStack();
    }

    // Detect Ctrl + M
    if (event.key === "M" || event.key === "m") {
      console.log("Ctrl + M was pressed");
      downloadStack();
    }
  }
});

// Function to download stack from local storage
function downloadStack() {
  const stack = getStackFromLocalStorage();
  if (stack.length == 0) {
    return;
  }

  // Convert stack data to JSON string
  const stackData = JSON.stringify(stack);

  // Create a Blob object from the JSON string
  const blob = new Blob([stackData], { type: "application/json" });

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  // Ask the user for the file name
  let userInput = prompt("Please Enter Your File Name:");

  // If no input, ask again or set the default file name
  if (!userInput) {
    userInput = prompt(
      "Please Enter Your File Name otherwise we will resort to default name:"
    );
  }

  // If still no input, use a default name
  if (!userInput) {
    userInput = "stock_tables"; // Default file name if user leaves the prompt empty
  }

  // Set the file name for the download (ensuring it's a .json file)
  link.download = `${userInput}.json`;

  // Trigger the download
  link.click();
}

// Function to get stack data from local storage (replace this with your logic)
function getStackFromLocalStorage() {
  const stack = localStorage.getItem("stack"); // Assume your stack is stored in "stackData"

  if (stack) {
    return JSON.parse(stack); // Parse the JSON string into an object
  } else {
    return null; // Return null if no data is found in local storage
  }
}

// uploading procedure
document.addEventListener("keydown", function (event) {
  // Check if the Control key and 'Y' key are pressed
  if (event.ctrlKey && (event.key === "y" || event.key === "Y")) {
    console.log("Ctrl + Y was pressed. Let's open the file dialog.");
    triggerFileUpload();
  }
});

// Function to trigger the file upload dialog
function triggerFileUpload() {
  const fileInput = document.createElement("input"); // Create an <input> element
  fileInput.type = "file"; // Set the type to "file" to open the file dialog
  fileInput.accept = ".json"; // Only allow JSON files

  // When the user selects a file, handle it
  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file (first file)

    if (file) {
      if (file.type === "application/json") {
        // Ensure the file is a JSON file
        console.log("Valid JSON file selected:", file.name);
        handleFile(file); // Process the file
      } else {
        console.log("Error: Please select a JSON file only.");
        alert("Error: Please select a JSON file only."); // Alert if the file isn't JSON
      }
    }
  });

  // Trigger the file input click programmatically
  fileInput.click();
}

// Function to handle the JSON file (read and parse it)
function handleFile(file) {
  // Example: Read the JSON file and parse it
  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const jsonContent = JSON.parse(event.target.result); // Parse the file content as JSON

      console.log("Parsed JSON content:", jsonContent);

      // Validate the data format
      if (validateDataFormat(jsonContent)) {
        console.log("Valid data format, software can handle it.");
        importToWorkingArea(jsonContent);
        // Continue with processing the valid data here
      } else {
        console.log("Error: Invalid data format.");
        alert("Invalid data, software cannot handle it."); // Alert if the data format is invalid
      }
    } catch (error) {
      console.log("Error parsing JSON file:", error);
      alert("Error: The file content is not valid JSON.");
    }
  };
  reader.readAsText(file); // Read the file as text
}

// Function to validate the data format of the JSON
function validateDataFormat(data) {
  // Check if the data is an array
  if (!Array.isArray(data)) {
    return false;
  }

  // Loop through each item and check if it matches the expected structure
  for (let item of data) {
    // Check required properties and their types
    if (
      typeof item.tableName !== "string" ||
      typeof item.uniqueID !== "string" ||
      !Array.isArray(item.data) ||
      !Array.isArray(item.dataTypes) ||
      typeof item.lastManipulation !== "string"
    ) {
      return false; // If any property doesn't match, return false
    }

    // You can also add additional checks for the length of data arrays or specific conditions
    if (item.data.length < 1 || item.dataTypes.length < 1) {
      return false;
    }
  }

  return true; // If all checks pass, return true
}

function importToWorkingArea(stack) {
  const WorkingStack = getStack(); // Get the current stack

  // Check if the stack is not empty
  if (WorkingStack.length > 0) {
    // Prompt the user if they have saved the current data
    let userConfirm = confirm("Have you saved the data?");

    if (userConfirm) {
      // If the user confirms they have saved the data, update the local storage stack
      localStorage.setItem("stack", JSON.stringify(stack));
      console.log("Stack has been saved to localStorage.");
      listUpdate();
      empytWorkingArea();
      ReplaceTable(stack[stack.length - 1]);
    } else {
      console.log("User has not saved the data.");
    }
  } else {
    localStorage.setItem("stack", JSON.stringify(stack));
    console.log("Stack has been saved to localStorage.");
    listUpdate();
    empytWorkingArea();
    ReplaceTable(stack[stack.length - 1]);
  }
}

function empytWorkingArea() {
  const tableNameTag = document.getElementById("currTableName");
  const uniqueIDTag = document.getElementById("uniqueID");
  const table = document.getElementById("dynamicTable");
  table.innerHTML = ""; // Clear any previous table
  tableNameTag.innerText = "";
  uniqueIDTag.innerText = "";
}
