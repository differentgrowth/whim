export type CreateInitialState =
  | {
  error: string | null;
}
  | undefined;

export type AnonymousInitialState =
  | {
  error: null | string;
  shorted_url: null | string;
}
  | undefined

export type AuthenticateInitialState =
  | {
  error: null | string;
}
  | undefined