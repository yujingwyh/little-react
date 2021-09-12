import {diff} from "./diff";
import React from './react'

function render(element, container) {
    diff({
        ...element,
        _parentDom: container
    })
}

export default {
    render
}
