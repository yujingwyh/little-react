import React from '../../src/react'
import ReactDom from '../../src/react-dom'
import '../style.css'

const onClick = () => {
    alert('click')
}
const style = {
    color: "#00f"
}

const app = <div className={'action'} id={'dome1'} onClick={onClick} style={style}>
    content
</div>;

ReactDom.render(
    app,
    document.getElementById('root')
)

