FROM python:3.9-slim

ENV PYTHONBUFFERED 1

WORKDIR /app

ADD . /app

RUN pip install -r requirements.txt
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT [ "./docker-entrypoint.sh" ]