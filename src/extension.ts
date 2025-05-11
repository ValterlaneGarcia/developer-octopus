import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // Registrar a Webview como uma view
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "developer-octopus.view",
      {
        resolveWebviewView(webviewView: vscode.WebviewView) {
          webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [context.extensionUri]
          };
          
          webviewView.webview.html = getWebviewContent();
          
          // Você pode configurar mensagens e outros comportamentos aqui
          webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
              case 'alert':
                vscode.window.showErrorMessage(message.text);
                return;
            }
          });
        }
      }
    )
  );


}

function getWebviewContent(): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 1rem;
    }
    .group {
      border: 1px solid #ccc;
      padding: 0.5rem;
      margin-bottom: 1rem;
      border-radius: 6px;
      background: #f3f3f3;
      transition: background-color 0.3s ease;
    }
    .group-header {
      display: flex;
      align-items: center;
      border-radius: 5px;
      align-items: center;
      height: 25px;
    }
    .group h3 {
      margin: 0;
      flex-grow: 1;
    }
    .color-options {
      display: flex;
      gap: 0.3rem;
    }
    .color-option {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid #888;
    }
    .files {
      margin-top: 0.5rem;
    }
    .file {
      padding: 0.3rem 0.5rem;
      background-color: #ddd;
      margin: 0.2rem 0;
      border-radius: 3px;
      cursor: pointer;
    }
    #btn-tag-bar {
      border-radius: 5px;
      border: none;
      background-color: rgb(3, 73, 202);
      color: white;
      padding: 0.3rem 0.6rem;
      margin: 0.2rem;
      cursor: pointer;
      width: 100%;
    }

    #btn-tag-bar1{
        display: flex;
        justify-content: center;
        border-radius: 5px;
        border: none;
        background-color: rgb(94, 95, 95);
        color: white;
        padding: 0.3rem 0.6rem;
        margin: 0.2rem;
        cursor: pointer;
        width: 100%;
    }

    #btn-tag-bar2{
        display: flex;
        justify-content: center;
        border-radius: 5px;
        border: none;
        background-color: rgb(94, 95, 95);
        color: white;
        padding: 0.3rem 0.6rem;
        margin: 0.2rem;
        cursor: pointer;
        width: 100%;
    }

  </style>
</head>
<body>
  <h2>Developer Octopus</h2>
  <p>Desenvolva com mais produtividade.<br>
  Crie e organize seus arquivos por grupos e cores.</p>
  <button id="btn-tag-bar" onclick="addGroup()">Novo Grupo</button>
  <span style="display: flex;">
      <button id="btn-tag-bar1" onclick="saveGroup()" disabled>Salvar</button>
      <button id="btn-tag-bar2" onclick="removGroup()" disabled>Excluir</button>
  </span>

  <div id="groupsContainer">

  </div>

  <script>
    let groupCounter = 1;

    let activeGroup = null;

    document.body.addEventListener('click', (e) => {
    const clickedGroup = e.target.closest('.group');
        if (clickedGroup) {
            activeGroup = clickedGroup;
            const removeGroup = document.querySelector('#btn-tag-bar2');
            const saveGroup = document.querySelector('#btn-tag-bar1');
            const addGroup = document.querySelector('#btn-tag-bar');


            removeGroup.removeAttribute('disabled');
            removeGroup.style.cssText = 'background-color: rgb(3, 73, 202)';

            saveGroup.removeAttribute('disabled');
            saveGroup.style.cssText = 'background-color: rgb(3, 73, 202)';

            addGroup.style.cssText = 'background-color: rgb(94, 95, 95)';
            addGroup.setAttribute('disabled', 'true');

        }
    });



    function addGroup() {
      const container = document.getElementById('groupsContainer');
      const group = document.createElement('div');
      group.className = 'group';

      const groupId = 'group-' + groupCounter;
      group.id = groupId;

      group.innerHTML = \`
            <div class="group-header">
                <h3 contenteditable="true">Grupo \${groupCounter}</h3>
            </div>
      \`;

      container.appendChild(group);
      groupCounter++;

      const addGroup = document.querySelector('#btn-tag-bar');
      const saveGroup = document.querySelector('#btn-tag-bar1');
      const removeGroup = document.querySelector('#btn-tag-bar2');


      addGroup.style.cssText = 'background-color: rgb(94, 95, 95)';
      addGroup.setAttribute('disabled', 'true');

      saveGroup.removeAttribute('disabled');
      saveGroup.style.cssText = 'background-color: rgb(3, 73, 202)';

      removeGroup.removeAttribute('disabled');
      removeGroup.style.cssText = 'background-color: rgb(3, 73, 202)';

      activeGroup = group;
    }

    function saveGroup() {
        const addGroup = document.querySelector('#btn-tag-bar');
        const saveGroup = document.querySelector('#btn-tag-bar1');
        const removeGroup = document.querySelector('#btn-tag-bar2');


        addGroup.removeAttribute('disabled');
        addGroup.style.cssText = 'background-color: rgb(3, 73, 202)';


        saveGroup.style.cssText = 'background-color: rgb(94, 95, 95)';
        saveGroup.setAttribute('disabled', 'true');

        removeGroup.style.cssText = 'background-color: rgb(94, 95, 95)';
        saveGroup.setAttribute('disabled', 'true');


    }

    function removGroup() {
    if (!activeGroup) return;

    activeGroup.remove();
    activeGroup = null;

    const addGroup = document.querySelector('#btn-tag-bar');
    const saveGroup = document.querySelector('#btn-tag-bar1');
    const removeGroup = document.querySelector('#btn-tag-bar2');

    addGroup.removeAttribute('disabled');
    addGroup.style.cssText = 'background-color: rgb(3, 73, 202)';

    saveGroup.removeAttribute('disabled');
    saveGroup.style.cssText = 'background-color: rgb(94, 95, 95)';

    saveGroup.setAttribute('disabled', 'true');

    removeGroup.removeAttribute('disabled');
    removeGroup.style.cssText = 'background-color: rgb(94, 95, 95)';

    removeGroup.setAttribute('disabled', 'true');

}
  </script>
</body>
</html>
  `;
}
