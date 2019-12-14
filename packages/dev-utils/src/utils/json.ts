export type Primative =
  | boolean
  | number
  | string
  | null
  | (boolean | number | string | null)[];

// https://github.com/microsoft/TypeScript/issues/3496#issuecomment-128553540
export type JSONValue = Primative | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {} // eslint-disable-line @typescript-eslint/no-empty-interface
