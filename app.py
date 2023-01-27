from flask import *
from Steam import steam_calculator

app=Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return render_template("PT.html")
    
@app.route('/', methods=['GET','POST'])

def index():
    result = None
    if request.method=='POST':
        p=float(request.form['pressure'])
        t=float(request.form['temperature'])
        my_result=steam_calculator(p,t)
        Ph=str(my_result[2])
        return render_template("PT.html", result=my_result, Phase=Ph)
    return jsonify(html=result)
    
if __name__ == '__main__':
    from werkzeug.serving import run_simple
    run_simple('localhost', 5000, app)
  