export function getUniqueEmail() {
  const token = new Date().getTime();
  return `user_${token}@testemail.com`;
}