# from flask import Flask, render_template, Response
# import cv2
# import numpy as np

# app = Flask(__name__)

# # Load Haar Cascade models
# face_cascade = cv2.CascadeClassifier(r'C:\Users\satva\OneDrive\new\human_detection_project\models\haarcascade_frontalface_default (1).xml')
# eye_cascade = cv2.CascadeClassifier(r'C:\Users\satva\OneDrive\new\human_detection_project\models\haarcascade_eye.xml')




# # Initialize counters
# male_count = 0
# female_count = 0
# is_counting = False


# # Mock Gender Prediction (Replace with ML Model Later)
# def predict_gender(face):
#     # Placeholder logic: Use actual ML model for better accuracy
#     if face.shape[0] > 100:  # Example condition
#         # male_count+=1
#         return "Male"
#     # female_count+=1
#     return "Female"


# # Detect faces and classify gender
# def detect_and_classify(frame):
#     global male_count, female_count, is_counting

#     # Convert frame to grayscale
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#     faces = face_cascade.detectMultiScale(gray, 1.1, 4)

#     result_frame = frame.copy()
#     for (x, y, w, h) in faces:
#         face = frame[y:y+h, x:x+w]
#         gender = predict_gender(face)

#         if is_counting:
#             if gender == "Male":
#                 male_count += 1
#             else:
#                 female_count += 1

#         color = (255, 0, 0) if gender == "Male" else (0, 255, 0)
#         cv2.rectangle(result_frame, (x, y), (x+w, y+h), color, 2)
#         cv2.putText(result_frame, gender, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)

#     return result_frame

# @app.route('/')
# def index():
#     return render_template('index.html')

# def gen_frames():
#     global male_count, female_count, is_counting

#     cap = cv2.VideoCapture(0)  # Access webcam
#     while True:
#         success, frame = cap.read()
#         if not success:
#             break
#         male_count = 0
#         female_count = 0
        
#         frame = detect_and_classify(frame)

#         # Overlay counts
#         cv2.putText(frame, f"Male: {male_count}, Female: {female_count}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2)
#         ret, buffer = cv2.imencode('.jpg', frame)
#         frame = buffer.tobytes()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# @app.route('/video_feed')
# def video_feed():
#     return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

# @app.route('/start')
# def start_count():
#     global is_counting
#     is_counting = True
#     return "Counting started!"

# @app.route('/stop')
# def stop_count():
#     global is_counting
#     is_counting = False
#     return f"Male Count: {male_count}, Female Count: {female_count} , Total Count :{male_count + female_count}"

# if __name__ == '__main__':
#     app.run(debug=True)
