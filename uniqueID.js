function generateUniqueId() {
  // Get the current time in milliseconds and a random number
  const timestamp = new Date().getTime(); // Current time in milliseconds
  const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999

  // Concatenate timestamp and random number to create a unique ID
  const uniqueId = `${timestamp}-${randomNumber}`;

  return uniqueId;
}


