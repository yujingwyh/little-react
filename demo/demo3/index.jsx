import React from '../../src/react'
import ReactDom from '../../src/react-dom'
import '../style.css'

class App extends React.Component {
    state = {
        spanType: false
    }

    onClick = () => {
        this.setState({
            spanType: true
        })
    }

    render() {
        if (this.state.spanType) {
            return <span>span node</span>
        }

        return <div className={'action'} onClick={this.onClick}>div node</div>
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)

