import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(n, day, category, text, number_one, number_two, email_one, email_two) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Cliente: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: n,
              },
            },
          ],
        },
        Fecha: {
          type: 'date',
          date: {
            start: day, 
          },
        },
        Asunto: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: category,
              },
            },
          ],
        },
        'Explicación': {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: text,
              },
            },
          ],
        },
        "Teléfono 1": {
          type: 'number',
          number: number_one,
        },
        "Teléfono 2": {
          type: 'number',
          number: number_two,
        },
        'Email 1': {
          type: 'email',
          email: email_one,
        },
        'Email 2': {
          type: 'email',
          email: email_two,
        },
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

// var dataArr = {name, date, numberOne, numberTwo, emailOne, emailTwo, asunto, explain};
//var info_cliente = localStorage.getItem("info_cliente");

const info_cliente = process.env.dataArr;

// addItem("Juan Carlos Sotelo", '20230509T191442Z', "Asesoría legal", "Necesito ayuda en...", 5570096357, 5570096357, "servicio@gmail.com", "servicio@gmail.com")
addItem(info_cliente[0], info_cliente[1], info_cliente[6], info_cliente[7], info_cliente[2], info_cliente[3], info_cliente[4], info_cliente[5])

//addItem("Alan Rodrigo Vega", '20230608T191442Z', "Asunto 2", "Necesito ayuda en...", 5570096357, 5570096357, "servicio@gmail.com", "servicio@gmail.com")
