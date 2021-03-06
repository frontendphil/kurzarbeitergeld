#! /usr/bin/python

from http.server import BaseHTTPRequestHandler
import os
import pdfrw

TEMPLATE_PATH = '../pdf-templates/kug107.pdf'
OUTPUT_PATH = 'kug107_filled.pdf'

requestBody = {
    "employees": [
        {
            "currentSalaryAfterTax": "",
            "currentSalaryBeforeTax": "",
            "hasChildren": False,
            "insuranceNumber": "",
            "lostHours": "",
            "name": "",
            "regularSalaryAfterTax": "",
            "regularSalaryBeforeTax": "",
            "taxClass": 1
        }
    ],
    "general": {
        "agency": {
            "AA Bezirk": "Potsdam",
            "Anschrift": "Horstweg 102-108",
            "Bezeichnung": "Jobcenter Potsdam",
            "Ort": "Potsdam",
            "PLZ": "14478"
        },
        "bankName": "",
        "bic": "",
        "city": "Berlin",
        "email": "",
        "iban": "",
        "name": "Test Corp.",
        "streetName": "Huh",
        "streetNumber": "32",
        "zipCode": "43528"
    }
}

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

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/TU'
ANNOT_OPTIONS_KEY = '/NM'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'

template_pdf = pdfrw.PdfReader(TEMPLATE_PATH)

# print template_pdf.pages[0]
annotations = template_pdf.pages[1][ANNOT_KEY]
# print(annotations)
for annotation in annotations:
    # print(annotation)

    if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
        if annotation[ANNOT_FIELD_KEY]:
            key = annotation[ANNOT_FIELD_KEY][1:-1]

            # print(key)
            if key == "Zutreffendes bitte ankreuzen!":
                print(annotation)

            if len(key) > 15:
                key = key[0:15]
            if key in data_dict.keys():
                print("Edit field: " + key)
                annotation.update(
                    pdfrw.PdfDict(V='{}'.format(data_dict[key]))
                )
        if annotation[ANNOT_OPTIONS_KEY]:
            key = annotation[ANNOT_OPTIONS_KEY][1:-1]

            print(key)
            # print(annotation)
            if key == 'Kug107[0].Seite2[0].TeilformularErklaerPkt5[0].Optionen5[0].nein[0]':
                annotation.update(
                    pdfrw.PdfDict(V='{}'.format("/1"))
                )
                print(annotation)


            # if len(key) > 15:
            #     key = key[0:15]
            # if key in data_dict.keys():
            #     print("Edit field: " + key)
            #     annotation.update(
            #         pdfrw.PdfDict(V='{}'.format("/1"))
            #     )
            #     print(annotation)

pdfrw.PdfWriter().write(OUTPUT_PATH, template_pdf)

