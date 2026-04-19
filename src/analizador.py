import re
from collections import Counter
import sys

def analizar_frecuencia(ruta_archivo):
    try:
        with open(ruta_archivo, 'r', encoding='utf-8') as f:
            contenido = f.read().lower()
        
        palabras = re.findall(r'\b\w+\b', contenido)
        total_palabras = len(palabras)
        
        if total_palabras == 0:
            print("El archivo está vacío.")
            return

        conteo = Counter(palabras)
        top_10 = conteo.most_common(10)

        print(f"\n{' PALABRA ': ^20} | {' FRECUENCIA ': ^12} | {' PORCENTAJE ': ^12}")
        print("-" * 50)
        
        for palabra, freq in top_10:
            porcentaje = (freq / total_palabras) * 100
            print(f"{palabra: <20} | {freq: ^12} | {porcentaje: >10.2f}%")
            
        print("-" * 50)
        print(f"Total de palabras procesadas: {total_palabras}\n")

    except FileNotFoundError:
        print(f"Error: No se encontró el archivo en {ruta_archivo}")
    except Exception as e:
        print(f"Error inesperado: {e}")

if __name__ == "__main__":
    archivo_entrada = "data/texto_prueba.txt"
    analizar_frecuencia(archivo_entrada)
