const axios = require("axios");


const appid = "9b6786ba6c2cef0a18cb87b5936a0a8c"
const q = "Porto Alegre";
const code = 55;
const lang = "pt-br";
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}&code=${code}&lang=${lang}`;

async function gerarCoordenadas(url) {
    try {
        const {data} = await axios.get(url);
        console.log(
                `${`A longitude de ` + q + ` é ` + data[0].lon} ${ `e a latitude é ` + data[0].lat}. `
        );
        return { lon: data[0].lon, lat: data[0].lat};
    }catch (error){
        console.error('Erro ao gerar coordenadas:', error.message);

    }
}

async function gerarTemperatura(lon, lat){
    try {
        const {data} = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`
        );
        const feels_like = data.main.feels_like - 273.15;
        const description = data.weather[0].description;
        console.log(
            `A sensação térmica é de: ${feels_like.toFixed(2)} °C e a descrição correspondente é: ${description}`
        );
    }catch (error){
        console.error('Erro ao gerar a sensação térmica:', error.message);
    }
}

async function main() {
    const { lon, lat } = await gerarCoordenadas(url);
    await gerarTemperatura( lon, lat);
}       

main();