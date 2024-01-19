export type AnonymousState =
  State
  & {
    shorted_url: null | string;
  }

export type State = {
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
}