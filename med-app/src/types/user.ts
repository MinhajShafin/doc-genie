export interface User {
  _id?: string;
  email: string;
  password: string;
  role: "patient" | "doctor";
}
