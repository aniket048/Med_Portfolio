from flask import Flask, redirect, render_template, request, sessions, url_for,session
from random import randint
from flask_mysqldb import MySQL
from flask_mail import Mail,Message

app = Flask(__name__)



app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='Rahul@2137'#
app.config['MYSQL_HOST']='127.0.0.1'#
app.config['MYSQL_DB']='med'#

app.secret_key="@342$62455asdw"

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT']=465
app.config['MAIL_USERNAME']='g17miniproject@gmail.com'
app.config['MAIL_PASSWORD']='Myminiprojectpswd17'
app.config['MAIL_USE_TLS']=False
app.config['MAIL_USE_SSL']=True
mysql=MySQL(app)
mail=Mail(app)


def otpnum():
    otp=randint(000000,999999)
    return otp


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup', methods=['POST'])
def signup():
    email = request.form['email']
    password = request.form['password']
    curs=mysql.connection.cursor()
    curs.execute(f"INSERT INTO `users` (`email`, `rol`, `password`) VALUES ('{email}', 'pat', '{password}');")
    curs.connection.commit()
    curs.close()
    return render_template('Log_In.html')


@app.route('/register', methods=["POST"])
def register():
    email = request.form['email']
    name = request.form['name']
    age = request.form['age']
    act_d = request.form['disease']
    past_d = request.form['disease2']
    gender = request.form['gender']
    curs=mysql.connection.cursor()
    curs.execute(f"INSERT INTO `patient` (`Email`, `Name`,`Past_Disease`,`act_Disease`,`gender`) VALUES ('{email}', '{name}', '{past_d}','{act_d}','{gender}');")
    curs.connection.commit()
    curs.close()
    return redirect(url_for("Log_in"))

@app.route('/dashboard', methods=["POST"])
def dashboard():
    email = request.form['email']
    passwd = request.form['password']
    curs=mysql.connection.cursor()
    curs.execute(f"select rol,password from users where email = '{email}';")
    user = curs.fetchone()
    curs.close()
    if user:
        if user[1] == passwd:
            
            if user[0] == 'pat':
                session['email'] = email
                curs=mysql.connection.cursor()
                curs.execute(f"select email from patient where email = '{email}'")
                check = curs.fetchone()
                if check:
                    curs=mysql.connection.cursor()
                    curs.execute(f"select email_doctor from prescriptions where email_patient = '{email}' GROUP BY email_doctor;")
                    doctors = curs.fetchall()
                    docs = []
                    for doc in doctors:
                        curs=mysql.connection.cursor()
                        curs.execute(f"select name, speciality, degree, email from doctor where email= '{doc[0]}';")
                        data = curs.fetchone()
                        docs.append(data)
                    return render_template('dashboard.html', docs = docs)
                else:
                    return render_template("form.html", email = email)
            elif user[0] == 'doc':
                session['docemail'] = email
                curs=mysql.connection.cursor()
                curs.execute(f"select name, degree, email from doctor where email= '{email}';")
                data = curs.fetchone()
                return render_template("search.html", doc = data, found = False)
        else:
            return "Wrong password"
    else:
        return "No user please Signup"
    

@app.route('/details', methods = ['POST'])
def details():
    email = request.form['email']
    name = request.form['name_doc']
    curs=mysql.connection.cursor()
    curs.execute(f"select prescription_id,daigonis, date from prescriptions where email_doctor = '{email}' and email_patient = '{session['email']}';")
    pre = curs.fetchone()
    curs.close()
    return render_template('know_more.html', p = pre, name=name)

@app.route('/searchpatient', methods = ['POST'])
def patsearch():
    email = request.form['id']
    curs=mysql.connection.cursor()
    curs.execute(f"select name, age, gender, act_Disease, Past_Disease from patient where email = '{email}'")
    check = curs.fetchone()
    curs.close()
    if check:
        session['patemail'] = email
        notfound = False
    else:
        notfound = True
    return render_template('search.html', p = check, found = True, nfound = notfound, doc = ["NA", "NA", "NA"])

@app.route('/login')
def Log_in():
    return render_template('Log_in.html')

@app.route('/profile')
def Patients_Profile():
    return render_template('Patients_Profile.html')

@app.route('/search')
def search():
    if session['docemail']:
        return render_template('search.html', p = [], found = False, nfound = True, doc = ["NA", "NA", "NA"])
    else:
        return "Please Login"
@app.route('/prescription')
def pre():
    if session['docemail']:
        if session['patemail']:
            curs=mysql.connection.cursor()
            curs.execute(f"select email_doctor from prescriptions where email_patient = '{session['patemail']}' GROUP BY email_doctor;")
            doctors = curs.fetchall()
            docs = []
            for doc in doctors:
                curs=mysql.connection.cursor()
                curs.execute(f"select name, speciality, degree, email from doctor where email= '{doc[0]}';")
                data = curs.fetchone()
                docs.append(data)
            return render_template('view_record.html', docs = docs)

@app.route('/search1q23')
def search123():
    if session['docemail']:
        if session['patemail']:
            return render_template('search.html', p = [], found = False, nfound = True, doc = ["NA", "NA", "NA"])
    else:
        return "Please Login"
        
if __name__ =="__main__":
    app.run(debug=True)