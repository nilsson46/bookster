/**
 * Taking care of the token and checks if the user is admin or not.
 */

export const ROLE_ADMIN = "ADMIN";

export function getUserRole(): string | null {
  const token = localStorage.getItem("accessToken");

  if (token) {
    const splittedToken = token.split('.')
    const decodedToken = atob(splittedToken[1]);
    const payload = JSON.parse(decodedToken);
    return payload.role;
  } else {
    console.log("Token not found in localStorage");
    return null;
  }
}

export const isAdmin = () => getUserRole() === ROLE_ADMIN;