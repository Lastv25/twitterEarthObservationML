FROM python:3.8.1-alpine

WORKDIR /tweet_monitoring_service

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1

COPY ./requirements.txt /tweet_monitoring_service/requirements.txt

RUN set -eux \
  && apk add --no-cache --virtual .build-deps build-base \
     libressl-dev libffi-dev gcc geos-dev musl-dev python3-dev \
     libc-dev libxslt-dev libxml2-dev bash \
     postgresql-dev \
  && pip install --upgrade pip setuptools wheel \
  && pip install -r /tweet_monitoring_service/requirements.txt \
  && rm -rf /root/.cache/pip

COPY . /tweet_monitoring_service