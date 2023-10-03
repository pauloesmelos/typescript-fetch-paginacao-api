/*1 - Acesse os dados da api: https://api.origamid.dev/json/transacoes.json

2 - Mostre em uma tabela os dados de cada transação.

3 - Calcule:

3.1 - Soma total dos valores OK

3.2 - Transações por meio de pagamento. OK

3.3 - Transações por status. OK

3.4 - Total de vendas por dia da semana. OK

3.5 - Dia da semana com mais vendas. OK

4 - Mostre as estatísticas na tela. OK

5 - Organize o código em pequenos módulos.

6 - Normalize os dados da API se achar necessário.
*/
// inicío da aplicação
import fetchAPI from "./fetchAPI.js";
import normalize from "./normalize.js";
import Estatistica from "./Estatistica.js";
const handleFetch = async () => {
    const data = await fetchAPI('https://api.origamid.dev/json/transacoes.json');
    if (data && typeof data === 'object') {
        const retorno = data.map(e => normalize(e));
        showTable('#table tbody', retorno);
        showStatistic(retorno);
        showOtherStatistics(retorno);
    }
};
handleFetch();
function showTable(selector, data) {
    const tbody = document.querySelector(selector);
    if (tbody && data) {
        data.map((element) => {
            tbody.innerHTML += `
            <tr class="tr">
               <td>${element.nome}</td>
               <td>${element.email}</td>
               <td>${element.id}</td>
               <td>${element.pagamento}</td>
               <td>${element.valor} reais</td>
               <td>${element.novo ? 'Sim' : 'Não'}</td>
               <td>${element.status}</td>
               <td>${element.date}</td>
            </tr>
         `;
        });
    }
}
function showStatistic(data) {
    const span = document.getElementById('total');
    let statistic = new Estatistica(data);
    if (span) {
        span.innerText = statistic.getTotal().toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
}
function showOtherStatistics(data) {
    let statistic = new Estatistica(data);
    const days = statistic.getPerDay(); // retorna um objeto
    const container1 = document.querySelector('.l1');
    // types
    showType('#outras-descs', 'type', statistic.getPerType(), data);
    showType('#outras-descs', 'status', statistic.getPerStatus(), data);
    // sales per day of week
    Object.keys(days).forEach((e, i) => {
        if (container1) {
            container1.innerHTML += `
            <h4 class="div-day h4-estatistica">${e}: <span class="day">${showDay(e, days)}</span></h4>
         `;
        }
    });
    // day more sales
    showMoreSales('#outras-descs', statistic.getDayMore());
}
/**
 * Função para retornar a quantidade em : tipo de pagamento ou status
 * @param selector tipo da operação a ser retornada: type | status
 * @param object objeto a ser desestruturado
 * @param data dados da API
 */
function showType(divSelector, option, object, data) {
    // função extremamente dinâmica que pode ser usado de duas maneiras diferentes
    const divContainer = document.querySelector(divSelector);
    let statistic = new Estatistica(data);
    if (divContainer) {
        Object.keys(object).forEach(e => {
            divContainer.innerHTML += `
         <div class="flex" id="div-${option}">
            <h4 class="h4-estatistica">${e}: </h4>
            <span>${object[e]}</span>
         </div>
         `;
        });
    }
}
/**
* Recebe um objeto e uma string contendo o dia e retorna a quantidade de vendas
* @param day 'Domingo'
* @param object {['Domingo']: 25, ['Segunda-Feira']: 36}
*/
function showDay(day, object) {
    let retorno = 0;
    if (day === 'Domingo') {
        retorno = object['Domingo'];
    }
    else if (day === 'Segunda-Feira') {
        retorno = object['Segunda-Feira'];
    }
    else if (day === 'Terça-Feira') {
        retorno = object['Terça-Feira'];
    }
    else if (day === 'Quarta-Feira') {
        retorno = object['Quarta-Feira'];
    }
    else if (day === 'Quinta-Feira') {
        retorno = object['Quinta-Feira'];
    }
    else if (day === 'Sexta-Feira') {
        retorno = object['Sexta-Feira'];
    }
    else if (day === 'Sábado') {
        retorno = object['Sábado'];
    }
    return retorno;
}
function showMoreSales(selector, tuple) {
    const container = document.querySelector(selector);
    if (container) {
        container.innerHTML += `
      <h4 id="div-status" class="h4-estatistica">Dia com mais venda: <span class="day">${tuple[0]}</span> </h4>
      `;
    }
}
//# sourceMappingURL=index.js.map