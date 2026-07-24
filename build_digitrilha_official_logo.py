import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def generate_official_digitrilha_logos():
    orig_path = r'C:\Users\jj\.gemini\antigravity-ide\brain\679792c0-3e7c-4fe7-8d45-2c9e4f155d26\media__1784924373884.png'
    if not os.path.exists(orig_path):
        print("Original image not found!")
        return

    orig_img = Image.open(orig_path).convert('RGBA')
    arr = np.array(orig_img)

    # 1. Crop exact icon region from x=20 to x=190, y=30 to y=245
    icon_crop = orig_img.crop((20, 30, 192, 245))
    
    # Create isolated transparent icon
    icon_arr = np.array(icon_crop)
    bg_color = np.array([246, 243, 232])
    
    # Calculate distance to background color
    rgb = icon_arr[:, :, :3].astype(float)
    dist = np.sqrt(np.sum((rgb - bg_color) ** 2, axis=2))
    
    # Alpha mask: dist <= 12 is transparent, dist >= 45 is fully opaque, blend in between
    alpha = np.clip((dist - 10) / 35.0, 0.0, 1.0) * 255.0
    icon_trans_arr = icon_arr.copy()
    icon_trans_arr[:, :, 3] = alpha.astype(np.uint8)
    
    icon_trans = Image.fromarray(icon_trans_arr, mode='RGBA')

    # Save isolated icon
    out_dir = r'c:\Users\jj\OneDrive\Projetos\Hackathon SUS Unifesp\prototipo'
    os.makedirs(out_dir, exist_ok=True)
    
    icon_trans.save(os.path.join(out_dir, 'logo_icon.png'))
    icon_crop.save(os.path.join(out_dir, 'logo_icon_cream.png'))

    # 2. Render Full Logo: Icon + "Digitrilha" + "em Tecnologia Assistiva"
    # We will upscale the icon 2x using Lanczos for crisp high resolution
    icon_scale = 2
    i_w, i_h = icon_trans.size
    icon_large = icon_trans.resize((i_w * icon_scale, i_h * icon_scale), Image.Resampling.LANCZOS)
    icon_cream_large = icon_crop.resize((i_w * icon_scale, i_h * icon_scale), Image.Resampling.LANCZOS)

    # Canvas size for full high-res logo
    canvas_w = 1200
    canvas_h = 400
    
    # Fonts
    win_fonts = r'C:\Windows\Fonts'
    font_serif_bold_path = os.path.join(win_fonts, 'georgiab.ttf')
    if not os.path.exists(font_serif_bold_path):
        font_serif_bold_path = os.path.join(win_fonts, 'timesbd.ttf')

    font_serif_regular_path = os.path.join(win_fonts, 'georgia.ttf')
    if not os.path.exists(font_serif_regular_path):
        font_serif_regular_path = os.path.join(win_fonts, 'times.ttf')

    font_main = ImageFont.truetype(font_serif_bold_path, size=115)
    font_sub = ImageFont.truetype(font_serif_regular_path, size=48)

    # Colors sampled from original logo
    c_blue = (26, 46, 108, 255)   # #1a2e6c ("Digi")
    c_green = (28, 108, 41, 255)  # #1c6c29 ("trilha")
    c_gray = (120, 126, 122, 255) # #787e7a ("em Tecnologia Assistiva")

    def build_canvas(bg_color_rgba=None):
        if bg_color_rgba:
            img_canvas = Image.new('RGBA', (canvas_w, canvas_h), bg_color_rgba)
            icon_to_use = icon_cream_large if bg_color_rgba[:3] == (246, 243, 232) else icon_large
        else:
            img_canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
            icon_to_use = icon_large

        # Paste icon at left
        icon_x = 40
        icon_y = (canvas_h - icon_to_use.height) // 2
        img_canvas.paste(icon_to_use, (icon_x, icon_y), icon_to_use if icon_to_use.mode == 'RGBA' else None)

        draw = ImageDraw.Draw(img_canvas)
        text_x = icon_x + icon_to_use.width + 40
        text_y_main = 100

        # Draw "Digi"
        draw.text((text_x, text_y_main), "Digi", font=font_main, fill=c_blue)
        
        # Measure "Digi" width to place "trilha" right next to it
        digi_bbox = draw.textbbox((text_x, text_y_main), "Digi", font=font_main)
        digi_w = digi_bbox[2] - digi_bbox[0]

        # Draw "trilha"
        draw.text((text_x + digi_w, text_y_main), "trilha", font=font_main, fill=c_green)

        # Draw tagline below
        text_y_sub = text_y_main + 130
        draw.text((text_x + 8, text_y_sub), "em Tecnologia Assistiva", font=font_sub, fill=c_gray)

        # Bounding box crop for tight clean bounds
        bbox = img_canvas.getbbox()
        pad = 20
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(canvas_w, bbox[2] + pad),
            min(canvas_h, bbox[3] + pad)
        )
        return img_canvas.crop(crop_box)

    # 1. Transparent Full Logo
    logo_trans = build_canvas(bg_color_rgba=None)
    logo_trans.save(os.path.join(out_dir, 'logo.png'))

    # 2. Cream Off-White Background Full Logo
    logo_cream = build_canvas(bg_color_rgba=(246, 243, 232, 255))
    logo_cream.save(os.path.join(out_dir, 'logo_cream.png'))

    # 3. Workspace Root Copies
    ws_root = r'c:\Users\jj\OneDrive\Projetos\Hackathon SUS Unifesp'
    logo_trans.save(os.path.join(ws_root, 'logo_digitrilha.png'))
    logo_cream.save(os.path.join(ws_root, 'logo_digitrilha_cream.png'))

    print("Logos fiéis do Digitrilha gerados com sucesso!")

if __name__ == "__main__":
    generate_official_digitrilha_logos()
