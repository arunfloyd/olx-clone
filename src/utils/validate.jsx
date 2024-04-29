export const validateInput = (email, password, username) => {
  const isEmailValid =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
      password
    );
  const isValidName = /^[a-zA-Z]{3,}(?: [a-zA-Z]+)*$/.test(username);

  if (!isValidName) return "Enter a Valid Full Name";
  if (!isEmailValid) return "Email is not Valid";
  if (!isPasswordValid)
    return "Password Should Contain 8 with Upper & Lower case with Number";
  return null;
};
const isImageFile = (fileName) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"]; // Add more extensions if needed
  const extension = fileName.split(".").pop().toLowerCase();
  return imageExtensions.includes(extension);
};
export const validateAd = (title, category, description, price, photo) => {
  const isValidTitle = /^\S.{9,}$/.test(title);
  const isValidCategory = /\S/.test(category);
  const isValidDescription = /^(\S+\s*){10,}$/.test(description);
  const isValidPrice = /^\d+(\.\d+)?$/.test(price);

  if (!isValidTitle) return "Enter a Valid Title with more than 10 Character";
  if (!isValidCategory) return "Please select a category";
  if (!isValidDescription) return "Enter atleast 10 words or more";
  if (!isValidPrice) return "Enter a Valid Price ";
  if (!isImageFile(photo)) return "Enter a Valid Photo ";

  return null;
};
