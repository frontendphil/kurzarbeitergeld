#! /usr/bin/python

from http.server import BaseHTTPRequestHandler
import os
import pdfrw
import json

TEMPLATE_PATH = './pdf-templates/kug107.pdf'
OUTPUT_PATH = 'kug-form.pdf'

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
        #         "zipCode": "43528",
        #         "currentSalarySum": 10000.00, 
        #         "regularSalarySum": 20000.00, 
        #         "employeesCount": 100,
        #         "maleEmployeesCount": 60,
        #         "femaleEmployeesCount": 40
        #     }
        # }        

        # prepare pdf values
        agency_string = (
            f"{requestBody['general']['agency']['Bezeichnung']}; {requestBody['general']['agency']['Anschrift']}; "
            f"{requestBody['general']['agency']['PLZ']}, {requestBody['general']['agency']['Ort']}"
        )

        company_string = (
            f"""
            {requestBody['general']['name']}
            {requestBody['general']['streetName']} {requestBody['general']['streetNumber']}
            {requestBody['general']['zipCode']} {requestBody['general']['city']}
            """
        )

        kugTotal = round(requestBody["general"]["regularSalarySum"] - requestBody["general"]["currentSalarySum"], 2)

        # set template values
        data_dict = {
            #TODO use dynamic data from user
            'Die 9-stellige ': '111223344', # Stamm-Nr. Kug
            '4-stellige Able': '1234', # Ableitungs-Nr
            '8-stellige Betr': 'BA123423', # Betriebsnummer
            'Abrechnungsmona': 'März',
            # 'Bezeichnung der': 'Super Abteilung', # Betriebsabteilung
            # 'Anschrift der L': '', # Lohnabrechnungsstelle

            # map input data
            'Postleitzahl un': agency_string, # Agentur für Arbeit
            'Bezeichnung und': company_string, # Arbeitgeber
            'Telefon-Nr.': requestBody["general"]["phone"],  
            'Telefax-Nr.': requestBody["general"]["fax"],
            'E-Mail': requestBody["general"]["email"],
            'BIC': requestBody["general"]["bic"],
            'IBAN': requestBody["general"]["iban"],
            'Kreditinstitut': requestBody["general"]["bankName"],
            'Gesamtzahl der ': requestBody["general"]["employeesCount"],  # Beschäftigten
            'männlich': requestBody["general"]["femaleEmployeesCount"],
            'weiblich': requestBody["general"]["maleEmployeesCount"],
            'Summe Soll-Entg': requestBody["general"]["regularSalarySum"],
            'Summe Ist-Entge': requestBody["general"]["currentSalarySum"],
            'Kug in Höhe von': kugTotal,
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
                    if len(key) > 15:
                        key = key[0:15]
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