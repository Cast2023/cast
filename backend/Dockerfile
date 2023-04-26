FROM python:3.10-alpine

ENV PYTHONBUFFERED 1
ENV PYTHONPATH=/usr/lib/python3.10/site-packages

RUN apk update && apk add --no-cache --update \
    py3-pandas

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

ENTRYPOINT [ "./django.sh" ]