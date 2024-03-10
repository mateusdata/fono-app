export interface LoginInterface {
    email: string;
    senha: string;
}
export interface FormatPacient {
    person?: {
        first_name: string;
        last_name: string;
        cpf: string;
        birthday: string;
        gender: string;
      };
}