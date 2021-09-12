import {diff} from './index'
import React from '../react'

export function diffChildren(newParentVNode, oldParentVNode) {
    const newChildren = newParentVNode.props.children = toChildren(newParentVNode.props.children);
    const oldChildren = (oldParentVNode || {props: {}}).props.children = toChildren(oldParentVNode?.props.children);

    newChildren.forEach(children => {
        const oldVNodeIndex = oldChildren.findIndex(child => child.type === children.type && child.key === children.key);
        const oldVNode = oldVNodeIndex !== -1 ? oldChildren.splice(oldVNodeIndex, 1)[0] : null

        children._parentDom = newParentVNode._currentDom;

        diff(children, oldVNode)
    });

    oldChildren.forEach(children => {
        if (typeof children.type !== 'function') {
            children._parentDom.removeChild(children._currentDom);
        }
    })
}

function toChildren(children) {
    const newChildren = children ?? [];
    const childrenArr = Array.isArray(newChildren) ? newChildren : [newChildren]

    return childrenArr.flat().map(children => {
        if (['string', 'number'].includes(typeof children)) {
            return React.createVNode(null, children, null)
        }

        return children
    })
}
