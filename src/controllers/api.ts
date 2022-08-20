import axios from 'axios';

export default async function api<PathType, DataType, ResponseData>(
  method: string,
  url: string,
  path?: PathType,
  data?: DataType,
  auth?: string
) {
  try {
    return await axios.request<ResponseData>({
      method: method,
      url: url + `${path ? path : ''}`,
      headers:
        auth
          ? {
              Authorization: 'Bearer ' + auth,
            }
          : {},
      data: data ? data : {},
    });
  } catch (error) {
    throw new Error(`${error}`);
  }
}

