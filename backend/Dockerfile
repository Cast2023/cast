FROM python:3.9-alpine

ENV PYTHONBUFFERED 1

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt
RUN chmod +x docker-entrypoint.sh

ENTRYPOINT [ "./docker-entrypoint.sh" ]