interface ICreateUserTokenDTO {
  id_user: string;
  refresh_token: string;
  expires_date: Date;
}

export { ICreateUserTokenDTO }