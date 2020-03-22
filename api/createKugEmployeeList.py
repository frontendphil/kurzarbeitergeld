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

        #TODO map requestBody to data_dict
        # requestBody = {
        #     "employees": [
        #         {
        #             "currentSalaryAfterTax": "",
        #             "currentSalaryBeforeTax": "",
        #             "hasChildren": False,
        #             "insuranceNumber": "",
        #             "lostHours": "",
        #             "name": "",
        #             "regularSalaryAfterTax": "",
        #             "regularSalaryBeforeTax": "",
        #             "taxClass": 1
        #         }
        #     ],
        #     "general": {
        #         "agency": {
        #             "AA Bezirk": "Potsdam",
        #             "Anschrift": "Horstweg 102-108",
        #             "Bezeichnung": "Jobcenter Potsdam",
        #             "Ort": "Potsdam",
        #             "PLZ": "14478"
        #         },
        #         "bankName": "",
        #         "bic": "",
        #         "city": "Berlin",
        #         "email": "",
        #         "iban": "",
        #         "name": "Test Corp.",
        #         "streetName": "Huh",
        #         "streetNumber": "32",
        #         "zipCode": "43528"
        #     }
        # }        


        data_dict = {
            'Die 9-stellige Stamm-Nr. Kug besteht\r1\) aus dem vorbelegten Buchstaben K und 2\) aus dem 8-stelligen Ausfüllfeld. Bitte Stamm-Nr. Kug eingeben': '111223344', # Stamm-Nr. Kug
            'Ableitungs-Nr. vierstellig': '1234', # Ableitungs-Nr
            'Abrechnungsmonat': 'März',
            'Reihe 3 Spalte 1:': '1',
            'Reihe 3 Spalte 2: Name, Vorname': 'Mustermann, Max',
            'Reihe 3 Spalte 2: Versicherungsnummer 12-stellig': 'VD-323850234923',
            'Reihe 3 Spalte 2: Faktor 0,': '21',
            'Reihe 3 Spalte 2: Geben Sie die restlichen drei Ziffern bezüglich des Faktors ein': '123',
            'Reihe 3 Spalte 3: Umfang des Arbeitsausfalls: Anzahl der Kug-Ausfallstunden': '30',
            'Reihe 3 Spalte 3: Umfang des Arbeitsausfalls: Anzahl der Krankengeldstunden': '0',
            # 'Reihe 3 Spalte 3: Umfang des Arbeitsausfalls: Hier werden die Kug-Ausfallstunden und die Krankengeldstunden automatisch summiert': '30',
            'Reihe 3 Spalte 4: Soll-Entgelt \(ungerundet\)': ' 2.500,00',
            'Reihe 3 Spalte 5: Ist-Entgelt \(ungerundet\)': '1.250,00',
            'Reihe 3 Spalte 6: Lohnsteuerklasse': 'III',
            'Reihe 3 Spalte 6: Leistungssatz 1 oder 2': '1',
            'Reihe 3 Spalte 7: Rechnerischer Leistungssatz für das Soll-Entgelt \(Spalte 4\) lt. Tabelle': '1.295,11',
            'Reihe 3 Spalte 8: Rechnerischer Leistungssatz für das Ist-Entgelt \(Spalte 5\) lt. Tabelle': '675,36',
            'Reihe 3 Spalte 9: Durchschnittliche Leistung pro Stunde \(Spalte 7 ./. Spalte 8: Insgesamtstunden aus Spalte 3\)': '150',
            'Reihe 3 Spalte 10: Auszuzahlendes Kug \(Spalte 7 ./. Spalte 8\) oder Kug-Stunden Spalte 3 x durchschnittliche Leistung \(Spalte 9\)': '619,75'
        }

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