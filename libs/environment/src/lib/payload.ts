export interface Payload {
  user: User;
  rejected?: RejectedFragment;
  resolved?: ResolveFragment;
  ended: boolean;
}

interface User {
  id?: string;
  name?: string;
  pass?: string;
  rol?: string;
  valid: boolean;
  token?: string;
}

interface RejectedFragment {
  reason: string;
  code: string;
}

interface ResolveFragment {
  code: string;
  data: unknown;
}
