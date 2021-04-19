window.onload = (event) => {
    let generatedFormContainer = document.getElementById('generatedForm');
    let generatedFormResponsesContainer = document.getElementById('generatedFormResponses');

    generatedFormContainer.style.display = "none";
    generatedFormResponsesContainer.style.display = "none";

    ClassicEditor
        .create( document.querySelector( '#editor' ), {
            toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
            heading: {
                options: [
                    { model: 'atributo-inteiro', view: { name: 'h2', classes: 'atributeInteger' }, title: 'Atributo: Inteiro' },
                    { model: 'atributo-textarea', view: { name: 'h3', classes: 'atributeTextarea' }, title: 'Atributo: Textarea' },
                    { model: 'comentario', view: 'p', title: 'Comentário' }
                ]
            }
        } )
        .then( newEditor => {
            editor = newEditor;
        } )
        .catch( error => {
            console.error( error );
        } );

    document.querySelector( '#submit' ).addEventListener( 'click', () => {
        generatedFormContainer.innerHTML = '<h2 class="titleH2">Formulario de preenchimento</h2>';

        const editorData = editor.getData();

        let finalContent = editorData.replaceAll('<h3 class="atributeTextarea">', '<div class="atribute" style="margin-bottom: 30px;"> <label for="atributeTextarea" class="inputLabel">');
        finalContent = finalContent.replaceAll('<h2 class="atributeInteger">', '<div class="atribute"> <label for="atributeInteger" class="inputLabel">');

        finalContent = finalContent.replaceAll('</h2>', '</label> <input type="number" id="atributeInteger" class="formInput"> </div>');
        finalContent = finalContent.replaceAll('</h3>', '</label> <textarea type="number" id="atributeTextarea" class="formInput" rows="2" cols="50"> </textarea> </div>');

        finalContent += "<button id='submitForm'>Enviar</button>"
        
        generatedFormContainer.innerHTML += finalContent;
        generatedFormContainer.style.display = "block";

        document.querySelector( '#submitForm' ).addEventListener( 'click', () => {
            let inputLabels = document.querySelectorAll('.inputLabel');
            let inputs = document.querySelectorAll('.formInput');
            let response = '<h2 class="titleH2">Resposta do formulario</h2>'

            for(let i = 0; i < inputs.length; i++)
                response += "<p style='font-family: arial;'><span style='font-weight: bold'>" + inputLabels[i].textContent + ": </span>" + inputs[i].value + "<p>";

            generatedFormResponsesContainer.innerHTML = response;
            generatedFormResponsesContainer.style.display = "block";
        } );
    } );
}