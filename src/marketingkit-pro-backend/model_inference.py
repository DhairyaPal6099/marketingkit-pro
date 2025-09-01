from flask import Flask, request, jsonify
import base64, io
from PIL import Image
from aura_sr import AuraSR

aura_sr = AuraSR.from_pretrained("fal/AuraSR-v2")

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        image_b64 = data["image"]
        image_bytes = base64.b64decode(image_b64)
        input_image = Image.open(io.BytesIO(image_bytes))
        output_image = aura_sr.upscale_4x_overlapped(input_image)
        
        buffered = io.BytesIO()
        output_image.save(buffered, format="PNG")
        output_b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        return jsonify({"result": output_b64})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)