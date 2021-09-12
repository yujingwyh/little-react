import {diff} from "./diff";

function createElement(type, props, ...children) {
    const newProps = {
        ...(props || {}),
        children
    }
    delete newProps.key

    return createVNode(type, newProps, props.key)
}

function createVNode(type, props, key) {
    return {
        type,
        props,
        key,
        //组件实例
        _component: null,
        //当前虚拟节点的真实dom
        _currentDom: null,
        //当前虚拟节点的真实dom的父节点
        _parentDom: null
    }
}

class Component {
    state = {}
    //下次渲染时的状态
    _nextState = null
    //对应的虚拟节点
    _vNode = null

    setState(partialState) {
        this._nextState = {
            ...this.state,
            ...partialState
        }
        enqueueRender(this)
    }
}

function enqueueRender(component) {
    setTimeout(() => {
        diff(component._vNode, {
            ...component._vNode,
            props: {...component._vNode.props}
        })
    }, 0)
}

export default {
    createElement,
    createVNode,
    Component
}
