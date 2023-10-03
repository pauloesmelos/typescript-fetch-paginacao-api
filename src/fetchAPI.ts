export default async function fetchAPI<Interface>(url: string): Promise<Interface | null> {
    try {
        const data = await fetch(url);
        if(!data.ok){
            throw new Error ('Houve um erro na requisição de dados');
        }
        return await data.json();
    }
    catch(erro) {
        console.log(erro);
        return null;
    }
}