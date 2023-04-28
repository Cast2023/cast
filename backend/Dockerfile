FROM python:3.10-alpine

ENV PYTHONBUFFERED 1

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

ENTRYPOINT [ "./django.sh" ]