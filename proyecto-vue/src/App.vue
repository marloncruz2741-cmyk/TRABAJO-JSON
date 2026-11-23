
<script setup>
import { ref, onMounted } from 'vue';

const comentarios = ref([]);
const cargando = ref(true);
const error = ref(null);

async function obtenerComentarios() {
    try {
        const respuesta = await fetch(
            'https://jsonplaceholder.typicode.com/comments?_limit=10'
        );

        if (!respuesta.ok) {
            throw new Error('No se pudieron obtener los comentarios');
        }

        const datos = await respuesta.json();

        // Traducciones de ejemplo para mostrar los comentarios en español
        const traducciones = [
            'Este producto es excelente y tiene muy buena calidad.',
            'Me gusta mucho este servicio, es fácil de utilizar.',
            'La experiencia fue muy buena y lo recomiendo.',
            'El producto llegó en buenas condiciones.',
            'Estoy satisfecho con la atención recibida.',
            'Es una excelente opción por su precio y calidad.',
            'El servicio funciona correctamente.',
            'Me parece un producto útil y práctico.',
            'La atención fue rápida y eficiente.',
            'Estoy contento con el resultado obtenido.'
        ];

        comentarios.value = datos.map((comentario, indice) => ({
            ...comentario,
            name: 'Comentario número ' + (indice + 1),
            body: traducciones[indice]
        }));

    } catch (e) {
        error.value = e.message;

    } finally {
        cargando.value = false;
    }
}

onMounted(() => {
    obtenerComentarios();
});
</script>

<template>
  <div class="contenedor">

    <h1>Listado de comentarios</h1>

    <p class="descripcion">
      Aplicación desarrollada con Vue.js y JSONPlaceholder
    </p>

    <p v-if="cargando" class="estado">
      Cargando comentarios...
    </p>

    <p v-else-if="error" class="error">
      Error: {{ error }}
    </p>

    <div v-else>

      <h2>Total de comentarios: {{ comentarios.length }}</h2>

      <div
        v-for="comentario in comentarios"
        :key="comentario.id"
        class="tarjeta"
      >
        <h3>{{ comentario.name }}</h3>

        <p>
          <strong>Correo electrónico:</strong>
          {{ comentario.email }}
        </p>

        <p><strong>Comentario:</strong></p>

        <p>{{ comentario.body }}</p>

      </div>

    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f1f5f9;
}

.contenedor {
  max-width: 1000px;
  margin: auto;
  padding: 25px;
}

h1 {
  text-align: center;
  color: #1e3a8a;
}

.descripcion {
  text-align: center;
  color: #64748b;
}

h2 {
  color: #334155;
}

.tarjeta {
  background: white;
  padding: 20px;
  margin: 15px 0;
  border-radius: 10px;
  box-shadow: 0 2px 8px #00000015;
}

.tarjeta h3 {
  color: #2563eb;
}

.tarjeta p {
  color: #475569;
  line-height: 1.5;
}

.estado {
  text-align: center;
  color: #2563eb;
}

.error {
  color: red;
  text-align: center;
}
</style>
