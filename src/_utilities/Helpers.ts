export function setCookie(name: string, val: string) {
  const date = new Date();
  const value = val;

  // Set it expire in 7 days
  date.setTime(date.getTime() + 1000 * 60 * 60);

  // Set it
  document.cookie =
    name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift()?.trim();
  }
}

export function deleteCookie(name: string) {
  const date = new Date();

  // Set it expire in -1 days
  date.setTime(date.getTime() + -1 * 24 * 60 * 60 * 1000);

  // Set it
  document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}

export const getInitials = (name: string): string => {
  if (!name || name.length === 0 || !name.includes(" ")) return "";
  const splitedName = name.split(" ");
  return `${splitedName[0].charAt(0)}${splitedName[1].charAt(0)}`;
};