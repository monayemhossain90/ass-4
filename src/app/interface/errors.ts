export type TErrorPaths = {
  path: string | number;
  message: string;
}[];

export type TErrorPayload = {
  statusCode: number;
  message: string;
  errorSources: TErrorPaths;
};
