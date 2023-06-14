FROM python:3.11-alpine
LABEL maintainer="Atriox Banished atriox.banished@hotmail.com"
WORKDIR /app
RUN pip install flask
COPY ./app ./
ENTRYPOINT [ "python" ]
CMD ["view.py" ]