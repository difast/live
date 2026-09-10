"""
Сборка иконок сайта из одного мастера.

Главный файл здесь — app/favicon.ico. Поисковые системы берут иконку для
выдачи не из <link rel="icon">, а отдельным запросом /favicon.ico из корня
домена, и им нужен многоразмерный .ico: Яндекс использует кадр 32,
Google — 48.

Запуск:  python3 brand/build-icons.py
Зависимость:  pip install pillow
"""

from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
SITE = HERE.parent
MASTER = HERE / "mark-master.png"

# Кадры, которые кладутся внутрь .ico.
ICO_SIZES = [(16, 16), (32, 32), (48, 48)]


def master() -> Image.Image:
    """Мастер знака в RGBA. Квадратный, без полей."""
    img = Image.open(MASTER).convert("RGBA")
    if img.width != img.height:
        raise SystemExit(f"мастер не квадратный: {img.size}")
    return img


def square(img: Image.Image, size: int) -> Image.Image:
    return img.resize((size, size), Image.LANCZOS)


def main() -> None:
    mark = master()

    # Каждый кадр .ico ресайзится из полноразмерного мастера, а не из соседнего
    # кадра: если отдать Pillow один кадр со списком sizes, мелкие размеры
    # получаются заметно мыльными — а показывает выдача именно их.
    frames = [square(mark, size).convert("RGB") for size, _ in ICO_SIZES]
    frames[-1].save(
        SITE / "src/app/favicon.ico",
        format="ICO",
        sizes=ICO_SIZES,
        append_images=frames[:-1],
    )

    # Вкладка современных браузеров. PNG, а не SVG: знак типографический,
    # и SVG с <text> зависел бы от наличия гарнитуры в системе.
    square(mark, 512).save(SITE / "src/app/icon.png", optimize=True)

    # iOS: домашний экран.
    square(mark, 180).convert("RGB").save(SITE / "src/app/apple-icon.png", optimize=True)

    # Android и установка как приложение.
    square(mark, 192).save(SITE / "public/icon-192.png", optimize=True)
    square(mark, 512).save(SITE / "public/icon-512.png", optimize=True)

    # maskable — знак во весь кадр, без полей: Android сам срежет углы под
    # свою форму. Поля здесь дали бы видимый шов по периметру.
    square(mark, 512).save(SITE / "public/icon-maskable.png", optimize=True)

    print("готово:")
    for path in (
        "src/app/favicon.ico",
        "src/app/icon.png",
        "src/app/apple-icon.png",
        "public/icon-192.png",
        "public/icon-512.png",
        "public/icon-maskable.png",
    ):
        size = (SITE / path).stat().st_size
        print(f"  {path:32} {size:>7} Б")


if __name__ == "__main__":
    main()
