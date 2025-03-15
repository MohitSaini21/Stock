// Function to get the stack from localStorage
function getStack() {
  const stack = JSON.parse(localStorage.getItem("stack")) || []; // Retrieve or initialize the stack
  return stack;
}
function removeStack() {
  localStorage.removeItem("stack"); // Remove the stack from localStorage
}

// Function to push an item to the stack
function pushToStack(item) {
  const stack = getStack(); // Get the current stack

  // Check if the item with the same tableName already exists in the stack
  // const existingIndex = stack.findIndex(
  //   (existingItem) => existingItem.tableName === item.tableName
  // );
  const existingIndex = stack.findIndex(
    (existingItem) => existingItem.uniqueID === item.uniqueID
  );

  if (existingIndex !== -1) {
    // If it exists, replace the existing item
    stack[existingIndex] = item;
  } else {
    // If it doesn't exist, push the new item
    stack.push(item);
  }

  // Save the updated stack to localStorage
  localStorage.setItem("stack", JSON.stringify(stack));
}

// Function to pop the last item from the stack
function popFromStack(tableID) {
  const stack = getStack(); // Get the current stack
  console.log(stack);
  // Ensure that the tableName is a string and remove any leading or trailing spaces
  const cleanedTableNameID = tableID.trim();

  // Find the index of the item with the given tableName
  const itemIndex = stack.findIndex((item) => {
    // Compare tableName from stack after trimming whitespace
    return item.uniqueID.trim() === cleanedTableNameID;
  });

  if (itemIndex === -1) {
    // If no item is found with the given tableName, return null or some other value indicating no match
    console.log("Item with tableName " + tableName + " not found.");
    return null;
  }

  // Pop the item at the found index
  const [poppedItem] = stack.splice(itemIndex, 1); // Remove the item at the found index

  // Save the updated stack to localStorage
  localStorage.setItem("stack", JSON.stringify(stack));

  return poppedItem; // Return the removed item
}

function getFromStack(tableID) {
  const stack = getStack(); // Get the current stack
  console.log(stack);

  // Ensure that the tableName is a string and remove any leading or trailing spaces
  const cleanedTableID = tableID.trim();

  // Find the item with the given tableName
  const foundItem = stack.find(
    (item) => item.uniqueID.trim() === cleanedTableID
  );

  if (!foundItem) {
    // If no item is found with the given tableName, return null or some other value indicating no match
    console.log("Item with tableName " + tableName + " not found.");
    return null;
  }

  return foundItem; // Return the found item, no deletion from the stack
}

function peekLastFromStack() {
  const stack = getStack(); // Assume this gets your stack

  // Return the last item without removing it
  return stack[stack.length - 1];
}

function shiftToEndOfStack(tableID) {
  const stack = getStack(); // Get the current stack

  // Ensure that the tableName is a string and remove any leading or trailing spaces
  const cleanedTableID = tableID.trim();

  // Find the index of the item with the given tableName
  const itemIndex = stack.findIndex(
    (item) => item.uniqueID.trim() === cleanedTableID
  );

  if (itemIndex === -1) {
    // If no item is found with the given tableName, return null or some other value indicating no match
    console.log("Item with tableName '" + tableName + "' not found.");
    return null;
  }

  // Remove the item from its current position
  const [itemToMove] = stack.splice(itemIndex, 1);

  // Push the item to the end of the stack
  stack.push(itemToMove);

  // Save the updated stack to localStorage
  localStorage.setItem("stack", JSON.stringify(stack));

  // Return the updated stack, or just the moved item if you prefer
  return itemToMove;
}
