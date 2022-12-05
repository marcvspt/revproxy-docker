FROM python:3.8
LABEL maintainer="Atriox Banished atriox.contacto@gmail.com"
COPY ./requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install -r requirements.txt
COPY ./app ./
ENTRYPOINT [ "python" ]
CMD ["view.py" ]
