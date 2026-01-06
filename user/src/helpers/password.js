import zxcvbn from "zxcvbn";

export function calculatePasswordStrength(password) {
  const { score } = zxcvbn(password);

  switch (score) {
    case 0:
    case 1:
      return {
        label: "weak",
        message:
          "Your password is not strong enough. To secure your account, avoid common words, names, dates, and repeating characters.",
      };
    case 2:
      return {
        label: "fair",
        message:
          "Your password works, but could be stronger. Try making it longer.",
      };
    case 3:
      return {
        label: "good",
        message:
          "This is a good password. Try adding a few more characters to make it even harder to guess.",
      };
    case 4:
      return {
        label: "strong",
        message: "Nice work. This is an excellent password.",
      };
  }
}

export function generateRandomPassword(
  length,
  hasNumbers,
  hasSymbols,
  hasLowercase,
  hasUppercase
) {
  const typeCount = hasNumbers + hasSymbols + hasLowercase + hasUppercase;

  let password = "";
  for (let i = 0; i < length; i += typeCount) {
    if (hasNumbers)
      password += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    if (hasSymbols)
      password += "^!$%&|[](){}:;.,*+-#@<>~"[Math.floor(Math.random() * 24)];
    if (hasLowercase)
      password += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    if (hasUppercase)
      password += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  return [...password].sort(() => Math.random() - 0.5).join("");
}
