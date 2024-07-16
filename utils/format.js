// Helper functions for formatting data in templates

// Function to format dates into a more readable format
module.exports = {
  format_date: (date) => {
    // Create a new date instance from the passed date string or object
    const newDate = new Date(date);

    // Format and return the date as MM/DD/YYYY
    return `${
      newDate.getMonth() + 1
    }/${newDate.getDate()}/${newDate.getFullYear()}`;
  },
};
