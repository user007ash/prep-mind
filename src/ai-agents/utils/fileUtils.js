
/**
 * Utility functions for file handling
 */

/**
 * Read content from a File object
 * @param {File} file - The file to read
 * @returns {Promise<string>} - The file content
 */
export const readFileContent = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
