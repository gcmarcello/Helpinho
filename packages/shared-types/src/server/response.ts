import { User, Helpinho } from "..";

export interface SignupResponse {
  name: string;
  email: string;
  token: string;
}

export interface LoginResponse {
  name: string;
  email: string;
  token: string;
}

export type UserInfoResponse = User;

export type UserHelpHelpinhoResponse = {
  helpinhos: Helpinho[];
  helps: Helpinho[];
};

export type CreateHelpinhoResponse = Helpinho;

export type GetUploadLinkResponse = { url: string };
