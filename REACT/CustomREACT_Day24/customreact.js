const root = document.getElementsByClassName('root')[0];

// function customRender (reactElement,root){
//     let domElement = document.createElement(reactElement.type)
//     domElement.innerHTML = reactElement.children
//     domElement.setAttribute('href',reactElement.props.href)
//     domElement.setAttribute('target',reactElement.props.target);

//     root.appendChild(domElement)
// // }
// --Above code is not modular so let's automate this
function customRender(reactElement,root){
const domElement = document.createElement(reactElement.type)
domElement.innerHTML = reactElement.children;
for (const prop in reactElement.props) {
    domElement.setAttribute(prop,reactElement.props[prop])
}
root.appendChild(domElement)
}

const reactElement = {
    type : 'a',
    props : {
        href : 'https://google.com',
        target : '_blank'
    },
    children : 'click me to visit google'
}

customRender(reactElement,root)
