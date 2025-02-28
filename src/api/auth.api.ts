export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function checkRegistration(address: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/exists/${address}`);
    return res.ok;
  } catch (error) {
    console.error("Error checking registration:", error);
    return false;
  }
}

export async function registerUser(userData: {
  name: string;
  surnames: string;
  email: string;
  username: string;
  walletAddress: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return res.ok;
  } catch (error) {
    console.error("Registration failed:", error);
    return false;
  }
}

export async function loginUser(email: string) {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      console.error("Login failed.");
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
