export function diffProps(newVNode, oldVNode) {
    const newProps = newVNode.props
    const oldProps = oldVNode?.props ?? {};

    for (let key in oldProps) {
        if (!(key in newProps)) {
            setProperty(newVNode._currentDom, key, null, oldProps[key])
        }
    }
    for (let key in newProps) {
        setProperty(newVNode._currentDom, key, newProps[key], oldProps[key])
    }
}

const eventReg = /on[\w]/;

function setProperty(dom, name, newValue, oldValue) {
    if (['key', 'ref', 'children'].includes(name)) {
        return;
    }
    if (eventReg.test(name)) {
        setEvent(dom, name, newValue, oldValue)
        return
    }
    if (name === 'style') {
        if (oldValue) {
            for (let i in oldValue) {
                if (!(newValue && i in newValue)) {
                    setStyle(dom.style, i, '');
                }
            }
        }
        if (newValue) {
            for (let i in newValue) {
                if (!oldValue || newValue[i] !== oldValue[i]) {
                    setStyle(dom.style, i, newValue[i]);
                }
            }
        }
        return;
    }
    if (name === 'className') {
        dom.className = newValue || ''
    } else if (newValue === null) {
        dom.removeAttribute(name)
    } else {
        dom.setAttribute(name, newValue);
    }

}

function setEvent(dom, name, newValue, oldValue) {
    name = name.toLocaleLowerCase().slice(2);
    if (newValue) {
        if (!oldValue) dom.addEventListener(name, eventProxy);

        (dom._listeners || (dom._listeners = {}))[name] = newValue;
    } else {
        dom.removeEventListener(name, eventProxy);
    }
}

function setStyle(style, name, value) {
    if (typeof value === 'number') {
        style[name] = value + 'px';
    } else if ([undefined, null].includes(value)) {
        style[name] = '';
    } else {
        style[name] = value;
    }
}

function eventProxy(e) {
    this._listeners[e.type](e);
}
