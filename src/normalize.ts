// define a interface e normaliza as propriedades vindas da API json
// observar se alguma propriedade pode ser inferida como tipo

declare global { // declare global {} tem que ser exportado pra funcionar
    type PaymentForm = 'Boleto' | 'Cartão de Crédito';
    interface TransactionAPI { // brute
        Nome: string;
        Email: string;
        ID: number;
        ['Forma de Pagamento']: PaymentForm;
        ['Valor (R$)']: string;
        ['Cliente Novo']: number;
        Status: string;
        Data: string;
    }
    interface Transaction { //normalized
        nome: string;
        email: string;
        id: number;
        pagamento: PaymentForm;
        valor: number;
        novo: boolean;
        status: string;
        date: Date;
    }
}

import stringToNumber from "./stringToNumber.js";
import stringToDate from "./stringToDate.js";

export default function normalize(data: TransactionAPI): Transaction {
     return {
        nome: data.Nome,
        email: data.Email,
        id: data.ID,
        pagamento: data["Forma de Pagamento"],
        valor: stringToNumber(data["Valor (R$)"]),
        novo: Boolean(data['Cliente Novo']),
        status: data.Status,
        date: stringToDate(data.Data)
    }
}