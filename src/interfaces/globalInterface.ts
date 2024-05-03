export interface LoginInterface {
    email: string;
    senha: string;
}
export interface FormatPacient {
    pac_id: number;
    base_diseases: string;
    consultation_reason: string;
    food_profile: string;
    chewing_complaint: string;
    education: string;
    status: string;
    person?: {
        first_name: string;
        last_name: string;
        cpf: string;
        birthday: string;
        gender: string;
        per_id?: string;
        use_id?: string;
        created_at?: string;
        updated_at: string
    },
    questionnaires: [
        {
            qus_id: number;
            name: string;
            purpose: string;
            sections: [
                {
                    qhs_id: number;
                    qus_id: number;
                    name: string;
                    questions:[
                        {
                            que_id:number;
                            name:string;
                            alternatives:any;
                            answer:{
                                qua_id: number;
                                alternative:number;
                            }
                        }
                    ]
                }
            ]
        },

    ]
}