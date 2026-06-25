// function renderReact(content,mainContainer){
//     const newElement = document.createElement(content.type)
//     newElement.innerHTML = content.children
//     newElement.setAttribute('href',content.props.href)
//     newElement.setAttribute('target',content.props.target)
//     mainContainer.appendChild(newElement)
// }

function renderReact(content,mainContainer){
    const newElement = document.createElement(content.type)
    newElement.innerHTML = content.children
    for (const prop in content.props ){
    newElement.setAttribute(prop,content.props[prop])        
    }
    console.log(mainContainer);
    
    mainContainer.appendChild(newElement)
}


const reactElement = {
    type : 'a',
    props: {
        href : 'https://google.com',
        target : '_blank'
    },
    children :'Please click to visit google.com'
}

const mainContainer = document.querySelector(".root")


renderReact(reactElement,mainContainer)

// Note : we can create custom react using react library but there are some limitations the react elements structure is defined 
// the work flow of react is it creates a dom tree with the object , we can also use variable to show final evaluated value 
// and final evaluated value means whatever the final outcome we got through our code or algorithm 
// and react takes also function while rendering in the jsx also
// JSX is simple JS + HTML , which means we can write html inside the JS