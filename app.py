from flask import Flask, render_template, Response, redirect, url_for, request, session
from werkzeug.security import generate_password_hash, check_password_hash
import cv2

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with a strong secret key

# Load Haar Cascade models for face and eyes detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

# Global variables for counting
male_count = 0
female_count = 0
is_counting = False

# Store the password hash (for simplicity, we use hardcoded username and password)
# Create a password hash for security
stored_password_hash = generate_password_hash("password")  # Hashed password for security

# Username (hardcoded)
username = 'admin'


# Mock Gender Prediction Logic (for demo purposes, can be replaced by ML model)
def predict_gender(face):
    # Example logic: Replace with an actual model for better accuracy
    if face.shape[0] > 100:
        return "FeMale"
    return "Male"

# Detect faces and classify gender
def detect_and_classify(frame):
    global male_count, female_count, is_counting

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    result_frame = frame.copy()
    for (x, y, w, h) in faces:
        face = frame[y:y+h, x:x+w]
        gender = predict_gender(face)

        if is_counting:
            if gender == "FeMale":
                female_count += 1
            else:
                male_count += 1

        color = (255, 0, 0) if gender == "Male" else (0, 255, 0)
        cv2.rectangle(result_frame, (x, y), (x+w, y+h), color, 2)
        cv2.putText(result_frame, gender, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

    return result_frame


# Route to display login page
@app.route('/')
def login():
    if 'logged_in' in session:
        return redirect(url_for('index'))
    return render_template('login.html')


# Route to handle login POST request
@app.route('/login', methods=['POST'])
def login_post():
    entered_username = request.form['username']
    entered_password = request.form['password']

    # Check if credentials are correct and password matches the hash
    if entered_username == username and check_password_hash(stored_password_hash, entered_password):
        session['logged_in'] = True
        return redirect(url_for('index'))
    return "Invalid credentials! Please try again."


# Route to log out
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('login'))


# Home page after login
@app.route('/home')
def index():
    if 'logged_in' not in session:
        return redirect(url_for('login'))
    return render_template('index.html')


# Function to generate frames for video feed
def gen_frames():
    global male_count, female_count, is_counting

    cap = cv2.VideoCapture(0)  # Access webcam
    while True:
        success, frame = cap.read()
        if not success:
            break
        
        male_count = 0
        female_count = 0
        frame = detect_and_classify(frame)

        # Overlay counts on the frame
        cv2.putText(frame, f"Male: {male_count}, Female: {female_count}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')


# Route for video feed
@app.route('/video_feed')
def video_feed():
    if 'logged_in' not in session:
        return redirect(url_for('login'))
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


# Route to start counting
@app.route('/start')
def start_count():
    global is_counting
    is_counting = True
    return "Counting started!"


# Route to stop counting and show the counts
@app.route('/stop')
def stop_count():
    global is_counting
    is_counting = False
    return f"Male Count: {male_count}, Female Count: {female_count}, Total Count: {male_count + female_count}"


if __name__ == '__main__':
    app.run(debug=True)
