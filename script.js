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
                    { model: 'atributo-textarea', view: { name: 'h2', classes: 'atributeTextarea' }, title: 'Atributo: Textarea' },
                    { model: 'atributo-descricao', view: { name: 'h4', classes: 'atributeDescription' }, title: 'Descricao do Atributo'},
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
        const editorData = editor.getData();
        let atributesArray = editorData.split('<h2 class=');
        let finalContent = '<h2 class="titleH2">Formulario de preenchimento</h2>';
        const atributesDict = {
            atributeInteger: '<div class="atribute"> <label for="atributeInteger" class="inputLabel">*</label> <div class="tooltip"> <span class="tooltiptext">@</span> <input type="number" id="atributeInteger" class="formInput"> </div> </div>',
            atributeTextarea: '<div class="atribute" style="margin-bottom: 30px;"> <label for="atributeTextarea" class="inputLabel">*</label> <div class="tooltip"> <span class="tooltiptext">@</span> <textarea type="number" id="atributeTextarea" class="formInput" rows="4" cols="50"> </textarea> </div> </div> <br>',
        };

        for(let i = 1; i < atributesArray.length; i++) {
            label = atributesArray[i].split('</h2>')[0].split('>').reverse()[0];
            description = atributesArray[i].split('</h2>')[1]
            atribute = atributesDict[atributesArray[i].split('"')[1]].replace('*', label);

            if(description.includes('atributeDescription')) atribute = atribute.replace('@', (description.split('atributeDescription">')[1].split('<')[0]));
            else atribute = atribute.replace('<span class="tooltiptext">@</span>', '');

            finalContent += atribute;
        }

        finalContent += "<button id='submitForm'>Enviar</button>"
        
        generatedFormContainer.innerHTML = finalContent;
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