
async function procesarCatalogo() {

    try {

        // 1. Leer el archivo JSON
        const respuesta = await fetch("./catalogo.json");

        const texto = await respuesta.text();

        // 2. Parsear el JSON
        const catalogo = JSON.parse(texto);

        console.log("Catalogo completo:");
        console.log(catalogo);

        // 3. Filtrar productos disponibles
        const disponibles = catalogo.productos.filter(
            producto => producto.disponible === true
        );

        console.log("Productos disponibles:");
        console.log(disponibles);

        // 4. Agrupar productos por categoria
        const agrupados = {};

        disponibles.forEach(producto => {

            const categoria = producto.categoria;

            if (!agrupados[categoria]) {
                agrupados[categoria] = [];
            }

            agrupados[categoria].push(producto);

        });

        console.log("Productos agrupados:");
        console.log(agrupados);

        // 5. Convertir los objetos a texto JSON
        const resultado = JSON.stringify(agrupados, null, 2);

        console.log("Resultado Stringify:");
        console.log(resultado);

    } catch (error) {

        console.log("Error al procesar el catalogo:", error);

    }

}

procesarCatalogo();
