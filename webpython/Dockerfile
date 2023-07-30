FROM python:3.11-slim
LABEL maintainer="Marcvs <marcvspt@gmail.com>"

WORKDIR /app
COPY ./app ./

RUN pip install -r requirements.txt

CMD ["python", "server.py" ]