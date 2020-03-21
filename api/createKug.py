#! /usr/bin/python

from http.server import BaseHTTPRequestHandler
import os
import pdfrw

TEMPLATE_PATH = '../pdf-templates/antrag-kug.pdf'
OUTPUT_PATH = 'kug.pdf'

data_dict = {}

ANNOT_KEY = '/Annots'
ANNOT_FIELD_KEY = '/TU'
ANNOT_VAL_KEY = '/V'
ANNOT_RECT_KEY = '/Rect'
SUBTYPE_KEY = '/Subtype'
WIDGET_SUBTYPE_KEY = '/Widget'


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        template_pdf = pdfrw.PdfReader(TEMPLATE_PATH)

        # print template_pdf.pages[0]
        annotations = template_pdf.pages[0][ANNOT_KEY]
        for annotation in annotations:
            # print annotation

            if annotation[SUBTYPE_KEY] == WIDGET_SUBTYPE_KEY:
                if annotation[ANNOT_FIELD_KEY]:
                    key = annotation[ANNOT_FIELD_KEY][1:-1]

                    # if key in data_dict.keys():
                    annotation.update(
                        pdfrw.PdfDict(V='{}'.format('HAAALLLOOOO'))
                    )

        pdfrw.PdfWriter().write(OUTPUT_PATH, template_pdf)
