async function addData(nombre, asunto, fecha, hora, email1, email2, telefono1, telefono2, resumen){
    const Client = require('@notionhq/client').Client;
        NOTION_KEY = "secret_neRBq1UwWy8byLamhhYVhw7m0sUHAN1g7KyiR9hJZEw";
        NOTION_CLIENT = new Client({auth : NOTION_KEY});
        DATABASE_ID = "3c9009263f8c44ebacf0778f60556e2e";

    try{
        const response = await NOTION_CLIENT.pages.create({
            parent:{
                database_id: DATABASE_ID,
            },
            properties: {
                'Nombre': {
                    type: 'title',
                    title: [
                        {
                            type:'text',
                            text: {
                                content: nombre,
                            },
                        },
                    ],
                },
                'Asunto':{
                    type: 'rich_text',
                    rich_text: [
                        {
                            type:'text',
                            text: {
                                content: asunto,
                            },
                        }
                    ], 
                },
                'Fecha de la Cita':{
                    type: 'date',
                    date: fecha
                },
                'Hora':{
                    type: 'rich_text',
                    rich_text: [
                        {
                            type:'text',
                            text: {
                                content:hora,
                            },
                        }
                    ], 
                },
                'Correo Electronico 1':{
                    type: 'rich_text',
                    rich_text: [
                        {
                            type:'text',
                            text: {
                                content: email1,
                            },
                        }
                    ], 
                },
                'Correo Electronico 2':{
                    type: 'rich_text',
                    rich_text: [
                        {
                            type:'text',
                            text: {
                                content: email2,
                            },
                        }
                    ], 
                },
                'Telefono 1':{
                    type: 'rich_text',
                    rich_text: [
                        {
                            type:'text',
                            text: {
                                content: telefono1,
                            },
                        }
                    ], 
                },
                'Telefono 2':{
                    type: 'rich_text',
                    rich_text: [
                        {
                            type:'text',
                            text: {
                                content: telefono2,
                            },
                        }
                    ], 
                },
                'Resumen':{
                    type: 'rich_text',
                    rich_text: [
                        {
                            type:'text',
                            text: {
                                content: resumen,
                            },
                        }
                    ], 
                },
            }
        });
        console.log(response);
    }
    catch(error){
        console.error(error.body);
    }
};

//export {addData}