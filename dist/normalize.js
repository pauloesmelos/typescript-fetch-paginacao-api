// define a interface e normaliza as propriedades vindas da API json
// observar se alguma propriedade pode ser inferida como tipo
import stringToNumber from "./stringToNumber.js";
import stringToDate from "./stringToDate.js";
export default function normalize(data) {
    return {
        nome: data.Nome,
        email: data.Email,
        id: data.ID,
        pagamento: data["Forma de Pagamento"],
        valor: stringToNumber(data["Valor (R$)"]),
        novo: Boolean(data['Cliente Novo']),
        status: data.Status,
        date: stringToDate(data.Data)
    };
}
//# sourceMappingURL=normalize.js.map