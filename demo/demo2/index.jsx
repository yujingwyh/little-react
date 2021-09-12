import React from '../../src/react'
import ReactDom from '../../src/react-dom'

function Children(props) {
    return <div>
        {props.name}{props.children}
    </div>
}

function App() {
    return <Children name={1}>
        2
    </Children>
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)

