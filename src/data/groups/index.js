// Junté los 8 grupos en un solo array, en el orden en que se muestran en el Home.
// Para editar el contenido de un grupo puntual, andá directo a su archivo
// (ticketapp.js, serviapp.js, etc.), así no hace falta tocar este archivo.

import ticketapp from "./01-ticketapp";
import serviapp from "./02-serviapp";
import taskboard from "./03-taskboardapp";
import devmatch from "./04-devmatch";
import agendaapp from "./05-agendaapp";
import chatapp from "./06-chatapp";
import dataapp from "./07-dataapp";
import searchapp from "./08-searchapp";

export const groups = [
    ticketapp,
    serviapp,
    taskboard,
    devmatch,
    agendaapp,
    chatapp,
    dataapp,
    searchapp,
];

export { evaluacionComun } from "./evaluacionComun";