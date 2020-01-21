export type AuthPayload = {
  uid: string;
  expiredAt: string;
  status: SessionStatus;
};

export enum SessionStatus {
  Login = 1,
  Logout = 2,
}
