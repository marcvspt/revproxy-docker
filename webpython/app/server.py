from flask import Flask, render_template
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    PORT = int(os.environ.get('PYTHON_PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=PORT)
