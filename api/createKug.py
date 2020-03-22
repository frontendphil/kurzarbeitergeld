#! /usr/bin/python

from http.server import BaseHTTPRequestHandler
import os
import pdfrw
import json

TEMPLATE_PATH = './pdf-templates/antrag-kug.pdf'
OUTPUT_PATH = 'kug.pdf'

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

        data_dict = {
            'Die 9-stellige ': '111223344', # Stamm-Nr. Kug
            '4-stellige Able': '1234', # Ableitungs-Nr
            '8-stellige Betr': 'BA123423', # Betriebsnummer
            'Postleitzahl un': requestBody["general"]["agency"]["Anschrift"] + ", " + requestBody["general"]["agency"]["Ort"], # Agentur für Arbeit
            'Bezeichnung und': requestBody["general"]["name"] + requestBody["general"]["city"], # Arbeitgeber
            'Anschrift der L': '', # Lohnabrechnungsstelle
            'Telefon-Nr.': '0123456789',
            'Telefax-Nr.': '0123456789',
            'E-Mail': requestBody["general"]["email"],
            'BIC': requestBody["general"]["bic"],
            'IBAN': requestBody["general"]["iban"],
            'Kreditinstitut': requestBody["general"]["bankName"],
            # 'Korrektur-Leist': '',
            # 'Zutreffendes bi': '',
            'Bezeichnung der': 'Super Abteilung', # Betriebsabteilung
            'Gesamtzahl der ': '100',  # Beschäftigten
            'männlich': 'x',
            'weiblich': 'x',
            'Summe Soll-Entg': '2000',
            'Summe Ist-Entge': '1500',
            'Abrechnungsmona': 'März',
            'Kug in Höhe von': '1000',
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