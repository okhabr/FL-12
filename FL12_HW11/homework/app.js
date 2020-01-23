const structure = [
    {
      'folder': true,
      'title': 'Films',
      'children': [
        {
          'title': 'Iron Man.avi'
        },
        {
          'folder': true,
          'title': 'Fantasy',
          'children': [
            {
              'title': 'The Lord of the Rings.avi'
            },
            {
              'folder': true,
              'title': 'New folder 1',
              'children': false
            }
          ]
        }
      ]
    },
    {
      'folder': true,
      'title': 'Documents',
      'children': [
        {
          'folder': true,
          'title': 'EPAM Homework answers',
          'children': null
        }
      ]
    }
];


function createUI(str,root){
  str.forEach(node => baseStructure(node,root));

  root.addEventListener('click',toggleTheFolder);

  let hidden = document.querySelectorAll('.noDisplay');
  let folderIcons = document.querySelectorAll('.material-icons');

  function toggleTheFolder(event) {
    if (event.target.className === 'folder'){
      hidden.forEach(element => {
        if (element.parentElement === event.target.parentElement) {
          element.classList.toggle('noDisplay');
        }
      })
      folderIcons.forEach(element => {
        if (element.parentElement === event.target) {
          element.innerHTML = element.innerHTML === 'folder_open' ? 'folder' : 'folder_open';
        }
      })
    }
  }
}

let spaceBefore;
function baseStructure (node, parentNode) {
  if (parentNode === rootNode){
    spaceBefore = '';
  }
  let currentNode = document.createElement('div');
  currentNode.innerHTML = node.title;
  parentNode.append(currentNode);

  if ( node.folder ) {
    currentNode.innerHTML = `<p class="folder">${spaceBefore}<i class="material-icons">folder</i> ${node.title}</p>`;
    if (node.children) {
      spaceBefore += '&nbsp &nbsp';
      for (let child of node.children) {
        baseStructure( child, currentNode );
      }
    } else {
        let emptyFolderChild = document.createElement('p');
        emptyFolderChild.innerHTML = `${spaceBefore}The folder is empty`;
        emptyFolderChild.classList.add('emptyChild','noDisplay');
        currentNode.appendChild(emptyFolderChild);
    }
  } else {
    currentNode.innerHTML = `<p class="file"> ${spaceBefore}<i class="material-icons"> insert_drive_file </i> 
    ${node.title} </p>`;
  }
  
  if (parentNode!== rootNode){
    currentNode.classList.add('noDisplay');
  }
}


const rootNode = document.getElementById('root');
createUI(structure,rootNode);