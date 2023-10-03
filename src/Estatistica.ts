interface Chave { // interface quantidade total pra cada tipo de pagamento
    [key: string]: number;
}
const DaysWeek = { // objeto que será iterado pra retornar a quandidade de vendas por dia
    ['Domingo']: 0,
    ['Segunda-Feira']: 0,
    ['Terça-Feira']: 0,
    ['Quarta-Feira']: 0,
    ['Quinta-Feira']: 0,
    ['Sexta-Feira']: 0,
    ['Sábado']: 0
}

export default class Estatistica {
    data;
    total;
    constructor(data: Transaction[]) {
        this.data = data;
        this.total = 0;
    }
    /**
    * retorna o total de vendas
    */
    public getTotal() {
        this.total = this.data.reduce((acumulador,item) => {
            return acumulador + item.valor;
        }, 0);
        return this.total;
    }
    
    /**
    * Função auxiliar
    * count(['boleto','boleto','cartão']) -> {boleto: 2, ['cartão']: 1}
    * count(['pago','não pago']) -> {pago: 1, ['não pago']: 1}
    * função auxiliar usada nos métodos de obter quantidade de vendas por status e por tipo
    */
    private count(data: Array<string | number>) {
        // isolando apenas as propriedades que eu quero tratar (tipo pagamento e quantidade de pagamento em cada)
        const retorno = data.reduce((ac: Chave,element) => {
            if(ac[element]) {
                ac[element] += 1
            }
            else {
                ac[element] = 1;
            }
            return ac;
        }, {});
        return retorno;
    }
    public getPerType() {
        const payemnt = this.data.map(e => e.pagamento);
        return this.count(payemnt);
    }
    public getPerStatus() {
        const status = this.data.map(e => e.status);
        return this.count(status);
    }
    /**
    * {Segunda: 2
    * Terça: 15}
    * ...
    */
    public getPerDay() {
        for(let i = 0; i < this.data.length; i++) {
            if(this.data[i].date.getDay() === 0) {
                DaysWeek['Domingo']++;
            }
            else if(this.data[i].date.getDay() === 1) {
                DaysWeek['Segunda-Feira']++;
            }
            else if(this.data[i].date.getDay() === 2) {
                DaysWeek['Terça-Feira']++;
            }
            else if(this.data[i].date.getDay() === 3) {
                DaysWeek['Quarta-Feira']++;
            }
            else if(this.data[i].date.getDay() === 4) {
                DaysWeek['Quinta-Feira']++;
            }
            else if(this.data[i].date.getDay() === 5) {
                DaysWeek['Sexta-Feira']++;
            }
            else if(this.data[i].date.getDay() === 6) {
                DaysWeek['Sábado']++;
            }
        }
        return DaysWeek;
    }
    /**
    * ['Terça', 55];
    */
    public getDayMore() { // values keys entries
        //console.log(this.getPerDay());
        const more = Object.entries(this.getPerDay()).sort((a,b) => b[1] - a[1])[0]; // tuplas ordenadas
        return more;
    }
}