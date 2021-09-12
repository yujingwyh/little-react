import React from '../../src/react'
import ReactDom from '../../src/react-dom'
import '../style.css'

class App extends React.Component {
    state = {
        list: [1, 2]
    }

    onClick = () => {
        this.setState({
            list: [3, 4]
        })
    }

    render() {
        return <div className={'action'} onClick={this.onClick}>
            {this.state.list.map(item => {
                return <div>{item}</div>
            })}
        </div>
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)

