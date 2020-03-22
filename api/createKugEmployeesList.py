#! /usr/bin/python

from http.server import BaseHTTPRequestHandler
import os
import pdfrw
import json

TEMPLATE_PATH = './pdf-templates/kug108.pdf'
OUTPUT_PATH = 'kug-employee-list.pdf'

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/TU'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_len = int(self.headers.get('Content-Length'))
        requestBody = json.loads(self.rfile.read(content_len).decode())
        print(requestBody)

        # requestBody = {
        #     "employees": [
        #     {
        #         "currentSalaryAfterTax": "675,36",
        #         "currentSalaryBeforeTax": "1.250,00",
        #         "hasChildren": False,
        #         "insuranceNumber": "VD-323850234923",
        #         "lostHours": "10",
        #         "name": "Mustermann, Max",
        #         "regularSalaryAfterTax": "1.295,11",
        #         "regularSalaryBeforeTax": "2.500,00",
        #         "taxClass": 1
        #     },
        #     {
        #         "currentSalaryAfterTax": "675,36",
        #         "currentSalaryBeforeTax": "1.250,00",
        #         "hasChildren": False,
        #         "insuranceNumber": "VD-323850233333",
        #         "lostHours": "10",
        #         "name": "Musterfrau, Maxi",
        #         "regularSalaryAfterTax": "1.295,11",
        #         "regularSalaryBeforeTax": "2.500,00",
        #         "taxClass": 1
        #     }
        #   ]
        # }        

        data_dict = {
            #TODO use dynamic data from user
            'Die 9-stellige Stamm-Nr. Kug besteht\r1\) aus dem vorbelegten Buchstaben K und 2\) aus dem 8-stelligen Ausfüllfeld. Bitte Stamm-Nr. Kug eingeben': '111223344', # Stamm-Nr. Kug
            'Ableitungs-Nr. vierstellig': '1234', # Ableitungs-Nr
            'Abrechnungsmonat:': 'März'
        }

        for employeeNumber, employee in enumerate(requestBody["employees"], start=1):
            # calculate dynamic values
            rowNumber = employeeNumber + 2
            if employee["hasChildren"]:
                leistungsSatz = 1
            else:
                leistungsSatz = 2
            kug = round(employee["regularSalaryAfterTax"] - employee["currentSalaryAfterTax"], 2)
            #TODO take care of lost hours due to ilness
            lostHoursTotal = employee["lostHours"]

            # fill data dictrionay
            data_dict[f"Reihe {rowNumber} Spalte 1: Hier wird automatisch die laufende Nummer eingetragen"] = employeeNumber
            data_dict[f"Reihe {rowNumber} Spalte 2: Name, Vorname"] = employee["name"]
            data_dict[f"Reihe {rowNumber} Spalte 2: Versicherungsnummer 12-stellig"] = employee["insuranceNumber"]
            #TODO data_dict[f"Reihe {rowNumber} Spalte 2: Faktor 0,"] = employee[""]
            #TODO data_dict[f"Reihe {rowNumber} Spalte 2: Geben Sie die restlichen drei Ziffern bezüglich des Faktors ein"] = employee[""]
            data_dict[f"Reihe {rowNumber} Spalte 3: Umfang des Arbeitsausfalls: Anzahl der Kug-Ausfallstunden"] = employee["lostHours"]
            data_dict[f"Reihe {rowNumber} Spalte 3: Umfang des Arbeitsausfalls: Anzahl der Krankengeldstunden"] = "0"
            data_dict[f"Reihe {rowNumber} Spalte 3: Umfang des Arbeitsausfalls: Hier werden die Kug-Ausfallstunden und die Krankengeldstunden automatisch summiert"] = lostHoursTotal
            data_dict[f"Reihe {rowNumber} Spalte 4: Soll-Entgelt \(ungerundet\)"] = employee["regularSalaryBeforeTax"]
            data_dict[f"Reihe {rowNumber} Spalte 5: Ist-Entgelt \(ungerundet\)"] = employee["currentSalaryBeforeTax"]
            data_dict[f"Reihe {rowNumber} Spalte 6: Lohnsteuerklasse"] = employee["taxClass"]
            data_dict[f"Reihe {rowNumber} Spalte 6: Leistungssatz 1 oder 2"] = leistungsSatz
            data_dict[f"Reihe {rowNumber} Spalte 7: Rechnerischer Leistungssatz für das Soll-Entgelt \(Spalte 4\) lt. Tabelle"] = employee["regularSalaryAfterTax"]
            data_dict[f"Reihe {rowNumber} Spalte 8: Rechnerischer Leistungssatz für das Ist-Entgelt \(Spalte 5\) lt. Tabelle"] = employee["currentSalaryAfterTax"]
            #TODO data_dict[f"Reihe {rowNumber} Spalte 9: Durchschnittliche Leistung pro Stunde \(Spalte 7 ./. Spalte 8: Insgesamtstunden aus Spalte 3\)"] = employee[""]
            data_dict[f"Reihe {rowNumber} Spalte 10: Auszuzahlendes Kug \(Spalte 7 ./. Spalte 8\) oder Kug-Stunden Spalte 3 x durchschnittliche Leistung \(Spalte 9\)"] = kug   

        template_pdf = pdfrw.PdfReader(TEMPLATE_PATH)

        # print template_pdf.pages[0]
        annotations = template_pdf.pages[0][ANNOT_KEY]
        for annotation in annotations:
            # print annotation

            if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                if annotation[ANNOT_FIELD_KEY]:
                    key = annotation[ANNOT_FIELD_KEY][1:-1]

                    # print(key)
                    if key in data_dict.keys():
                        print("Edit field: " + key)
                        annotation.update(
                            pdfrw.PdfDict(V='{}'.format(data_dict[key]))
                        )

        self.send_response(200, 'SUCCESS')
        self.send_header('Content-Type', 'application/pdf')
        self.send_header('Content-Disposition',
                         'attachment; filename="kug-antrag.pdf"')

        self.end_headers()

        pdfrw.PdfWriter().write(self.wfile, template_pdf)

        return

    def do_OPTIONS(self) :

        origin = self.headers.get('origin')

        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", origin)
        self.send_header("Access-Control-Allow-Methods", "GET, POST")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

        self.wfile.write(bytes("\n", 'utf-8'))