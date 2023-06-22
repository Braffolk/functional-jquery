// This is a mockup for a modern jquery library
// which allows arrows functions to be passed into map etc
// and also allows using patterns like this
// $('li').map($$.text)

const $$ITERATORS = new Map();

const $$FUNS = {
    this: function(o, it) {
        $$ITERATORS.set(o, o);
        return o;
    },
    random: function(o, it) {
        $$ITERATORS.set(o, Math.random());
        return o;
    },
    getText: function(o, it) {
        $$ITERATORS.set(o, $(o).text());
        return o;
    },
    getParent: function(o, it) {
        $$ITERATORS.set(o, $(o).parent());
        return o;
    },
    removeThis: function(o, it) {
        $(o).remove();
        return o;
    },
    removeIt: function(o, it) {
        $(it).remove();
        return o;
    },
    getIndex: function(o, it) {
        $$ITERATORS.set(o, $(o).index());
        return o;
    },
    setText: function(o, it, val) {
        $(o).text(val || it);
        return o;
    },
    getHtml: function(o, it) {
        $$ITERATORS.set(o, $(o).html());
        return o;
    },
    setHtml: function(o, it, val) {
        $(o).html(val || it);
        return o;
    },
    appendThis: function(o, it) {
        $(o).append(it);
        return o;
    },
    appendIt: function(o, it) {
        $(it).append(o);
        return o;
    },
    appendItTo: function(o, it, selector) {
        $(selector).append(it);
        return o;
    },
    prependThis: function(o, it) {
        $(o).prepend(it);
        return o;
    },
    strLength: function(o, it) {
        $$ITERATORS.set(o, String(it).length);
        return o;
    },
    strSlice: function(o, it, start, end) {
        $$ITERATORS.set(o, String(it).slice(start, end));
        return o;
    },
    strSubstring: function(o, it, start, end) {
        $$ITERATORS.set(o, String(it).substring(start, end));
        return o;
    },
    strReplace: function(o, it, searchValue, replaceValue) {
        $$ITERATORS.set(o, String(it).replace(searchValue, replaceValue))
        return o;
    },
    strReplaceAll: function(o, it, searchValue, replaceValue) {
        $$ITERATORS.set(o, String(it).replace(searchValue, replaceValue))
        return o;
    },
    strToUpperCase: function(o, it) {
        $$ITERATORS.set(o, String(it).toUpperCase());
        return o;
    },
    strToLowerCase: function (o, it) {
        $$ITERATORS.set(o, String(it).toLowerCase());
        return o;
    },
    strConcat: function(o, it, ...strings) {
        $$ITERATORS.set(o, String(it).concat(...strings))
        return o;
    },
    strTrim: function(o, it) {
        $$ITERATORS.set(o, String(it).trim())
        return o;
    },
    strTrimStart: function(o, it) {
        $$ITERATORS.set(o, String(it).trimStart())
        return o;
    },
    strTrimEnd: function(o, it) {
        $$ITERATORS.set(o, String(it).trimEnd())
        return o;
    },
    strPadStart: function(o, it, maxLength, fillString) {
        $$ITERATORS.set(o, String(it).padStart(maxLength, fillString))
        return o;
    },
    strPadEnd: function(o, it, maxLength, fillString) {
        $$ITERATORS.set(o, String(it).padEnd(maxLength, fillString))
        return o;
    },
    strCharAt: function(o, it, pos) {
        $$ITERATORS.set(o, String(it).charAt(pos))
        return o;
    },
    strCharCodeAt: function (o, it, index) {
        $$ITERATORS.set(o, String(it).charCodeAt(index))
        return o;
    },
    strSplit: function (o, it, splitter) {
        $$ITERATORS.set(o, String(it).split(splitter))
        return o;
    },
    strStartsWith: function (o, it, searchString, position) {
        $$ITERATORS.set(o, String(it).startsWith(searchString, position));
        return o;
    },
    strAt(o, it, index) {
        $$ITERATORS.set(o, String(it).at(index));
        return o;
    },
    strCodePointAt(o, it, index) {
        $$ITERATORS.set(o, String(it).codePointAt(pos));
        return o;
    },
    strEndsWith(o, it, searchString, endPosition) {
        $$ITERATORS.set(o, String(it).endsWith(searchString, endPosition));
        return o;
    },
    strIncludes(o, it, searchString, position) {
        $$ITERATORS.set(o, String(it).includes(searchString, position));
        return o;
    },
    strAsElement(o, it, tag) {
        $$ITERATORS.set(o, $(`<${tag}>${it}</${tag}>`));
        return o;
    },
    arrAt(o, it, index) {
        $$ITERATORS.set(o, it.at(index));
        return o;
    },
    arrJoin(o, it, sep) {
        $$ITERATORS.set(o, it.join(sep));
        return o;
    },
    objKeys(o, it) {
        $$ITERATORS.set(o, Object.keys(it));
        return o;
    },
    objValues(o, it) {
        $$ITERATORS.set(o, Object.values(it));
        return o;
    },
    objEntries(o, it) {
        $$ITERATORS.set(o, Object.entries(it));
    }
}

$$ = {
    this: () => $$FUNS.this,
    getText: () => $$FUNS.getText,
    getParent: () => $$FUNS.getParent,
    removeThis: () => $$FUNS.removeThis,
    removeIt: () => $$FUNS.removeIt,
    getIndex: () => $$FUNS.getIndex,
    setText: (val) => (o, it) => $$FUNS.setText(o, it, val),
    appendIt: () => $$FUNS.appendIt,
    appendThis: () => $$FUNS.appendThis,
    appendItTo: (selector) => (o, it) => $$FUNS.appendItTo(o, it, selector),
    appendThisTo: (selector) => (o, it) => $$FUNS.appendThisTo(o, it, selector),
    reattachThis: (selector) => (o, it) => {
        $$FUNS.removeThis(o, it);
        $$FUNS.appendThisTo(o, it, selector);
        return o;
    },
    reattachIt: (selector) => (o, it) => {
        $$FUNS.removeIt(o, it);
        $$FUNS.appendItTo(o, it, selector);
        return o;
    },
    prepend: () => $$FUNS.prepend,
    getHtml: () => $$FUNS.getHtml,
    setHtml: (val) => (o, it) => $$FUNS.setHtml(o, it, val),
    random: () => $$FUNS.random,
    str: {
        length: () => $$FUNS.strLength,
        at: (index) => (o, it) => $$FUNS.strAt(o, it, index),
        charAt: (index) => (o, it) => $$FUNS.strCharAt(o, it, index),
        charCodeAt: (index) => (o, it) => $$FUNS.strCharCodeAt(o, it, index),
        codePointAt: (index) => (o, it) => $$FUNS.strCodePointAt(o, it, index),
        concat: (...strings) => (o, it) => $$FUNS.strConcat(o, it, ...strings),
        startsWith: (searchString, position) => (o, it) => $$FUNS.strStartsWith(o, it, searchString, position),
        endsWith: (searchString, endPosition) => (o, it) => $$FUNS.strEndsWith(o, it, searchString, endPosition),
        includes: (searchString, position) => (o, it) => $$FUNS.strIncludes(o, it, searchString, position),
        slice: (start, end) => (o, it) => $$FUNS.strSlice(o, it, start, end),
        substring: (start, end) => (o, it) => $$FUNS.strSubstring(o, it, start, end),
        substr: (start, end) => (o, it) => $$FUNS.strSubstring(o, it, start, end),
        replace: (searchValue, replaceValue) => (o, it) => $$FUNS.strReplace(o, it, searchValue, replaceValue),
        replaceAll: (searchValue, replaceValue) => (o, it) => $$FUNS.strReplaceAll(o, it, searchValue, replaceValue),
        toUpperCase: () => $$FUNS.strToUpperCase,
        toLowerCase: () => $$FUNS.strToLowerCase,
        split: (splitter) => (o, it) => $$FUNS.strSplit(o, it, splitter),
        asElement: (tag) => (o, it) => $$FUNS.strAsElement(o, it, tag)
    },
    arr: {
        at: (index) => (o, it) => $$FUNS.arrAt(o, it, index),
        first: (o, it) => $$FUNS.arrAt(o, it, 0),
        last: (o, it) => $$FUNS.arrAt(o, it, -1),
        join: (sep) => (o, it) => $$FUNS.arrJoin(o, it, sep)
    },
    obj: {
        keys: () => $$FUNS.objKeys,
        values: () => $$FUNS.objValues,
        entries: () => $$FUNS.objEntries
    },
    pokeValue: (initialValue, updateFunction) => {
        return new PokeValue(initialValue, updateFunction);
    },
    lazy: (selector) => {
        return new LazyQuery(selector);
    }
}

$.fn.fmapOne = function(fun) {
    return this.map(function() {
        const ret = fun.call(this, this, $$ITERATORS.get(this));
        if(ret !== this) {
            $$ITERATORS.set(this, ret);
        }
        return this;
    });
}



$.fn.fmap = function(...functions) {
    return functions.reduce((acc, v) => acc.fmapOne(v), this);
}
$.fn.fsort = function(ascending, ...functions) {
    const sign = ascending === false ? -1 : 1;
    functions.reduce((acc, v) => acc.fmapOne(v), this);
    return this.sort(function(a, b) {
        const va = $$ITERATORS.get(a);
        const vb = $$ITERATORS.get(b);
        if (va > vb) {
            return 1 * sign;
        } else if(va < vb) {
            return (-1) * sign;
        } else {
            return 0;
        }
    });
}
$.fn.fvalues = function() {
    return $(this).map(function() {
        return $$ITERATORS.get(this);
    });
}
$.fn.ffilter = function (fn) {
    return $(this).filter(function () {
        return fn.call(this, this, $$ITERATORS.get(this));
    });
}
$.fn.fwhen = function (condition) {
    const conditionObj = {
        condition
    };
    const runFun = () => {
        return $(this).fmap(function(o, it) {
            const originalValue = $$ITERATORS.get(o);
            conditionObj.condition(o, it);
            const evalCondition = $$ITERATORS.get(o);
            $$ITERATORS.set(o, originalValue);
            const funs = evalCondition ? conditionObj.fnThen : conditionObj.fnElse;

            funs.forEach((fun) => {
                const ret = fun.call(this, o, $$ITERATORS.get(o));
                if(ret !== o) {
                    $$ITERATORS.set(o, ret);
                }
                return o;
            });
            return o;
        })
    }
    conditionObj.then = (...functions) => {
        conditionObj.fnThen = functions;
        if (conditionObj.fnThen && conditionObj.fnElse) {
            return runFun();
        } else {
            return conditionObj;
        }
    }
    conditionObj.else = (...functions) => {
        conditionObj.fnElse = functions;
        if (conditionObj.fnThen && conditionObj.fnElse) {
            return runFun();
        } else {
            return conditionObj;
        }
    }
    return conditionObj;
};
$.fn.fextend = function (lazyQuery) {
    lazyQuery.execute(this);
    return this;
}

$.fn.fon = function(event, lazyQuery) {
    if (lazyQuery === undefined) {
        lazyQuery = new LazyQuery(this);
    } else {
        lazyQuery = lazyQuery.clone();
    }
    $(this).on(event, function (){
        lazyQuery.execute(this);
    });
    return lazyQuery;
}

class PokeValue extends Function {
    constructor(initialValue, updateFunction) {
        super('return arguments.callee._call.apply(arguments.callee, arguments)')
        this._bound = this.bind(this);
        this._bound.get = this.get.bind(this);

        this.value = initialValue;
        this.update = updateFunction;
        this.called = false;
        return this._bound;
    }
    _call(...args) {
        if (this.called) {
            this.value = this.update(this.value);
        }
        this.called = true;
        return this.value;
    }

    get() {
        return this.value;
    }
}

class LazyQuery extends $.fn.constructor {
    constructor(selector) {
        super();
        this.selector = selector;
        this.funStack = [];
        const knownMethods = Object.getOwnPropertyNames($.fn)
            .filter(p => typeof $.fn[p] === 'function' && p !== "constructor");
        knownMethods.push(...["then", "else"]);
        knownMethods
            .forEach(p => {
                this[p] = function (...args) {
                    this.funStack.push([p, args]);
                    return this;
                }
            });
        this.execute = function(selectorOverride) {
            const selector = selectorOverride || this.selector;
            const q = $(selector);
            return this.funStack.reduce((acc, [fun, args]) => acc[fun](...args), q)
        }
        this.fon = function(event, lazyQuery) {
            if (lazyQuery) {
                lazyQuery = lazyQuery.clone();
            }
            if (this.selector === undefined) {
                this.funStack.push(["fon", [event, lazyQuery]]);
                return this;
            } else {
                return $(this.selector).fon(event, lazyQuery);
            }
        }
        this.call = function (o, it) {
            if (this.selector === undefined) {
                $$ITERATORS.set(o, it);
                return this.execute(o);
            } else {
                return this.execute();
            }
        }
        this.clone = function() {
            const n = new LazyQuery(this.selector);
            n.funStack = [...this.funStack];
            return n;
        }
    }

    clone() {}
    execute() {}
}

// export for others scripts to use
window.$$ = $$;
window.LazyQuery = LazyQuery;
window.$ = $;