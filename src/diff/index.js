import React from '../react'

import {diffChildren} from './children'
import {diffProps} from "./props";

export function diff(newVNode, oldVNode) {
    const newType = newVNode.type;
    const newProps = newVNode.props;

    if (typeof newType === 'function') {
        newVNode._component = oldVNode && oldVNode._component ? oldVNode._component : newVNode._component;
        if (!newVNode._component) {
            if ('prototype' in newType && newType.prototype.render) {
                //类组件
                newVNode._component = new newType(newProps)
            } else {
                //函数组件
                newVNode._component = new React.Component(newProps)
                newVNode._component.render = newType
            }
            newVNode._component.componentWillMount && newVNode._component.componentWillMount();
        }
        if (newVNode._component._nextState !== null) {
            newVNode._component.state = newVNode._component._nextState;
            newVNode._component._nextState = null;
        }

        newVNode._component._vNode = newVNode;
        newVNode._currentDom = newVNode._parentDom;
        newProps.children = newVNode._component.render(newProps);
        diffChildren(newVNode, oldVNode)
    } else if (typeof newType === 'string') {
        if (oldVNode && oldVNode._currentDom) {
            newVNode._currentDom = oldVNode._currentDom;
        } else {
            newVNode._currentDom = document.createElement(newType);
            newVNode._parentDom.appendChild(newVNode._currentDom)
        }

        diffProps(newVNode, oldVNode)
        diffChildren(newVNode, oldVNode)
    } else if (['string', 'number'].includes(typeof newProps)) {
        if (oldVNode && oldVNode._currentDom) {
            newVNode._currentDom = oldVNode._currentDom;
            newVNode._currentDom.data !== String(newProps) && (newVNode._currentDom.data = newProps);
        } else {
            newVNode._currentDom = document.createTextNode(newProps)
            newVNode._parentDom.appendChild(newVNode._currentDom)
        }
    }
}
