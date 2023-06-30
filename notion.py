import json
from flask import request
from flask import Flask, render_template
app = Flask(__name__)

token = "secret_neRBq1UwWy8byLamhhYVhw7m0sUHAN1g7KyiR9hJZEw"
databaseID = "3c9009263f8c44ebacf0778f60556e2e"

headers = {
    "Authorization": "Bearer" + token,
    "Content-Type": "application/json",
    "Notion-Version": "2.1.12" 
}

def readdatabase(databaseId, headers):
    readUrl = f"https://api.notion.com/v1/databases/{databaseId}/query"
    res = requests.request("POST", readUrl, headers=headers)
    data = res.json()
    print(res.status_code)
    # print(res.text)
    with open('./db.json', 'w', encoding='utf8') as f:
        json.dump(data, f, ensure_ascii = False)

def createPage(databaseId, headers):
    createUrl = 'https://api.notion.com/v1/pages'

    newPageData = {
            "parent":{
                    "database_id": databaseID,
                },
                "properties": {
                    "Nombre": {
                        "title": [
                            {
                                "text": {
                                    "content": "nombre"
                                }
                            }
                        ]
                    },
                    "Asunto":{
                        "rich_text": [
                            {
                                "text": {
                                    "content": "asunto"
                                }
                            }
                        ] 
                    },
                    "Fecha de la Cita":{
                        "date": "fecha"
                    },
                    "Hora":{
                        "rich_text": [
                            {
                                "text": {
                                    "content":"hora"
                                }
                            }
                        ]
                    },
                    "Correo Electronico 1":{
                        "rich_text": [
                            {
                                "text": {
                                    "content": "email1"
                                }
                            }
                        ]
                    },
                    "Correo Electronico 2":{
                        "rich_text": [
                            {
                                "text": {
                                    "content": "email2"
                                }
                            }
                        ]
                    },
                    "Telefono 1":{
                        "rich_text": [
                            {
                                "text": {
                                    "content": "telefono1"
                                }
                            }
                        ]
                    },
                    "Telefono 2":{
                        "rich_text": [
                            {
                                "text": {
                                    "content": "telefono2"
                                }
                            }
                        ]
                    },
                    "Resumen":{
                        "rich_text": [
                            {
                                "text": {
                                    "content": "resumen"
                                }
                            }
                        ]
                    }
                }
            }

    data = json.dumps(newPageData)
    #print(str(uploadData))
    
    res = requests.request("POST", createUrl, headers = headers, data = data)

    print(res.status_code)
    print(res.text) 