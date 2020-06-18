export interface UserResponse {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    employee_id: number | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    created_by: Date;
    updated_by: Date;
    session_id: number | null;
    branch_id: number | null;
    user_id: number | null;
    banned_at: Date;
  };
  token: string;

}

export interface AuthUser {
  id: number;
  name: string;
  username: string;
  email: string;
  branchId: number;
  token: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
