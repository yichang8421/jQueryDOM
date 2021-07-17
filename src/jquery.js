window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements;
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            elements = [createElement(selectorOrArrayOrTemplate)];
            /* 定义elements的目的是操作elements，应将其设置为数组 */
        } else {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate);
        }
    } else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate;
    }

    function createElement(string) {
        if (typeof string === 'string') {
            const container = document.createElement('template');
            container.innerHTML = string.trim();
            return container.content.firstChild;
        } else {
            return 'Error! please enter a string.';
        }
    }

    //设置jQuery原型，节约内存
    const api = Object.create(jQuery.prototype);
    //创建对象api。api.__proto__=jQuery.prototype
    /*
     api.elements = elements;
     api.oldApi = selectorOrArrayOrTemplate.oldApi;
     */
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi,
    });
    return api;
};

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    each(func) {
        for (let i = 0; i < this.elements.length; i++) {
            // fn(this.elements[i], i);
            // fn.call(this,this.elements[i],i);
            func.call('', this.elements[i], i);
        }
        return this;
    },

    addClass(className) {
        // for (let i = 0; i <this.elements.length; i++) {
        //   this.elements[i].classList.add(className);
        // }
        // return this;
        this.each((el,) => {
            el.classList.add(className)
        });
        return this;
    },

    find(selector) {
        //返回新的api
        let arr = [];
        // for (let i = 0; i < this.elements.length; i++) {
        //     arr = arr.concat(Array.from(this.elements[i].querySelectorAll(selector)));
        // }
        // return arr;

        this.each((el,) => {
            arr = arr.concat(Array.from(el.querySelectorAll(selector)));
        });

        arr.oldApi = this;

        return $(arr);
    },

    end() {
        /* 返回上一次操作的api */
        return this.oldApi;
    },

    print() {
        console.log(this.elements);
    },

    parent() {
        const arr = [];
        this.each((node,) => {
            if (arr.indexOf(node.parentNode) === -1) {
                arr.push(node.parentNode);
            }
        })
        return jQuery(arr);
    },

    child() {
        const arr = [];
        this.each((node,) => {
            if (arr.indexOf(node.children) === -1) {
                arr.push(...node.children);
            }
        })
        return jQuery(arr);
    },

    get(index) {
        return this.elements[index];
    },

    appendTo(node) {
        if (node instanceof HTMLElement) {
            this.each((el,) => {
                node.appendChild(el);
            });
        } else if (node.jQuery === true) {
            //    如果node是一个jQuery对象，则获取node的elements[0]，然后使用appendChild()方法添加孩子节点el
            this.each((el,) => {
                node.get(0).appendChild(el);
            });
        }
    },

    // 点击事件
    on(eventType, element, selector, fn) {
        if (!(this.element instanceof Element)) {
            this.element = document.querySelector(element);
        }
        this.element.addEventListener(eventType, e => {
            let el = e.target;
            while (!el.matches(selector)) {
                if (element === el) {
                //   如果当被操作元素已经等于传入元素（最顶端元素）仍不匹配selector时，说明被操作元素不存在，跳出循环
                  el = null;
                  break;
                }
                // 当被造作元素不匹配selector时，就将指针移动到父元素
                el = el.parentNode;
            }
    
            // 当被操作元素部位falsy时，调用fn
            el && fn.call(el, e, el);
          })
        return this;
    }
}
