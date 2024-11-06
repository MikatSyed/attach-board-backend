import { Response } from 'express'

type IApiReponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}

const sendReponse = <T>(res: Response, data: IApiReponse<T>): void => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  }

  res.status(data.statusCode).json(responseData)
}

export const sendLoginResponse = <T>(res: Response, response: {
  statusCode: number;
  success: boolean;
  message: string;
  token: string;
}) => {
  res.status(response.statusCode).json({
    statusCode: response.statusCode,
    success: response.success,
    message: response.message,
    token: response.token,
  });
};


export default sendReponse
